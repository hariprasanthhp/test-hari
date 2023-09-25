import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import Dygraph from 'dygraphs';
import * as _ from 'lodash';

import { DygraphSiteScanService } from '../../services/dygraph-sitescan.service';
import { wifiMockData } from '../../services/wifi-mock-data';
import { DataServiceService } from '../../../data.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from 'src/app-services/translate.service';

var keyWifidiagSiteScanObj = "wifidiag.sitescan.obj";
var NORMAL = 'normal';
var Band20 = '20MHZ',
  Band40 = '40MHZ',
  Band80 = '80MHZ',
  Band160 = '160MHZ';

var BLANK = '';
var HIDDEN = 'Hidden';
var Band20Width = 2,
  Band40Width = 4,
  Band80Width = 8,
  Band160Width = 16;
var SIGNAL_MIN = -100;
var SPLITTER = '$$$';
var busyness_colors = {};
busyness_colors[Band20] = {}, busyness_colors[Band40] = {}, busyness_colors[Band80] = {}, busyness_colors[Band160] = {};
busyness_colors[Band20][NORMAL] = '#F7C343';
busyness_colors[Band40][NORMAL] = '#F7C343';
busyness_colors[Band80][NORMAL] = '#F7C343';
busyness_colors[Band160][NORMAL] = '#F7C343';
const keyWifiCurrentTabForFive = 'five';
const keyWifidiagData = 'wifidiag.data';
const channelFilter = 'channelFilter', ssidFilter = 'ssidFilter';/***begin-aswin-11-05-2021-dygraph-filter-channel-issue-fix */
@Component({
  selector: 'dygraph-history-site-scan',
  templateUrl: './dygraph-history-site-scan.component.html',
  styleUrls: ['./dygraph-history-site-scan.component.scss']
})
export class DygraphHistorySiteScanComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('graph', { static: true }) public graphdiv: ElementRef;

  @Input('chartData') chartData;
  @Input('fsan') fsan;
  @Input('orgId') orgId;
  @Input('deviceInfo') deviceInfo;
  @Input('type') type;
  @Input('siteScanChannelSelected') siteScanChannelSelected;
  @Input('siteScanSSIDSelected') siteScanSSIDSelected;
  @Input('ssidChecked') ssidChecked;
  @Input('busynessChecked') busynessChecked;
  @Input('radioSummary') radioSummary;
  @Input('showSiteScanBusyness') showSiteScanBusyness;

  @Output() enableBusynessCheckBox = new EventEmitter();/***begin-aswin-12-0-2021-busyness-hide */
  y1Top: number;

  SsidNameInfoData: any = {};
  language: any;
  languageSubject: any;
  ssYaxisText: string = 'Power'
  ssXaxisText: string = 'Channel';
  ssY2axisText: string = 'Busyness'

  mSSID: any;
  constructor(public SiteScanService: DygraphSiteScanService,
    private wifiMockData2: wifiMockData, private route: ActivatedRoute, private dataService: DataServiceService,
    private translateService: TranslateService) { }

  ngOnDestroy(): void {
    if (this.languageSubject) this.languageSubject.unsubscribe();
  }

  ngOnInit(): void {


    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data: any) => {
      this.language = data;
      this.ssXaxisText = this.language.Channel;
      this.ssYaxisText = this.language.Power;
      this.ssY2axisText = this.language.Busyness;
      this.renderSiteScanGraph(true);

    })

    this.ssXaxisText = this.language.Channel;
    this.ssYaxisText = this.language.Power;
    this.ssY2axisText = this.language.Busyness;
    this.renderSiteScanGraph(true);
    // this.graphRender()
  };

  graphRender() {

    var deviceObj = JSON.parse(sessionStorage.getItem('calix.deviceData'));
    var deviceInfo = deviceObj.filter((el) => el.serialNumber === this.fsan)[0]



    var deviceInfo = this.deviceInfo;
    sessionStorage.setItem('calix.wifi.deviceInfo', JSON.stringify(deviceInfo));
    if (this.type == '2.4G') {
      //this.siteScanTypeChange('two');
      sessionStorage.setItem('currentTab', 'two');
      sessionStorage.setItem('radioSummary', JSON.stringify(this.radioSummary['2.4G']))
      sessionStorage.setItem('mainchannelvalue', this.chartData&&this.chartData['24g']? JSON.stringify(this.chartData['24g'].current):'')
    } else if (this.type == '5G') {
      sessionStorage.setItem('currentTab', 'five');
      sessionStorage.setItem('radioSummary', JSON.stringify(this.radioSummary['5G']))
      sessionStorage.setItem('mainchannelvalue',this.chartData&&this.chartData['5g']? JSON.stringify(this.chartData['5g'].current):'')

    } else {
      sessionStorage.setItem('currentTab', 'six');
      sessionStorage.setItem('radioSummary', JSON.stringify(this.radioSummary['6G']))
      sessionStorage.setItem('mainchannelvalue', this.chartData&&this.chartData['6g']? JSON.stringify(this.chartData['6g'].current):'')
    }
    //this.SiteScanService.initParams(deviceInfo.modelName, deviceInfo.dataModelName)
    if (this.chartData) {
      var serialNumber = this.chartData['sn'] ? this.chartData['sn'] : deviceInfo.serialNumber;
      var radio24gObj = this.chartData['24g'];
      var channelList = [];
      if (radio24gObj != null && radio24gObj['ranking_list'] != null) {
        radio24gObj['ranking_list'].forEach((obj, index) => {
          let objchannel=obj['channel']?obj['channel']:''
          channelList?.push(objchannel);
          //channelList.push(obj['channel']);
        });


        var radio24ChannelList = channelList;
      }
      channelList = [];
      var radio5gObj = this.chartData['5g'];
      if (radio5gObj != null && radio5gObj['ranking_list'] != null) {
        radio5gObj['ranking_list'].forEach((obj, index) => {
         let objchannel=obj['channel']?obj['channel']:''
          channelList?.push(objchannel);
        });
        var radio5ChannelList = channelList;
      };
      channelList = [];
      var radio6gObj = this.chartData['6g'];
      if (radio6gObj != null && radio6gObj['ranking_list'] != null) {
        radio6gObj['ranking_list'].forEach((obj, index) => {
         // channelList.push(obj['channel']);
         let objchannel=obj['channel']?obj['channel']:''
         channelList?.push(objchannel);
        });
        var radio6ChannelList = channelList;
      };
      //api data missing temporary add
      // this.chartData['ssidNameInfo'] = {
      //   "wlan2": [
      //     {
      //       "SSID": "CXNK00778D4D",
      //       "Enable": "true"
      //     }
      //   ],
      //   "wlan5": [
      //     {
      //       "SSID": "CXNK00778D4D",
      //       "Enable": "true"
      //     },
      //     {
      //       "SSID": "5GHz_IPTV_SSID778D4D",
      //       "Enable": "false"
      //     }
      //   ]
      // }
      /***begin-aswin-11-05-2021-dygraph-filter-channel-issue-fix */
      this.SiteScanService.setSiteScanFilterData(channelFilter, this.siteScanChannelSelected, false);
      /***end-aswin-11-05-2021-dygraph-filter-channel-issue-fix */
      sessionStorage.setItem('serialNumber', JSON.stringify(serialNumber))
      sessionStorage.setItem('radio24ChannelList', JSON.stringify(radio24ChannelList))
      sessionStorage.setItem('radio5ChannelList', JSON.stringify(radio5ChannelList))
      sessionStorage.setItem('radio6ChannelList', JSON.stringify(radio6ChannelList))
      sessionStorage.setItem('wifidiag.sitescan', JSON.stringify(this.chartData));
      sessionStorage.setItem(keyWifidiagData, JSON.stringify(this.wifiMockData2.wifiDiagdata))
      this.renderSiteScanGraph(true);

    }

  };



  ngOnChanges() {
    this.SsidNameInfoData = this.dataService.getSsidNameInfoData(this.fsan);
    if (!this.SsidNameInfoData) {
      this.getSsidNameInfoData();
    } else {
      this.mSSID = '';
      if (this.SsidNameInfoData['wlan2'] && this.SsidNameInfoData['wlan2']?.length && this.SsidNameInfoData['wlan2'][0]?.SSID && this.type == '2.4G') {
        this.mSSID = this.SsidNameInfoData['wlan2'][0]?.SSID;
      }
      if (this.SsidNameInfoData['wlan5'] && this.SsidNameInfoData['wlan5']?.length && this.SsidNameInfoData['wlan5'][0]?.SSID && this.type == '5G') {
        this.mSSID = this.SsidNameInfoData['wlan5'][0]?.SSID;
      }
      if (this.SsidNameInfoData['wlan6'] && this.SsidNameInfoData['wlan6']?.length && this.SsidNameInfoData['wlan6'][0]?.SSID && this.type == '6G') {
        this.mSSID = this.SsidNameInfoData['wlan6'][0]?.SSID;
      }
      if (this.mSSID) {
        sessionStorage.setItem('calix.mSSID', this.mSSID);
      } else sessionStorage.setItem('calix.mSSID', '');
      this.chartData['ssidNameInfo'] = this.SsidNameInfoData;
      this.graphRender();
    }




    // if (this.type) {
    //   this.siteScanTypeChange('two');
    // } else {
    //   this.siteScanTypeChange('five');
    // };



  };


  getSsidNameInfoData() {
    this.graphRender();
    //this.dataService.fetchSsidNameInfoData(this.orgId, this.fsan).subscribe((res: any) => {
    this.dataService.fetchMetaDatavaluesNew(this.orgId, this.fsan).subscribe((res: any) => {
      if (res) {
        var ssidResult = res["primary-operator-ssid"];
        var secondarySSID = res['secondary-ssid'];
        this.graphRender();
        if (ssidResult?.length) {
          // ssidResult.primary.length==0 
          this.SsidNameInfoData = {
            "wlan2": [],
            "wlan5": [],
            "wlan6": [],
          };
          for (var value of ssidResult) {
            if (value.freqBand == "2.4GHz") {
              if (value.SSID != "") {
                this.SsidNameInfoData['wlan2']?.push({
                  "SSID": value.SSID,
                  "Enable": value.Enable
                })
              }

            } else if (value.freqBand == "5GHz") {
              if (value.SSID != "") {
                this.SsidNameInfoData['wlan5']?.push({
                  "SSID": value.SSID,
                  "Enable": value.Enable
                })
              }

            }
          }
          if (secondarySSID) {
            for (var value of secondarySSID) {
              if (value.ssid != "" && value.band6) {
                this.SsidNameInfoData['wlan6']?.push({
                  "SSID": value.ssid,
                  // "Enable": value.Enable
                })
              }
            }
          }
          if (this.SsidNameInfoData['wlan2'] && this.SsidNameInfoData['wlan2']?.length && this.SsidNameInfoData['wlan2'][0]?.SSID && this.type == '2.4G') {
            this.mSSID = this.SsidNameInfoData['wlan2'][0]?.SSID;
          }

          if (this.SsidNameInfoData['wlan5'] && this.SsidNameInfoData['wlan5']?.length && this.SsidNameInfoData['wlan5'][0]?.SSID && this.type == '5G') {
            this.mSSID = this.SsidNameInfoData['wlan5'][0]?.SSID;
          }
          if (this.SsidNameInfoData['wlan6'] && this.SsidNameInfoData['wlan6']?.length && this.SsidNameInfoData['wlan6'][0]?.SSID && this.type == '6G') {
            this.mSSID = this.SsidNameInfoData['wlan6'][0]?.SSID;
          }
          if (this.mSSID) {
            sessionStorage.setItem('calix.mSSID', this.mSSID);
          } else sessionStorage.setItem('calix.mSSID', '');


          this.chartData['ssidNameInfo'] = this.SsidNameInfoData;
        } else {
          this.SsidNameInfoData = {};
        }
      }
      else {
        this.SsidNameInfoData = {};
      }
      this.dataService.setSsidNameInfoData(this.fsan, this.SsidNameInfoData);
      this.graphRender();

    }, err => {
      this.SsidNameInfoData = {};
      this.dataService.setSsidNameInfoData(this.fsan, this.SsidNameInfoData);
      this.graphRender();
    });
  }

  siteScanTypeChange(value) {
    sessionStorage.setItem('currentTab', value);
    this.renderSiteScanGraph(true);
    //this.renderSiteScanGraph2();
    //this.renderSiteScanGraph3()
  };

  renderSiteScanGraph = function (reload) {

    var siteScanObj;
    var y1Top = 20;
    if (reload) {
      if (this.type == '2.4G') {
        //this.siteScanTypeChange('two');
        sessionStorage.setItem('currentTab', 'two');
        sessionStorage.setItem('radioSummary', JSON.stringify(this.radioSummary['2.4G']))
        sessionStorage.setItem('mainchannelvalue', this.chartData&&this.chartData['24g']? JSON.stringify(this.chartData['24g'].current):'')
      } else if (this.type == '5G') {
        sessionStorage.setItem('currentTab', 'five');
        sessionStorage.setItem('radioSummary', JSON.stringify(this.radioSummary['5G']))
        sessionStorage.setItem('mainchannelvalue',this.chartData&&this.chartData['5g']? JSON.stringify(this.chartData['5g'].current):'')
      } else {
        sessionStorage.setItem('currentTab', 'six');
        sessionStorage.setItem('radioSummary',this.radioSummary?JSON.stringify(this.radioSummary['6G']):'')
        sessionStorage.setItem('mainchannelvalue', this.chartData&&this.chartData['6g']? JSON.stringify(this.chartData['6g'].current):'')
      }
      siteScanObj = this.SiteScanService?.getSiteScanObj();
    } else {
      siteScanObj = JSON.parse(sessionStorage.getItem(keyWifidiagSiteScanObj));
    }
    var lines = siteScanObj?this.toCsv(siteScanObj):'';

    var bandwidthList =siteScanObj?siteScanObj['bandwidthList']:'';

    var annotations = siteScanObj?siteScanObj['annotations']:'';

    var ssidList = siteScanObj?siteScanObj['ssidList']:'';

    var signalKeyList = siteScanObj?siteScanObj['signalKeyList']:'';

    var mainSSID = siteScanObj?siteScanObj.mainSSID:'';

    var currentTab = sessionStorage.getItem('currentTab')

    var lineLabels = this.getlabels(bandwidthList, signalKeyList)

    // Use step plot for Main SSID and busyness
    var stepPlotSeires = {
      'GigaCenterMainSSIDSeriesID': {
        stepPlot: true,
        strokeWidth: 3,
        strokePattern: Dygraph.DASHED_LINE,
        color: "#0279FF"
      }
    };
    _.each(bandwidthList, function (bandwidth) {
      stepPlotSeires[bandwidth] = {
        axis: 'y2',
        color: busyness_colors[bandwidth][NORMAL],
        stepPlot: true,
        fillGraph: true
      };
    });


    var that = this;

    var axisLabelFormatter = (currentTab === keyWifiCurrentTabForFive) ? axisLabelFormatterFor50 : (currentTab === 'two') ? axisLabelFormatterFor24 : axisLabelFormatterFor6;

    var getVisibleFlagList = function (ssids, bandwidths) {


      var allkeysList = _.union([mainSSID.id], signalKeyList, bandwidthList);
      var allSelectedIds = [];
      if (that.ssidChecked) {
        if (ssids && ssids.length) {
          allSelectedIds = _.union(allSelectedIds, ssids);

        } else {

          allSelectedIds = _.union(allSelectedIds, ssidList);
        }
      }
      if (bandwidths && bandwidths.length) {
        allSelectedIds = _.union(allSelectedIds, bandwidths);
      } else {

        allSelectedIds = _.union(allSelectedIds, bandwidthList);
      }

      var startsWith = function (str1, str2) {
        return str1.indexOf(str2) === 0;
      };
      var matchIndexesInAllKeysList = function (allSelectedIds) {
        var matched = [], macaddress = null, startStr = HIDDEN + "-";
        _.each(allSelectedIds, function (selected) {
          if (selected.indexOf(startStr) == 0) {
            macaddress = selected.slice(startStr.length);
          }

          _.each(allkeysList, function (key, index) {
            if (macaddress != null) { // The name of SSID is empty or Hidden, use macAddress to search

              if (key.indexOf(macaddress) != -1) {
                matched?.push(index);
              }
            } else if (startsWith(key, selected)) {
              matched?.push(index);
            }
          });
        });
        return matched;
      };
      var flagList = [];
      _.each(allkeysList, function (key, index) {
        flagList?.push(false);
      });
      flagList[0] = true; // Always display main SSID

      var visibleList = matchIndexesInAllKeysList(allSelectedIds);
      _.each(visibleList, function (index) {
        flagList[index] = true;
      });

      return flagList;

    };

    var visibleFlagListConstruct = function (ssids, bandwidths) {


      var allkeysList = _.union([mainSSID.id], signalKeyList, bandwidthList);
      var allSelectedIds = [];
      var flagList = [];
      _.each(allkeysList, function (key, index) {
        flagList?.push(false);
      });
      if (that.ssidChecked) {
        if (ssids && ssids.length) {
          _.each(ssids, function (ssid, sindex) {
            var ssid = ssid
            _.each(allkeysList, function (key, keyindex) {
              //var index = ssids.indexOf()
              var key = key
              //  if (key.indexOf(ssid) != -1) {
              if (key.includes(ssid)) {
                flagList[keyindex] = true;

              }
            });

          })


          flagList[0] = true; // Always display main SSID

        } else {

          // allSelectedIds = _.union(allSelectedIds, ssidList);
          flagList = [];
          _.each(allkeysList, function (key, index) {
            flagList?.push(true);
          });
          flagList[0] = true; // Always display main SSID

        }




      } else {
        flagList[0] = true;
      }
      if (that.busynessChecked) {
        if (bandwidthList.length != 0) {
          flagList[flagList.length - 1] = true;
        }
      }
      else {
        if (bandwidthList.length != 0) {
          flagList[flagList.length - 1] = false
        }

      }
      return flagList;
    }

    var ssids = this.siteScanSSIDSelected;
    var bandwidths = bandwidthList;
    console.log("ssids",ssids);
    console.log("bandwidth",bandwidths);

    
    /***begin-aswin-12-0-2021-busyness-hide */
    // if (bandwidthList.length != 0) {
    //   this.enableBusynessCheckBox.emit({
    //     showSiteScanBusyness: true,
    //     busynessChecked: true,
    //     sitescanBusynessBand: bandwidthList[0]
    //   });

    // }
    /***begin-aswin-12-0-2021-busyness-hide */
    //var visibleFlagList = getVisibleFlagList(ssids, bandwidths);
    var visibleFlagList = visibleFlagListConstruct(ssids, bandwidths);
    const g = new Dygraph(
      this.graphdiv.nativeElement,
      lines,
      {
        xlabel: this.ssXaxisText,
        ylabel: this.ssYaxisText + ' (dBm)',
        y2label: this.ssY2axisText + ' (%)',
        series: stepPlotSeires,
        legend: 'never',
        showRangeSelector: true,
        colors: ['#FF8238', '#B926F0', '#0027FF', '#FF489D'], // lightgreen, violet, blue, pink
        rangeSelectorHeight: 30,
        rangeSelectorPlotStrokeColor: 'white',
        rangeSelectorPlotFillColor: 'white',
        highlightCircleSize: 1,
        displayAnnotations: true,
        fillAlpha: 0.05,
        visibility: visibleFlagList,
        labels: lineLabels,
        axes: {
          x: {
            drawGrid: false,
            pixelsPerLabel: 1,
            axisLabelFormatter: axisLabelFormatter
          },
          y: {
            drawGrid: true,
            pixelsPerLabel: 20,
            axisLabelWidth: 70,
            axisLabelFormatter: function (y: any) {
              if (y === 0) {
                return 0;//null
              } else {
                return y;
              }
            },
            valueRange: [-100, y1Top]
          },
          y2: {
            pixelsPerLabel: 20,
            axisLabelWidth: 70,
            axisLabelFormatter: function (y2: any) {
              if (y2 === 0 || y2 > 100) {
                return null;
              } else {
                let digits=y2.toFixed(4)
                let numberof=Number(digits).toString()
                return  numberof ;
              }
            },
            valueRange: [0, 120]
          }
        }
      }
    );
    g.setAnnotations(annotations);
  };

  toCsv(siteScanObj) {
    var interpolatedChannels = siteScanObj?siteScanObj['interpolatedChannels']:'';
    var lines = "";

    _.each(interpolatedChannels, function (valueChannel, keyChannel) {
      lines += keyChannel + "," + _.values(valueChannel).join() + "\n";
    });

    return lines;
  }
  getlabels(bandwidthList, signalKeyList) {
    var ssidObj = this.SiteScanService.getMainSsidObj();
    var labels = ["Channel", ssidObj?.id];

    return labels.concat(signalKeyList, bandwidthList);
  }



}


var axisLabelFormatterFor24 = function (x) {
  if ((x < 1) || (x > 13)) {
    return '';
  } else {
    if (is_int(x)) {
      return x;
    } else {
      return '';
    }
  }
};

var axisLabelFormatterFor50 = function (x) {
  if ((x > 35) && (x < 145)) {
    if ((x > 64) && (x < 100)) {
      return '';
    } else {
      if (is_int(x)) {
        if (x % 4 === 0) {
          return x;
        } else {
          return '';
        }
      } else {
        return '';
      }
    }
  }
  else if ((x > 148) && (x < 168)) {
    if (is_int(x)) {
      if (x % 4 === 1) {
        return x;
      } else {
        return '';
      }
    } else {
      return '';
    }
  } else {
    return '';
  }
};

var axisLabelFormatterFor6 = function (x) {
  if ((x > 20) && (x < 214)) {
    if (is_int(x)) {
      if (x % 8 == 0) {
        return x;
      } else {
        return '';
      }
    } else {
      return '';
    }
  } else {
    return '';
  }
};



function is_int(value) {
  return ((parseFloat(value) === parseInt(value)) && !isNaN(value));
};


