import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { DygraphSiteScanUtilsService } from './dygraph-sitescan-utils.service'

const keyWifidiagSiteScan = 'wifidiag.sitescan';
const keyWifidiagData = 'wifidiag.data';
const keyUnifiedWifiTabName = "unifiedWifi";

var mock = false;
var is_int = function (value) {
    return ((parseFloat(value) === parseInt(value)) && !isNaN(value));
};

var Band20 = '20MHZ',
    Band40 = '40MHZ',
    Band80 = '80MHZ',
    Band80_80 = '80+80MHZ',
    Band160 = '160MHZ';

var BLANK = '';
var HIDDEN = 'Hidden';
var Band20Width = 2,
    Band40Width = 4,
    Band80Width = 8,
    Band160Width = 16;
var SIGNAL_MIN = -100;
var SPLITTER = '$$$';

var BandToDisplayMap = {};
BandToDisplayMap[Band20] = "20MHz";
BandToDisplayMap[Band40] = "40MHz";
BandToDisplayMap[Band80] = "80MHz";
BandToDisplayMap[Band160] = "160MHz";
BandToDisplayMap[Band80_80] = "80+80MHz";

var radioPathGiga = "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";
var radioPath = 'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.';
var wlanPath = 'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.';
var hostPath;
var devicePath;
var metricsPath;
var wlanOperatingChannelBandwidthParamName = "OperatingChannelBandwidth";
var wlanOperatingChannelBandwidthStore = 'X_000631_OperatingChannelBandwidth';
var wlanChannelUtilizationParamName = "ChannelUtilization";
var wlanChannelInterferenceTimeParamName = "ChannelInterferenceTime";
var wlanTotalPacketsSentParamName = "TotalPacketsSent";
var wlanTotalPacketsReceivedParamName = "TotalPacketsReceived";
var wlanChannelUtilizationStore = wlanChannelUtilizationParamName;

var wlanChannelInterferenceTimeStore = wlanChannelInterferenceTimeParamName;
var wlanTotalPacketsSentStore = wlanTotalPacketsSentParamName;
var wlanTotalPacketsReceivedStore = wlanTotalPacketsReceivedParamName;
const keyWifiCurrentTabForTwo = 'two';

const keyWifidiagHosts = 'wifidiag.hosts';
const keyWifidiagDevices = 'wifidiag.devices';
const keyWifidiagDevicesScore = 'wifidiag.devicesScore';
const keyWifidiagDevicesMinimumScore = 'wifidiag.minimunScore';
const keyWifidiagDataError = 'wifidiag.error';
const keyWifidiagLoading = 'wifidiag.loading';
const keyWifidiagCurrentTab = 'wifidiag.current-tab';
var radio24ChannelList, radio5ChannelList, radio6ChannelList;
var keyWifidiagSiteScanObj = "wifidiag.sitescan.obj";
@Injectable({
    providedIn: 'root'
})
export class DygraphSiteScanService {



    constructor(
        private http: HttpClient,
        private Utils: DygraphSiteScanUtilsService
    ) {

    }

    // isRadioData() {
    //     var currentTab = sessionStorage.getItem('currentTab');
    //     return currentTab == 'five' ? true : false
    // };
    /***begin-aswin-11-05-2021-dygraph-filter-channel-issue-fix */
    siteScanFilter: any = {};
    getSiteScanFilterData(key) {
        return this.siteScanFilter.hasOwnProperty(key) ? this.siteScanFilter[key] : false;
    }

    setSiteScanFilterData(key, siteScanFilter, reset) {
        reset ? this.siteScanFilter = {} : this.siteScanFilter[key] = siteScanFilter;
    }
    /***end-aswin-11-05-2021-dygraph-filter-channel-issue-fix  */

    getSpan(curChannel, curBandwidth) {
        var SPAN = 4;
        var result = {};
        var curSpan = 0;
        var radioStr = isRadioData();
        if (radioStr == '2.4G') {  // 2.4GHz
            switch (curBandwidth) {
                case Band20:
                    curSpan = Band20Width;
                    break;
                case Band40:
                    curSpan = Band40Width;
                    break;
                case Band80:
                    curSpan = Band80Width;
                    break;
                case Band160:
                    curSpan = Band160Width;
                    break;
            };
            result['leftSpan'] = curSpan;
            result['rightSpan'] = curSpan;
            result['step'] = 1;
            return result;
        } else if (radioStr == '5G' || radioStr == '6G') {
            // Clasify channels into blocks
            var modValue, modResult, totalSpan;
            switch (curBandwidth) {
                case Band20:
                    result = { leftSpan: 2, rightSpan: 2 };
                    break;
                case Band40:
                    modValue = 2;
                    break;
                case Band80:
                    modValue = 4;
                    break;
                case Band160:
                    modValue = 8;
                    break;
            };

            if (modValue != null) {
                modResult = Math.floor(curChannel / SPAN) % modValue;
                totalSpan = modValue * 4;
                if (modResult === 0) {  // Right-most
                    result['leftSpan'] = totalSpan - 2;
                } else {
                    result['leftSpan'] = (modResult - 1) * SPAN + 2;
                }
                result['rightSpan'] = totalSpan - result['leftSpan'];
            }
            result['step'] = 2;
            return result;
        } else {

        }
    };
    /**
* Get Central Channel
* @param channel
* @param leftSpan
* @param rightSpan
* @returns {*}
*/
    getCentralChannel = function (channel, leftSpan, rightSpan) {
        var centralChannel = channel;
        var radioStr = isRadioData();
        if (radioStr == '5G' || radioStr == '6G') {
            // Center the label
            centralChannel = Math.floor(channel - leftSpan + (rightSpan + leftSpan + 1) / 2);
        }
        return centralChannel;
    };
    /**
* Return an entry in which all keys are blank
*
* @param mainSsidId
* @param signalKeyList
* @param bandwidthList
* @returns {{}}
*/
    // getBlankEntry = function (mainSsidId, signalKeyList, bandwidthList) {
    //     var channel = {};
    //     channel[mainSsidId] = BLANK;
    //     _.each(signalKeyList, function (key) {
    //         channel[key] = BLANK;
    //     });
    //     _.each(bandwidthList, function (bandwidth) {
    //         channel[bandwidth] = BLANK;
    //     });
    //     return channel;
    // };
    initParams(modelName, dataModelName) {
        radioPathGiga = this.Utils.get24gRadioPathCalix();
        radioPath = this.Utils.get24gRadioPath();
        wlanPath = this.Utils.get24gWlanPath()[0];
        var radioStr = isRadioData();
        if (radioStr == '5G') {
            radioPathGiga = this.Utils.get5gRadioPathCalix();
            radioPath = this.Utils.get5gRadioPath();
            wlanPath = this.Utils.get5gWlanPath()[0];
        } else if (radioStr == '6G') {
            radioPathGiga = this.Utils.get6gRadioPathCalix();
            radioPath = this.Utils.get6gRadioPath();
            wlanPath = this.Utils.get5gWlanPath()[0];
        }
        // else {
        //     radioPathGiga = "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.";
        //     radioPath = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.";
        //     wlanPath = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.";

        // }
        wlanOperatingChannelBandwidthStore = this.Utils.getParameterRealAttributeBS(radioPath + wlanOperatingChannelBandwidthParamName);
        wlanChannelUtilizationStore = this.Utils.getParameterRealAttributeBS(radioPath + wlanChannelUtilizationParamName);
    };
    getSsids = function () {
        var currentTab = sessionStorage.getItem('currentTab');
        var data = JSON.parse(localStorage.getItem('WifidiagSiteScan'));



        var ssid, ssids = [];
        var add2SsidArray = function (wlanPaths) {
            _.each(wlanPaths, function (path, k) {
                ssid = this.Utils.getValueByPath(data, path);
                if (ssid) {
                    ssids?.push(ssid);
                }
            });
        };
        var l2IfaceSupported = this.Utils.isParameterSupportedBS("InternetGatewayDevice.LANDevice.1.Hosts.Host.1.Layer2Interface");
        var IfaceTypwSupported = this.Utils.isParameterSupportedBS("InternetGatewayDevice.LANDevice.1.Hosts.Host.1.InterfaceType");
        // var ssidPathFilter = false;
        if (l2IfaceSupported && IfaceTypwSupported) {
            var IfaceTypeWireless = "802.11";
            var IfaceTypeWirelessCfg = this.Utils.getParameterAttributeBS("InternetGatewayDevice.LANDevice.1.Hosts.Host.1.InterfaceType", "type");
            if (IfaceTypeWirelessCfg && IfaceTypeWirelessCfg.wireless) {
                IfaceTypeWireless = IfaceTypeWirelessCfg.wireless;
            }
            var ssidPathFilter = [];
            var lanDevices = JSON.parse(sessionStorage.getItem(keyWifidiagHosts));
            var key;
            for (key in lanDevices) {
                var device = lanDevices[key];
                if (device.InterfaceType == IfaceTypeWireless) {
                    ssidPathFilter?.push(device.Layer2Interface);
                }
            }
        }
        var ssidArr;
        if (currentTab === keyWifiCurrentTabForTwo) {
            ssidArr = this.Utils.get24gWlanPath();
        } else if (currentTab === 'five') {
            ssidArr = this.Utils.get5gWlanPath();
        } else {
            ssidArr = this.Utils.get6gWlanPath();
        }
        if (ssidPathFilter) {
            var arr = [];
            var k1;
            for (k1 in ssidArr) {
                var ssid = ssidArr[k1];
                var matched = false;
                var k2;
                for (k2 in ssidPathFilter) {
                    var pattern = ssidPathFilter[k2];
                    if (pattern && pattern.length > 0) {
                        pattern += ".";
                        if (pattern == ssid) {
                            matched = true;
                            break;
                        }
                    }
                }
                if (matched) {
                    arr?.push(ssid);
                }
            }
            ssidArr = arr;
        }
        add2SsidArray(ssidArr);
        return ssids;
    };
    /**
* Get Bandwidth list for Busyness
*
* @param radio
* @param busynessesGroupByChannel
* @param channelList
* @param bandwidthList
*/
    getBusynessBandwidthList = function (
        radio,
        busynessesGroupByChannel,
        channelList,
        bandwidthList
    ) {
        //var currentBand = radio[wlanOperatingChannelBandwidthStore];
        var currentBand = radio['Bandwidth'];

        var targetBandwidthList = [];
        var radioStr = isRadioData();
        if (!currentBand) {
            if (radioStr == '2.4G') {
                currentBand = '20MHz';
            } else if (radioStr == '5G') {
                currentBand = '80MHz';
            } else {
                currentBand = '160MHz';
            }
        }
        // Only display 20MHz busyness for 2.4GHz
        if (radioStr == '2.4G' && currentBand.toUpperCase() === Band40) {
            return targetBandwidthList;
        }

        // Only display busyness of 1, 6, 11 for 2.4GHz
        var limitedBusynessDisplayChannels = radio24ChannelList;
        // Busyness displayed for 5GHz is related to DFS status
        if (radioStr == '5G') {
            limitedBusynessDisplayChannels = radio5ChannelList;
        } else if (radioStr == '6G') {
            limitedBusynessDisplayChannels = radio6ChannelList;
        }
        _.each(channelList, function (channel) {
            channel = parseInt(channel);
            // if (_.includes(limitedBusynessDisplayChannels, channel)) {
            _.each(bandwidthList, function (bandwidth) {
                if (_.has(busynessesGroupByChannel[channel], bandwidth)) {
                    if (!_.includes(targetBandwidthList, bandwidth)) {
                        targetBandwidthList?.push(bandwidth);
                    }
                }
            });
            // }
        });
        return targetBandwidthList;
    };
    /**
     * Prepare Main SSID Lines
     *
     * @param interpolatedChannels
     * @param annotations
     * @param mainSSID
     * @param radio
     * @param signalKeyList
     * @param bandwidthList
     */
    prepareMainSSIDLines = function (
        interpolatedChannels,
        annotations,
        mainSSID,
        radio,
        signalKeyList,
        bandwidthList
    ) {
        var mainChannel = mainSSID.channel;
        var mainId = mainSSID.id;
        //var span = this.getSpan(mainChannel, radio[wlanOperatingChannelBandwidthStore].toUpperCase());
        radio['Bandwidth'] = radio['Bandwidth'] ? radio['Bandwidth']?.toUpperCase() : '';
        var span = this.getSpan(mainChannel, radio['Bandwidth'].toUpperCase());

        var interpolatedChannel_start = mainChannel - span.leftSpan;
        var interpolatedChannel_end = mainChannel + span.rightSpan;
        _.each(_.range(interpolatedChannel_start - 1, interpolatedChannel_end + 1), function (interpolatedChannel) {
            if (interpolatedChannels[interpolatedChannel] == null) {
                var value = getBlankEntry(mainId, signalKeyList, bandwidthList);
                interpolatedChannels[interpolatedChannel] = value;
            }
            if (interpolatedChannel === interpolatedChannel_start - 1 || interpolatedChannel === interpolatedChannel_end) {
                interpolatedChannels[interpolatedChannel][mainId] = -100;
            } else {
                interpolatedChannels[interpolatedChannel][mainId] = 0;
            }
        });


        var siteScanResult = JSON.parse(sessionStorage.getItem(keyWifidiagSiteScan));
        var detailInfos = "";
        var mainSSIDName = mainSSID.name;
        if (siteScanResult && siteScanResult.ssidNameInfo) {
            var ssidNames;
            var radioStr = isRadioData();
            if (radioStr == '5G') {
                ssidNames = siteScanResult.ssidNameInfo.wlan5;
            } else if (radioStr == '2.4G') {
                ssidNames = siteScanResult.ssidNameInfo.wlan2;
            } else {
                ssidNames = siteScanResult.ssidNameInfo.wlan6;
            }
            for (var key in ssidNames) {
                var nameObj = ssidNames[key];
                if (nameObj && nameObj.SSID) {
                    if (nameObj.SSID != mainSSID.name) {
                        detailInfos += " " + nameObj.SSID + ((nameObj.Enable == "false") ? " (Disabled)" : "") + "\n";
                    } else {
                        if (nameObj.Enable == "false") {
                            mainSSIDName += " (Disabled)";
                        }
                    }
                }
            }
        }
        if (detailInfos.length > 0) {
            detailInfos = "Primarry SSID\n " + mainSSIDName + "\n\nOthers\n" + detailInfos;
        } else {
            detailInfos = mainSSID.name;
        }
        if (radioStr == '6G' && mainChannel === 0) {
            mainChannel = -1;
        }
        var mainSSIDAnnotation = {
            mainSSID: true,
            series: mainSSID.id,
            x: mainChannel,
            height: 27,
            shortText: mainSSID.name,
            text: detailInfos,
            width: 180
        };
        annotations?.push(mainSSIDAnnotation);
    };


    /**
     * Prepare busyness lines
     * @param interpolatedChannels
     * @param annotations
     * @param mainSSID
     * @param radio
     * @param busynessesGroupByChannel
     * @param channelList
     * @param signalKeyList
     * @param bandwidthList
     */
    prepareBusynessLines = function (
        interpolatedChannels,
        annotations,
        mainSSID,
        radio,
        busynessesGroupByChannel,
        channelList,
        signalKeyList,
        bandwidthList
    ) {
        // Only display busyness of 1, 6, 11 for 2.4GHz
        var that = this;
        var limitedBusynessDisplayChannels = radio24ChannelList;
        var radioStr = isRadioData();
        if (radioStr == '5G') {
            limitedBusynessDisplayChannels = radio5ChannelList;
        } else if (radioStr == '6G') {
            limitedBusynessDisplayChannels = radio6ChannelList;

        }

        _.each(channelList, function (channel) {
            channel = parseInt(channel);
            if (limitedBusynessDisplayChannels?.indexOf(channel) === -1) {
                if (interpolatedChannels[channel] == null) {
                    interpolatedChannels[channel] = getBlankEntry(mainSSID.id, signalKeyList, bandwidthList);
                }
                // return;
            }

            _.each(bandwidthList, function (bandwidth) {
                var span = that.getSpan(channel, bandwidth);

                var curBusyness = 0;
                if (_.has(busynessesGroupByChannel[channel], bandwidth)) {
                    curBusyness = parseInt(busynessesGroupByChannel[channel][bandwidth][0]['busyness']) / 10;
                    var annotationObj = {
                        series: bandwidth,
                        shortText: BandToDisplayMap[bandwidth],
                        height: 21,
                        width: 50,
                        text: ""
                    };
                    annotationObj['x'] = that.getCentralChannel(channel, span.leftSpan, span.rightSpan);
                    annotations?.push(annotationObj);
                    var interpolatedChannel_start = channel - span.leftSpan;
                    var interpolatedChannel_end = channel + span.rightSpan;
                    _.each(_.range(interpolatedChannel_start - 1, interpolatedChannel_end + 1), function (interpolatedChannel) {
                        if (interpolatedChannels[interpolatedChannel] == null) {
                            interpolatedChannels[interpolatedChannel] = getBlankEntry(mainSSID.id, signalKeyList, bandwidthList);
                        }
                        if (interpolatedChannel === interpolatedChannel_start - 1 || interpolatedChannel === interpolatedChannel_end) {
                            if (interpolatedChannels[interpolatedChannel][bandwidth] === BLANK) {
                                interpolatedChannels[interpolatedChannel][bandwidth] = 0;
                            }
                        } else {
                            interpolatedChannels[interpolatedChannel][bandwidth] = curBusyness;
                        }
                    });
                }
            });
        });
    };

    /**
     * Prepare Signal Lines
     *
     * @param interpolatedChannels
     * @param annotations
     * @param mainSSID
     * @param signalsGroupBySSID
     * @param ssidList
     * @param signalKeyList
     * @param bandwidthList
     */
    prepareSignalLines = function (
        interpolatedChannels,
        annotations,
        mainSSID,
        signalsGroupBySSID,
        ssidList,
        signalKeyList,
        bandwidthList
    ) {
        var getSpan = this.getSpan;
        _.each(ssidList, function (ssid) {
            _.each(signalsGroupBySSID[ssid], function (signal) {
                var channel = parseInt(signal['channel']);
                var signalBandwidth = '';
                var upperCaseVal = signal['radio'].toUpperCase();
                if (upperCaseVal === '24G') {
                    signalBandwidth = '20MHZ';
                } else if (upperCaseVal === '5G') {
                    signalBandwidth = '80MHZ';
                } else {
                    signalBandwidth = '160MHZ';
                }
                let bandwidth
               if(signal['channel_bandwidth']){
                 bandwidth = (signal['channel_bandwidth'].toUpperCase() !== 'N/AMHZ') ? signal['channel_bandwidth'].toUpperCase() : signalBandwidth;
               }
               else{
                bandwidth = '';
               }
                var macaddress = signal['bssid'];
                var keyForSignal = ssid + SPLITTER + macaddress;
                var annotationObj = {
                    series: keyForSignal,
                    x: channel,
                    shortText: ssid,
                    text: macaddress,
                    height: 21,
                    width: 120
                };

                var span = getSpan(channel, bandwidth);
                if (annotationObj.shortText == BLANK || annotationObj.shortText == HIDDEN) {
                    annotationObj.shortText = macaddress;
                } else if (annotationObj.shortText && annotationObj.shortText.indexOf('Hidden') > -1 && macaddress) {
                    annotationObj.shortText = macaddress;
                }
                annotations?.push(annotationObj);

                var signalStrength = (parseInt((signal['rssi'])));
                var interpolatedChannel_start = channel - span.leftSpan;
                var interpolatedChannel_end = channel + span.rightSpan;
                var interpolatedChannel_left_ascend = interpolatedChannel_start + span.step;
                var interpolatedChannel_right_descend = interpolatedChannel_end - span.step;
                _.each(_.range(interpolatedChannel_start, interpolatedChannel_end + 1), function (interpolatedChannel) {
                    if (!_.has(interpolatedChannels, interpolatedChannel)) {
                        interpolatedChannels[interpolatedChannel] = getBlankEntry(mainSSID.id, signalKeyList, bandwidthList);
                    }
                    if (interpolatedChannel === interpolatedChannel_start || interpolatedChannel === interpolatedChannel_end) {
                        interpolatedChannels[interpolatedChannel][keyForSignal] = SIGNAL_MIN;
                    } else if (interpolatedChannel >= interpolatedChannel_left_ascend && interpolatedChannel <= interpolatedChannel_right_descend) {
                        interpolatedChannels[interpolatedChannel][keyForSignal] = signalStrength;
                    } else if (interpolatedChannel > interpolatedChannel_start && interpolatedChannel < interpolatedChannel_left_ascend) {
                        var distance = interpolatedChannel - interpolatedChannel_start;
                        interpolatedChannels[interpolatedChannel][keyForSignal] = SIGNAL_MIN + (signalStrength - SIGNAL_MIN) / span.step * distance;
                    } else {
                        var distance = interpolatedChannel - interpolatedChannel_right_descend;
                        interpolatedChannels[interpolatedChannel][keyForSignal] = SIGNAL_MIN + (signalStrength - SIGNAL_MIN) / span.step * distance;
                    }
                });
            });
        });
    };

    getRadioObj() {
        var data = JSON.parse(sessionStorage.getItem(keyWifidiagData));

        var mergedObj, radioGigaObj, radioObj, wlanObj;



        wlanObj = this.Utils.getValueByPath(data, wlanPath);
        radioGigaObj = this.Utils.getValueByPath(data, radioPathGiga);
        radioObj = this.Utils.getValueByPath(data, radioPath);

        mergedObj = _.extend(wlanObj, radioGigaObj, radioObj) || {};
        if (radioGigaObj && radioGigaObj.ChannelUtilization) {
            mergedObj.ChannelUtilization = parseInt(radioGigaObj.ChannelUtilization) / 10;
        } else if (radioObj && radioObj[wlanChannelUtilizationStore]) {
            mergedObj.ChannelUtilization = parseInt(radioObj[wlanChannelUtilizationStore]);
        } else if (wlanObj && wlanObj[wlanChannelUtilizationStore]) {
            mergedObj.ChannelUtilization = parseInt(wlanObj[wlanChannelUtilizationStore]);
        }
        if (radioGigaObj && radioGigaObj.ChannelInterferenceTime) {
            mergedObj.ChannelInterferenceTime = parseInt(radioGigaObj.ChannelInterferenceTime) / 10;
        } else if (radioObj && radioObj[wlanChannelInterferenceTimeStore]) {
            mergedObj.ChannelInterferenceTime = parseInt(radioObj[wlanChannelInterferenceTimeStore]);
        } else if (wlanObj && wlanObj[wlanChannelInterferenceTimeStore]) {
            mergedObj.ChannelInterferenceTime = parseInt(wlanObj[wlanChannelInterferenceTimeStore]);
        }
        if (mergedObj.ChannelUtilization && mergedObj.ChannelInterferenceTime) {
            mergedObj.ChannelFreeTime = 100 - mergedObj.ChannelUtilization - mergedObj.ChannelInterferenceTime
        }

        var packetsSent = 0,
            packetsReceived = 0;
        if (radioGigaObj && radioGigaObj.PacketsTransmittedDownstream) {
            packetsSent = radioGigaObj.PacketsTransmittedDownstream;
            packetsReceived = radioGigaObj.PacketsTransmittedUpstream;
        } else if (radioObj && radioObj.PacketsTransmittedDownstream) {
            packetsSent = radioObj[wlanTotalPacketsSentStore];
            packetsReceived = radioObj[wlanTotalPacketsReceivedStore];
        } else {
            var ssids = this.getSsids();
            _.each(ssids, function (ssid) {
                packetsSent += parseInt(ssid[wlanTotalPacketsSentStore]);
                packetsReceived += parseInt(ssid[wlanTotalPacketsReceivedStore]);
            });
        }
        return _.extend(mergedObj, {
            'packetsSent': packetsSent,
            'packetsReceived': packetsReceived
        });
    };

    getRadioSummaryObj() {
        if (sessionStorage.getItem('radioSummary') != 'undefined') {
            var data =sessionStorage.getItem('radioSummary')? JSON.parse(sessionStorage.getItem('radioSummary')):'';
        }
     
        var SSID = JSON.parse(sessionStorage.getItem('serialNumber'));
        var mSSID = sessionStorage.getItem('calix.mSSID');

        var mergedObj = data;
        if(mergedObj)
        {
            mergedObj['SSID'] = mSSID ? mSSID : SSID;
        }
       
        return mergedObj;
    };

    getMainSsidObj() {
        // var radioObject = this.getRadioObj();
        sessionStorage.getItem('mainchannelvalue')
        if (sessionStorage.getItem('mainchannelvalue') != 'undefined') {
            var mainchannelvalue =sessionStorage.getItem('mainchannelvalue')? JSON.parse(sessionStorage.getItem('mainchannelvalue')):'';
        }
        var radioObject = this.getRadioSummaryObj();

        return {
            id: "GigaCenterMainSSIDSeriesID",
            channel: eval(mainchannelvalue.channel),
            name: radioObject.SSID
        };
    };
    getSiteScanObj() {

        var result = JSON.parse(sessionStorage.getItem(keyWifidiagSiteScan));
        if (sessionStorage.getItem('radio24ChannelList') != 'undefined') {
        radio24ChannelList = JSON.parse(sessionStorage.getItem('radio24ChannelList'));
        }
        var radioStr = isRadioData();
        if (radioStr == '5G') {
            radio5ChannelList = JSON.parse(sessionStorage.getItem('radio5ChannelList'));;
        } else if (radioStr == '6G') {
            if (sessionStorage.getItem('radio6ChannelList') != 'undefined') {
                radio6ChannelList = JSON.parse(sessionStorage.getItem('radio6ChannelList'));;
            }
        }
        if (result == null) {
            return null;
        }

        var busynesses = result.busyness;

        var signals = result.neighbor;
        var radioValue = '';
        if (radioStr == '5G') {
            radioValue = '5g'
        } else if (radioStr == '2.4G') {
            radioValue = '24g';
        } else {
            radioValue = '6g'
        }
        busynesses = _.filter(busynesses, function (busyness) {
            return busyness['radio'] === radioValue;
        });
        signals = _.filter(signals, function (signal) {
            return signal['radio'] === radioValue;
        });
        signals = _.map(signals, function (signal) {
            signal['channel'] = signal['channel'].toString();
            return signal;
        });

        _.each(signals, function (signal) {
            if (signal.ssid == BLANK) {
                signal.ssid = HIDDEN;
            }
        });

        //group all signals by channel
        var signalsGroupByChannelAll = _.groupBy(signals, function (signal) {
            return signal['channel'];
        });
        var channelListAll = _.sortBy(_.keys(signalsGroupByChannelAll), function (channel) {
            return parseInt(channel);
        });
        /***begin-aswin-11-05-2021-dygraph-filter-channel-issue-fix */
        var channelsSelected = this.getSiteScanFilterData('channelFilter');
        if (channelsSelected && channelsSelected.length > 0) {

            // busynesses = _.filter(busynesses, function (busyness) {

            //     return contains(channelsSelected, busyness['channel']);
            // });
            // signals = _.filter(signals, function (signal) {
            //     return contains(channelsSelected, signal['channel']);
            // });
            busynesses = busynesses.filter(s => channelsSelected.includes(parseInt(s.channel)));

            signals = signals.filter(s => channelsSelected.includes(parseInt(s.channel)));

        }
        /***end-aswin-11-05-2021-dygraph-filter-channel-issue-fix */
        //group busyness by (channel,bandwidth)
        var busynessesGroupByChannel;
        busynessesGroupByChannel = _.groupBy(busynesses, function (busyness) {
            return busyness['channel'];
        });
        _.each(busynessesGroupByChannel, function (busynessesForChannel, channel) {
            var busynessesForChannelGroupByBandWidth = _.groupBy(busynessesForChannel, function (busyness) {
                return busyness['channel_bandwidth'].toUpperCase();
            });
            busynessesGroupByChannel[channel] = busynessesForChannelGroupByBandWidth;
        });
        var channelList = _.sortBy(_.keys(busynessesGroupByChannel), function (channel) {
            return parseInt(channel);
        });


        //group busyness by (bandwidth,channel)
        var busynessesGroupByBandwidth;
        busynessesGroupByBandwidth = _.groupBy(busynesses, function (busyness) {
            return busyness['channel_bandwidth'].toUpperCase();
        });
        _.each(busynessesGroupByBandwidth, function (busynessesForBandwidth, bandwidth) {
            var busynessesForBandwidthGroupByChannel = _.groupBy(busynessesForBandwidth, function (busyness) {
                return busyness['channel'];
            });
            busynessesGroupByBandwidth[bandwidth] = busynessesForBandwidthGroupByChannel;
        });
        var bandwidthList = _.keys(busynessesGroupByBandwidth);

        //group signal by SSID
        var signalsGroupBySSID = _.groupBy(signals, function (signal) {
            return signal['ssid'];
        });
        var ssidList = _.keys(signalsGroupBySSID);

        //group signal by (SSID + BSSID)
        var signalsGroupBySSIDAndMac = _.groupBy(signals, function (signal) {
            return signal['ssid'] + SPLITTER + signal['bssid'];
        });
        var signalKeyList = _.keys(signalsGroupBySSIDAndMac);

        //group signal by channel
        var signalsGroupByChannel = _.groupBy(signals, function (signal) {
            return signal['channel'];
        });

        if (channelList.length === 0) {
            channelList = _.sortBy(_.keys(signalsGroupByChannel), function (channel) {
                return parseInt(channel);
            });
        }


        var interpolatedChannels = {};
        var annotations = [];
        var mainSSIDObj = this.getMainSsidObj();
        // var radio = this.getRadioObj();
        var radio = this.getRadioSummaryObj()
        // if (isRadioData()) {
        //     radio[wlanOperatingChannelBandwidthStore] = "80MHz";
        // } else {
        //     radio[wlanOperatingChannelBandwidthStore] = "20MHz";
        // }

        //radio.bandwidth = bandwidthList[0];
        bandwidthList = this.getBusynessBandwidthList(radio, busynessesGroupByChannel, channelList, bandwidthList);

        this.prepareMainSSIDLines(interpolatedChannels, annotations, mainSSIDObj, radio, signalKeyList, bandwidthList);
        this.prepareBusynessLines(interpolatedChannels, annotations, mainSSIDObj, radio, busynessesGroupByChannel, channelList, signalKeyList, bandwidthList);
        this.prepareSignalLines(interpolatedChannels, annotations, mainSSIDObj, signalsGroupBySSID, ssidList, signalKeyList, bandwidthList);

        var addEmpty = function (channel) {
            if (!_.has(interpolatedChannels, channel)) {
                if (radioStr == '5G') {
                    if (_.includes(radio5ChannelList, channel)) {
                        interpolatedChannels[channel] = getBlankEntry(mainSSIDObj.id, signalKeyList, bandwidthList);
                    }
                } else if (radioStr == '2.4G') {
                    interpolatedChannels[channel] = getBlankEntry(mainSSIDObj.id, signalKeyList, bandwidthList);
                } else if (radioStr == '6G') {
                    if (_.includes(radio6ChannelList, channel)) {
                        interpolatedChannels[channel] = getBlankEntry(mainSSIDObj.id, signalKeyList, bandwidthList);
                    }
                } else {
                    interpolatedChannels[channel] = getBlankEntry(mainSSIDObj.id, signalKeyList, bandwidthList);
                }
            }
        };

        var addSupplementChannels = function () {
            var currentTab = sessionStorage.getItem('currentTab')
            if (currentTab === keyUnifiedWifiTabName) {
                return;
            }
            if (currentTab === keyWifiCurrentTabForTwo) {
                _.each(_.range(-1, 16), function (channel) {
                    addEmpty(channel);
                });
            } else if (currentTab === 'six') {
                // _.each(_.range(-1, 16), function (channel) {
                //     addEmpty(channel);
                // });
                _.each(_.range(30, 86), function (channel) {
                    addEmpty(channel);
                });
                _.each(_.range(100, 216), function (channel) {
                    addEmpty(channel);
                });
                // _.each(_.range(, 180), function (channel) {
                //     addEmpty(channel);
                // });
            } else {
                _.each(_.range(34, 67), function (channel) {
                    addEmpty(channel);
                });
                _.each(_.range(98, 147), function (channel) {
                    addEmpty(channel);
                });
                _.each(_.range(147, 180), function (channel) {
                    addEmpty(channel);
                });
            }
        };

        addSupplementChannels();

        var siteScanObj = {};
        siteScanObj['interpolatedChannels'] = interpolatedChannels;
        siteScanObj['channelList'] = channelList;
        siteScanObj['bandwidthList'] = bandwidthList;
        siteScanObj['ssidList'] = ssidList;
        siteScanObj['signalKeyList'] = signalKeyList;
        siteScanObj['annotations'] = annotations;
        siteScanObj['signals'] = signals;
        siteScanObj['busynesses'] = busynesses;
        siteScanObj['busynessesGroupByBandwidth'] = busynessesGroupByBandwidth;
        siteScanObj['channelListAll'] = channelListAll;
        siteScanObj["mainSSID"] = mainSSIDObj;

        sessionStorage.setItem(keyWifidiagSiteScanObj, JSON.stringify(siteScanObj))
        return siteScanObj;
    };

}

function isRadioData() {
    var currentTab = sessionStorage.getItem('currentTab');
    if (currentTab == 'two') {
        currentTab = '2.4G'
    } else if (currentTab == 'five') {
        currentTab = '5G'
    } else {
        currentTab = '6G'
    }
    return currentTab;
};

function getBlankEntry(mainSsidId: any, signalKeyList: any, bandwidthList: any) {
    var channel = {};
    channel[mainSsidId] = BLANK;
    _.each(signalKeyList, function (key) {
        channel[key] = BLANK;
    });
    _.each(bandwidthList, function (bandwidth) {
        channel[bandwidth] = BLANK;
    });
    return channel;
}



