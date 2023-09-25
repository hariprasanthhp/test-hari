import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as $ from 'jquery';
import { SupportWifiService } from '../../services/support-wifi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map } from 'rxjs/operators';
import { SupportWifiChartOptionsService } from '../../services/support-wifi-chart-options.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';
import { TranslateService } from 'src/app-services/translate.service';
import { combineLatest, ObjectUnsubscribedError, of } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from 'src/environments/environment';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Component({
  selector: 'app-history-site-scan',
  templateUrl: './history-site-scan.component.html',
  styleUrls: ['./history-site-scan.component.scss']
})
export class HistorySiteScanComponent implements OnInit, OnChanges {

  @Input('chartData') chartData;
  @Input('fsan') fsan;
  @Input('orgId') orgId;
  @Input('type') type;
  @Input('siteScanChannelSelected') siteScanChannelSelected;
  @Input('siteScanSSIDSelected') siteScanSSIDSelected;
  @Input('ssidChecked') ssidChecked;
  @Input('busynessChecked') busynessChecked;


  loading: boolean;
  errorInfo: any;
  error: boolean;
  language: any;
  languageSubject: any;

  combineLatest: any;
  parallelReqSubscribtion: ISubscription;
  results: any = [];
  resultsLatest: any;
  prevFSAN: any;
  prevtType: boolean;
  minBusynessAvail: boolean;
  constructor(
    private translateService: TranslateService,
    private api: SupportWifiService,
    private commonOrgService: CommonService,
    public ssoAuthService: SsoAuthService,
  ) { }

  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
      this.siteScanData(this.chartData, this.type);
    });
    this.siteScanData(this.chartData, this.type);
  }

  ngOnChanges() {
    this.siteScanData(this.chartData, this.type);
    // if (this.prevFSAN && this.fsan && this.prevFSAN == this.fsan && this.prevtType != this.type && this.results) {
    //   this.siteScanData(this.results, this.type);
    // } else {
    //   this.prevFSAN = this.fsan;
    //   this.prevtType = this.type;
    //   this.getData()
    // }


  }

  loadSiteScanChart(data) {
    let xFilter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136,
      140,
      144, 149, 153, 157,
      161,
      165
    ];
    const chartOption: any = {
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      legend: {
        verticalAlign: 'top',
        title: {
          text: `${(this.language && this.language["Busyness"]) ? this.language["Busyness"] : 'Busyness'}:`, //Support.i18n('siteBusynessLegendTitle'),
          style: {
            color: '#F7C343' // yellow
          }
        },
        enabled: (this.busynessChecked && this.minBusynessAvail) ? true : false,
      },
      colors: ['#029A7C', '#836EE8', '#0279FF', '#FF489D'], // lightgreen, violet, blue, pink
      chart: {
        type: 'line',
        alignTicks: false,
        zoomType: 'xy',
        panKey: 'shift',
        panning: true,
        events: {
          /* load: titleMove,
          redraw: titleMove */
        }
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      tooltip: {
        //enabled: true,
        formatter: function () {
          var s = '<b>' + this.x + '</b>';
          if (!this.point.myData) {
            return false
          }
          return this.point.myData.bssid ? this.point.myData.bssid : '';
        },
      },
      xAxis: {
        allowDecimals: false,
        showEmpty: false,
        title: {
          enabled: true,
          text: (this.language && this.language["Channel"]) ? this.language["Channel"] : "Channel"
        },
        tickInterval: 1,
        labels: {
          step: 1,
          formatter: function () {
            //Log.debug("Determine:" + this.value);
            if (xFilter.includes(this.value)) {
              //Log.debug("DISPLAY:" + this.value);
              return this.value;
            }
          }
        },
      },
      yAxis: [{
        title: {
          text: (this.language && this.language["Power"]) ? this.language["Power"] + ' (dBm)' : "Power (dBm)"
        },
        min: -100,
        max: 10,
        offset: 10,
        tickInterval: 10
      }, { // Secondary yAxis
        title: {
          text: (this.language && this.language["Busyness"]) ? this.language["Busyness"] + ' (%)' : "Busyness (%)",
          style: {
            color: '#F7C343' // yellow
          }
        },
        gridLineWidth: 0,
        min: 0,
        max: 100,
        offset: 10,
        tickInterval: 10,
        opposite: true,
        allowDecimals: false
      }],
      plotOptions: {
        line: {
          showInLegend: false,
          lineWidth: 1,
          marker: {
            enabled: false
          }
        },
        area: {
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          fillOpacity: 0.1,
          color: '#F7C343' // yellow
        },
        series: {
          dataLabels: {
            enabled: false,
            borderRadius: 5,
            borderWidth: 1,
            padding: 4,
            allowOverlap: true,
            useHTML: true,
            style: {
              fontWeight: 'normal'
            },
            formatter: function () {
              return $('<div/>').css({
                'color': this.series.color, // works
                'border': '1px solid',
                'padding': '0 15px 0 15px'
              }).text(this.point.name)[0].outerHTML;
            }
          },
          marker: {
            symbol: 'vertical',
            lineColor: null,
            lineWidth: 1,
            enabled: false
          }
        }
      },
      series: data
    }
    Highcharts.chart('siteScan', chartOption);
  }

  get5GChannelSpan(current_channel, bandwidth) {
    let data = [];
    let search;
    const bandwidth_20mhz = [
      [36],
      [40],
      [44],
      [48],
      [52],
      [56],
      [60],
      [64],
      [100],
      [104],
      [108],
      [112],
      [116],
      [132],
      [136],
      [149],
      [153],
      [157],
      [161],
      [165]
    ];
    const bandwidth_40mhz = [
      [36, 40],
      [44, 48],
      [52, 56],
      [60, 64],
      [100, 104],
      [108, 112],
      [132, 136],
      [140, 144],
      [149, 153],
      [157, 161]
    ];
    const bandwidth_80mhz = [
      [36, 40, 44, 48],
      [52, 56, 60, 64],
      [100, 104, 108, 112],
      [116, 120, 124, 128],
      [132, 136, 140, 144],
      [149, 153, 157, 161]
    ];
    const bandwidth_160mhz = [
      [36, 40, 44, 48, 52, 56, 60, 64],
      [100, 104, 108, 112, 116, 120, 124, 128]
    ];
    if (bandwidth === '20MHz') {
      search = bandwidth_20mhz;
    } else if (bandwidth === '40MHz') {
      search = bandwidth_40mhz;
    } else if (bandwidth === '80MHz') {
      search = bandwidth_80mhz;
    } else if (bandwidth === '160MHz') {
      search = bandwidth_160mhz;
    } else {
      return data;
    }
    //search in predefined span data
    data = search.find((r) => {
      return r.includes(current_channel);
    });
    return data;
  }

  genSiteChartNeighborData(data) {
    let myData = data;
    var shiftLeft = 2;
    var shiftRight = 2;
    var bandwidth = data.channel_bandwidth;
    var channel = data.channel;

    var frequency = data.radio;
    var rssi = data.rssi;
    var ssid = data.ssid || data.bssid;
    if (!ssid || ssid.toUpperCase() == 'HIDDEN') {
      ssid = data.macaddress ? data.macaddress : data.bssid;
    } else if (ssid && ssid.indexOf('Hidden') > -1 && data.bssid) {
      ssid = data.macaddress ? data.macaddress : data.bssid;
    }

    var ret = {
      data: []
    };
    if (frequency === '5g') {
      let data = this.get5GChannelSpan(channel, bandwidth);
      //Log.debug("5g channel span:" + JSON.stringify(data));
      if (!data || data.length < 1) {
        return ret;
      } else {
        shiftLeft = channel - data[0];
        shiftRight = data[data.length - 1] - channel;
      }
      //Log.debug("left:" + shiftLeft + "  right:" + shiftRight);
      ret.data.push({
        x: data[0] - 2,
        y: -100,
        myData: myData
      });
      if (shiftLeft) {
        ret.data.push({
          x: channel - shiftLeft,
          y: rssi,
          myData: myData
        });
      }
      ret.data.push({
        x: channel,
        y: rssi,
        name: ssid,
        dataLabels: {
          enabled: true
        },
        marker: {
          enabled: true
        },
        myData: myData
      });
      if (shiftRight) {
        ret.data.push({
          x: channel + shiftRight,
          y: rssi,
          myData: myData
        });
      }
      ret.data.push({
        x: data[data.length - 1] + 2,
        y: -100,
        myData: myData
      })
    } else {
      if (bandwidth === '20MHz') {
        shiftLeft = 2;
        shiftRight = 2;
      } else if (bandwidth === '40MHz') {
        if (channel < 8) {
          shiftLeft = 2;
          shiftRight = 6;
        } else {
          shiftLeft = 6;
          shiftRight = 2;
        }
      } else if (bandwidth === '80MHz') {
        shiftLeft = 8;
        shiftRight = 8;
      } else if (bandwidth === '160MHz') {
        shiftLeft = 16;
        shiftRight = 16;
      }

      //add left two data
      if (channel - shiftLeft <= 0) {
        ret.data.push({
          x: 0,
          y: -100,
          myData: myData
        });
        ret.data.push({
          x: 0.5,
          y: rssi,
          myData: myData
        });
      } else {
        ret.data.push({
          x: channel - shiftLeft,
          y: -100,
          myData: myData
        });
        ret.data.push({
          x: channel - shiftLeft + 1,
          y: rssi,
          myData: myData
        });
      }

      //add current channel dot
      ret.data.push({
        x: channel,
        y: rssi,
        name: ssid,
        dataLabels: {
          enabled: true
        },
        marker: {
          enabled: true
        },
        myData: myData
      });
      //add right two data
      if (channel - shiftLeft <= 0) {
        ret.data.push({
          x: channel + shiftRight - 0.5,
          y: rssi,
          myData: myData
        });
      } else {
        ret.data.push({
          x: channel + shiftRight - 1,
          y: rssi,
          myData: myData
        });
      }
      ret.data.push({
        x: channel + shiftRight,
        y: -100,
        myData: myData
      });
    }

    //Log.debug("genSiteChartData:" + JSON.stringify(ret.data));
    return ret;
  }

  genSiteChartBusynessData(data) {
    let shiftLeft = 2;
    let shiftRight = 2;
    let bandwidth = data.channel_bandwidth;
    let channel = data.channel;
    let frequency = data.radio;
    let name = data.channel_bandwidth;
    let busyness = data.busyness / 10;
    let ret = {
      data: [],
      type: "area",
      name: name,
      yAxis: 1
    };
    if (frequency === '5g') {
      let data = this.get5GChannelSpan(channel, bandwidth);
      //Log.debug("5g channel span:" + JSON.stringify(data));
      if (!data || data.length < 1) {
        return ret;
      }
      //Log.debug("left:" + shiftLeft + "  right:" + shiftRight);
      ret.data.push({
        x: data[0] - 2,
        y: 0
      });
      ret.data.push({
        x: data[0] - 2,
        y: busyness
      });
      ret.data.push({
        x: (data[0] + data[data.length - 1]) / 2,
        y: busyness,
        name: name,
        dataLabels: {
          enabled: true
        },
        marker: {
          enabled: true
        }
      });
      ret.data.push({
        x: data[data.length - 1] + 2,
        y: busyness
      });
      ret.data.push({
        x: data[data.length - 1] + 2,
        y: 0
      });
    } else {
      if (bandwidth === '20MHz') {
        shiftLeft = 2;
        shiftRight = 2;
      } else if (bandwidth === '40MHz') {
        if (channel < 8) {
          shiftLeft = 2;
          shiftRight = 6;
        } else {
          shiftLeft = 6;
          shiftRight = 2;
        }
      } else if (bandwidth === '80MHz') {
        shiftLeft = 8;
        shiftRight = 8;
      } else if (bandwidth === '160MHz') {
        shiftLeft = 16;
        shiftRight = 16;
      }

      //add left two data
      if (channel - shiftLeft <= 0) {
        ret.data.push({
          x: 0,
          y: 0
        });
        ret.data.push({
          x: 0,
          y: busyness
        });
      } else {
        ret.data.push({
          x: channel - shiftLeft,
          y: 0
        });
        ret.data.push({
          x: channel - shiftLeft,
          y: busyness
        });
      }

      //add current bandwidth dot
      ret.data.push({
        x: channel > shiftLeft ? (channel - shiftLeft + channel + shiftRight) / 2 : (channel + shiftRight) / 2,
        y: busyness,
        name: name,
        dataLabels: {
          enabled: true
        },
        marker: {
          enabled: true
        }
      });
      //add right two data
      ret.data.push({
        x: channel + shiftRight,
        y: busyness
      });
      ret.data.push({
        x: channel + shiftRight,
        y: 0
      });
    }

    //Log.debug("genSiteChartBusyData:" + JSON.stringify(ret.data));
    return ret;
  }

  siteScanData(json, type) {
    let sitedata = [], radio = type ? "24g" : "5g", scanRes = json ? json : {};
    if (!scanRes || !Object.keys(scanRes).length) {
      return;
    }
    scanRes.neighbor.forEach((r) => {
      if (r.radio === radio) {
        //sitedata.push(this.genSiteChartNeighborData(r));

        if (!this.siteScanChannelSelected.length && !this.siteScanSSIDSelected.length) {
          sitedata.push(this.genSiteChartNeighborData(r));
        } else if (this.siteScanChannelSelected.length && !this.siteScanSSIDSelected.length && this.siteScanChannelSelected.includes(r.channel)) {
          sitedata.push(this.genSiteChartNeighborData(r));
        } else if (!this.siteScanChannelSelected.length && this.siteScanSSIDSelected.length && this.siteScanSSIDSelected.includes(r.ssid)) {
          sitedata.push(this.genSiteChartNeighborData(r));
        } else if (this.siteScanChannelSelected.length && this.siteScanSSIDSelected.length && (this.siteScanChannelSelected.includes(r.channel) && this.siteScanSSIDSelected.includes(r.ssid))) {
          sitedata.push(this.genSiteChartNeighborData(r));
        }


      }
    });



    if (!this.ssidChecked) {
      sitedata = [];
      // sitedata.push({
      //   data: [
      //     { x: null, y: null },
      //     // { x: 0, y: 0 },
      //     // { x: 0, y: -3, name: this.fsan, dataLabels: { enabled: true }, marker: { enabled: true } },
      //     // { x: 2.5, y: -3 },
      //     { x: null, y: null }
      //   ]
      // })
    }

    if (!sitedata.length) {
      // let ssid = {
      //   "rssi": scanRes[radio].current.power,
      //   "security": "wpa-wpa2",
      //   "channel_bandwidth": scanRes[radio].channel_bandwidth,
      //   "bssid": this.fsan,
      //   "channel": scanRes[radio].current.channel,
      //   "ssid": this.fsan,
      //   "radio": radio
      // };
      // sitedata.push(this.genSiteChartNeighborData(ssid));

      sitedata.push({
        data: [
          { x: null, y: null },
          { x: null, y: null }
        ]
      });
    }
    let rankingList = scanRes[radio]?.['ranking_list'] ? scanRes[radio]?.['ranking_list'] : [];
    let skip = [];
    rankingList.forEach((r) => {
      skip.push(r['channel']);
    });
    //delete scanRes.busyness;
    this.minBusynessAvail = false;
    if (scanRes.busyness && this.busynessChecked) {
      scanRes.busyness.forEach((r) => {
        if (r.radio === radio) {
          if (skip.includes(r.channel)) {
            this.minBusynessAvail = true;
            sitedata.push(this.genSiteChartBusynessData(r));
          }
        }
      });
    }

    //Filter busyness legend
    let blist = [];
    sitedata.forEach((r) => {
      if (r.type) {
        if (blist.includes(r.name)) {
          r.linkedTo = r.name;
        } else {
          blist.push(r.name);
          r.id = r.name;
        }
      }
    });

    this.loadSiteScanChart(sitedata);
  }

  getData() {
    const requestEndpoints = [
      `${environment.SUPPORT_URL}/device-systools/site-scan/results?${this.ssoAuthService.getOrg(this.orgId)}sn=${this.fsan}`,
      `${environment.SUPPORT_URL}/device-systools/site-scan/results/latest?${this.ssoAuthService.getOrg(this.orgId)}sn=${this.fsan}`,
    ];

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
      if (response.length) {
        for (let e of response) {
          if (e != null && e.error != undefined) {
            this.loading = false;
            this.pageErrorHandle(e);
            this.commonOrgService.pageScrollTop();
            return;
          }
        }
      }

      if (response[0].length) {
        this.results = response[0][0];
        this.siteScanData(this.results, this.type);
      }

      if (response[1]) {
        this.resultsLatest = response[1][0];
      }



      this.loading = false;
    }, (err: HttpErrorResponse) => {
      // this.showChart24G = false;
      // this.showChart5G = false;
      // this.pageErrorHandle(err);
      this.loading = false;
    }, () => {

    })
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


}
