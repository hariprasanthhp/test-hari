// var mock = false;
// var bandwidthList;
var radioPathGiga = "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";
// var radioPathPref = "Device.WiFi.Radio.";
// var hostPathPref = "InternetGatewayDevice.LANDevice.";
var radioPath = 'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.',
  wlanPath = 'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.',
  hostPath,
  devicePath,
  metricsPath,
  wlanOperatingChannelBandwidthParamName = "OperatingChannelBandwidth",
  wlanOperatingChannelBandwidthStore = 'X_000631_OperatingChannelBandwidth';
//wlanOperatingChannelBandwidthStore = wlanOperatingChannelBandwidthParamName;
// var autoScaleFlagInSess = "auto.scale.button.checked";
// var radioEnableParamName = "RadioEnabled",
//     wlanEnableParamName = "Enable",
//     wlanChannelParamName = "Channel",
//     wlanAutoChannelEnableParamName = "AutoChannelEnable",
//     wlanSSIDParamName = "SSID",
//     wlanStandardParamName = "Standard",
//     wlanTotalPacketsSentParamName = "TotalPacketsSent",
//     wlanTotalPacketsReceivedParamName = "TotalPacketsReceived",
//     wlanOperatingChannelBandwidthParamName = "OperatingChannelBandwidth",
//     wlanEnableDfsChannelsParamName = "EnableDfsChannels",
//     wlanChannelUtilizationParamName = "ChannelUtilization",
//     wlanChannelInterferenceTimeParamName = "ChannelInterferenceTime",
//     wlanAssociatedDeviceParamName = "AssociatedDevice";
// var deviceSSIDParamName = "SSID",
//     deviceSignalStrengthParamName = "SignalStrength",
//     deviceModeParamName = "Mode",
//     deviceUptimeParamName = "Uptime",
//     deviceIconParamName = "Icon",
//     deviceHostNameParamName = "HostName",
//     deviceHostNameAliasParamName = "HostNameAlias",
//     deviceLastDataDownlinkRateParamName = "LastDataDownlinkRate",
//     deviceLastDataUplinkRateParamName = "LastDataUplinkRate",
//     devicePacketsDroppedDownstreamParamName = "PacketsDroppedDownstream",
//     deviceMetricsParamName = "Metrics",
//     deviceMacAddressParamName = "AssociatedDeviceMACAddress",
//     deviceIPAddressParamName = "IPAddress";

// var hostMacAddressParamName = "MACAddress";

// var radioEnableStore = radioEnableParamName,
//     wlanChannelStore = wlanChannelParamName,
//     wlanAutoChannelEnableStore = wlanAutoChannelEnableParamName,
//     wlanSSIDStore = wlanSSIDParamName,
//     wlanStandardStore = wlanStandardParamName,
//     wlanTotalPacketsSentStore = wlanTotalPacketsSentParamName,
//     wlanTotalPacketsReceivedStore = wlanTotalPacketsReceivedParamName,
//     wlanOperatingChannelBandwidthStore = wlanOperatingChannelBandwidthParamName,
//     wlanEnableDfsChannelsStore = wlanEnableDfsChannelsParamName,
//     wlanChannelUtilizationStore = wlanChannelUtilizationParamName,
//     wlanChannelInterferenceTimeStore = wlanChannelInterferenceTimeParamName,
//     wlanAssociatedDeviceStore = wlanAssociatedDeviceParamName,
//     wlanAssociatedDevicePathStore;

// var deviceSSIDStore = deviceSSIDParamName,
//     deviceSignalStrengthStore = deviceSignalStrengthParamName,
//     deviceModeStore = deviceModeParamName,
//     deviceUptimeStore = deviceUptimeParamName,
//     deviceIconStore = deviceIconParamName,
//     deviceHostNameStore = deviceHostNameParamName,
//     deviceHostNameAliasStore = deviceHostNameAliasParamName,
//     deviceLastDataDownlinkRateStore = deviceLastDataDownlinkRateParamName,
//     deviceLastDataUplinkRateStore = deviceLastDataUplinkRateParamName,
//     deviceMacAddressStore = deviceMacAddressParamName,
//     deviceIPAddressStore = deviceIPAddressParamName,
//     deviceMetricsStore = deviceMetricsParamName;

// var metricsSignalStrengthStore = deviceSignalStrengthParamName,
//     metricsModeStore = deviceModeParamName,
//     metricsLastDataDownlinkRateStore = deviceLastDataDownlinkRateParamName,
//     metricsLastDataUplinkRateStore = deviceLastDataUplinkRateParamName,
//     metricsPacketsDroppedDownstreamStore = devicePacketsDroppedDownstreamParamName;

// var hostSignalStrengthStore = deviceSignalStrengthParamName,
//     hostLastDataDownlinkRateStore = deviceLastDataDownlinkRateParamName,
//     hostLastDataUplinkRateStore = deviceLastDataUplinkRateParamName,
//     hostModeStore = deviceModeParamName,
//     hostIconStore = deviceIconParamName,
//     hostHostNameStore = deviceHostNameParamName,
//     hostHostNameAliasStore = deviceHostNameAliasParamName,
//     hostMacAddressStore = hostMacAddressParamName;

const keyWifidiagData = 'wifidiag.data';
// const keyWifidiagHosts = 'wifidiag.hosts';
// const keyWifidiagDevices='wifidiag.devices';
// const keyWifidiagDevicesScore = 'wifidiag.devicesScore';
// const keyWifidiagDevicesMinimumScore='wifidiag.minimunScore';
// const keyWifidiagDataError = 'wifidiag.error';
// const keyWifidiagLoading = 'wifidiag.loading';
// const keyWifidiagCurrentTab = 'wifidiag.current-tab';
const keyWifidiagSiteScan = 'wifidiag.sitescan';
// const keyWifidiagSiteScanObj = 'wifidiag.sitescan.obj';
// const keyWifiCurrentTabForTwo = 'two';
// const keyWifiCurrentTabForFive = 'five';
// const keyWifiCurrentTabForDevices = 'devices';
// const keyWifiCurrentTabForSiteScan = 'sitescan';
// const keyWifiCurrentTabForChangeLog = 'changelog';
// const keyWifiCurrentTabForPmHistorical = 'pm_historical';
// const keyWifidiagChangeLog = 'wifidiag.channelchangelog';
// const keyWifidiagSubTabError = 'wifidiag.subtab.error';
// const keyWifidiagSiteScanLoadingMsg = "wifidiag.sitescan.loading.message";
// const keyUnifiedWiFiData = "wifidiag.unifiedWifi.data";
// const keyUnifiedWifiError = "wifidiag.unifiedWifi.error";
// const keyUnifiedWifiTabName = "unifiedWifi";
// // TODO : new map implementation to set device-capability key
// const KEY_MAP_DEVICE = "wifidiag.mapdevce";
// const donutAirtimeAnalysisLoading = 'wifidiag.map.airtimeAnalysis.loading';
// const donutAirtimeAnalysisError = 'wifidiag.map.airtimeAnalysis.error';
// const donutAirtimeAnalysisChannelAbnormal = 'wifidiag.map.airtimeAnalysis.channelAbnormal';

// const keyRadioChartData = "wifidiag.radiochart.data";

// // selected WiFi Client
// const keySteeringEvents = "wifidiag.unifiedWifi.steeringEvents";
// const mapRadioChartParam = "wifidiag.airtime.chart.param";
// //const Const = Support.Const;//aswin
// // indicates if steering event loading is underway
// //keyLoadingSteeringEvents = "wifidiag.unifiedWifi.steeringEvents.loading";//GLOBAL

// // indicates when the steering events must be loaded
// //keyLoadSteeringEvents = "wifidiag.unifiedWifi.steeringEvents.load";//GLOBAL



var initParams = function (modelName, dataModelName) {
  radioPathGiga = Utils.get24gRadioPathCalix();
  radioPath = Utils.get24gRadioPath();
  wlanPath = Utils.get24gWlanPath()[0];

  if (isRadioFive()) {
    radioPathGiga = Utils.get5gRadioPathCalix();
    radioPath = Utils.get5gRadioPath();
    wlanPath = Utils.get5gWlanPath()[0];
  }
  var dataModel = Utils.getDataModel(dataModelName);
  hostPath = dataModel.getLanHostsObjectPaths(modelName, dataModelName) + "Host.1.";

  radioEnableStore = Utils.isRadioEnabledSupported() ?
    Utils.getParameterRealAttributeBS(radioPath + radioEnableParamName) : Utils.getParameterRealAttributeBS(wlanPath + wlanEnableParamName);
  wlanChannelStore = Utils.getParameterRealAttributeBS(radioPath + wlanChannelParamName);
  wlanAutoChannelEnableStore = Utils.getParameterRealAttributeBS(radioPath + wlanAutoChannelEnableParamName);
  wlanSSIDStore = Utils.getParameterRealAttributeBS(wlanPath + wlanSSIDParamName);
  wlanStandardStore = Utils.getParameterRealAttributeBS(radioPath + wlanStandardParamName);
  wlanTotalPacketsSentStore = Utils.getParameterRealAttributeBS(radioPath + wlanTotalPacketsSentParamName);
  wlanTotalPacketsReceivedStore = Utils.F(radioPath + wlanTotalPacketsReceivedParamName);
  wlanOperatingChannelBandwidthStore = Utils.getParameterRealAttributeBS(radioPath + wlanOperatingChannelBandwidthParamName);
  wlanEnableDfsChannelsStore = Utils.getParameterRealAttributeBS(radioPath + wlanEnableDfsChannelsParamName);
  wlanChannelUtilizationStore = Utils.getParameterRealAttributeBS(radioPath + wlanChannelUtilizationParamName);
  wlanChannelInterferenceTimeStore = Utils.getParameterRealAttributeBS(radioPath + wlanChannelInterferenceTimeParamName);
  wlanAssociatedDeviceStore = Utils.getParameterRealAttributeBS(wlanPath + wlanAssociatedDeviceParamName);
  wlanAssociatedDevicePathStore = Utils.getParameterRealPathBS(wlanPath + wlanAssociatedDeviceParamName);
  devicePath = wlanAssociatedDevicePathStore + ".1.";
  deviceSSIDStore = Utils.getParameterRealAttributeBS(devicePath + deviceSSIDParamName);
  deviceSignalStrengthStore = Utils.getParameterRealAttributeBS(devicePath + deviceSignalStrengthParamName);
  deviceModeStore = Utils.getParameterRealAttributeBS(devicePath + deviceModeParamName);
  deviceUptimeStore = Utils.getParameterRealAttributeBS(devicePath + deviceUptimeParamName);
  deviceIconStore = Utils.getParameterRealAttributeBS(devicePath + deviceIconParamName);
  deviceHostNameStore = Utils.getParameterRealAttributeBS(devicePath + deviceHostNameParamName);
  deviceHostNameAliasStore = Utils.getParameterRealAttributeBS(devicePath + deviceHostNameAliasParamName);
  deviceLastDataDownlinkRateStore = Utils.getParameterRealAttributeBS(devicePath + deviceLastDataDownlinkRateParamName);
  deviceLastDataUplinkRateStore = Utils.getParameterRealAttributeBS(devicePath + deviceLastDataUplinkRateParamName);
  deviceMacAddressStore = Utils.getParameterRealAttributeBS(wlanPath + dataModel.FIELD_NAME_ASSOCIATED_DEVICE_MAC_ADDRESS);
  deviceIPAddressStore = Utils.getParameterRealAttributeBS(devicePath + deviceIPAddressParamName);
  deviceMetricsStore = Utils.getParameterRealAttributeBS(devicePath + deviceMetricsParamName);
  metricsPath = devicePath + deviceMetricsStore + ".";
  metricsModeStore = Utils.getParameterRealAttributeBS(metricsPath + deviceModeParamName);
  metricsSignalStrengthStore = Utils.getParameterRealAttributeBS(metricsPath + deviceSignalStrengthParamName);
  metricsLastDataDownlinkRateStore = Utils.getParameterRealAttributeBS(metricsPath + deviceLastDataDownlinkRateParamName);
  metricsLastDataUplinkRateStore = Utils.getParameterRealAttributeBS(metricsPath + deviceLastDataUplinkRateParamName);
  metricsPacketsDroppedDownstreamStore = Utils.getParameterRealAttributeBS(metricsPath + devicePacketsDroppedDownstreamParamName);
  hostSignalStrengthStore = Utils.getParameterRealAttributeBS(hostPath + deviceSignalStrengthParamName);
  hostLastDataDownlinkRateStore = Utils.getParameterRealAttributeBS(hostPath + deviceLastDataDownlinkRateParamName);
  hostLastDataUplinkRateStore = Utils.getParameterRealAttributeBS(hostPath + deviceLastDataUplinkRateParamName);
  hostModeStore = Utils.getParameterRealAttributeBS(hostPath + deviceModeParamName);
  hostIconStore = Utils.getParameterRealAttributeBS(hostPath + deviceIconParamName);
  hostHostNameStore = Utils.getParameterRealAttributeBS(hostPath + deviceHostNameParamName);
  hostHostNameAliasStore = Utils.getParameterRealAttributeBS(hostPath + deviceHostNameAliasParamName);
  hostMacAddressStore = dataModel.FIELD_NAME_LAN_MAC_ADDRESS;

  bandwidthList = Radio.standardMap;
};

// var dealError = function (error, type) {  
//   var errType = false;
//   Session.set(keyWifidiagDataError, error.reason);
//   if (type === 'getRadioChartData') {
// 	  if(error.reason == "Not Found Error") {
// 		  errType = 'warning';
// 		  Session.set(keyWifidiagDataError, Support.i18n('airTimeNoData'));
// 	  } else if (error.reason == "Expired or Invalid Token") {
// 		  errType = 'warning';
// 		  Session.set(keyWifidiagDataError, error.reason);
// 	  } else {
// 		 Session.set(keyWifidiagDataError, Support.i18n('airTimeError')); 
// 	  }		
// 	console.log(type,'Error', error);
//   }
//   var errorDialog = document.getElementById("errorDialog");
//   if (type === 'getRadioChartData') {
// 	  if(errType) {
// 		  $(errorDialog).css('display', 'block');
// 		  setTimeout(function(){
// 			  $(errorDialog).removeClass('alert-danger').addClass('alert-warning');
// 			  $(errorDialog).find('button').removeClass('btn-danger').addClass('btn-warning');
// 		  },0);
// 	  }
//   }
//   $(errorDialog).css('display', 'block');
//   Session.set(keyWifidiagLoading, false);
// };






// //var showWarning = new Blaze.ReactiveVar(false);

// // var getChannelUsages = function() {
// //   var radio = getRadioObj(),
// //       utilization = 0,
// //       interference = 0,
// //       free = 0;

// //   if (_.has(radio, 'ChannelUtilization')) {
// //     utilization = parseInt(radio.ChannelUtilization);
// //   }
// //   if (_.has(radio, 'ChannelInterferenceTime')) {
// //     interference = parseInt(radio.ChannelInterferenceTime);
// //   }
// //   if (_.has(radio, 'ChannelFreeTime')) {
// //     free = parseInt(radio.ChannelFreeTime);
// //   } else {
// //     free = 100 - utilization - interference;
// //   }

// //   if (free === 0 && utilization === 0 && interference === 0) {
// //     free = 100;
// //   }

// //   return {
// //     free: free,
// //     utilization: utilization,
// //     interference: interference
// //   };
// // };

// // var getInitBandwidthValues = function() {
// //   //If standard display name is specified in metafiles, then use it for display
// //   //otherwise use default display name
// //   var displayText = Radio.standardDisplayTextFromMetaFile.call(this, this[wlanStandardStore], isRadioFive());
// //   if (!displayText) {
// //     if (!!this[wlanStandardStore]) {
// //       var standard = this[wlanStandardStore].replace(/,/g, '');
// //       if ((standard === 'n' || standard === 'ac') && isRadioFive()) {
// //         return bandwidthList[standard + '5'];
// //       }
// //       return bandwidthList[standard];
// //     }
// //   }
// //   return displayText;
// // };

// // var getInitBandwidthValuesForDevice = function() {
// //   if (this.DeviceStandard) {
// //     if (this.DeviceStandard.startsWith('802.11')) {
// //       return this.DeviceStandard;
// //     } else {
// //       return '802.11' + this.DeviceStandard;
// //     }
// //   } else {
// //     return '';
// //   }
// // };
// var Utils = {};
// Utils.getValueByPath = function(object, path) {
//   var value = object,
//     pathArray, i, k, match, re;

//   if (!_.isString(path)) return object;
//   pathArray = path.split('.');

//   if (value == null) return null;

//   for (i = 0; i < pathArray.length; i++) {
//     if (pathArray[i].length == 0) continue;
//     match = /^\/(.*)\/$/.exec(pathArray[i]);
//     if (match == null) {
//       // normal path
//       value = value[pathArray[i]];
//     } else {
//       // regexp, e.g. /xxx/
//       re = new RegExp(match[1]);
//       var mk = null;
//       for (k in value) {
//         if (re.test(k)) {
//           mk = k;
//           break;
//         }
//       }
//       if (mk == null) value = null;
//       else value = value[mk];
//     }
//     if (value == null) break;
//   }

//   return value;
// };
// Utils.isParameterSupportedBS = function(path, modelName, dataModelName, swversion) {
//   if (modelName == null) {
//     var di = Utils.getDeviceInfo();
//     if (!di) return false;
//     modelName = di.modelName;
//     swversion = di.softwareVersion;
//     dataModelName = di.dataModelName;
//   }
//   return Utils.isParameterSupportedInner(path, modelName, swversion, Utils.getFeatureConfigurationBS(modelName, dataModelName, swversion));
// };
// Utils.isParameterSupportedInner = function(param, model, version, configuration) {
//   if (configuration && configuration.parameterSupported) {
//     for (var idx = 0; idx < configuration.parameterSupported.length; idx++) {
//       var parameterObj = configuration.parameterSupported[idx];
//       var parameterPattern = parameterObj.name;
//       if (parameterPattern) {
//         if (new RegExp(parameterPattern).test(param)) {
//           if (parameterObj.minSwVersion && version) {
//             return (Utils.compareVersion(version, parameterObj.minSwVersion) >= 0);
//           } else {
//             return true;
//           }
//         }
//       }
//     }
//   } else {
//     dd("isParameterSupported ... Cannot find feature configuration for " + model);
//   }
//   return false;
// };
// Utils.getFeatureConfigurationBS = function(pModel, dataModelName, swVersion) {
//   var configArr = Session.get(featureConfigurationsSessionKey);
//   if (pModel == null) {
//     Logger.error("model name cannot be null!");
//     return;
//   }

//   var defaultFeatureConfig, dftTR181Cfg;
//   var isTR181 = Utils.isTR181(dataModelName);
//   var firstModelMatchedCfg = null;

//   if (configArr && configArr.length && configArr.length > 0) {
//     for (var idx = 0; idx < configArr.length; idx++) {
//       var featureConfig = configArr[idx];

//       if (featureConfig.models == null) {
//         continue;
//       }

//       if (featureConfig.models == "default") {
//         defaultFeatureConfig = featureConfig;
//         continue;
//       }

//       if (featureConfig.models == "default-tr-181") {
//         dftTR181Cfg = featureConfig;
//         continue;
//       }


//       for (var ii = 0; ii < featureConfig.models.length; ii++) {
//         var modelNameObj = featureConfig.models[ii];
//         var swVersions = featureConfig.swVersions;
//         var isCurTR181 = Utils.isTR181(featureConfig.dataModelName);

//         if (isTR181 === isCurTR181) {
//           if ("string" == typeof modelNameObj) {
//             if (pModel.toUpperCase() == modelNameObj.toUpperCase()) {
//               if (swVersions != null) {
//                 if (swVersion != null && swVersions.indexOf(swVersion) >= 0) {
//                   return featureConfig;
//                 }
//               } else {
//                 firstModelMatchedCfg = featureConfig;
//               }
//             }
//           } else {
//             if (modelNameObj.regex && pModel.match(modelNameObj.regex)) {
//               if (swVersions != null) {
//                 if (swVersion != null && swVersion.indexOf(version) >= 0) {
//                   return featureConfig;
//                 }
//               } else {
//                 firstModelMatchedCfg = featureConfig;
//               }
//             }
//           }
//         }

//       }
//     }
//   }

//   if (firstModelMatchedCfg != null) {
//     return firstModelMatchedCfg;
//   }
//   if (Utils.isTR181(dataModelName)) {
//     return dftTR181Cfg;
//   }
//   return defaultFeatureConfig;
// };

// var getRadioObj = function() {
//   //var data = Session.get(keyWifidiagData);
//   var data = JSON.parse(localStorage.getItem('WifidiagSiteScan'));
//   var mergedObj, radioGigaObj, radioObj, wlanObj;

//   if (mock) {
//     data = wifimock.wlans;
//   }

//   wlanObj = Utils.getValueByPath(data, wlanPath);
//   radioGigaObj = Utils.getValueByPath(data, radioPathGiga);
//   radioObj = Utils.getValueByPath(data, radioPath);

//   mergedObj = _.extend(wlanObj, radioGigaObj, radioObj) || {};
//   if (radioGigaObj && radioGigaObj.ChannelUtilization) {
//     mergedObj.ChannelUtilization = parseInt(radioGigaObj.ChannelUtilization) / 10;
//   } else if (radioObj && radioObj[wlanChannelUtilizationStore]) {
//     mergedObj.ChannelUtilization = parseInt(radioObj[wlanChannelUtilizationStore]);
//   } else if (wlanObj && wlanObj[wlanChannelUtilizationStore]) {
//     mergedObj.ChannelUtilization = parseInt(wlanObj[wlanChannelUtilizationStore]);
//   }
//   if (radioGigaObj && radioGigaObj.ChannelInterferenceTime) {
//     mergedObj.ChannelInterferenceTime = parseInt(radioGigaObj.ChannelInterferenceTime) / 10;
//   } else if (radioObj && radioObj[wlanChannelInterferenceTimeStore]) {
//     mergedObj.ChannelInterferenceTime = parseInt(radioObj[wlanChannelInterferenceTimeStore]);
//   } else if (wlanObj && wlanObj[wlanChannelInterferenceTimeStore]) {
//     mergedObj.ChannelInterferenceTime = parseInt(wlanObj[wlanChannelInterferenceTimeStore]);
//   }
//   if (mergedObj.ChannelUtilization && mergedObj.ChannelInterferenceTime) {
//     mergedObj.ChannelFreeTime = 100 - mergedObj.ChannelUtilization - mergedObj.ChannelInterferenceTime
//   }

//   var packetsSent = 0,
//       packetsReceived = 0;
//   if (radioGigaObj && radioGigaObj.PacketsTransmittedDownstream) {
//     packetsSent = radioGigaObj.PacketsTransmittedDownstream;
//     packetsReceived = radioGigaObj.PacketsTransmittedUpstream;
//   } else if (radioObj && radioObj.PacketsTransmittedDownstream) {
//     packetsSent = radioObj[wlanTotalPacketsSentStore];
//     packetsReceived = radioObj[wlanTotalPacketsReceivedStore];
//   } else {
//     var ssids = getSsids();
//     _.each(ssids, function(ssid) {
//       packetsSent += parseInt(ssid[wlanTotalPacketsSentStore]);
//       packetsReceived += parseInt(ssid[wlanTotalPacketsReceivedStore]);
//     });
//   }
//   return _.extend(mergedObj, {
//     'packetsSent': packetsSent,
//     'packetsReceived': packetsReceived
//   });
// };

// var getSsids = function() {
//   var currentTab = "two";
//   var data = JSON.parse(localStorage.getItem('WifidiagSiteScan'));

//   if (mock) {
//     data = wifimock.wlans;
//   }

//   var ssid, ssids = [];
//   var add2SsidArray = function(wlanPaths) {
//     _.each(wlanPaths, function (path, k) {
//       ssid = Utils.getValueByPath(data, path);
//       if (ssid) {
//         ssids.push(ssid);
//       }
//     });
//   };
//   var l2IfaceSupported = isParameterSupportedBS("InternetGatewayDevice.LANDevice.1.Hosts.Host.1.Layer2Interface");
//   var IfaceTypwSupported = isParameterSupportedBS("InternetGatewayDevice.LANDevice.1.Hosts.Host.1.InterfaceType");
//   var ssidPathFilter = false;
//   if (l2IfaceSupported && IfaceTypwSupported) {
//     var IfaceTypeWireless = "802.11";
//     var IfaceTypeWirelessCfg = Utils.getParameterAttributeBS("InternetGatewayDevice.LANDevice.1.Hosts.Host.1.InterfaceType", "type");
//     if (IfaceTypeWirelessCfg && IfaceTypeWirelessCfg.wireless) {
//       IfaceTypeWireless = IfaceTypeWirelessCfg.wireless;
//     }
//     ssidPathFilter = [];
//     var lanDevices = Session.get(keyWifidiagHosts);
//     var key;
//     for (key in lanDevices) {
//       var device = lanDevices[key];
//       if (device.InterfaceType == IfaceTypeWireless) {
//         ssidPathFilter.push(device.Layer2Interface);
//       }
//     }
//   }
//   var ssidArr = false;
//   if (currentTab === keyWifiCurrentTabForTwo) {
//     ssidArr = Utils.get24gWlanPath();
//   } else {
//     ssidArr = Utils.get5gWlanPath();
//   }
//   if (ssidPathFilter) {
//     var arr = [];
//     var k1;
//     for (k1 in ssidArr) {
//       var ssid = ssidArr[k1];
//       var matched = false;
//       var k2;
//       for (k2 in ssidPathFilter) {
//         var pattern  = ssidPathFilter[k2];
//         if (pattern && pattern.length > 0) {
//           pattern += ".";
//           if (pattern == ssid) {
//             matched = true;
//             break;
//           }
//         }
//       }
//       if (matched) {
//         arr.push(ssid);
//       }
//     }
//     ssidArr = arr;
//   }
//   add2SsidArray(ssidArr);
//   return ssids;
// };

// var findMatchedDevice = function(device) {
//   var lanDevices = Session.get(keyWifidiagHosts);
//   var matchedDevice = _.find(lanDevices, function(lanDevice) {
//     return (lanDevice[hostMacAddressStore].toLowerCase() === device[deviceMacAddressStore].toLowerCase() && lanDevice.Active === "true")
//   });
//   return matchedDevice;
// };

// var getDevices = function() {
//   var ssids = getSsids(),
//       devices = [],
//       matchedDevice;
//   var di = Utils.getDeviceInfo();
//   _.each(ssids, function(ssid) {
//     if (ssid[wlanAssociatedDeviceStore]) {
//       _.each(ssid[wlanAssociatedDeviceStore], function(device) {

//         matchedDevice = findMatchedDevice(device);
//         // Please don't add the condition that matchedDevice is not null here
//         // Even if there's no device in host, it still should display the device
//         device = _.extend(device, matchedDevice);
//         device.SSID = device[deviceSSIDStore] || ssid[wlanSSIDStore];
//         device.Uptime = device[deviceUptimeStore];
//         device.Icon = device[deviceIconStore] || device[hostIconStore];
//         device.HostName = device[deviceHostNameStore] || device[hostHostNameStore];
//         device.HostNameAlias = device[deviceHostNameAliasStore] || device[hostHostNameAliasStore]; //836GE --> HostName_Alias

//         device.DeviceStandard = device[deviceModeStore] || device[hostModeStore];
//         device.SignalStrength = device[deviceSignalStrengthStore] || device[hostSignalStrengthStore];
//         device.LastDataDownlinkRate = Math.floor(parseInt(device[deviceLastDataDownlinkRateStore] || device[hostLastDataDownlinkRateStore]) / 1000);
//         device.LastDataUplinkRate = Math.floor(parseInt(device[deviceLastDataUplinkRateStore] || device[hostLastDataUplinkRateStore]) / 1000);

//         if (device[deviceMetricsStore]) {
//           var deviceMetrics = device[deviceMetricsStore];
//           if (_.has(deviceMetrics, metricsModeStore)) {
//             device.DeviceStandard = deviceMetrics[metricsModeStore];
//           }
//           if (!device.SignalStrength && _.has(deviceMetrics, metricsSignalStrengthStore)) {
//             device.SignalStrength = deviceMetrics[metricsSignalStrengthStore];
//           }
//           if (_.has(deviceMetrics, metricsLastDataDownlinkRateStore)) {
//             device.LastDataDownlinkRate = Math.floor(parseInt(deviceMetrics[metricsLastDataDownlinkRateStore]) / 1000);
//           }
//           if (_.has(deviceMetrics, metricsLastDataUplinkRateStore)) {
//             device.LastDataUplinkRate = Math.floor(parseInt(deviceMetrics[metricsLastDataUplinkRateStore]) / 1000);
//           }
//           if (_.has(deviceMetrics, metricsPacketsDroppedDownstreamStore)) {
//             device.PacketsDroppedDownstream = deviceMetrics[metricsPacketsDroppedDownstreamStore];
//           }
//         }

//         devices.push(device);
//       });
//     }
//   });

//   return devices;
// };

// var signalWeak = function() {
//   var signalStrength = parseInt(this['SignalStrength']);
//   return (signalStrength < (WifiThresholds.SignalOne));
// };

// var downRateLow = function() {
//   var downRate = this['LastDataDownlinkRate'];
//   var standard = this['DeviceStandard'];
//   var threshholdDR = WifiThresholds.DownRate['a'];

//   if (WifiThresholds.DownRate[standard]) {
//     threshholdDR = WifiThresholds.DownRate[standard];
//   }
//   if (this.Icon === "5") { // STB
//     threshholdDR = WifiThresholds.DownRate.stb3;
//   }
//   return downRate < threshholdDR;
// };

// var legacyDevice = function() {
//   var isLegacyDevice = false;
//   var standard = this['DeviceStandard'];
//   if (standard != null) {
//     standard = standard.toLowerCase();
//     if (standard === 'a' || standard === 'b' || standard === 'g') {
//       isLegacyDevice = true;
//     }
//   }
//   return isLegacyDevice;
// };

// var deviceSignalWeak = function(d) {
//   return signalWeak.call(d) && downRateLow.call(d);
// };

// var deviceDSLow = function(d) {
//   return downRateLow.call(d);
// };

// var deviceLegacy = function(d) {
//   return legacyDevice.call(d);
// };

// var isRadioFive = function() {
//   return false
// };

// var isUnifiedWifiTab = function() {
//   return Session.get(keyWifidiagCurrentTab) === keyUnifiedWifiTabName;
// };

// var autoModeDisable = function() {
//   var radio_obj = getRadioObj();
//   return radio_obj[wlanAutoChannelEnableStore] !== 'true';
// };

// var dfsModeDisable = function() {
//   var radio_obj = getRadioObj();
//   return (Session.get(keyWifidiagCurrentTab) === keyWifiCurrentTabForFive) && (radio_obj[wlanEnableDfsChannelsStore] !== 'true');
// };

// var isIptvClient = function(device) {
//   return device.Icon === '5';
// };

// var isHighDropPackets = function(device) {
//   var result = false;
//   if (device[deviceMetricsStore]) {
//     var totalPacketsReceived = getRadioObj().packetsReceived;
//     result = parseInt(device[deviceMetricsStore][metricsPacketsDroppedDownstreamStore]) / parseInt(totalPacketsReceived) > WifiThresholds.HighDropRate;
//   }
//   return result;
// };

// var iptvHighDropPackets = function(device) {
//   return (isIptvClient(device) && isHighDropPackets(device));
// };

// var isPixelization = function(device) {
//   return device.LastDataDownlinkRate < WifiThresholds.DownRate.stb3;
// };

// var iptvPixelization = function(device) {
//   return (isIptvClient(device) && isPixelization(device));
// };

// var getStbDevices = function() {
//   var devices = getDevices();
//   var stbs = [];
//   _.each(devices, function(device) {
//     if (isIptvClient(device)) {
//       stbs.push(device);
//     }
//   });
//   return stbs;
// };

// var highUtilization = function(device) {
//   var result = false;
//   if (device[deviceMetricsStore]) {
//     result = parseInt(device[deviceMetricsStore].ChannelUtilization) / 10 > WifiThresholds.UtilizationMaxPerSTA;
//   }
//   return result;
// };

// var isDeviceUtilizationSupported = function() {
//   return Utils.isFeatureSupportedBS("featureSupported.associatedDevice.legacyCheck.utilization");
// };

// var highUtilizationLegacy = function(device) {
//   return (deviceLegacy(device) && isDeviceUtilizationSupported() && highUtilization(device)) ||
//       (deviceLegacy(device) && !isDeviceUtilizationSupported());
// };

// var isParamOn = function(obj, path) {
//   if (obj == null) {
//     return false;
//   }
//   var paramValue = Utils.getValueByPath(obj, path);
//   return paramValue === true || paramValue === 'true' || paramValue === '1';
// };

// var isRadioOn = function() {
//   var paramValue, data = Session.get(keyWifidiagData);

//   if (mock) {
//     data = wifimock.wlans;
//   }

//   return isParamOn(data, radioPath + radioEnableStore);
// };

// var isDfsSupported = function() {
//   return Utils.isParameterSupportedBS(radioPath + Radio.dfsEnableParamName)
// };

// var isDevicesSupported = function() {
//   return Utils.isFeatureSupportedBS("featureSupported.associatedDevice");
// };

// var isDeviceSupportWiFiScore=function() {
//   return Utils.isFeatureSupportedBS("featureSupported.associatedDevice.wifiScore");
// };

// var isSiteScanSupported = function() {
//   return Utils.isFeatureSupportedBS("featureSupported.siteScan");
// };

// var isBusynessSupported = function () {
//   return Utils.isFeatureSupportedBS("featureSupported.siteScan.busyness");
// };

// var isWifiPmSupported = function() {
//   return Utils.isFeatureSupportedBS("featureSupported.wifiPmBin") && Session.get(keyShowWifiPMChartInSess);
// };
// var isWifiPmClientSupported = function() {
//   return Session.get(keyShowWifiPMClientChartsInSess);
// };


// var sharedHelpers = {
//   autoModeDisable_: autoModeDisable,
//   dfsModeDisable_: dfsModeDisable,
//   isRadioFive_: isRadioFive
// };


// var getReason = function(scoreInUi,scoreObject) {
//   if (!scoreObject || !_.isNumber(scoreInUi)) {
//     console.log('Illegal Score returned by Wi-Fi Score API!');
//     return "Illegal Score returned by Wi-Fi Score API!";//todo localization
//   }
//   if (!_.has(scoreObject, "dssdr")
//     || !_.has(scoreObject, "ussdr")
//     || !_.has(scoreObject, "dpp")
//     || !_.has(scoreObject, 'qualityscore')) {
//     return 'N/A';
//   }
//   var dssdr = scoreObject.dssdr;
//   var ussdr = scoreObject.ussdr;
//   var dpp = scoreObject.dpp;

//   function rankReason(dssdr, ussdr, dpp, score) {
//     if (score == 5 ) {
//       return Utils.getLabel('maximumWiFiScore');
//     }
//     var rawReasons = [];
//     rawReasons.push({'rv': Utils.getLabel("lowDsPhyRate"), 'date': dssdr.at_date});
//     rawReasons.push({'rv': Utils.getLabel("lowUsPhyRate"), 'date': ussdr.at_date});
//     rawReasons.push({'rv': Utils.getLabel("HighDPP"), 'date': dpp.at_date});
//     var reasonsByDate=_.groupBy(rawReasons,function(item){
//       return item.date;
//     });
//     var reasons=_.map(reasonsByDate,function(reasons,date){
//       var reasonList = reasons.map(function(item) {
//         return item.rv;
//       });
//       var mergeReason = [reasonList.slice(0, -1).join(', '), reasonList.slice(-1)[0]].join(reasonList.length < 2 ? '' : ' ' + Utils.getLabel('And') + ' ');
//       return Utils.format("{0} {1} {2} {3} {4} {5}", mergeReason, Utils.getLabel('determined'), score, Utils.getLabel("score"), Utils.getLabel('at'), date);
//     });
//     if (!reasons||reasons.length==0){
//       // Seems like the current wifi score was caculated before v17, so we could not get accurate ranking reason for this score
//       return 'N/A';
//     }
//     return reasons.join('<br/>');
//   }
//   return rankReason(dssdr, ussdr, dpp, scoreInUi);
// };

// // Template.wifidiag.created = function() {
// //   cleanup();
// //   NOTAVAILABLE = Utils.getLabel('notAvailableFlag');

// //   var deviceInfo = Utils.getDeviceInfo();

// //   // Unified Wi-Fi supported for GigaCenters in RG mode
// //   if (deviceInfo && _.has(deviceInfo, "modelName")) {
// //     var opMode = "RG";//default, in case opMode is missing
// //     if (_.has(deviceInfo, "opMode") && !!deviceInfo.opMode) {
// //       opMode = deviceInfo.opMode;
// //     }

// //     var version;
// //     if (_.has(deviceInfo, "softwareVersion") && !!deviceInfo.softwareVersion) {
// //       version = deviceInfo.softwareVersion;
// //     }
// //     isUnifiedWiFiSupported = Utils.isFeatureSupportedBS("featureSupported.unifiedWifiTab", deviceInfo.modelName, deviceInfo.dataModelName, version)
// //         && (opMode === "RG" || opMode === "Modem");
// //     isSteeringEventSupported = isUnifiedWiFiSupported && Utils.isFeatureSupportedBS("featureSupported.steeringEvent", deviceInfo.modelName, deviceInfo.dataModelName, version);
// //   }


// //   //For GigaCenters in RG mode, the first tab must be Unified Wi-Fi;
// //   //otherwise the first tab is the 2.4GHz Radio
// //   var firstSelectedTab = isUnifiedWiFiSupported ? keyUnifiedWifiTabName : keyWifiCurrentTabForTwo;
// //   Session.set(keyWifidiagCurrentTab, firstSelectedTab);


// //   Session.set(keyWifidiagLoading, true);

// //   //this is the Refresh function
// //   this.autorun(function () {
// //     if (Session.get(keyWifidiagLoading)) {
// //       Session.set(keyWifidiagDataError);//clear previous error
// //       if (isUnifiedWifiTab()) {
// //         clearUnifiedWifi();
// //         retrieveUnifiedWifiData();
// //       } else {
// //         if (isDevicesSupported()) {
// //          // subTab.set(keyWifiCurrentTabForDevices);
// //         } else if (isSiteScanSupported()) {
// //          // subTab.set(keyWifiCurrentTabForSiteScan);
// //         } else if (isWifiPmSupported()) {
// //          // subTab.set(keyWifiCurrentTabForPmHistorical);
// //         }
// //         initData(isRadioFive() ? 5 : 2);
// //         // fetch the wifi report meta data
// //         if (Utils.isFeatureSupportedBS("featureSupported.wifiPmBin")) {
// //           var di = Utils.getDeviceInfo();
// //           Meteor.call("initWifiPMReport", Utils.getOrgId(), Utils.getCpeId(), di.modelName, di.dataModelName, di.softwareVersion, function (error, data) {
// //             Session.set(keyReportInitDataInSess, data);
// //           });
// //         }
// //       }
// //     }
// //   });

// // };

// // Template.wifidiag.rendered = function() {
// //   if (Utils.isInSXA()) {
// //     SmartAdmin.pageSetup();
// //   }
// // };

// // Template.wifidiag.destroyed = function() {
// //   cleanup();
// //   Session.set(keyWifidiagCurrentTab);
// // };

// // Template.wifidiag.helpers({
// //   // This is for Cloud project which has no Router for CC+ pages
// //   refreshFlag: function() {
// //     return keyWifidiagLoading;
// //   },

// //   hasUnifiedWiFi: function() {
// //     return isUnifiedWiFiSupported;
// //   },

// //   loading: function() {
// //     if (isUnifiedWifiTab()) {
// //       return Session.get(keyWifidiagLoading);
// //     } else {
// //       var di = Utils.getDeviceInfo();
// //       return Utils.isFeatureSupportedBS("featureSupported.wifiPmBin")
// //         ? (Session.get(keyWifidiagLoading) || di == null || !Session.get(keyReportInitDataInSess))
// //         : (Session.get(keyWifidiagLoading) || di == null);
// //     }
// //   },

// //   error: function() {
// //     return Session.get(keyWifidiagDataError);
// //   },

// //   isActive: function(tabName) {
// //     return (Session.get(keyWifidiagCurrentTab) === tabName) ? 'active' : '';
// //   },

// //   isFlexBand: function() {
// //     return Utils.isFlexBand();
// //   },

// //   getRadioFrequency: function() {
// //     var ssids = getSsids(),
// //         frequency = '24Ghz';
// //     if (ssids != null && ssids.length > 0) {
// //       if (Utils.isFlexBand() && ssids[0].X_BROADCOM_COM_WlanAdapter.WlBaseCfg.WlBand == Radio.WlBand5G) {
// //         frequency = '5Ghz';
// //       }
// //       return Utils.getLabel(frequency);
// //     }
// //   }
// // });

// // Template.wifidiag.events({
// //   'click a[href="#unifiedWifi"]': function(event){
// //     Session.set(keyWifidiagLoading, true);
// //     Session.set(keyWifidiagCurrentTab, keyUnifiedWifiTabName);
// //   },

// //   'click a[href="#five"]': function(event) {
// //     Session.set(keyWifidiagLoading, true);
// //     Session.set(keyWifidiagCurrentTab, keyWifiCurrentTabForFive);
// //     var report = Session.get(keyReportParamInSess);
// //     //reset the global path for 5G
// //     switchTab(keyWifiCurrentTabForFive);

// //     if (isDevicesSupported()) {
// //      // subTab.set(keyWifiCurrentTabForDevices);
// //     } else if (isSiteScanSupported()) {
// //     //  subTab.set(keyWifiCurrentTabForSiteScan);
// //     } else if (isWifiPmSupported()) {
// //     //  subTab.set(keyWifiCurrentTabForPmHistorical);
// //     }

// //     if (report && report.reportParam) {
// //       report.reportParam.radio = 2;
// //       Session.set(keyReportParamInSess, report);
// //     }
// //   },

// //   'click a[href="#two"]': function(event) {
// //     Session.set(keyWifidiagLoading, true);
// //     Session.set(keyWifidiagCurrentTab, keyWifiCurrentTabForTwo);
// //     //reset the global path for 2.4G
// //     switchTab(keyWifiCurrentTabForTwo);
// //     // if (subTab.get() === keyWifiCurrentTabForChangeLog) {
// //     //   if (isDevicesSupported()) {
// //     //     subTab.set(keyWifiCurrentTabForDevices);
// //     //   } else if (isSiteScanSupported()) {
// //     //     subTab.set(keyWifiCurrentTabForSiteScan);
// //     //   } else if (isWifiPmSupported()) {
// //     //     subTab.set(keyWifiCurrentTabForPmHistorical);
// //     //   } else {
// //     //     subTab.set();
// //     //   }
// //     // }

// //     var report = Session.get(keyReportParamInSess);
// //     if (report && report.reportParam) {
// //       report.reportParam.radio = 1;
// //       Session.set(keyReportParamInSess, report);
// //     }
// //   },

// //   'click .dismiss': function(event) {
// //     $(event.currentTarget).parent().css('display', 'none');
// //   }
// // });

// // Template.wifiChannel.helpers({
// //   channelAbnormal: function() {
// //     var usages = getChannelUsages();
// //     return (usages.interference > WifiThresholds.InterferenceMax || usages.free < WifiThresholds.FreeMin || usages.utilization > WifiThresholds.UtilizationMax)
// //   }
// // });

// // Template.wifiChannelMap.created = function() {
// //     Session.set(donutAirtimeAnalysisLoading, true);
// // 	Session.set(donutAirtimeAnalysisError, false);
// // 	Session.set(donutAirtimeAnalysisChannelAbnormal, {});
// //     var type = Session.get(keyWifidiagCurrentTab);
// //     if (type === "two") {
// //         type = "2.4GHz";
// //     } else if (type === "five") {
// //         type = "5GHz";
// //     }
// //     var di = Utils.getDeviceInfo();	
// //     Meteor.call('getCurrentRadioChartData', type, di.serialNumber, function(error, result) {
// //         if (error) {
// // 			Session.set(donutAirtimeAnalysisLoading, false);
// // 			Session.set(donutAirtimeAnalysisError, error.reason);
// // 			console.log('getCurrentRadioChartData', error);
// // 		} else {
// //             Session.set(donutAirtimeAnalysisLoading, false);
// // 			Session.set(donutAirtimeAnalysisError, false);
// // 				let data = result["data"];
// // 				let chartData = [];
// // 				let airTimeInter = Math.round(data.channelInterferenceAvg);
// // 				let airTimeUsed = Math.round(data.channelUtilAvg);
// // 				let airFree = 100 - (airTimeInter + airTimeUsed);
// // 				let channelAbnormal = {
// // 				  "free": airFree,
// // 				  "utilization": airTimeUsed,
// // 				  "interference": airTimeInter
// // 				}
// // 				Session.set(donutAirtimeAnalysisChannelAbnormal, channelAbnormal);
// // 				chartData.push({
// // 					"label": Support.i18n('airTimeFree'),
// // 					"value": airFree,
// // 					"color": "#01b211"
// // 				});
// // 				chartData.push({
// // 					"label": Support.i18n('airTimeUsed'),
// // 					"value": airTimeUsed,
// // 					"color": "#efed04"
// // 				});
// // 				chartData.push({
// // 					"label": Support.i18n('airTimeInter'),
// // 					"value": airTimeInter,
// // 					"color": "#ed1c24"
// // 				});				
// // 				Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>%";
// // 				var domChart = document.getElementById("chart-area-currentairtime"),
// // 					ctx, chart;
// // 				if (domChart) {
// // 					ctx = document.getElementById("chart-area-currentairtime").getContext("2d");
// // 					chart = new Chart(ctx).Doughnut(chartData);
// // 					legend(document.getElementById("chart-legend-currentairtime"), chartData);
// // 				}
// //         }
// //     });
// // }
// // Template.wifiChannelMap.helpers({
// //     loading: function() {
// //         return Session.get(donutAirtimeAnalysisLoading);
// //     },
// // 	error: function() {
// //         return Session.get(donutAirtimeAnalysisError);
// //     },
// // 	channelAbnormal: function() {
// //     var usages = Session.get(donutAirtimeAnalysisChannelAbnormal)
// //     return (usages.interference > WifiThresholds.InterferenceMax || usages.free < WifiThresholds.FreeMin || usages.utilization > WifiThresholds.UtilizationMax) 
// // 	}
// // });

// var legend = function(parent, data) {
//   parent.className = 'legend';
//   var datas = data.hasOwnProperty('datasets') ? data.datasets : data;

//   while (parent.hasChildNodes()) {
//     parent.removeChild(parent.lastChild);
//   }

//   datas.forEach(function(d) {
//     var title = document.createElement('span');
//     title.className = 'title';
//     parent.appendChild(title);

//     var colorSample = document.createElement('div');
//     colorSample.className = 'color-sample';
//     colorSample.style.backgroundColor = d.hasOwnProperty('strokeColor') ? d.strokeColor : d.color;
//     colorSample.style.borderColor = d.hasOwnProperty('fillColor') ? d.fillColor : d.color;
//     title.appendChild(colorSample);

//     var text = document.createTextNode(d.label);
//     title.appendChild(text);
//   });
// };


// // Template.wifiChannel.rendered = function() {

// //   var type = Session.get(keyWifidiagCurrentTab);
// //   if (type === keyUnifiedWifiTabName) {
// //     return;
// //   }

// //   var usages = getChannelUsages();

// //   var color_interference = WifiColors.color_interference,
// //       color_free = WifiColors.color_free;

// //   if (usages.interference > WifiThresholds.InterferenceMax) {
// //     color_interference = WifiColors.color_interference_abnormal;
// //   }
// //   if (usages.free < WifiThresholds.FreeMin) {
// //     color_free = WifiColors.color_free_abnormal;//unused
// //   }

// //   var chartData;
// //   chartData = [{
// //     value: usages.free,
// //     color: WifiColors.color_free,
// //     label: Utils.getLabel("free")
// //   }, {
// //     value: usages.utilization,
// //     color: WifiColors.color_utilization,
// //     label: Utils.getLabel("used")
// //   }, {
// //     value: usages.interference,
// //     color: WifiColors.color_interference,
// //     label: Utils.getLabel("interference")
// //   }];

// //   var options = {
// //     legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
// //   };//unused

// //   Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>%";

// //   var domChart = document.getElementById("chart-area-" + type),
// //       ctx, chart;
// //   if (domChart) {
// //     ctx = document.getElementById("chart-area-" + type).getContext("2d");
// //     chart = new Chart(ctx).Doughnut(chartData);
// //     legend(document.getElementById("chart-legend-" + type), chartData);
// //   }
// // };

// var addEventListenerForCollapse = function() {
//   $('.panel').on('hidden.bs.collapse', function(e) {
//   //  showWarning.set(false);
//   });
//   $('.panel').on('shown.bs.collapse', function(e) {
//   //  showWarning.set(true);
//   })
// };

// // Template.wifiHighUtilization.rendered = function() {
// //   addEventListenerForCollapse();
// // };

// // Template.wifiHighInterference.rendered = function() {
// //   addEventListenerForCollapse();
// // };

// // Template.wifiReducedCapacity.rendered = function() {
// //   addEventListenerForCollapse();
// // };

// // Template.highDropPackets.rendered = function() {
// //   addEventListenerForCollapse();
// // };

// // Template.iptvPixelization.rendered = function() {
// //   addEventListenerForCollapse();
// // };

// // Template.siteScanRecommendation.helpers({
// //   siteScanReady: function() {
// //     return Session.get(keyWifidiagSiteScan) != null;
// //   },
// //   getRecResult: function() {
// //     var sitescanResult = Session.get(keyWifidiagSiteScan);
// //     var radioValue = isRadioFive() ? "5g" : "24g";
// //     var radioObj = sitescanResult[radioValue];
// //     var currentObj = radioObj.current;
// //     var recommendObj = radioObj.recommend;

// //     if (recommendObj) {
// //       var current = {
// //         Channel: currentObj.channel,
// //         OverlappingChannel: {
// //           Count: currentObj.uoc_channel_number
// //         },
// //         CoChannel: {
// //           Count: currentObj.coc_channel_number
// //         },
// //         TotalAggregatedRSSI: {
// //           RSSI: currentObj.power
// //         }
// //       };
// //       Logger.debug("Current channel >" + JSON.stringify(current));

// //       var recommend = {
// //         Channel: recommendObj.channel,
// //         OverlappingChannel: {
// //           Count: recommendObj.uoc_channel_number
// //         },
// //         CoChannel: {
// //           Count: recommendObj.coc_channel_number
// //         },
// //         TotalAggregatedRSSI: {
// //           RSSI: recommendObj.power
// //         }
// //       }
// //       Logger.debug("Recommend channel >" + JSON.stringify(recommend));

// //       return {
// //         Current: current,
// //         Recommended: recommend
// //       }
// //     };
// //   },

// //   isSameChannel: function() {
// //     return this.Current.Channel == this.Recommended.Channel;
// //   }
// // });


// // Template.wifiDetail.helpers(
// //     _.extend({
// //       isRadioOn: isRadioOn,
// //       wifiPmBinSupported : isWifiPmSupported,
// //       isActiveTab: function(value) {
// //         return (subTab.get() === value) ? 'active' : '';
// //       },
// //       type: function() {
// //         return Session.get(keyWifidiagCurrentTab);
// //       },
// //       subTab: function(tab) {
// //         return subTab.get() === tab;
// //       },
// //       notUnifiedWifiTab: function(tab) {
// //         return (tab !== "unifiedWifi");
// //       },
// //       error: function() {
// //         return Session.get(keyWifidiagSubTabError);
// //       },
// //       isDevicesSupported: isDevicesSupported,
// //       isSiteScanSupported: isSiteScanSupported,
// //       isChannelChangeLogSupported: function() {
// //         if (!isRadioFive()) {
// //           return Utils.isFeatureSupportedBS("featureSupported.wlan24G.channelChangeLog");
// //         } else {
// //           return Utils.isFeatureSupportedBS("featureSupported.wlan5G.channelChangeLog");
// //         }
// //       },
// //       showTablist : function() {
// //         return isDevicesSupported() || isSiteScanSupported() || isWifiPmSupported();
// //       },
// // 	  mapDevice : function() {
// // 		  return Session.get(keyIsMapDevice);
// // 	  }
// //     }, sharedHelpers)
// // );

// // Template.wifiDevices.created=function() {
// //   /**
// //    * set auto-run for change of devices
// //    */
// //   this.autorun(function(){
// //     function getMacAddressed(devices) {
// //       if (devices && devices.length > 0) {
// //         return _.map(devices, function(device) {
// //           var macAddress = device[hostMacAddressStore] || device[deviceMacAddressStore];
// //           return macAddress.toLowerCase()
// //         });
// //       }
// //       return []
// //     }
// //     // clean the keyWifidiagDevicesScore
// //     Session.set(keyWifidiagDevicesScore);
// //     // clean the keyWifidiagDevicesMinimumScore
// //     Session.set(keyWifidiagDevicesMinimumScore);
// //     // clean cabability-check sessitn
// //     //TODO : new implementation to reset KEY_MAP_DEVICE map key
// //     //Session.set(KEY_MAP_DEVICE);
// //     var devices = getDevices();
// //     Session.set(keyWifidiagDevices, devices);
// //     var macAddresses = getMacAddressed(devices);
// //     if (!macAddresses || _.size(macAddresses) == 0) {
// //       return;
// //     }
// //     if (!isDeviceSupportWiFiScore()) {
// //       window.console && console.log('CPE does not support Wi-Fi score');
// //       return;
// //     }
// //     var orgId = Utils.getOrgId();
// //     var cpeId = Utils.getCpeId();
// //     // TODO only retrieve Wi-Fi Score when device support
// //     var offset=-7;
// //     var timezone=Utils.getTimezone();
// //     function getWiFiScore(serialNumbers){
// //       // get wifi score
// //       Meteor.call('getWifiScores', orgId, serialNumbers, "", macAddresses,"avg",offset,timezone, function(error, result) {
// //         if (error) {
// //           window.console && console.log(JSON.stringify(error));
// //           Session.set(keyWifidiagDevicesScore, {});
// //         } else {
// //           if (_.isArray(result)) {
// //             var staWiFiScore = {};
// //             _.each(result, function(item) {
// //               staWiFiScore[item['macaddress'].toLowerCase()] = item['qualityscore']['qualityscore']
// //             });
// //             _.each(macAddresses,function(macAddress){
// //               macAddress = macAddress.toLowerCase();
// //               if(!_.isNumber(staWiFiScore[macAddress])) {
// //                 staWiFiScore[macAddress] = NOTAVAILABLE;
// //               }
// //             });
// //           }
// //           Session.set(keyWifidiagDevicesScore, staWiFiScore);
// //         }
// //       });
// //     }

// //     function getMinimumWiFiScore(serialNumbers){
// //       Meteor.call('getWifiScores', orgId,serialNumbers, "", macAddresses,"min",offset,timezone, function(error, result) {
// //         if (error) {
// //           window.console && console.log(JSON.stringify(error));
// //           Session.set(keyWifidiagDevicesMinimumScore, {});
// //         } else {
// //           var staWiFiScore = {};
// //           if (_.isArray(result)) {
// //             _.each(result, function(item) {
// //               staWiFiScore[item['macaddress'].toLowerCase()] = item['qualityscore']
// //             });
// //             _.each(macAddresses, function(macAddress) {
// //               macAddress = macAddress.toLowerCase();
// //               if (!staWiFiScore[macAddress]) {
// //                 staWiFiScore[macAddress] = {};
// //               }
// //             });
// //           }
// //           Session.set(keyWifidiagDevicesMinimumScore, staWiFiScore);
// //         }
// //       });
// //     }
// //    // TODO: new added mathod for getting map avg score
// //     function getMapAvgScore(serialNumbers){
// //       Meteor.call('getMapWifiScore', orgId, serialNumbers,"avg", function(error, result) {
// //         if (error) {
// //           window.console && console.log(JSON.stringify(error));
// //           Session.set(keyWifidiagDevicesScore, {});
// //         } else {
// //           if (_.isArray(result)) {
// //             var staWiFiScore = {};
// //             _.each(result, function(item) {
// //               staWiFiScore[item['client'].toLowerCase()] = item['score'];
// //             });
// //             _.each(macAddresses,function(macAddress){
// //               macAddress = macAddress.toLowerCase();
// //               if(!_.isNumber(staWiFiScore[macAddress])) {
// //                 staWiFiScore[macAddress] = NOTAVAILABLE;
// //               }
// //             });
// //           }
// //           console.log('average WiFiScore Diag page>>>',JSON.stringify(result));
// //           Session.set(keyWifidiagDevicesScore, staWiFiScore);
// //         }
// //       });
// //     }
// //      // TODO: new added mathod for getting map current score
// //     function getMapCurrentScore(serialNumbers){
// //       Meteor.call('getMapWifiScore', orgId,serialNumbers,"current", function(error, result) {
// //         if (error) {
// //           window.console && console.log(JSON.stringify(error));
// //           Session.set(keyWifidiagDevicesMinimumScore, {});
// //         } else {
// //           var staWiFiScore = {};
// //           if (_.isArray(result)) {
// //             _.each(result, function(item) {
// //               staWiFiScore[item['client'].toLowerCase()] = item;
// //             });
// //             _.each(macAddresses, function(macAddress) {
// //               macAddress = macAddress.toLowerCase();
// //               if (!staWiFiScore[macAddress]) {
// //                 staWiFiScore[macAddress] = {};
// //               }
// //             });
// //           }
// //           console.log('Current WiFiScore Diag page>>>',JSON.stringify(result));
// //           Session.set(keyWifidiagDevicesMinimumScore, staWiFiScore);
// //         }
// //       });
// //     }

// //     Meteor.call(Support.Const.RPC_SUBSCRIBER_BY_DEVICE, orgId, cpeId.serialNumber, function(error, result){
// //       var serialNumbers=[];
// //       if (error) {
// //         window.console && console.log(JSON.stringify(error));
// //         serialNumbers.push(cpeId.serialNumber);
// //       } else {
// //         if(result && result['deviceData']){
// //           var data=result['deviceData'];
// //           serialNumbers=_.map(data,function(item){
// //             return item['serialNumber'];
// //           })
// //         }
// //       }
// //       // TODO: new implementation to get device capability
// //       Meteor.call('getMapDevice',orgId,Utils.getSerialNumber(),function(err,response){
// //           console.log('getMapDevice >>> response',JSON.stringify(response));
// //           let mapSupported = (response.supported)?response.supported:false;
// //           Session.set(KEY_MAP_DEVICE,mapSupported);
// //           if(err){
// //             window.console && console.log(JSON.stringify(err));
// //             getWiFiScore(serialNumbers);
// //             getMinimumWiFiScore(serialNumbers);
// //           }
// //           else{
// //             if(mapSupported){
// //               getMapCurrentScore(Utils.getSerialNumber());
// //               getMapAvgScore(Utils.getSerialNumber());
// //             }
// //             else{
// //               getWiFiScore(serialNumbers);
// //               getMinimumWiFiScore(serialNumbers);
// //             }
// //           }
// //       });

// //     });
// //   });
// // };

// // Template.wifiDevices.rendered = function() {
// //   this.$('[data-toggle="tooltip"]').tooltip();
// //   var devices = getDevices();
// //   var containerID = "#two #devices";
// //   if (isRadioFive()) {
// //     containerID = "#five #devices";
// //   }
// //   $('#devices-table > tbody > tr').each(function(rowIndex, row) {
// //     var transferElement;
// //     if (devices[rowIndex]['SignalStrength']) {
// //       var signalContent = "",
// //           transferContent = "",
// //           signalElement = $(row).find('[class~="wifi-icon"]');

// //       transferElement = $(row).find('[class~="fa-ellipsis-v"]');

// //       signalContent += "<table class='tooltip-table'>";
// //       signalContent += "<tr><td width='50%'>" + Utils.getLabel("signalStrength") + "</td>";
// //       signalContent += "<td>" + devices[rowIndex]['SignalStrength'] + "dBm" + "</td></tr>";
// //       signalContent += "</table>";
// //       signalElement.popover({
// //         container: containerID,
// //         content: signalContent,
// //         html: true
// //       });
// //     }

// //     if (devices[rowIndex][deviceMetricsStore]) {
// //       transferContent += "<table class='tooltip-table'>";
// //       transferContent += "<tr><td>" + Utils.getLabel("packetsTransmittedUS") + "</td>";
// //       transferContent += "<td>" + devices[rowIndex][deviceMetricsStore].PacketsTransmittedUpstream + "</td></tr>";
// //       transferContent += "<tr><td>" + Utils.getLabel("packetsTransmittedDS") + "</td>";
// //       transferContent += "<td>" + devices[rowIndex][deviceMetricsStore].PacketsTransmittedDownstream + "</td></tr>";

// //       if (devices[rowIndex][deviceMetricsStore].PacketsReTransmittedDownstream != null) {
// //         transferContent += "<tr><td>" + Utils.getLabel("packetsReTransmittedDS") + "</td>";
// //         transferContent += "<td>" + devices[rowIndex][deviceMetricsStore].PacketsReTransmittedDownstream + "</td></tr>";
// //       }
// //       transferContent += "</table>";

// //       if (!!transferElement) {
// //         transferElement.popover({
// //           container: containerID,
// //           content: transferContent,
// //           html: true
// //         });
// //       }
// //     }

// //   });
// // };

// // Template.wifiDevices.events({
// //   'click .us-ds-history': (e, ui)=>{
// //     let sn = Utils.getSerialNumber();
// //     let mac = ui.$(e.currentTarget).data('mac');
// //     let name = ui.$(e.currentTarget).data('name');
// //     let orgId = Utils.getOrgId();
// //     console.log('>>>>>>>>>>>>>>us ds clicked', sn, orgId, mac, name);
// //     let tmp = {sn:sn, mac:mac, orgId:orgId, name:name};
// //     Session.set(Const.KEY_DS_US_HISTORY_DATA, tmp);
// //     $('#dsUsHistoryModal').modal('show');
// //   }
// // })

// // Template.wifiDevices.helpers({
// //   isDeviceParameterSupported: function(parameter) {
// //     if (parameter === 'snr') {
// //       return (Utils.isParameterSupportedBS(devicePath + deviceSignalStrengthParamName) ||
// //           Utils.isParameterSupportedBS(hostPath + deviceSignalStrengthParamName) ||
// //           Utils.isParameterSupportedBS(metricsPath + deviceSignalStrengthParamName)) &&
// //           Utils.isParameterSupportedBS(radioPathGiga + 'NoiseLevel');
// //     }
// //     return Utils.isParameterSupportedBS(devicePath + parameter) ||
// //         Utils.isParameterSupportedBS(hostPath + parameter) ||
// //         Utils.isParameterSupportedBS(metricsPath + parameter);
// //   },

// //   devices: function() {
// //     return isRadioOn() && Session.get(keyWifidiagDevices);
// //   },

// //   isWifiScoreReady:function(device){
// //     return Session.get(keyWifidiagDevicesScore);
// //   },

// //   isDeviceSupportWiFiScore:isDeviceSupportWiFiScore,
// //   getDeviceWiFiScore:function(device) {
// //     var deviceWiFiScores = Session.get(keyWifidiagDevicesScore);
// //     var macAddress=device.MACAddress||device.AssociatedDeviceMACAddress;
// //     var rv= deviceWiFiScores[macAddress.toLowerCase()];
// //     if(!_.isNumber(rv)){
// //       return NOTAVAILABLE;
// //     }
// //     return rv;
// //   },// TODO : new map implementation to get MAP device wifi score
// //   getMapDeviceWiFiScore:function(device) {
// //     var scoreObj = {};
// //     var avgScore = Session.get(keyWifidiagDevicesScore);
// //     var curScore = Session.get(keyWifidiagDevicesMinimumScore);
// //     var macAddress=device.MACAddress||device.AssociatedDeviceMACAddress;
// //     avgScore= avgScore[macAddress.toLowerCase()];
// //     curScore = curScore[macAddress.toLowerCase()];
// //     if(!_.isNumber(avgScore)){
// //        scoreObj.avgScoreNA =  NOTAVAILABLE;
// //     }
// //     else{
// //       scoreObj.avgScore =  avgScore;
// //     }
// //     if(!_.isNumber(curScore.score)){
// //       scoreObj.curScoreNA =  NOTAVAILABLE;
// //    }
// //    else{
// //      scoreObj.curScore =  curScore;
// //    }
// //    return scoreObj;
// //   },

// //   canPopover: function(device, scoreNumber) {
// //     if (_.isEqual(NOTAVAILABLE, scoreNumber)) {
// //       return false;
// //     }
// //     var miniWiFiScores = Session.get(keyWifidiagDevicesMinimumScore);
// //     if (miniWiFiScores) {
// //       var macAddress = device.MACAddress || device.AssociatedDeviceMACAddress;
// //       return !!miniWiFiScores[macAddress.toLowerCase()];
// //     } else {
// //       return false;
// //     }
// //   },

// //   normalScore:function(scoreNumber) {
// //     //true if the scoreNumber is number
// //    return (typeof scoreNumber === "number");
// //   },

// //   deviceType: function() {
// //     if (this['Icon']) {
// //       return nameMap[parseInt(this['Icon'])];
// //     }
// //   },

// //   wirelessMode: function() {
// //     return getInitBandwidthValuesForDevice.call(this);
// //   },

// //   signalIcon: function() {
// //     var signalStrength = parseInt(this['SignalStrength']);
// //     if (signalStrength >= (WifiThresholds.SignalOne) && signalStrength < (WifiThresholds.SignalTwo)) {
// //       return 'wifi-one';
// //     } else if (signalStrength >= (WifiThresholds.SignalTwo) && signalStrength < (WifiThresholds.SignalThree)) {
// //       return 'wifi-two';
// //     } else if (signalStrength >= (WifiThresholds.SignalThree) && signalStrength < (WifiThresholds.SignalFour)) {
// //       return 'wifi-three';
// //     } else if (signalStrength >= (WifiThresholds.SignalFour)) {
// //       return 'wifi-four';
// //     }
// //   },

// //   /**
// //    * @return {string}
// //    */
// //   LastDataDownlinkRate: function() {
// //     var result = "";
// //     if (_.has(this, "LastDataDownlinkRate") && (this.LastDataDownlinkRate != null)) {
// //       result = this.LastDataDownlinkRate + 'Mbps';
// //     }
// //     return result;
// //   },

// //   /**
// //    * @return {string}
// //    */
// //   LastDataUplinkRate: function() {
// //     var result = "";
// //     if (_.has(this, "LastDataUplinkRate") && (this.LastDataUplinkRate != null)) {
// //       result = this.LastDataUplinkRate + 'Mbps';
// //     }
// //     return result;
// //   },

// //   PacketsDroppedDownstream: function() {
// //     return this[deviceMetricsStore][metricsPacketsDroppedDownstreamStore];
// //   },

// //   downRateLow: function() {
// //     return downRateLow.call(this) ;
// //   },

// //   signalWeakShow: function() {
// //     return signalWeak.call(this) ;
// //   },

// //   signalWeak: function() {
// //     return signalWeak.call(this);
// //   },

// //   IPAddress: function(){
// //       return this.IPAddress || this[deviceIPAddressStore];
// //   },

// //   HostName: function() {
// //     return this.HostNameAlias || this.HostName;
// //   },

// //   MACAddress: function() {
// //     return this[hostMacAddressStore] || this[deviceMacAddressStore];
// //   },

// //   // SXACC-2506
// //   /* utilization: function() {
// //    return parseInt(this.ChannelUtilization) / (10.0) + '%';
// //    },*/

// //   snr: function() {
// //     var snrValue = Math.round(parseInt(this.SignalStrength) - parseInt(getRadioObj().NoiseLevel));
// //     return snrValue + 'dB';
// //   },
// //   wirelessUptime: function () {
// //     var value = this.Uptime,
// //         dur, d, h, m, s, uptime = '';

// //     if (value != null) {
// //       dur = moment.duration(parseInt(value), 's');
// //       d = parseInt(dur.asDays());
// //       if (d > 0) uptime += d + 'd ';
// //       h = dur.hours();
// //       if (h > 0) uptime += h + 'h ';
// //       m = dur.minutes();
// //       if (m > 0) uptime += m + 'm ';
// //       s = dur.seconds();
// //       if (s > 0 || (s === 0 && !uptime)) uptime += s + 's ';
// //       return uptime;
// //     }

// //     return NOTAVAILABLE;
// //   },
// //   getMapDeviceFlag: function(){
// //     let mapSupported = Session.get(KEY_MAP_DEVICE);
// //     console.log('Session.get(Const.KEY_MAP_DEVICE)>>>>1',mapSupported);
// //       // TODO: new implementation for map
// //     return mapSupported;
// //    },
// //    scoreColor: function(score) {
// //     return '#757575';
// //   },
// //   canMapPopOver: function(curScoreObj,avgScore){
// //     if (typeof avgScore !== "number") {
// //       return false
// //     }
// //     if (curScoreObj) {
// //       var score = curScoreObj.score;
// //       return _.isNumber(score) ? true : false;
// //     } else {
// //       return false
// //     }
// //    },
// //    isNumber: function(param) {
// //     return _.isNumber(param);
// //   }
// // });
// // // TODO: new implementation for rendering the tooltip
// // Template.diagScoreRow.rendered = function() {
// //   this.$('[data-toggle="tooltip"]').tooltip();
// //   var scoreElement = $(this.find('div[class~="score-num-diag"]'));
// //   var quality_score = this.data.quality_score;
// //   var currect_score = this.data.current_score;
// //   var contentReason = '';
// //   //if(currect_score.score == 5)
// //   //contentReason = Utils.getLabel('maximumWiFiScore')
// //   //else{
// //     if(currect_score.reason && currect_score.reason.toLowerCase() == "ussdr")
// //    contentReason = "Reason : Upstream Supported Data Rate (calculated from Free Airtime and Phy Rate) : "+  convertToMbps(currect_score.ussdr) + "Mbps";
// //    else if(currect_score.reason && currect_score.reason.toLowerCase() == "dpp")
// //    contentReason = "Reason : Dropped Packet Percentage : "+currect_score.dpp+"%";
// // else if(currect_score.reason && currect_score.reason.toLowerCase() == "dssdr")
// //    contentReason = "Reason : Downstream Supported Data Rate (calculated from Free Airtime and Phy Rate) : "+ convertToMbps(currect_score.dssdr) + "Mbps";
// //   //}

// //   if (contentReason) {
// //     // contentReason contains the actual values
// //     scoreElement.popover({
// //       content: contentReason,
// //       html: true
// //     });
// //   }
// // }
// // Template.scoreRow.rendered = function() {
// //   var scoreElement = $(this.find('div[class~="score-num"]'));
// //   var device = this.data.device;
// //   var scoreNum = this.data.score;
// //   if (device && _.isNumber(scoreNum)) {
// //     var minimumScore = Session.get(keyWifidiagDevicesMinimumScore);
// //     if (minimumScore) {
// //       var macAddress = device.MACAddress || device.AssociatedDeviceMACAddress;
// //       var minScoreObject = minimumScore[macAddress.toLowerCase()];
// //       var contentReason = getReason(scoreNum, minScoreObject);
// //       if (contentReason) {
// //         // contentReason contains the actual values
// //         scoreElement.popover({
// //           content: contentReason,
// //           html: true
// //         });
// //       }
// //     }
// //   }
// // };

// // Template.wifiRecommend.helpers({
// //   isRadioOn: isRadioOn,
// //   getTemplate: function() {
// //     if (!isRadioOn()) {
// //       return 'wifiNoRecommendation';
// //     }

// //     var devices = getDevices();

// //     //high drop packets
// //     if (_.some(devices, iptvHighDropPackets)) {
// //       return 'highDropPackets';
// //     }

// //     //IPTV Pixelization
// //     if (_.some(devices, iptvPixelization)) {
// //       return 'iptvPixelization';
// //     }

// //     // high interference
// //     var radio = getRadioObj();
// //     var utilization = parseInt(radio.ChannelUtilization);
// //     var interference = parseInt(radio.ChannelInterferenceTime);
// //     var free = 100 - utilization - interference;
// //     if (interference > WifiThresholds.InterferenceMax) {
// //       return 'wifiHighInterference';
// //     }

// //     // wifiReducedCapacity
// //     if (_.some(devices, deviceDSLow)) {
// //       return 'wifiReducedCapacity';
// //     }

// //     // high utilization
// //     if (_.some(devices, highUtilizationLegacy)) {
// //       return 'wifiHighUtilization';
// //     }
// //     return 'wifiNoRecommendation';
// //   },
// //   isRadioFive: isRadioFive
// // });

// // Template.highDropPackets.helpers(_.extend({

// // }, sharedHelpers));

// // Template.wifiHighInterference.helpers(_.extend({

// // }, sharedHelpers));

// // Template.iptvPixelization.helpers(_.extend({
// //   stbOverload: function() {
// //     return getStbDevices().length > WifiThresholds.MaxStbNum;
// //   }
// // }, sharedHelpers));

// // Template.wifiReducedCapacity.helpers(_.extend({
// //   weakSignal: function() {
// //     var devices = getDevices();
// //     return _.some(devices, deviceSignalWeak);
// //   }
// // }, sharedHelpers));


// // Template.wifiHighUtilization.helpers({
// //   legacyDeviceLabel: function() {
// //     if (isDeviceUtilizationSupported()) {
// //       return Utils.getLabel('highUtilizationLegacy');
// //     } else {
// //       return Utils.getLabel('legacyDevicePresent');
// //     }
// //   },
// //   isRadioFive: isRadioFive,
// //   legacyDevice: function() {
// //     var devices = getDevices();
// //     return _.some(devices, deviceLegacy);
// //   }
// // });

// // Template.wifiRadio.helpers({
// //   radioStatus: function() {
// //     return getRadioObj();
// //   },

// //   isRadioParameterSupported: function(parameter) {
// //     return Utils.isParameterSupportedBS(radioPath + parameter) || Utils.isParameterSupportedBS(radioPathGiga + parameter);
// //   },

// //   radioEnabled: function() {
// //     var radioEnabled = this[radioEnableParamName];
// //     if (radioEnabled === 'true' || radioEnabled === '1') {
// //       return Utils.getLabel("enabled");
// //     }
// //     return Utils.getLabel("disabled");
// //   },

// //   wirelessMode: function() {
// //     return getInitBandwidthValues.call(this);
// //   },

// //   channelMode: function() {
// //     var channel = this[wlanChannelStore];
// //     if (this[wlanAutoChannelEnableStore] === 'true') {
// //       return Utils.getLabel("auto") + ' (' + channel + ')';
// //     } else if (channel === '0') {
// //       return Utils.getLabel("auto");
// //     } else {
// //       return Utils.getLabel("manual") + ' (' + channel + ')';
// //     }
// //   },

// //   operatingChannel: function() {
// //     return this[wlanChannelStore];
// //   },

// //   channelBandwidth: function() {
// //     var bandwidthText = bandwidthValueToText[this[wlanOperatingChannelBandwidthStore]];
// //     return bandwidthText ? bandwidthText: this[wlanOperatingChannelBandwidthStore];
// //   }
// // });

// // Template.wifiDetail.events({
// //   'click a[role="tab"]': function(event) {
// //     var el = $(event.currentTarget);
// //     var linkid = el.prop('name');
// //     subTab.set(linkid);
// //   }
// // });

// var is_int = function(value) {
//   return ((parseFloat(value) === parseInt(value)) && !isNaN(value));
// };

// var Band20 = '20MHZ',
//     Band40 = '40MHZ',
//     Band80 = '80MHZ',
//     Band160 = '160MHZ';

// var BLANK = '';
// var HIDDEN = 'Hidden';
// var Band20Width = 2,
//     Band40Width = 4,
//     Band80Width = 8,
//     Band160Width = 16;
// var SIGNAL_MIN = -100;
// var SPLITTER = '$$$';

// var BandToDisplayMap = {};
// BandToDisplayMap[Band20] = "20MHz";
// BandToDisplayMap[Band40] = "40MHz";
// BandToDisplayMap[Band80] = "80MHz";
// BandToDisplayMap[Band160] = "160MHz";

// var axisLabelFormatterFor24 = function(x) {
//   if ((x < 1) || (x > 13)) {
//     return null;
//   } else {
//     if (is_int(x)) {
//       return x;
//     } else {
//       return null;
//     }
//   }
// };

// var axisLabelFormatterFor50 = function(x) {
//   if ((x > 35) && (x < 145)) {
//     if ((x > 64) && (x < 100)) {
//       return null;
//     } else {
//       if (is_int(x)) {
//         if (x % 4 === 0) {
//           return x;
//         } else {
//           return null;
//         }
//       } else {
//         return null;
//       }
//     }
//   } else if ((x > 148) && (x < 168)) {
//     if (is_int(x)) {
//       if (x % 4 === 1) {
//         return x;
//       } else {
//         return null;
//       }
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };

// // SXACC-6410, Deal with blocks, especially for 5GHz
// var getSpan = function (curChannel, curBandwidth) {
//   var SPAN = 4;
//   var result = {};
//   var curSpan = 0;
//   if (!isRadioFive()) {  // 2.4GHz
//     switch (curBandwidth) {
//       case Band20:
//         curSpan = Band20Width;
//         break;
//       case Band40:
//         curSpan = Band40Width;
//         break;
//       case Band80:
//         curSpan = Band80Width;
//         break;
//       case Band160:
//         curSpan = Band160Width;
//         break;
//     };
//     result.leftSpan = curSpan;
//     result.rightSpan = curSpan;
//     result.step = 1;
//     return result;
//   }

//   // Clasify channels into blocks
//   var modValue, modResult, totalSpan;
//   switch (curBandwidth) {
//     case Band20:
//       result = {leftSpan: 2, rightSpan: 2};
//       break;
//     case Band40:
//       modValue = 2;
//       break;
//     case Band80:
//       modValue = 4;
//       break;
//     case Band160:
//       modValue = 8;
//       break;
//   };

//   if (modValue != null) {
//     modResult = Math.floor(curChannel / SPAN) % modValue;
//     totalSpan = modValue * 4;
//     if (modResult === 0) {  // Right-most
//       result.leftSpan = totalSpan - 2;
//     } else {
//       result.leftSpan = (modResult - 1) * SPAN + 2;
//     }
//     result.rightSpan = totalSpan - result.leftSpan;
//   }
//   result.step = 2;
//   return result;
// };

// var radio24ChannelList = [1, 6, 11];

// var radio5ChannelList = {
//   'dfsEnabled': {
//     '20MHz': [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 132, 136, 149, 153, 157, 161],
//     '40MHz': [36, 44, 52, 60, 100, 108, 132, 149, 157],
//     '80MHz': [36, 52, 100, 132, 149],
//     '160MHz': [36, 100]
//   },
//   'dfsDisabled': {
//     '20MHz': [36, 40, 44, 48, 149, 153, 157, 161],
//     '40MHz': [36, 44, 149, 157],
//     '80MHz': [36, 149],
//     '160MHz': [36]
//   }
// };

// /**
//  * Get Central Channel
//  * @param channel
//  * @param leftSpan
//  * @param rightSpan
//  * @returns {*}
//  */
// var getCentralChannel = function (channel, leftSpan, rightSpan) {
//   var centralChannel = channel;
//   if (isRadioFive()) {
//       // Center the label
//       centralChannel = Math.floor(channel - leftSpan + (rightSpan + leftSpan + 1) / 2);
//   }
//   return centralChannel;
// };

// /**
//  * Return an entry in which all keys are blank
//  *
//  * @param mainSsidId
//  * @param signalKeyList
//  * @param bandwidthList
//  * @returns {{}}
//  */
// var getBlankEntry = function(mainSsidId, signalKeyList, bandwidthList) {
//   var channel = {};
//   channel[mainSsidId] = BLANK;
//   _.each(signalKeyList, function(key) {
//     channel[key] = BLANK;
//   });
//   _.each(bandwidthList, function(bandwidth) {
//     channel[bandwidth] = BLANK;
//   });
//   return channel;
// };

// /**
//  * Get Bandwidth list for Busyness
//  *
//  * @param radio
//  * @param busynessesGroupByChannel
//  * @param channelList
//  * @param bandwidthList
//  */
// var getBusynessBandwidthList = function (
//     radio,
//     busynessesGroupByChannel,
//     channelList,
//     bandwidthList
// ) {
//  
//   var currentBand = radio[wlanOperatingChannelBandwidthStore];
//   var targetBandwidthList= [];

//   // Only display 20MHz busyness for 2.4GHz
//   if (!isRadioFive() && currentBand.toUpperCase() === Band40) {
//       return targetBandwidthList;
//   }

//   // Only display busyness of 1, 6, 11 for 2.4GHz
//   var limitedBusynessDisplayChannels = radio24ChannelList;
//   // Busyness displayed for 5GHz is related to DFS status
//   if (isRadioFive()) {
//     limitedBusynessDisplayChannels = radio5ChannelList;
//   }
//   _.each(channelList, function(channel) {
//     channel = parseInt(channel);
//     if (_.contains(limitedBusynessDisplayChannels, channel)) {
//       _.each(bandwidthList, function (bandwidth) {
//         if (_.has(busynessesGroupByChannel[channel], bandwidth)) {
//           if (!_.contains(targetBandwidthList, bandwidth)) {
//             targetBandwidthList.push(bandwidth);
//           }
//         }
//       });
//     }
//   });
//   return targetBandwidthList;
// };


// /**
//  * Prepare Main SSID Lines
//  *
//  * @param interpolatedChannels
//  * @param annotations
//  * @param mainSSID
//  * @param radio
//  * @param signalKeyList
//  * @param bandwidthList
//  */
// var prepareMainSSIDLines = function (
//     interpolatedChannels,
//     annotations,
//     mainSSID,
//     radio,
//     signalKeyList,
//     bandwidthList
// ) {
//   var mainChannel = mainSSID.channel;
//   var mainId = mainSSID.id;
//   var span = getSpan(mainChannel, radio[wlanOperatingChannelBandwidthStore].toUpperCase());
//   var interpolatedChannel_start = mainChannel - span.leftSpan;
//   var interpolatedChannel_end = mainChannel + span.rightSpan;
//   _.each(_.range(interpolatedChannel_start - 1, interpolatedChannel_end + 1), function(interpolatedChannel) {
//     if (interpolatedChannels[interpolatedChannel] == null) {
//         interpolatedChannels[interpolatedChannel] = getBlankEntry(mainId, signalKeyList, bandwidthList);
//     }
//     if (interpolatedChannel === interpolatedChannel_start - 1 || interpolatedChannel === interpolatedChannel_end) {
//         interpolatedChannels[interpolatedChannel][mainId] = -100;
//     } else {
//         interpolatedChannels[interpolatedChannel][mainId] = 0;
//     }
//   });


//   var siteScanResult = Session.get(keyWifidiagSiteScan);
//   var detailInfos = "";
//   var mainSSIDName = mainSSID.name;
//   if (siteScanResult && siteScanResult.ssidNameInfo) {
//       var ssidNames = false;
//       if (isRadioFive()) {
//           ssidNames = siteScanResult.ssidNameInfo.wlan5;
//       } else {
//           ssidNames = siteScanResult.ssidNameInfo.wlan2;
//       }
//       for (key in ssidNames) {
//           var nameObj = ssidNames[key];
//           if (nameObj && nameObj.SSID) {
//               if(nameObj.SSID != mainSSID.name) {
//                   detailInfos += " " + nameObj.SSID + ((nameObj.Enable == "false") ? " (Disabled)" : "") + "\n";
//               } else {
//                   if (nameObj.Enable == "false") {
//                       mainSSIDName += " (Disabled)";
//                   }
//               }
//           }
//       }
//   }
//   if (detailInfos.length > 0) {
//       detailInfos = "Primarry SSID\n " + mainSSIDName + "\n\nOthers\n" + detailInfos;
//   } else {
//       detailInfos = mainSSID.name;
//   }

//   var mainSSIDAnnotation = {
//       mainSSID : true,
//       series: mainSSID.id,
//       x: mainChannel,
//       height: 27,
//       shortText: mainSSID.name,
//       text: detailInfos,
//       width: 180
//   };
//   annotations.push(mainSSIDAnnotation);
// };


// /**
//  * Prepare busyness lines
//  * @param interpolatedChannels
//  * @param annotations
//  * @param mainSSID
//  * @param radio
//  * @param busynessesGroupByChannel
//  * @param channelList
//  * @param signalKeyList
//  * @param bandwidthList
//  */
// var prepareBusynessLines = function (
//     interpolatedChannels,
//     annotations,
//     mainSSID,
//     radio,
//     busynessesGroupByChannel,
//     channelList,
//     signalKeyList,
//     bandwidthList
// ) {
//   // Only display busyness of 1, 6, 11 for 2.4GHz
//   var limitedBusynessDisplayChannels = radio24ChannelList;
//   if (isRadioFive()) {
//     limitedBusynessDisplayChannels = radio5ChannelList;
//   }

//   _.each(channelList, function(channel) {
//     channel = parseInt(channel);
//     if (limitedBusynessDisplayChannels.indexOf(channel) === -1) {
//       if (interpolatedChannels[channel] == null) {
//         interpolatedChannels[channel] = getBlankEntry(mainSSID.id, signalKeyList, bandwidthList);
//       }
//       return;
//     }

//     _.each(bandwidthList, function(bandwidth) {
//       var span = getSpan(channel, bandwidth);

//       var curBusyness = 0;
//       if (_.has(busynessesGroupByChannel[channel], bandwidth)) {
//         curBusyness = parseInt(busynessesGroupByChannel[channel][bandwidth][0]['busyness']) / 10;
//         var annotationObj = {
//           series: bandwidth,
//           shortText: BandToDisplayMap[bandwidth],
//           height: 21,
//           width: 50,
//           text: ""
//         };
//         annotationObj.x = getCentralChannel(channel, span.leftSpan, span.rightSpan);
//         annotations.push(annotationObj);
//         var interpolatedChannel_start = channel - span.leftSpan;
//         var interpolatedChannel_end = channel + span.rightSpan;
//         _.each(_.range(interpolatedChannel_start - 1, interpolatedChannel_end + 1), function(interpolatedChannel) {
//           if (interpolatedChannels[interpolatedChannel] == null) {
//             interpolatedChannels[interpolatedChannel] = getBlankEntry(mainSSID.id, signalKeyList, bandwidthList);
//           }
//           if (interpolatedChannel === interpolatedChannel_start - 1 || interpolatedChannel === interpolatedChannel_end) {
//             if (interpolatedChannels[interpolatedChannel][bandwidth] === BLANK) {
//                 interpolatedChannels[interpolatedChannel][bandwidth] = 0;
//             }
//           } else {
//             interpolatedChannels[interpolatedChannel][bandwidth] = curBusyness;
//           }
//         });
//       }
//     });
//   });
// };

// /**
//  * Prepare Signal Lines
//  *
//  * @param interpolatedChannels
//  * @param annotations
//  * @param mainSSID
//  * @param signalsGroupBySSID
//  * @param ssidList
//  * @param signalKeyList
//  * @param bandwidthList
//  */
// var prepareSignalLines = function (
//     interpolatedChannels,
//     annotations,
//     mainSSID,
//     signalsGroupBySSID,
//     ssidList,
//     signalKeyList,
//     bandwidthList
// ) {
//   _.each(ssidList, function(ssid) {
//     _.each(signalsGroupBySSID[ssid], function(signal) {
//       var channel = parseInt(signal['channel']);
//       var bandwidth = signal['channel_bandwidth'].toUpperCase();
//       var macaddress = signal['bssid'];
//       var keyForSignal = ssid + SPLITTER + macaddress;
//       var annotationObj = {
//         series: keyForSignal,
//         x: channel,
//         shortText: ssid,
//         text: macaddress,
//         height: 21,
//         width: 120
//       };

//       var span = getSpan(channel, bandwidth);
//       if (annotationObj.shortText == BLANK || annotationObj.shortText == HIDDEN) {
//         annotationObj.shortText = macaddress;
//       }
//       annotations.push(annotationObj);

//       var signalStrength = (parseInt((signal['rssi'])));
//       var interpolatedChannel_start = channel - span.leftSpan;
//       var interpolatedChannel_end = channel + span.rightSpan;
//       var interpolatedChannel_left_ascend = interpolatedChannel_start + span.step;
//       var interpolatedChannel_right_descend = interpolatedChannel_end - span.step;
//       _.each(_.range(interpolatedChannel_start, interpolatedChannel_end + 1), function(interpolatedChannel) {
//         if (!_.has(interpolatedChannels, interpolatedChannel)) {
//             interpolatedChannels[interpolatedChannel] = getBlankEntry(mainSSID.id, signalKeyList, bandwidthList);
//         }
//         if (interpolatedChannel === interpolatedChannel_start || interpolatedChannel === interpolatedChannel_end) {
//           interpolatedChannels[interpolatedChannel][keyForSignal] = SIGNAL_MIN;
//         } else if (interpolatedChannel >= interpolatedChannel_left_ascend && interpolatedChannel <= interpolatedChannel_right_descend) {
//           interpolatedChannels[interpolatedChannel][keyForSignal] = signalStrength;
//         } else if (interpolatedChannel > interpolatedChannel_start && interpolatedChannel < interpolatedChannel_left_ascend) {
//           var distance = interpolatedChannel - interpolatedChannel_start;
//           interpolatedChannels[interpolatedChannel][keyForSignal] = SIGNAL_MIN + ( signalStrength - SIGNAL_MIN) / span.step * distance;
//         } else {
//           var distance = interpolatedChannel - interpolatedChannel_right_descend;
//           interpolatedChannels[interpolatedChannel][keyForSignal] = SIGNAL_MIN + ( signalStrength - SIGNAL_MIN) / span.step * distance;
//         }
//       });
//     });
//   });
// };

// export function getSiteScanObj() {
//  
//  // var result = Session.get(keyWifidiagSiteScan);
//   var result = JSON.parse(localStorage.getItem('WifidiagSiteScan'));
//   if (result == null) {
//     return null;
//   }

//   var busynesses = result.busyness;

//   var signals = result.neighbor;
//   var radioValue = isRadioFive() ? "5g" : "24g";
//   busynesses = _.filter(busynesses, function(busyness) {
//     return busyness['radio'] === radioValue;
//   });
//   signals = _.filter(signals, function(signal) {
//     return signal['radio'] === radioValue;
//   });
//   signals = _.map(signals, function(signal) {
//     signal['channel'] = signal['channel'].toString();
//     return signal;
//   });

//   _.each(signals,function(signal) {
//     if (signal.ssid == BLANK) {
//       signal.ssid = HIDDEN;
//     }
//   });

//   //group all signals by channel
//   var signalsGroupByChannelAll = _.groupBy(signals, function(signal) {
//     return signal['channel'];
//   });
//   var channelListAll = _.sortBy(_.keys(signalsGroupByChannelAll), function(channel) {
//     return parseInt(channel);
//   });

//   // var channelsSelected = currentChannelFiter.get();
//   // if (channelsSelected && channelsSelected.length > 0) {
//   //   busynesses = _.filter(busynesses, function(busyness) {
//   //     return _.contains(channelsSelected, busyness['channel']);
//   //   });
//   //   signals = _.filter(signals, function(signal) {
//   //     return _.contains(channelsSelected, signal['channel']);
//   //   });
//   // }

//   //group busyness by (channel,bandwidth)
//   var busynessesGroupByChannel = _.groupBy(busynesses, function(busyness) {
//     return busyness['channel'];
//   });
//   _.each(busynessesGroupByChannel, function(busynessesForChannel, channel) {
//     var busynessesForChannelGroupByBandWidth = _.groupBy(busynessesForChannel, function(busyness) {
//       return busyness['channel_bandwidth'].toUpperCase();
//     });
//     busynessesGroupByChannel[channel] = busynessesForChannelGroupByBandWidth;
//   });
//   var channelList = _.sortBy(_.keys(busynessesGroupByChannel), function(channel) {
//     return parseInt(channel);
//   });


//   //group busyness by (bandwidth,channel)
//   var busynessesGroupByBandwidth = _.groupBy(busynesses, function(busyness) {
//     return busyness['channel_bandwidth'].toUpperCase();
//   });
//   _.each(busynessesGroupByBandwidth, function(busynessesForBandwidth, bandwidth) {
//     var busynessesForBandwidthGroupByChannel = _.groupBy(busynessesForBandwidth, function(busyness) {
//       return busyness['channel'];
//     });
//     busynessesGroupByBandwidth[bandwidth] = busynessesForBandwidthGroupByChannel;
//   });
//   var bandwidthList = _.keys(busynessesGroupByBandwidth);

//   //group signal by SSID
//   var signalsGroupBySSID = _.groupBy(signals, function(signal) {
//     return signal['ssid'];
//   });
//   var ssidList = _.keys(signalsGroupBySSID);

//   //group signal by (SSID + BSSID)
//   var signalsGroupBySSIDAndMac = _.groupBy(signals, function(signal) {
//     return signal['ssid'] + SPLITTER + signal['bssid'];
//   });
//   var signalKeyList = _.keys(signalsGroupBySSIDAndMac);

//   //group signal by channel
//   var signalsGroupByChannel = _.groupBy(signals, function(signal) {
//     return signal['channel'];
//   });

//   if (channelList.length === 0) {
//     channelList = _.sortBy(_.keys(signalsGroupByChannel), function(channel) {
//       return parseInt(channel);
//     });
//   }


//   var interpolatedChannels = {};
//   var annotations = [];
//   var mainSSIDObj = getMainSsidObj();
//   var radio = getRadioObj();

//   bandwidthList = getBusynessBandwidthList(radio, busynessesGroupByChannel, channelList, bandwidthList);

//   prepareMainSSIDLines(interpolatedChannels, annotations, mainSSIDObj, radio, signalKeyList, bandwidthList);
//   prepareBusynessLines(interpolatedChannels, annotations, mainSSIDObj, radio, busynessesGroupByChannel, channelList, signalKeyList, bandwidthList);
//   prepareSignalLines(interpolatedChannels, annotations, mainSSIDObj, signalsGroupBySSID, ssidList, signalKeyList, bandwidthList);

//   var addEmpty = function(channel) {
//     if (!_.has(interpolatedChannels, channel)) {
//       if (isRadioFive()) {
//            if (_.contains(radio5ChannelList, channel)) {
//               interpolatedChannels[channel] = getBlankEntry(mainSSIDObj.id, signalKeyList, bandwidthList);
//            }
//       } else {
//           interpolatedChannels[channel] = getBlankEntry(mainSSIDObj.id, signalKeyList, bandwidthList);
//       }
//     }
//   };

//   var addSupplementChannels = function() {
//     var currentTab = Session.get(keyWifidiagCurrentTab);
//     if (currentTab === keyUnifiedWifiTabName) {
//       return;
//     }

//     if (currentTab === keyWifiCurrentTabForTwo) {
//       _.each(_.range(-1, 16), function(channel) {
//         addEmpty(channel);
//       });
//     } else {
//       _.each(_.range(34, 67), function(channel) {
//         addEmpty(channel);
//       });
//       _.each(_.range(98, 147), function(channel) {
//         addEmpty(channel);
//       });
//       _.each(_.range(147, 180), function(channel) {
//         addEmpty(channel);
//       });
//     }
//   };

//   addSupplementChannels();

//   var siteScanObj = {};
//   siteScanObj['interpolatedChannels'] = interpolatedChannels;
//   siteScanObj['channelList'] = channelList;
//   siteScanObj['bandwidthList'] = bandwidthList;
//   siteScanObj['ssidList'] = ssidList;
//   siteScanObj['signalKeyList'] = signalKeyList;
//   siteScanObj['annotations'] = annotations;
//   siteScanObj['signals'] = signals;
//   siteScanObj['busynesses'] = busynesses;
//   siteScanObj['busynessesGroupByBandwidth'] = busynessesGroupByBandwidth;
//   siteScanObj['channelListAll'] = channelListAll;
//   siteScanObj["mainSSID"] = mainSSIDObj;
//   return siteScanObj;
// };

// var NORMAL = 'normal';

// var busyness_colors = {};
// busyness_colors[Band20] = {}, busyness_colors[Band40] = {}, busyness_colors[Band80] = {}, busyness_colors[Band160] = {};
// busyness_colors[Band20][NORMAL] = '#FFA741';
// busyness_colors[Band40][NORMAL] = '#FFA741';
// busyness_colors[Band80][NORMAL] = '#FFA741';
// busyness_colors[Band160][NORMAL] = '#FFA741';

// //unused setVisibleForOne, clean up!
// var setVisibleForOne = function(value, checked) {
//   var siteScanObj = Session.get(keyWifidiagSiteScanObj);
//   var bandwidthList = siteScanObj['bandwidthList'];
//   var ssidList = siteScanObj['ssidList'];
//   var signalKeyList = siteScanObj['signalKeyList'];
//   var mainSSID = siteScanObj.mainSSID;
//   var allkeysList = _.union(mainSSID.id, signalKeyList, bandwidthList);
//   var index = _.indexOf(allkeysList, value);
//   if (checked) {
//     g.setVisibility(index, true);
//   } else {
//     g.setVisibility(index, false);
//   }
// };

// var renderSelect2 = function() {
//   $('#ssids').removeClass('hidden');
//   $("#ssids").select2({
//     placeholder: Utils.getLabel('ssid')
//   }).on("change", function(e) {
//     currentSsidFiter.set($("#ssids").val());
//     renderSsidTable();
//     renderSiteScanGraph(true);
//   });
//   $("#channel").removeClass('hidden');
//   $("#channel").select2({
//     placeholder: Utils.getLabel('channel')
//   }).on("change", function(e) {
//     currentChannelFiter.set($("#channel").val());
//     //Session.set(keyWifidiagSiteScanObj,getSiteScanObj());
//     renderSsidTable();
//     renderSiteScanGraph(true);
//   });
// };

// var renderSiteScanGraph = function(reload) {
//   var siteScanObj;
//   var y1Top = 20;

//   if (reload) {
//     siteScanObj = getSiteScanObj();
//   } else {
//     siteScanObj = Session.get(keyWifidiagSiteScanObj);
//   }
//   var lines = toCsv(siteScanObj);

//   var bandwidthList = siteScanObj['bandwidthList'];

//   var annotations = siteScanObj['annotations'];

//   var ssidList = siteScanObj['ssidList'];

//   var signalKeyList = siteScanObj['signalKeyList'];

//   var mainSSID = siteScanObj.mainSSID;

//   // Use step plot for Main SSID and busyness
//   var stepPlotSeires = {
//     'GigaCenterMainSSIDSeriesID' : {
//       stepPlot: true,
//       strokeWidth: 3,
//       strokePattern: Dygraph.DASHED_LINE,
//       color : "#43367D"
//     }
//   };
//   _.each(bandwidthList, function(bandwidth) {
//       stepPlotSeires[bandwidth] = {
//       axis: 'y2',
//       color: busyness_colors[bandwidth][NORMAL],
//       stepPlot: true,
//       fillGraph: true
//     };
//   });

//   var currentTab = Session.get(keyWifidiagCurrentTab);
//   var axisLabelFormatter = (currentTab === keyWifiCurrentTabForFive) ? axisLabelFormatterFor50 : axisLabelFormatterFor24;

//   var getVisibleFlagList = function(ssids, bandwidths) {
//     var allkeysList = _.union(mainSSID.id, signalKeyList, bandwidthList);
//     var allSelectedIds = [];
//     if (currentSsidShowFiter.get()) {
//       if (!ssids) {
//         allSelectedIds = _.union(allSelectedIds, ssidList);
//       } else {
//         allSelectedIds = _.union(allSelectedIds, ssids);
//       }
//     }
//     if (!bandwidths) {
//       allSelectedIds = _.union(allSelectedIds, bandwidthList);
//     } else {
//       allSelectedIds = _.union(allSelectedIds, bandwidths);
//     }

//     var startsWith = function(str1, str2) {
//       return str1.indexOf(str2) === 0;
//     };
//     var matchIndexesInAllKeysList = function(allSelectedIds) {
//       var matched = [], macaddress = null, startStr = HIDDEN + "-";
//       _.each(allSelectedIds, function(selected) {
//         if (selected.indexOf(startStr) == 0) {
//           macaddress = selected.slice(startStr.length);
//         }

//         _.each(allkeysList, function(key, index) {
//           if (macaddress != null) { // The name of SSID is empty or Hidden, use macAddress to search
//             if (key.indexOf(macaddress) != -1) {
//               matched.push(index);
//             }
//           } else if (startsWith(key, selected)) {
//             matched.push(index);
//           }
//         });
//       });
//       return matched;
//     };
//     var flagList = [];
//     _.each(allkeysList, function(key, index) {
//       flagList.push(false);
//     });
//     flagList[0] = true; // Always display main SSID

//     var visibleList = matchIndexesInAllKeysList(allSelectedIds);
//     _.each(visibleList, function(index) {
//       flagList[index] = true;
//     });

//     return flagList;

//   };

//   var ssids = currentSsidFiter.get();
//   var bandwidths = currentBandWidthFiter.get();
//   var visibleFlagList = getVisibleFlagList(ssids, bandwidths);

//   g = new Dygraph(
//       document.getElementById("graphdiv"),
//       lines,
//       {
//         xlabel: 'Channel',
//         ylabel: 'Power (dBm)',
//         y2label: 'Busyness (%)',
//         series: stepPlotSeires,
//         legend: 'never',
//         showRangeSelector: true,
//         rangeSelectorHeight: 30,
//         rangeSelectorPlotStrokeColor: 'white',
//         rangeSelectorPlotFillColor: 'white',
//         highlightCircleSize: 1,
//         displayAnnotations: true,
//         fillAlpha: 0.05,
//         visibility: visibleFlagList,
//         axes: {
//           x: {
//             drawGrid: false,
//             pixelsPerLabel: 1,
//             axisLabelFormatter: axisLabelFormatter
//           },
//           y: {
//             drawGrid: true,
//             pixelsPerLabel: 20,
//             axisLabelFormatter: function(y) {
//               if (y === 0) {
//                 return null;
//               } else {
//                 return y;
//               }
//             },
//             valueRange: [-100, y1Top]
//           },
//           y2: {
//             pixelsPerLabel: 20,
//             axisLabelFormatter: function(y2) {
//               if (y2 === 0 || y2 > 100) {
//                 return null;
//               } else {
//                 return y2;
//               }
//             },
//             valueRange: [0, 120]
//           }
//         }
//       }
//   );
//   g.setAnnotations(annotations);
// };

// var getMainSsidObj = function() {
//   var radioObject = getRadioObj();
//   return {
//     id : "GigaCenterMainSSIDSeriesID",
//     channel : eval(radioObject.Channel),
//     name : radioObject.SSID
//   };
// };

// var toCsv = function(siteScanObj) {
//   var ssidObj = getMainSsidObj();
//   var bandwidthList = siteScanObj['bandwidthList'];
//   var interpolatedChannels = siteScanObj['interpolatedChannels'];
//   var signalKeyList = siteScanObj['signalKeyList'];
//   var lines = "Channel," + ssidObj.id;

//   if (signalKeyList != null && signalKeyList.length > 0) {
//     lines += "," + signalKeyList.join();
//   }
//   if (bandwidthList && bandwidthList.length > 0) {
//     lines += "," + bandwidthList.join();
//   }
//   lines += "\n";

//   _.each(interpolatedChannels, function(valueChannel, keyChannel) {
//       lines += keyChannel + "," + _.values(valueChannel).join() + "\n";
//   });

//   return lines;
// };

// //var subTab = new Blaze.ReactiveVar(keyWifiCurrentTabForDevices);

// var getBusynessFromSignal = function(signal) {
//   var channel = parseInt(signal['channel']);
//   var bandwidth = signal['channel_bandwidth'].toUpperCase();
//   var busynessesGroupByBandwidth = Session.get(keyWifidiagSiteScanObj)['busynessesGroupByBandwidth'][bandwidth];
//   if (busynessesGroupByBandwidth && busynessesGroupByBandwidth.length > 0) {
//     var channels = _.sortBy(_.keys(busynessesGroupByBandwidth), function(channel) {
//       return parseInt(channel);
//     });
//     channels = _.map(channels, function(channel) {
//       return parseInt(channel);
//     });
//     var busyness;
//     if (bandwidth === Band20) {
//       for (var i = 0; i <= (channels.length - 1); i = i + 1) {
//         var value = channels[i];
//         if (channel == value) {
//           busyness = busynessesGroupByBandwidth[channel];
//           break;
//         }
//       }
//     } else if (bandwidth === Band40) {
//       for (var j = 0; j <= (channels.length - 2); j = j + 2) {
//         var min = channels[j],
//             max = channels[j + 1];
//         if (channel >= min && channel <= max) {
//           busyness = busynessesGroupByBandwidth[min];
//           break;
//         }
//       }
//     } else if (bandwidth === Band80) {
//       for (var z = 0; z <= (channels.length - 4); z = z + 4) {
//         var min80 = channels[z],
//             max80 = channels[z + 3];
//         if (channel >= min80 && channel <= max80) {
//           busyness = busynessesGroupByBandwidth[min80];
//           break;
//         }
//       }
//     } else if (bandwidth === Band160) {
//       for (var z = 0; z <= (channels.length - 8); z = z + 8) {
//         var min = channels[z],
//             max = channels[z + 7];
//         if (channel >= min && channel <= max) {
//           busyness = busynessesGroupByBandwidth[min];
//           break;
//         }
//       }
//     }
//     if (_.isArray(busyness)) {
//       return busyness[0].busyness;
//     }
//   }
//   return '';
// };

// ///var currentSsidFiter = new Blaze.ReactiveVar();

// //var currentChannelFiter = new Blaze.ReactiveVar();

// //var currentBandWidthFiter = new Blaze.ReactiveVar();

// //var sitescaning = new Blaze.ReactiveVar(false);

// //var currentSsidShowFiter = new Blaze.ReactiveVar(true);

// // var renderSsidTable = function() {
// //   $('#ssids-table-container').addClass('hidden');
// //   $('#ssids-table-container').empty();
// //   var t = UI.render(Template.siteScanSsidTable);
// //   UI.insert(t, $('#ssids-table-container')[0]);
// //   $('#ssids-table').dataTable({
// //     "ordering": false,
// //     "lengthMenu": [
// //       [5, 10, 20, -1],
// //       [5, 10, 20, "All"]
// //     ]
// //   });
// //   $('#ssids-table-container').removeClass('hidden');
// //   $('#ssids-table_length').remove();
// //   $('#ssids-table_filter').remove();
// // };

// // var renderChangeLogTable = function() {
// //   $('#changelog-table-container').empty();
// //   var t = UI.render(Template.changeLogTable);
// //   UI.insert(t, $('#changelog-table-container')[0]);
// //   $('#changelog-table').dataTable({
// //     "ordering": false,
// //     "lengthMenu": [
// //       [5, 10, 20, -1],
// //       [5, 10, 20, "All"]
// //     ]
// //   });
// //   $('#changelog-table-container').removeClass('hidden');
// //   $('#changelog-table_length').remove();
// //   $('#changelog-table_filter').remove();
// // };


// // Template.wifiSiteScan.helpers({
// //   isRadioOn: isRadioOn,
// //   ssids: function() {
// //     var siteScanObj = Session.get(keyWifidiagSiteScanObj);
// //     var ssidList = [],
// //         ssid;
// //     var signalKeyList = siteScanObj['signalKeyList'];
// //     _.each(signalKeyList, function(key) {
// //       var index = key.indexOf(HIDDEN + SPLITTER);
// //       if (index == 0) { // SSID name is empty String; Hidden SSID name of 2.4GHz is "Hidden" (SXACC-3586)
// //         ssid =  key.replace(SPLITTER, "-");
// //       } else {
// //         ssid = key.slice(0, key.indexOf(SPLITTER));
// //       }

// //       ssidList.push(ssid);
// //     });
// //     return ssidList.sort();
// //   },

// //   bandwidths: function() {
// //     var siteScanObj = Session.get(keyWifidiagSiteScanObj);
// //     var bandwidthList = siteScanObj['bandwidthList'];
// //     return bandwidthList;
// //   },

// //   hasBandWidth: function() {
// //     var siteScanObj = Session.get(keyWifidiagSiteScanObj);
// //     var bandwidthList = siteScanObj['bandwidthList'];
// //     return bandwidthList.length > 0;
// //   },

// //   isChecked: function() {
// //     var currentBandWidths = currentBandWidthFiter.get();
// //     var value = this.toString();
// //     if (!currentBandWidths || _.contains(currentBandWidths, value)) {
// //       return 'checked';
// //     }
// //   },

// //   channels: function() {
// //     var siteScanObj = Session.get(keyWifidiagSiteScanObj);
// //     var channelList = siteScanObj['channelListAll'];
// //     return channelList;
// //   },

// //   self: function() {
// //     return this;
// //   },

// //   inSiteScan: function() {
// //     return sitescaning.get() === true;
// //   },

// //   siteScanLoadingMsg: function() {
// //     return Session.get(keyWifidiagSiteScanLoadingMsg);
// //   },

// //   siteScanReady: function() {
// //     return Session.get(keyWifidiagSiteScan) ? true : false;
// //   }

// // });

// // Template.siteScanSsidTable.helpers(
// //     _.extend({
// //       selectedSsids: function() {
// //         var result = Session.get(keyWifidiagSiteScan);
// //         var currentTab = Session.get(keyWifidiagCurrentTab);
// //         var signals = result.neighbor;
// //         var radioValue = isRadioFive() ? '5g' : '24g';
// //         signals = _.filter(signals, function(signal) {
// //           return signal['radio'] === radioValue;
// //         });
// //         signals = _.map(signals, function(signal) {
// //           signal['channel'] = signal['channel'].toString();
// //           return signal;
// //         });

// //         var currentSsids = currentSsidFiter.get(),
// //             key;
// //         if (currentSsids && currentSsids.length > 0) {
// //           signals = _.filter(signals, function(signal) {

// //             if (signal['ssid'] == BLANK || signal['ssid'] == HIDDEN) {
// //               key = HIDDEN + '-' + signal['bssid'];
// //             } else {
// //               key = signal['ssid'];
// //             }
// //             return _.contains(currentSsids, key);
// //           });
// //         }
// //         /*var selectedSsids = $('#ssids').val();
// //          if(selectedSsids&&selectedSsids.length>0){
// //          signals = _.filter(signals, function(signal) {
// //          return _.contains(selectedSsids, signal['SSID']);
// //          });
// //          }*/
// //         var currentChannels = currentChannelFiter.get();
// //         if (currentChannels && currentChannels.length > 0) {
// //           signals = _.filter(signals, function(signal) {
// //             return _.contains(currentChannels, signal['channel']);
// //           });
// //         }

// //         _.each(signals, function(signal) {
// //           if (signal.ssid == BLANK) {
// //             signal.ssid = HIDDEN;
// //           }
// //         });

// //         return signals;
// //       },
// //       getBusyness: function() {
// //         var busyness = getBusynessFromSignal(this);
// //         if (busyness) {
// //           return busyness + '%';
// //         }
// //         return 0;
// //       }
// //     }, sharedHelpers)
// // );


// // Template.wifiSiteScan.events({
// //   'click button[id="button_sitescan"]': function(event) {
// //     var orgId = Utils.getOrgId(),
// //         serialNumber = Utils.getSerialNumber();
// //     sitescaning.set(true);
// //     Session.set(keyWifidiagSiteScan);
// //     Session.set(keyWifidiagSiteScanObj);
// //     currentSsidFiter.set();
// //     currentChannelFiter.set();

// //     Session.set(keyWifidiagSiteScanLoadingMsg, Utils.getLabel("initializeConnectionToDevice"));
// //     if (mock) {
// //       sitescaning.set(false);
// //       Session.set(keyWifidiagSiteScan, wifimock.sitescan);
// //       Session.set(keyWifidiagSiteScanObj, getSiteScanObj());
// //       Meteor.setTimeout(function () {
// //         renderSelect2();
// //         renderSsidTable();
// //         renderSiteScanGraph();
// //       }, 0);
// //     } else {
// //       var cpeId = Utils.getCpeId();
// //       var deviceInfo = Utils.getDeviceInfo();
// //       // SXACC-7039, Get dynamic possible channels for 5GHz

// //       var timeoutId = Meteor.setTimeout(function () {
// //         Session.set(keyWifidiagSiteScanLoadingMsg, Utils.getLabel("siteScanInProgress"));
// //       }, 10 * 1000);

// //       Meteor.call('sitescan', orgId, cpeId, deviceInfo, serialNumber, true, 0, function (error, result) {
// //         sitescaning.set(false);
// //         if (error) {
// //           Meteor.clearTimeout(timeoutId);
// //           if (error.reason == "Error") {
// //             Session.set(keyWifidiagSubTabError, "Error retrieving data from the Device");
// //           } else {
// //             Session.set(keyWifidiagSubTabError, error.reason);
// //           }
// //         } else {
// //           var channelList = [];
// //           var radio24gObj = result['24g'];
// //           if (radio24gObj != null && radio24gObj['ranking_list'] != null) {
// //             _.each(radio24gObj['ranking_list'], function (obj) {
// //               channelList.push(obj['channel']);
// //             });
// //             radio24ChannelList = channelList;
// //           }

// //           channelList = [];
// //           var radio5gObj = result['5g'];
// //           if (radio5gObj != null && radio5gObj['ranking_list'] != null) {
// //             _.each(radio5gObj['ranking_list'], function (obj) {
// //               channelList.push(obj['channel']);
// //             });
// //             radio5ChannelList = channelList;
// //           }

// //           Session.set(keyWifidiagSiteScan, result);
// //           Session.set(keyWifidiagSiteScanObj, getSiteScanObj());

// //           Meteor.setTimeout(function () {
// //             renderSelect2();
// //             renderSsidTable();
// //             renderSiteScanGraph();
// //           }, 0);
// //         }
// //       });

// //     }
// //   },

// //   'click input[id="allSsidCheck"]': function(event) {
// //     var el = event.currentTarget;
// //     if (!el.checked) {
// //       currentSsidShowFiter.set(false);
// //     } else {
// //       currentSsidShowFiter.set(true);
// //     }
// //     renderSsidTable();
// //     renderSiteScanGraph();
// //   },

// //   'click input.bandwidth': function(event) {
// //     var el = event.currentTarget;
// //     var value = el.id;
// //     var currentBandWidths = currentBandWidthFiter.get();
// //     if (!currentBandWidths) {
// //       currentBandWidths = Session.get(keyWifidiagSiteScanObj)['bandwidthList'];
// //     }
// //     if (!_.contains(currentBandWidths, value)) {
// //       currentBandWidths.push(value);
// //     } else {
// //       currentBandWidths = _.reject(currentBandWidths, function(bandwidth) {
// //         return bandwidth === value;
// //       })
// //     }
// //     currentBandWidthFiter.set(currentBandWidths);
// //     renderSiteScanGraph(true);
// //     // setVisibleForOne(el.id, el.checked);
// //   }
// // });


// // Template.wifiSiteScan.rendered = function() {
// //   if (Session.get(keyWifidiagSiteScan)) {
// //     Meteor.setTimeout(function() {
// //       currentSsidFiter.set();
// //       currentBandWidthFiter.set();
// //       currentChannelFiter.set();
// //       currentSsidShowFiter.set(true);
// //       Session.set(keyWifidiagSiteScanObj, getSiteScanObj());
// //       renderSelect2();
// //       renderSsidTable();
// //       renderSiteScanGraph();
// //     }, 0);
// //   }
// // };

// // //var retrievingLog = new Blaze.ReactiveVar(false);


// // Template.channelChangeLog.helpers({
// //   retrievingChangeLog: function() {
// //     return retrievingLog.get() === true;
// //   },

// //   changeLogReady: function() {
// //     return Session.get(keyWifidiagChangeLog) ? true : false;
// //   }

// // });

// // Template.channelChangeLog.events({
// //   'click button[id="button_retrievelog"]': function(event) {
// //     var orgId = Utils.getOrgId(),
// //         cpeId = Utils.getCpeId(),
// //         di = Utils.getDeviceInfo();
// //     retrievingLog.set(true);
// //     Session.set(keyWifidiagChangeLog);
// //     Meteor.call('retrieveChangeLog', orgId, cpeId, di.modelName, di.dataModelName, di.softwareVersion, function(error, result) {
// //       retrievingLog.set(false);
// //       if (error) {
// //         Session.set(keyWifidiagSubTabError, error.reason);
// //       } else {
// //         Session.set(keyWifidiagChangeLog, result);
// //         Meteor.setTimeout(function() {
// //           renderChangeLogTable();
// //         }, 0);
// //       }
// //     });
// //   }
// // });

// // Template.changeLogTable.helpers({
// //   allChangelogs: function() {
// //     var allLogs = Session.get(keyWifidiagChangeLog);
// //     var logs = Utils.getValueByPath(allLogs, radioPathGiga + 'ChannelChangeLog.Entry.');
// //     logs = _.values(logs);
// //     var newlogs = _.reject(logs, function(log) {
// //       return log['NewChannel'] === '0';
// //     });
// //     return newlogs;
// //   },

// //   date: function() {
// //     return moment.unix(Number(this.TimeStamp)).format(Utils.timeFormat);
// //   },

// //   reasonCodeDesc: function() {
// //     return reasonCodeMapping[this.ReasonCode];
// //   }
// // });

// // Template.channelChangeLog.rendered = function() {
// //   if (Session.get(keyWifidiagChangeLog)) {
// //     Meteor.setTimeout(function() {
// //       renderChangeLogTable();
// //     }, 0);
// //   }
// // };


// // Template.wifiDetail.created = function(){
// //   var reportRootPath = Session.get(keyReportPathInSess);
// //   if (!reportRootPath) {
// //     Meteor.call("getMeteorConfig", "reportFolder", function(err, path) {
// //       if (path) {
// //         if (path.charAt(path.length-1) != "/") {
// //           path += "/"
// //         }
// //         Session.set(keyReportPathInSess, path + "CCPlus_Reports/");
// //       }
// //     });
// //   }
// //   var showReport = Session.get(keyShowWifiPMChartInSess);
// //   if (showReport == undefined) {
// //     Meteor.call("getMeteorConfig", "sxacc.showWifiPMChart", function(err, flag) {
// //       if (flag) {
// //         Session.set(keyShowWifiPMChartInSess, flag);
// //       } else {
// //         Session.set(keyShowWifiPMChartInSess, false);
// //       }
// //     });
// //   }
// //   var showClientReport = Session.get(keyShowWifiPMClientChartsInSess);
// //   if (showClientReport == undefined) {
// //     Meteor.call("getMeteorConfig", "sxacc.showWifiPMClientChart", function(err, flag) {
// //       if (flag) {
// //         Session.set(keyShowWifiPMClientChartsInSess, flag);
// //       } else {
// //         Session.set(keyShowWifiPMClientChartsInSess, false);
// //       }
// //     });
// //   }
// // 	var currentDevice = Utils.getSerialNumber();
// //     Meteor.call('getMapDevice', Utils.getOrgId(), currentDevice,function(err,response) {
// //       if(err) {

// //       } else {
// //         let mapSupported = (response.supported)?response.supported:false;
// //         Session.set(keyIsMapDevice,mapSupported);
// //       }
// //     });
// // };

// var keyWifiPmChartTypeInSess = "keyWifiPmChartTypeInSess160105";
// var keyReportMsgInSess = "keyReportMsgInSess160812";
// var keyReportInitDataInSess = "keyReportInitDataInSess160811";
// var keyReportParamInSess = "keyReportParamInSess160114";
// var keyReportPathInSess = "keyReportPathInSess160128";
// var keyShowWifiPMChartInSess = "keyShowWifiPMChartInSess160301";
// var keyShowWifiPMClientChartsInSess = "keyShowWifiPMClientChartsInSess";
// var keyReportLoadindInSess = "keyReportLoadindInSess160202";
// var keyReportWarningInSess = "keyReportWarningInSess160204";
// var keyReportIntervalMsgInSess = "keyReportIntervalMsgInSess160205";
// var fitnessInSession = "fitnessInSession160229";
// var keyReportLoadedInSess = "keyReportLoadedInSess160815";
// var keyIsMapDevice = "keyIsMapDevice";
// var oneDay = 24 * 60 * 60 * 1000;
// var lastPeriod = getDefaultPeriod();

// function debug(msg, obj){
//   if (msg || 0 == msg) {
//     msg = " WIFI PM BIN OUTPUT ==>> " + msg;
//   }
//   console.info(msg);
//   if (obj) {
//     console.dir(obj);
//   }
// }
// // Template.PMHistoricalTemplate.rendered = function() {
// //   $(".wifiPmCustomPeriod").hide();
// //   $('#datepicker_start').datetimepicker().change(function(evt) {
// //     console.dir(evt);
// //   });
// //   $('#datepicker_end').datetimepicker();

// //   var reportParamInstance = Session.get(keyReportParamInSess);
// //   if (reportParamInstance) {
// //     if (!isRadioFive() && "channel" == reportParamInstance.chartType) {
// //       var reportNameKey = "airtime";
// //       reportParamInstance.chartType = reportNameKey;
// //       reportParamInstance.reportName = reportPathMapping[Session.get(fitnessInSession)][reportNameKey];
// //       Session.set(keyReportParamInSess, reportParamInstance);
// //     }
// //     $("#wifi_pm_data_type").val(reportParamInstance.chartType);
// //     $("#wifi_pm_timePeriod").val(reportParamInstance.periodType).change();
// //     var param = reportParamInstance.reportParam;
// //     $('#datepicker_start').data("DateTimePicker").date(new Date(param.period_start*1000));
// //     $('#datepicker_end').data("DateTimePicker").date(new Date(param.period_end*1000));
// //   } else {
// //     var period = getDefaultPeriod();
// //     $('#datepicker_start').data("DateTimePicker").date(new Date(period.start));
// //     $('#datepicker_end').data("DateTimePicker").date(new Date(period.end));
// //   }
// //   var fitness = Session.get(fitnessInSession);
// //   if (fitness) {
// //     $("#wifi_pm_bucket_interval").val(fitness);
// //   }
// // };

// // Template.PMHistoricalTemplate.created = function() {
// //   Session.set(keyReportWarningInSess);
// // };

// var reportPathMapping = {
//   "15min" : {
//     airtime : "airtime_15min_report_unit",
//     channel : "interference_channel_hopping_15min_report_unit",
//     downstream1 : "downstream_15min_report_unit",
//     downstream2 : "client_downstream_15min_report_unit",
//     connection : "conn_quality_15min_report_unit",
//     usage : "usage_efficiency_15min_report_unit"
//   },
//   "hourly" : {
//     airtime : "airtime_hourly_report_unit",
//     channel : "interference_channel_hopping_hourly_report_unit",
//     downstream1 : "downstream_hourly_report_unit",
//     downstream2 : "client_downstream_hourly_report_unit",
//     connection : "conn_quality_hourly_report_unit",
//     usage : "usage_efficiency_hourly_report_unit"
//   }
// };

// function getDefaultPeriod() {
//   var now = new Date();
//   var mod = now % oneDay;
//   var start = now.getTime() - mod + now.getTimezoneOffset() * 60 * 1000;

//   return {
//     start : start,
//     end : now.getTime()
//   };
// }
// var diffValuePerChartType = 900;
// function loadReport(ismapdevice) {
//   Session.set(keyIsMapDevice, ismapdevice);
//   Session.set(autoScaleFlagInSess, false);
//   Session.set(keyReportMsgInSess, false);
//   Session.set(radioChartParam);
//   var fineness = $("#wifi_pm_bucket_interval").val();//"15min";
//   var intervals = fineness;
//   diffValuePerChartType = 900;
//   if ("hourly" == fineness) {
//     diffValuePerChartType = 3600;
//     intervals = 'hr';
//   }
//   var periodType = $("#wifi_pm_timePeriod").val();
//   var period = getDefaultPeriod();
//   var di = Utils.getDeviceInfo();
//   Session.set(keyReportWarningInSess);
//   if ("custom" == periodType) {
//     period.start = Date.parse($('#datepicker_start').data("DateTimePicker").date());
//     period.end = Date.parse($('#datepicker_end').data("DateTimePicker").date());
//     if (period.start >= period.end) {
//             Session.set(keyReportWarningInSess, Utils.getLabel('wifiPm.warning.startEndRange'));
//       return false;
//     }
//     //fineness = "hourly";
//   } else {
//     if ("week" == periodType) {
//       period.start = period.start - (7 * oneDay);
//       //fineness = "hourly";
//     } else if ("month" == periodType) {
//       period.start = period.start - (30 * oneDay);
//       //fineness = "hourly";
//     } else if ("day" == periodType) {
//       period.start = period.end - oneDay;
//       //fineness = "15min";
//     }
//   }

//   var di = Utils.getDeviceInfo();
//   var reportParam = {
//     period_start : Math.floor(period.start / 1000),
//     period_end : Math.floor(period.end / 1000),
//     orgId : eval(Utils.getOrgId()),
//     fsan : di.serialNumber,
//     ssid : $("select[name='ssid'].input_control").val(),
//     macaddr : $("select[name='macaddr'].input_control").val(),
//     sta_conn_quality : $("select[name='sta_conn_quality'].input_control").val()
//   };

//   var frequency = Session.get(keyWifidiagCurrentTab);
//   var radioFrequency;
//   if (frequency === 'two') {
//     radioFrequency = '2.4GHz';
//   }
//   if (frequency === 'five') {
//     radioFrequency = '5GHz';
//   }
//   var radioChartParam = {
//     period_start : new Date(period.start).toISOString(),
//     period_end : new Date(period.end).toISOString(),
//     intervals: intervals,
//     radio: radioFrequency,
//     orgId : eval(Utils.getOrgId()),
//     fsan : di.serialNumber,
//     ssid : $("select[name='ssid'].input_control").val(),
//     macaddr : $("select[name='macaddr'].input_control").val(),
//     sta_conn_quality : $("select[name='sta_conn_quality'].input_control").val()
//   };

//   Session.set(radioChartParam, radioChartParam);
//   //debug("Report Param", reportParam);
//   var reportNameKey = $("#wifi_pm_data_type").val();
//   Session.set(fitnessInSession, fineness);
//   var reportName = reportPathMapping[fineness][reportNameKey];
//   if ("downstream1" == reportNameKey || "downstream2" == reportNameKey) {
//     reportName += Session.get(autoScaleFlagInSess) ? "_autoScale" : "";
//   }

//   var reportInitData = Session.get(keyReportInitDataInSess);
//   if (reportInitData && reportInitData.swUpgradeEvent) {
//     if ("downstream1" == reportNameKey) {
//       var swUpgradeEvent = reportInitData.swUpgradeEvent;
//       if (swUpgradeEvent.version && swUpgradeEvent.timestamp && swUpgradeEvent.timestamp > 0) {
//         var minVersion = Utils.getConfigurationValueBS("featureSupported.wifiPmBin.downstream.minSwVersion", di.modelName, di.dataModelName, di.softwareVersion);
//         if (minVersion) {
//           if (1 == Utils.compareVersion(swUpgradeEvent.version, minVersion)) {
//             var ts = Math.floor(swUpgradeEvent.timestamp/1000);
//             if (ts > reportParam.period_start) {
//               reportParam.period_start = ts;
//               //  Session.set(keyReportMsgInSess, "Start time were updated due to version check.");
//             }
//             if (ts > reportParam.period_end) {
//               var dateStart = dateFormat("yyyy-MM-dd hh:mm", new Date($('#datepicker_start').data("DateTimePicker").date()));
//               var dateEnd = dateFormat("yyyy-MM-dd hh:mm", new Date($('#datepicker_end').data("DateTimePicker").date()));
//               Session.set(keyReportWarningInSess, "There's no PM data available between " + dateStart + " and " + dateEnd);
//               Session.set(keyReportParamInSess, false);
//               Session.set("auto.scale.button.display", "none");
//               return false;
//             }
//           }
//         }
//       }
//     }
//   }
//   Session.set(keyReportParamInSess, {
//     reportName : reportName,
//     periodType : periodType,
//     reportParam : reportParam,
//     chartType : reportNameKey
//   });
//   Session.set(keyReportLoadindInSess, true);
//   Session.set(keyReportLoadedInSess, false);
//   var reportMsgMapping = {
//     "15min" : {
//             interval : Utils.getLabel("interval.msg.15min")
//     },
//     "hourly" : {
//             interval : Utils.getLabel("interval.msg.hourly")
//     }
//   };
//   Session.set(keyReportIntervalMsgInSess, reportMsgMapping[fineness]["interval"]);
//   if (ismapdevice) {
//     console.log('radioChartParam', radioChartParam);
// 	Session.set(mapRadioChartParam, radioChartParam)
//     var startdate = radioChartParam.period_start;
//     var enddate = radioChartParam.period_end;
//     var granularity = radioChartParam.intervals;
//     var radio = radioChartParam.radio;
//     var fsanID = radioChartParam.fsan;    
//     Meteor.call('getRadioChartData', radio, fsanID, startdate, enddate, granularity, function(error, result) {       
//         if (error) {
//           dealError(error, 'getRadioChartData');
//         } else {
//           Session.set(keyRadioChartData, result["data"]);
//         }
//       setTimeout(function() {
//         Session.set(keyReportLoadindInSess, false);
//         Session.set(keyReportLoadedInSess, true);
//       }, 5000);
//     });
//   } else {
//     Meteor.call("prepareReportData", Utils.getOrgId(), di.serialNumber, reportParam.period_end, function(err, data) {
//       console.log('p data', data);
//       if (err) {
//         setTimeout(function() {
//           Session.set(keyReportLoadindInSess, false);
//           Session.set(keyReportLoadedInSess, true);
//         }, 5000);
//       } else {
//         let m = "getAirtimeData";
//         if (reportNameKey === 'downstream1') {
//           m = "getDownstreamData";
//         }
//         Meteor.call(m, radioFrequency, reportParam.fsan, reportParam.period_start, reportParam.period_end, intervals, reportParam.orgId, function(e, r){
//           if (e){
//             dealError(e);
//           } else {
//              Session.set(keyRadioChartData, r);
//           }
//           setTimeout(function() {
//             Session.set(keyReportLoadindInSess, false);
//             Session.set(keyReportLoadedInSess, true);
//           }, 5000);
//         })
//       }
//     });
//   }
// }
// var max = 0;
// var dataMax = 0;//unused

// // Template.PMHistoricalTemplate.events({
// //   'click #autoScaleButt' : function() {
// //     var autoScale = Session.get(autoScaleFlagInSess);
// //     if (autoScale) {
// //       Session.set(autoScaleFlagInSess, false);
// //     } else {
// //       Session.set(autoScaleFlagInSess, true);
// //     }
// //     var param = Session.get(keyReportParamInSess);
// //     if ("downstream1" == param.chartType || "downstream2" == param.chartType) {
// //       param.reportName = reportPathMapping[$("#wifi_pm_bucket_interval").val()][param.chartType] + (Session.get(autoScaleFlagInSess) ? "_autoScale" : "");
// //       Session.set(keyReportParamInSess, param);
// //     }
// //   },
// //   'change #wifi_pm_timePeriod' : function() {
// //     var reportPeriod = getDefaultPeriod();
// //     var period = $("#wifi_pm_timePeriod").val();
// //     var fitness = "15min"; //where is this var used???
// //     if ("custom" == period) {
// //       $(".wifiPmCustomPeriod").show();
// //       lastPeriod.end = lastPeriod.end - lastPeriod.end % oneDay;
// //       fitness = "hourly";
// //     } else {
// //       Session.set(keyReportWarningInSess);
// //       $(".wifiPmCustomPeriod").hide();
// //       if ("week" == period) {
// //         reportPeriod.start = reportPeriod.start - (7 * oneDay);
// //         fitness = "hourly";
// //       } else if ("month" == period) {
// //         reportPeriod.start = reportPeriod.start - (30 * oneDay);
// //         fitness = "hourly";
// //       } else {
// //         reportPeriod.start = reportPeriod.end - oneDay;
// //         fitness = "15min";
// //       }
// //       lastPeriod = reportPeriod;
// //     }
// //     var start = new Date(lastPeriod.start);
// //     var end = new Date(lastPeriod.end);
// //     $('#datepicker_start').data("DateTimePicker").date(start);
// //     $('#datepicker_end').data("DateTimePicker").date(end);
// //   },
// //   'click #loadReportButton' : function() {
// //     Session.set(keyReportLoadindInSess, true);
// //     var currentDevice = Utils.getSerialNumber();
// //     Meteor.call('getMapDevice', Utils.getOrgId(), currentDevice,function(err,response) {
// //       Session.set(keyReportLoadindInSess, false);
// //       if(err) {

// //       } else {
// //         let mapSupported = (response.supported)?response.supported:false;
// //         Session.set(KEY_MAP_DEVICE,mapSupported);
// //         loadReport(mapSupported);
// //       }
// //     });
// //   }
// // });

// var dateFormat = function(fmt, date){
//   var o = {
//     "M+" : date.getMonth()+1,
//     "d+" : date.getDate(),
//     "h+" : date.getHours(),
//     "m+" : date.getMinutes(),
//     "s+" : date.getSeconds(),
//     "q+" : Math.floor((date.getMonth()+3)/3),
//     "S"  : date.getMilliseconds()
//   };
//   if(/(y+)/.test(fmt)) {
//     fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
//     for(var k in o) {
//       if(new RegExp("("+ k +")").test(fmt)) {
//         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//       }
//     }
//   }
//   return fmt;
// };

// // Template.PMHistoricalTemplate.helpers({
// //   warning : function() {
// //     return Session.get(keyReportWarningInSess);
// //   },

// //   isRadioFive_ : function() {
// //     return isRadioFive();
// //   },

// //   isWifiPmClientSupported : isWifiPmClientSupported,

// //   intervalMsg : function() {
// //     return Session.get(keyReportIntervalMsgInSess);
// //   },

// //   refresh : function() {
// //     var rv = Session.get(keyReportPathInSess) && !Session.get(keyReportLoadindInSess) && Session.get(keyReportLoadedInSess);
// //     Session.set("auto.scale.button.display", "none");
// //     if (rv) {
// //       var param = Session.get(keyReportParamInSess);
// //       debug("Report Param", param);
// //       if (param) {
// //         var reportNameKey = param.chartType;
// //         if ("downstream1" == reportNameKey ||
// //             "downstream2" == reportNameKey) {
// //           Session.set("auto.scale.button.display", "block");
// //         }
// //       }
// //     }
// //     return rv;
// //   },

// //   autoScaleDisplay : function() {
// //     //  return Session.get("auto.scale.button.display");
// //   },

// //   autoScaleEnabled : function() {
// //     return Session.get("auto.scale.button.display") == "block";
// //   },

// //   autoScaleChecked : function() {
// //     return Session.get(autoScaleFlagInSess);
// //   },

// //   isLoading : function() {
// //     return Session.get(keyReportLoadindInSess) ? "disabled" : false;
// //   },
// //   reportMsg : function() {
// //     return Session.get(keyReportMsgInSess);
// //   },
// //   reportParam : function() {
// //     var data = Session.get(keyReportParamInSess);
// //     var param = false;
// //     if (data) {
// //       param = data.reportParam;
// //       if (param) {
// //         var selectedTab = Session.get(keyWifidiagCurrentTab);
// //         if (!selectedTab || (selectedTab === "two")) {
// //           param.radio = 1;
// //         } else if (selectedTab === "five") {
// //           param.radio = 2;
// //         }
// //       }
// //     }
// //     return param;
// //   },
// //   mapDevice : function() {
// //     var device = Session.get(keyIsMapDevice);
// //     return device;
// //   },
// //   reportPath : function() {
// //     return Session.get(keyReportPathInSess) + Session.get(keyReportParamInSess).reportName;
// //   }
// // });

// var clearUnifiedWifi = function() {
//   Session.set(keyUnifiedWiFiData);
//   Session.set(keyUnifiedWifiError);
//   Session.set(keySelectedSta);
//   Session.set(keyLoadSteeringEvents, false);
// };

// var retrieveUnifiedWifiData = function() {
//   var currentDevice = Utils.getSerialNumber();
//   Meteor.call('getUnifiedWiFiData', Utils.getOrgId(), currentDevice, function (error, result) {
//     //check if result if for our device
//     if (!!result && _.has(result, "deviceId") && (result["deviceId"] === currentDevice)) {
//       Session.set(keyWifidiagLoading, false);
//       Session.set(keyUnifiedWiFiData, result["data"]);
//       if (error) {
//         var errorMessage = _.has(error, "reason") ? error.reason : JSON.stringify(error);
//         Session.set(keyUnifiedWifiError, errorMessage);
//       } else {
//         // TODO: new implementation
//         Meteor.call('getMapDevice', Utils.getOrgId(), currentDevice,function(err,response){
//           console.log('capability-device>>>>>',JSON.stringify(response));
//           if(err){
//             /*error parameter*/
//             //Session.set(keyUnifiedWiFiData, result["data"]);
//           } else{
//               // let response = {"supported":false};
//                let mapSupported = (response.supported)?response.supported:false;
//                Session.set(KEY_MAP_DEVICE,mapSupported);
//                 if(response.supported){
//                   Meteor.call('getMapWifiScore', Utils.getOrgId(), currentDevice,'avg',function(error,avgResult){ 
//                        if(error){

//                        }
//                        else{
//                         console.log('Average wifiscore result>>>>>',JSON.stringify(avgResult));
//                         _.each(result["data"], function(tableObj) {
//                           var mac = tableObj.MACAddress.toUpperCase();
//                           _.find(avgResult, function(avgObj) {
//                             if (avgObj.client && avgObj.client.toUpperCase() === mac) {
//                               console.log("Found one match in map avg score history:" + JSON.stringify(avgObj));
//                               tableObj.quality_score = avgObj.score;
//                               return;
//                             }
//                           });
//                         });
//                         Session.set(keyUnifiedWiFiData, result["data"]);
//                         Meteor.call('getMapWifiScore', Utils.getOrgId(), currentDevice,'current',function(error,curResult){
//                           if(error){

//                           }
//                           else{
//                             console.log('current wifiscore result>>>>>',JSON.stringify(curResult));
//                             _.each(result["data"], function(tableObj) {
//                               var mac = tableObj.MACAddress.toUpperCase();
//                               _.find(curResult, function(curObj) {
//                                 if (curObj.client && curObj.client.toUpperCase() === mac) {
//                                   console.log("Found one current match in map avg score history:" + JSON.stringify(curObj));
//                                   tableObj.current_score = curObj;
//                                   return;
//                                 }
//                               });
//                             });
//                             Session.set(keyUnifiedWiFiData, result["data"]);
//                           } 
//                         });
//                        }
//                    });  
//                 }
//                 else{
//                   Session.set(keyUnifiedWiFiData, result["data"]);
//                 }
//               }

//         });

//       }
//     }
//   });
// };

// // var retrieveSteeringEvents = function(selectedSta) {
// //   if (!!selectedSta && !Session.get(keyLoadingSteeringEvents)) {
// //     var macAddress;
// //     if (selectedSta && _.has(selectedSta, 'MACAddress')) {
// //       macAddress = selectedSta['MACAddress'];
// //       if (!!macAddress) {
// //         Session.set(keyLoadingSteeringEvents, true);
// //         Meteor.call('getSteeringEvents', Utils.getOrgId(), Utils.getSerialNumber(), macAddress, function (error, result) {
// //           Session.set(keyLoadingSteeringEvents, false);
// //           if (error) {
// //             var errorMessage = _.has(error, "reason") ? error.reason : JSON.stringify(error);
// //             Session.set(keyUnifiedWifiError, errorMessage);
// //           } else {
// //             Session.set(keySteeringEvents, result);
// //           }
// //         });
// //       }
// //     }
// //   }
// // };

// /**
//  * Convert kilo to mega
//  */
// var convertToMbps = function (pValue) {
//   var intVal = parseInt(pValue);
//   if (!isNaN(intVal)) {
//     return Math.round(intVal / 1000);
//   }
// };

// // Param whose values must be converted from kbps to Mbps
// const attrList = ['PhyRateTx', 'PhyRateRx'];

// // Template.unifiedWifiTemplate.helpers({
// //   wifiClientDevice: function() {
// //     var data = Session.get(keyUnifiedWiFiData);
// //     //convert PHY Rates from kbps to Mbps,
// //     //and X_000631_Mode to Radio.standardMap values
// //     if (data && _.isArray(data) && data.length > 0){
// //       for (var j = 0; j < data.length; j++) {
// //         var row = data[j];
// //         if (row) {
// //           for (var i = 0; i < attrList.length; i++) {
// //             var attrName = attrList[i];
// //             if (_.has(row, attrName)) {
// //               var convertedValue = convertToMbps(row[attrName]);
// //               if (convertedValue) {
// //                 convertedValue += "Mbps";
// //                 data[j][attrName] = convertedValue;
// //               }
// //             }
// //           }

// //           if (_.has(row, ['X_000631_Mode'])) {
// //             var modeValue = row['X_000631_Mode'];
// //             if (modeValue) {
// //               if (modeValue.startsWith('802.11')) {
// //                 data[j]['X_000631_Mode'] = modeValue;
// //               } else {
// //                 data[j]['X_000631_Mode'] = '802.11' + modeValue;
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //     return data;
// //   }, // TODO : new implementation
// //   getMapDeviceFlag: function(){
// //     let mapSupported = Session.get(KEY_MAP_DEVICE);
// //     console.log('Session.get(Const.KEY_MAP_DEVICE)>>>>1',mapSupported);
// //       // TODO: new implementation for map
// //     return mapSupported;
// //    },
// //   isHistoryDsUsSupported: function(sn) {
// //     //Get Map info
// //     let paramObj = {
// //       "orgId":Utils.getOrgId(),
// //       "serialNumber":sn
// //     };
// //     let ret = Session.get('map-supported-'+Utils.getOrgId()+'-'+sn);

// //     if (_.isUndefined(ret)){
// //       Meteor.call('checkMapDevice', paramObj, function(error, results) {
// //         if (error) {
// //           Log.error('call checkMapDevice ERROR');
// //           return false;
// //         } else {
// //           Session.set('map-supported-'+Utils.getOrgId()+'-'+sn,results.supported);
// //           return results.supported;
// //         }
// //       });
// //     } else {
// //       return ret;
// //     }   

// //   },
// //    scoreColor: function(score) {
// //     return '#757575';
// //   },
// //   canMapPopOver: function(curScoreObj,avgScore){
// //     if (typeof avgScore !== "number") {
// //       return false
// //     }
// //     if (curScoreObj) {
// //       var score = curScoreObj.score;
// //       return _.isNumber(score) ? true : false;
// //     } else {
// //       return false
// //     }
// //    },
// //    isNumber: function(param) {
// //     return _.isNumber(param);
// //   },
// //   isUnifiedWiFiLoaded: function() {
// //     return isUnifiedWifiTab() ? Session.equals(keyWifidiagLoading, false) : true;
// //   },

// //   hasSteeringEventsLoading: function() {
// //     return isUnifiedWifiTab() ? Session.get("wifidiag.unifiedWifi.steeringEvents.loading") : false;
// //   },

// //   hasUnifiedWifiError: function() {
// //     return !!Session.get(keyUnifiedWifiError);
// //   },

// //   unifiedWifiErrorMessage: function() {
// //     return Session.get(keyUnifiedWifiError);
// //   },

// //   deviceType: function() {
// //     var iconValue = this['X_000631_Icon'];
// //     if (iconValue) {
// //       return nameMap[parseInt(iconValue)];
// //     }
// //   },

// //   selectedWifiClient: function() {
// //     return Session.get(keySelectedSta);
// //   },

// //   hostName: function () {
// //     return this.X_000631_HostName_Alias || this.HostName;
// //   },

// //   isSteeringEventsSupported: function () {
// //     return isSteeringEventSupported;
// //   },

// //   unifiedSignalIcon: function () {
// //     var signalStrength = parseInt(this['RSSIUpstream']);
// //     if (signalStrength >= (WifiThresholds.SignalOne) && signalStrength < (WifiThresholds.SignalTwo)) {
// //       return 'wifi-one';
// //     } else if (signalStrength >= (WifiThresholds.SignalTwo) && signalStrength < (WifiThresholds.SignalThree)) {
// //       return 'wifi-two';
// //     } else if (signalStrength >= (WifiThresholds.SignalThree) && signalStrength < (WifiThresholds.SignalFour)) {
// //       return 'wifi-three';
// //     } else if (signalStrength >= (WifiThresholds.SignalFour)) {
// //       return 'wifi-four';
// //     }
// //   },

// //   unifiedTooltip: function () {
// //     var content = '<i class="fa fa-fw fa-lg fa-ellipsis-v" data-toggle="popover" data-placement="left" title="';

// //     if (_.has(this, 'PacketsTransmittedUpstream') && this['PacketsTransmittedUpstream']) {
// //       content +=  Utils.getLabel("packetsTransmittedUS") + ": " + this['PacketsTransmittedUpstream'];
// //       content += "&#010;";//<br>;
// //     }

// //     if(_.has(this, 'PacketsTransmittedDownstream') && this['PacketsTransmittedDownstream']) {
// //       content += Utils.getLabel("packetsTransmittedDS") + ": " + this['PacketsTransmittedDownstream'];
// //       content += "&#010;";//<br>;
// //     }

// //     if (_.has(this, 'PacketsReTransmittedDownstream') && this['PacketsReTransmittedDownstream']) {
// //       content += Utils.getLabel("packetsReTransmittedDS") + ": " + this['PacketsReTransmittedDownstream'];
// //     }

// //     content += '"></i>';
// //     return content;
// //   }
// // });


// // Template.unifiedWifiTemplate.events({
// //   'dblclick .wifiClient': function (event) {
// //     event.stopPropagation();
// //     if (Session.equals(keyLoadingSteeringEvents, true)) {
// //       //Operation in progress; do nothing
// //       return false;
// //     } else {
// //       Session.set(keyLoadSteeringEvents, true);
// //       Session.set(keySelectedSta, this);
// //     }
// //   },
// //   'click .us-ds-history': (e, ui)=>{
// //     let sn = Utils.getSerialNumber();
// //     let mac = ui.$(e.currentTarget).data('mac');
// //     let name = ui.$(e.currentTarget).data('name');
// //     let orgId = Utils.getOrgId();
// //     console.log('>>>>>>>>>>>>>>us ds clicked', sn, orgId, mac, name);
// //     let tmp = {sn:sn, mac:mac, orgId:orgId, name:name};
// //     Session.set(Const.KEY_DS_US_HISTORY_DATA, tmp);
// //     $('#dsUsHistoryModal').modal('show');
// //   }
// // });

// // Template.unifiedWifiTemplate.onDestroyed(function() {
// //   clearUnifiedWifi();
// // });
// // Template.unifiedWifiTemplateTootlip.rendered = function() {
// //    this.$('[data-toggle="tooltip"]').tooltip();
// //    var containerID = "#wifiDetailContent";
// //    var wifiElm = $(this.find('.fa-info-circle'));
// //    var contenttooltip = Utils.getLabel('qualityHint');
// //   if (contenttooltip) {
// //     wifiElm.popover({
// //       container: containerID,
// //       content: contenttooltip,
// //       html: true
// //     });
// //   }
// // };

// // Template.steeringEventsTemplate.onCreated(function() {
// //   Tracker.autorun(function () {
// //     if (Session.get(keyLoadSteeringEvents)) {
// //       var selectedSta = Session.get(keySelectedSta);
// //       if (!Session.get(keyLoadingSteeringEvents)) {
// //         //if not already loading, go ahead and do it
// //         Session.set(keyLoadSteeringEvents, false);
// //         retrieveSteeringEvents(selectedSta);
// //       }
// //     }
// //   });
// // });

// // Template.steeringEventsTemplate.helpers({
// //   steeringEvents: function () {
// //     return Session.get(keySteeringEvents);
// //   },

// //   formattedTime: function () {
// //     return moment(this.startTime*1000).format(Utils.timeFormat);
// //   },

// //   loadingSteeringEvents: function () {
// //     return Session.get(keyLoadingSteeringEvents);
// //   },

// //   /**
// //    * Steering Event table title is Hostname,
// //    * or IP + MAC if Hostname doesn't exist,
// //    * optionally with deviceType
// //    */
// //   staTitle: function() {
// //     var title = "";
// //     if (_.has(this, "X_000631_HostName_Alias") && this["X_000631_HostName_Alias"]) {
// //       title += this["X_000631_HostName_Alias"];
// //     }
// //     else if (_.has(this, "HostName") && this["HostName"]) {
// //       title += this["HostName"];
// //     } else {
// //       if (_.has(this, "IPAddress") && this["IPAddress"]) {
// //         title += " " + this["IPAddress"];
// //       }
// //       if (_.has(this, "MACAddress") && this["MACAddress"]) {
// //         title += " " + this["MACAddress"];
// //       }
// //     }

// //     if (this["X_000631_Icon"]) {
// //       title += " " + nameMap[parseInt(this["X_000631_Icon"])];
// //     }

// //     return title;
// //   }
// // });

// // Template.steeringEventsTemplate.events({
// //   'click #refresh-steering-events': function(e) {
// //     e.stopPropagation();
// //     var selectedSta = Session.get(keySelectedSta);
// //     retrieveSteeringEvents(selectedSta);
// //   }
// // });

// // Radio Chart Template
// // Template.radioChartDisplay.onRendered(function() {
// //   var currentData = Template.currentData();
// //   var data = Session.get(keyRadioChartData);
// //   var chartType = Session.get(keyReportParamInSess);
// //   if (chartType.chartType === 'airtime') {
// // 	  var param = Session.get(mapRadioChartParam);
// //       renderAirtimeChart(data, param&&param.period_start, param&&param.period_end, param&&param.intervals);
// //   }

// //   if(chartType.chartType === "downstream1") {
// //     renderDownStreamChart(data);
// //   }

// //   function getAreaSplineChartData(data, yTitle, xCategories, areaColor) {
// //       return {
// //           credits: {
// //               enabled: false
// //           },
// //           exporting: {
// //               enabled: false
// //           },
// //           legend: {
// //             align: 'center',
// //             verticalAlign: 'top',
// //             x: 0,
// //             y: 0
// //           },
// //           chart: {
// //               type: 'areaspline'
// //           },
// //           title: {
// //               text: ''
// //           },
// //           subtitle: {
// //               text: ''
// //           },
// //           xAxis: {
// //               allowDecimals: false,
// //               categories: xCategories
// //           },
// //           yAxis: {
// //               title: {
// //                   text: yTitle
// //               }
// //           },
// //           colors: areaColor,
// //           tooltip: {
// //               shared: true,
// //               valueSuffix: '%',
// //               crosshairs: true
// //           },
// //           plotOptions: {
// //             areaspline: {
// //                   stacking: 'percent',
// //                   marker: {
// //                       enabled: false,
// //                       symbol: 'circle',
// //                       radius: 2,
// //                       states: {
// //                           hover: {
// //                               enabled: true
// //                           }
// //                       }
// //                   }
// //               },
// //               series: {
// //                   fillOpacity: 0.4,
// //                   events: {
// //                       legendItemClick: function(e) {
// //                           e.preventDefault();
// //                       }
// //                   }
// //               }
// //           },
// //           series: data
// //       }
// //   }

// //   function renderAirtimeChart(data, startDate, endDate, granularity) {
// // 	if (data && data[0] && startDate && endDate && granularity) {
// // 		var firstDate = data[0].time;
// // 		var offset = moment(firstDate).utcOffset();
// // 		var lnt = firstDate.length;
// // 		var hours = firstDate.slice(11, lnt - 7);
// // 		var minutes = firstDate.slice(14, lnt - 4);
// // 		var seconds = firstDate.slice(17, lnt - 1);

// // 		function intervals(startDate, endDate, granularity, offset, hours, minutes, seconds) {
// // 			if (granularity == "hr") {
// // 				granularity = 60;
// // 			}
// // 			if (granularity == "15min") {
// // 				granularity = 15;
// // 			}
// // 			var start = moment(startDate);
// // 			var end = moment(endDate);
// // 			start.hours(hours);
// // 			start.minutes(minutes);
// // 			start.seconds(seconds);
// // 			var result = [];
// // 			var current = moment(start.utcOffset(offset));
// // 			while (current <= end) {
// // 				var obj = {};
// // 				obj.time = current.format('YYYY-MM-DDTHH:mm:ss') + 'Z';
// // 				obj.channelUtilAvg = null;
// // 				obj.channelInterferenceAvg = null;
// // 				result.push(obj);
// // 				current.add(granularity, 'minutes');
// // 			}
// // 			return result;
// // 		}
// // 		var timeFrame = intervals(new Date(startDate), new Date(endDate), granularity, offset, hours, minutes, seconds);
// // 		//console.log('timeFrame', timeFrame);
// // 		//console.log('data', data);
// // 		$.each(data, function(key, val) {
// // 			var ddate = val.time.slice(0, 16);
// // 			Object.keys(timeFrame).forEach(function(key) {
// // 				if (timeFrame[key].time.slice(0, 16) == ddate) {
// // 					delete timeFrame[key];
// // 				}
// // 			});
// // 		});
// // 		timeFrame = timeFrame.filter(function(el) {
// // 			return el != null;
// // 		});
// // 		//console.log('timeFrame filtered', timeFrame)
// // 		var timeFrame = data.concat(timeFrame)
// // 		//console.log('data timeFrame concat', timeFrame)
// // 		var timeFrame = timeFrame.sort((function(a, b) {
// // 			return new Date(a.time) - new Date(b.time)
// // 		}));
// // 		//console.log('sortedData', timeFrame)
// // 		//data = timeFrame; /* CCL-11770 Temporary Fix */
// // 	}
// //     if(data) {
// //       let chartData = [];
// //       let yChartTime = [];
// //       let hisData = [{
// //           name: Support.i18n('airTimeFree'),
// //           data: []
// //       }, {
// //           name: Support.i18n('airTimeUsed'),
// //           data: []
// //       }, {
// //           name: Support.i18n('airTimeInter'),
// //           data: []
// //       }];
// //       let isMapDevice = Session.get(KEY_MAP_DEVICE);
// //       if (isMapDevice) {
// //         $.each(data, function(k, v) {
// //             let d = new Date(data[k].time);
// //             if (_.isNull(data[k].channelUtilAvg) || _.isNull(data[k].channelInterferenceAvg)) {
// //                 hisData[0].data.push(null);
// //                 hisData[1].data.push(null);
// //                 hisData[2].data.push(null);
// //             } else {
// //                 hisData[0].data.push(parseFloat((100 - (data[k].channelUtilAvg + data[k].channelInterferenceAvg)).toFixed(1)));
// //                 hisData[1].data.push((data[k].channelUtilAvg));
// //                 hisData[2].data.push((data[k].channelInterferenceAvg));
// //             }
// //             yChartTime.push(moment(d).format("MM/DD HH:mm"));
// //         });
// //       } else {
// //         _.each(data, (r)=>{
// //           if (_.isUndefined(r.channelutilizationavg) || _.isUndefined(r.channelinterferencetimeavg) || _.isUndefined(r.free)){
// //             hisData[0].data.push(null);
// //             hisData[1].data.push(null);
// //             hisData[2].data.push(null);
// //           } else {
// //             hisData[0].data.push(parseFloat((r.free/10).toFixed(1)));
// //             hisData[1].data.push(parseFloat((r.channelutilizationavg/10).toFixed(1)));
// //             hisData[2].data.push(parseFloat((r.channelinterferencetimeavg/10).toFixed(1)));
// //           }
// //           let t = r.timestamp < 10000000000 ? r.timestamp*1000 : r.timestamp;
// //           yChartTime.push(moment(t).format("MM/DD HH:mm"));
// //         })
// //       }

// //       Highcharts.chart(currentData.chart_id, getAreaSplineChartData(hisData, Support.i18n('percentage'), yChartTime, ['green', 'yellow', 'red']));
// //     }  
// //   }

// //   function renderDownStreamChart(data) {
// //     if(data) {

// //       let pktsDroppedDwn = [];
// //       let pktsTxDown = [];
// //       let pktsReTxDwn = [];
// //       let time = [];

// //       let isMapDevice = Session.get(KEY_MAP_DEVICE);
// //       if (isMapDevice) {
// //         data.forEach(function(element, value, index) {
// //           if(element.pktsTxDown != 0) {
// //               let pktsTxDwn = Math.round(element.pktsTxDown * 100) / 100;
// //               pktsTxDown.push(pktsTxDwn);
// //               let pktsDroppdDown = (element.pktsDroppedDwn / element.pktsTxDown)*100;
// //               pktsDroppdDown = Math.round(pktsDroppdDown * 100) / 100;
// //               pktsDroppedDwn.push(pktsDroppdDown);
// //               let pktsReTxDown = (element.pktsReTxDwn / element.pktsTxDown)*100;
// //               pktsReTxDown = Math.round(pktsReTxDown * 100) / 100;
// //               pktsReTxDwn.push(pktsReTxDown);
// //           } else {
// //               pktsTxDown.push(0);
// //               pktsDroppedDwn.push(0);
// //               pktsReTxDwn.push(0); 
// //           }
// //           let timeString = new Date(element.time);
// //           time.push(moment(timeString).format("MM/DD HH:mm"));
// //         });
// //       } else {
// //         _.each(data, (r)=>{
// //           if (!r.packetstransmitteddownstream) {
// //             pktsTxDown.push(0);
// //             pktsDroppedDwn.push(0);
// //             pktsReTxDwn.push(0);
// //           } else {
// //             pktsTxDown.push(r.packetstransmitteddownstream);
// //             pktsDroppedDwn.push(parseFloat((r.packetsdroppeddownstream/r.packetstransmitteddownstream*100).toFixed(1)));
// //             pktsReTxDwn.push(parseFloat((r.packetretransmitteddownstream/r.packetstransmitteddownstream*100).toFixed(1)));
// //           }
// //           let t = r.timestamp < 10000000000 ? r.timestamp*1000 : r.timestamp;
// //           time.push(moment(t).format("MM/DD HH:mm"));
// //         })
// //       }

// //       Highcharts.chart(currentData.chart_id, {
// //           chart: {
// //             type: 'line'
// //           },
// //           title: {
// //             text: ''
// //           },
// //           xAxis: {
// //             categories: time
// //           },
// //           yAxis: [{ // Primary yAxis
// //               labels: {
// //                   format: '{value}'
// //               },
// //               title: {
// //                   text: 'Packets Retransmitted - Down (%)'
// //               }
// //           }, { // Secondary yAxis
// //               gridLineWidth: 0,
// //               title: {
// //                   text: 'Packets Dropped - Down (%)'
// //               },
// //               labels: {
// //                   format: '{value}'
// //               },
// //               opposite: true
// //           }, { // Tertiary yAxis
// //               gridLineWidth: 0,
// //               title: {
// //                   text: 'Packets Transmitted - Down'
// //               },
// //               labels: {
// //                   format: '{value}'
// //               },
// //               opposite: true
// //           }],
// //           plotOptions: {
// //               line: {
// //                   enableMouseTracking: true,
// //               },
// //               series: {
// //                   marker: {
// //                       enabled: false
// //                   }
// //               }
// //           },
// //           tooltip: {
// //               shared: true,
// //               crosshairs: true,
// //           },
// //           series: [
// //               {
// //                   name: 'Packets Retransmitted - Down (%)',
// //                   color: '#e87b00',
// //                   yAxis: 1,
// //                   data: pktsReTxDwn
// //               }, {
// //                   name: 'Packets Dropped - Down (%)',
// //                   color: '#ff0000',
// //                   data: pktsDroppedDwn
// //               }, {
// //                   name: 'Packets Transmitted - Down',
// //                   color: '#008000',
// //                   yAxis: 2,
// //                   data: pktsTxDown
// //               }
// //           ],
// //           legend: {
// //               align: 'center',
// //               verticalAlign: 'top',
// //               backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
// //           },
// //           exporting: { 
// //               enabled: false 
// //           }
// //       });
// //     }
// //   }
// // }); 
// // Template.radioChartDisplay.onDestroyed(function() {
// //   clearRadioChart();  
// // });

// var clearRadioChart = function() {
//   Session.set(keyRadioChartData);
//   Session.set(mapRadioChartParam)
//   Session.set(keyReportLoadindInSess, false);
//   Session.set(keyReportLoadedInSess, false);
// }
// // Template.radioChartDisplay.helpers({
// //   getRadioChartData: function() {
// //       var data = Session.get(keyRadioChartData);
// //       return data;
// //   },
// //   getRadioChartType: function() {
// //       var chartType = Session.get(keyReportParamInSess);
// //       return chartType;
// //   },
// //   refreshFlag: function() {
// //     return keyWifidiagLoading;
// //   },
// //   refresh : function() {
// //     var rv = Session.get(keyReportPathInSess) && !Session.get(keyReportLoadindInSess) && Session.get(keyReportLoadedInSess);
// //     Session.set("auto.scale.button.display", "none");
// //     if (rv) {
// //       var param = Session.get(radioChartParam);
// //       debug("Report Param", param);
// //       if (param) {
// //         var reportNameKey = param.chartType;
// //         if ("downstream1" == reportNameKey ||
// //             "downstream2" == reportNameKey) {
// //           Session.set("auto.scale.button.display", "block");
// //         }
// //       }
// //     }
// //     return rv;
// //   },
// // });

// var Utils =  {};

// Utils.getValueByPath = function(object, path) {
//   var value = object,
//     pathArray, i, k, match, re;

//   if (!_.isString(path)) return object;
//   pathArray = path.split('.');

//   if (value == null) return null;

//   for (i = 0; i < pathArray.length; i++) {
//     if (pathArray[i].length == 0) continue;
//     match = /^\/(.*)\/$/.exec(pathArray[i]);
//     if (match == null) {
//       // normal path
//       value = value[pathArray[i]];
//     } else {
//       // regexp, e.g. /xxx/
//       re = new RegExp(match[1]);
//       var mk = null;
//       for (k in value) {
//         if (re.test(k)) {
//           mk = k;
//           break;
//         }
//       }
//       if (mk == null) value = null;
//       else value = value[mk];
//     }
//     if (value == null) break;
//   }

//   return value;
// };
var TR_181_DATA_MODEL_NAME = 'tr181',
  TR_181_DATA_MODEL_ROOT = 'Device',
  TR_098_DATA_MODEL_NAME = 'tr098',
  TR_098_DATA_MODEL_ROOT = 'InternetGatewayDevice';

var Utils = {};
var keyNs = 'sxacc.';
var DEFAULT_PAGE_SIZE = 10;

//SXACC-3754 Default page size = 10 everywhere
Utils.getTR098DataModelName = function () {
  return TR_098_DATA_MODEL_NAME;
};

Utils.getTR181DataModelName = function () {
  return TR_181_DATA_MODEL_NAME;
};

Utils.isTR181 = function (dataModelName) {
  return Utils.getTR181DataModelName() === dataModelName;
};

Utils.isTR098 = function (dataModelName) {
  return !Utils.isTR181(dataModelName);
};

Utils.getDataModel = function (dataModelName) {
  return Utils.isTR181(dataModelName) ? tr181DataModel : tr098DataModel;
};

Utils.getDefaultPageSize = function () {
  return DEFAULT_PAGE_SIZE;
};

var getUrlParamAll = Utils.getUrlParamAll = function () {
  var paramArray = [],
    hash, hashArray = window && window.location.search.substring(1).split('&');

  if (hashArray != null) {
    for (var i = 0; i < hashArray.length; i++) {
      hash = hashArray[i].split('=');
      paramArray.push(hash[0]);
      paramArray[hash[0]] = hash[1];
    }
  }

  return paramArray;
};

var getParamQuery = function () {
  return Router.current().params.query;
};

Utils.getOrgId = function () {
  // var userSession = ccl.userSession.get();
  // if (Utils.isInSXA()) {
  //   if (userSession != null) return userSession.organization.id.toString();
  //   else return getUrlParamAll()['orgId'];
  // } else if (Utils.isInCCL()) {
  //   if (userSession != null) return userSession.orgId.toString();
  //   else {
  //     var subscriber = Session.get(Support.Const.KEY_SUBSCRIBER);
  //     if (subscriber != null) return subscriber.orgId.toString();
  //     else return getUrlParamAll()['orgId'];
  //   }
  // }
  return localStorage.getItem('calix.org_id')
};

var getSerialNumber = Utils.getSerialNumber = function () {
  var serialNumber = JSON.parse(localStorage.getItem('serialNumber'));
  return serialNumber

};

Utils.getCpeId = function () {
  return Utils.buildCpeId(getSerialNumber());
};

Utils.getUsername = function () {
  if (Utils.isInSXA()) {
    var userSession = ccl.userSession.get();
    if (userSession != null) return userSession.userName || 'Dummy CSR User';
  } else if (Utils.isInCCL()) {
    var userSession = ccl.userSession.get();
    if (userSession != null) {
      return userSession.userName || 'Dummy CSR User';
    }
  }
};

var getKeyNs = Utils.getKeyNs = function () {
  var sn = getSerialNumber();
  if (!sn) sn = '<empty>';
  return keyNs + sn + '.';
};

var getDeviceInfoKey = Utils.getDeviceInfoKey = function () {
  return getKeyNs() + 'device-info';
};

Utils.getDeviceInfo = function () {
  var key = getDeviceInfoKey();

};
Utils.get24gRadioPathCalix = function () {
  // var di = Utils.getDeviceInfo();
  // if (!di) return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";
  // return Utils.getConfigurationValueInner("featureSupported.wlan24G.radioPathCalix", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
  //     || "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";
  return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";

};
Utils.get5gRadioPathCalix = function () {
  // var di = Utils.getDeviceInfo();
  // if (!di) return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.";
  // return Utils.getConfigurationValueInner("featureSupported.wlan5G.radioPathCalix", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
  //   || "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.";
  return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.";
};
Utils.getValueByPath = function (object, path) {
  var value = object,
    pathArray, i, k, match, re;

  if (!_.isString(path)) return object;
  pathArray = path.split('.');

  if (value == null) return null;

  for (i = 0; i < pathArray.length; i++) {
    if (pathArray[i].length == 0) continue;
    match = /^\/(.*)\/$/.exec(pathArray[i]);
    if (match == null) {
      // normal path
      value = value[pathArray[i]];
    } else {
      // regexp, e.g. /xxx/
      re = new RegExp(match[1]);
      var mk = null;
      for (k in value) {
        if (re.test(k)) {
          mk = k;
          break;
        }
      }
      if (mk == null) value = null;
      else value = value[mk];
    }
    if (value == null) break;
  }

  return value;
};
Utils.getParameterRealAttributeBS = function (path) {
  // var di = Utils.getDeviceInfo();
  // if (!di) return null;
  // return Utils.getParameterRealAttributeInner(path, di.modelName, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
  return 'X_000631_OperatingChannelBandwidth';
};

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
  } else if ((x > 148) && (x < 168)) {
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

// SXACC-6410, Deal with blocks, especially for 5GHz
var getSpan = function (curChannel, curBandwidth) {
  var SPAN = 4;
  var result = {};
  var curSpan = 0;
  if (!isRadioFive()) {  // 2.4GHz
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
    result.leftSpan = curSpan;
    result.rightSpan = curSpan;
    result.step = 1;
    return result;
  }

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
    case Band80_80:
      modValue = 8;
      break;
    case Band160:
      modValue = 8;
      break;
  };

  if (modValue != null) {
    modResult = Math.floor(curChannel / SPAN) % modValue;
    totalSpan = modValue * 4;
    if (modResult === 0) {  // Right-most
      result.leftSpan = totalSpan - 2;
    } else {
      result.leftSpan = (modResult - 1) * SPAN + 2;
    }
    result.rightSpan = totalSpan - result.leftSpan;
  }
  result.step = 2;
  return result;
};

var radio24ChannelList = [11, 1, 6];

var radio5ChannelList = {
  'dfsEnabled': {
    '20MHz': [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 132, 136, 149, 153, 157, 161],
    '40MHz': [36, 44, 52, 60, 100, 108, 132, 149, 157],
    '80MHz': [36, 52, 100, 132, 149],
    '160MHz': [36, 100]
  },
  'dfsDisabled': {
    '20MHz': [36, 40, 44, 48, 149, 153, 157, 161],
    '40MHz': [36, 44, 149, 157],
    '80MHz': [36, 149],
    '160MHz': [36]
  }
};
// var isRadioFive = function() {
//   return false;
// };
var isRadioFive = function () {
  var currentTab = localStorage.getItem('currentTab');
  return currentTab == 'five' ? true : false
};

// var getRadioObj = function() {
//   var data = JSON.parse(localStorage.getItem(keyWifidiagSiteScan));

//   return ({
//     'channel': 1,
//     'SSID': data.sn,
//     'bandwidth':""
//   });
// };

var getRadioObj = function () {
  var data = JSON.parse(localStorage.getItem(keyWifidiagData));

  var mergedObj, radioGigaObj, radioObj, wlanObj;

  if (mock) {
    data = wifimock.wlans;
  }

  wlanObj = Utils.getValueByPath(data, wlanPath);
  radioGigaObj = Utils.getValueByPath(data, radioPathGiga);
  radioObj = Utils.getValueByPath(data, radioPath);

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
    var ssids = getSsids();
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
/**
 * Get Central Channel
 * @param channel
 * @param leftSpan
 * @param rightSpan
 * @returns {*}
 */
var getCentralChannel = function (channel, leftSpan, rightSpan) {
  var centralChannel = channel;
  if (isRadioFive()) {
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
var getBlankEntry = function (mainSsidId, signalKeyList, bandwidthList) {
  var channel = {};
  channel[mainSsidId] = BLANK;
  _.each(signalKeyList, function (key) {
    channel[key] = BLANK;
  });
  _.each(bandwidthList, function (bandwidth) {
    channel[bandwidth] = BLANK;
  });
  return channel;
};

/**
 * Get Bandwidth list for Busyness
 *
 * @param radio
 * @param busynessesGroupByChannel
 * @param channelList
 * @param bandwidthList
 */
var getBusynessBandwidthList = function (
  radio,
  busynessesGroupByChannel,
  channelList,
  bandwidthList
) {
  var currentBand = radio[wlanOperatingChannelBandwidthStore];
  var targetBandwidthList = [];



  // Only display 20MHz busyness for 2.4GHz
  if (!isRadioFive() && currentBand != null && currentBand.toUpperCase() === Band40) {
    return targetBandwidthList;
  }

  // Only display busyness of 1, 6, 11 for 2.4GHz
  var limitedBusynessDisplayChannels = JSON.parse(localStorage.getItem('radio24ChannelList'));;
  // Busyness displayed for 5GHz is related to DFS status
  if (isRadioFive()) {
    limitedBusynessDisplayChannels = JSON.parse(localStorage.getItem('radio5ChannelList'));;
  }
  _.each(channelList, function (channel) {
    channel = parseInt(channel);
    if (_.includes(limitedBusynessDisplayChannels, channel)) {
      _.each(bandwidthList, function (bandwidth) {
        if (_.has(busynessesGroupByChannel[channel], bandwidth)) {
          if (!_.includes(targetBandwidthList, bandwidth)) {
            targetBandwidthList.push(bandwidth);
          }
        }
      });
    }
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
var prepareMainSSIDLines = function (
  interpolatedChannels,
  annotations,
  mainSSID,
  radio,
  signalKeyList,
  bandwidthList
) {
  var mainChannel = mainSSID.channel;
  var mainId = mainSSID.id;
  if (radio[wlanOperatingChannelBandwidthStore] == null) {
    var span = getSpan(mainChannel, null);//'20MHZ');
  } else {
    var span = getSpan(mainChannel, radio[wlanOperatingChannelBandwidthStore].toUpperCase());
  }
  if (span.leftSpan == null) {
    var interpolatedChannel_start = mainChannel;
  } else {
    var interpolatedChannel_start = mainChannel - span.leftSpan;
  }
  if (span.rightSpan == null) {
    var interpolatedChannel_end = mainChannel;
  } else {
    var interpolatedChannel_end = mainChannel + span.rightSpan;
  }
  _.each(_.range(interpolatedChannel_start - 1, interpolatedChannel_end + 1), function (interpolatedChannel) {
    if (interpolatedChannels[interpolatedChannel] == null) {
      interpolatedChannels[interpolatedChannel] = getBlankEntry(mainId, signalKeyList, bandwidthList);
    }
    if (interpolatedChannel === interpolatedChannel_start - 1 || interpolatedChannel === interpolatedChannel_end) {
      interpolatedChannels[interpolatedChannel][mainId] = -100;
    } else {
      interpolatedChannels[interpolatedChannel][mainId] = 0;
    }
  });


  var siteScanResult = JSON.parse(localStorage.getItem(keyWifidiagSiteScan));
  var detailInfos = "";
  var mainSSIDName = mainSSID.name;
  if (siteScanResult && siteScanResult.ssidNameInfo) {
    var ssidNames = false;
    if (isRadioFive()) {
      ssidNames = siteScanResult.ssidNameInfo.wlan5;
    } else {
      ssidNames = siteScanResult.ssidNameInfo.wlan2;
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

  var mainSSIDAnnotation = {
    mainSSID: true,
    series: mainSSID.id,
    x: mainChannel,
    height: 27,
    shortText: mainSSID.name,
    text: detailInfos,
    width: 180
  };
  annotations.push(mainSSIDAnnotation);
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
var prepareBusynessLines = function (
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
  var limitedBusynessDisplayChannels = radio24ChannelList;
  if (isRadioFive()) {
    limitedBusynessDisplayChannels = radio5ChannelList;
  }

  _.each(channelList, function (channel) {
    channel = parseInt(channel);
    if (limitedBusynessDisplayChannels.indexOf(channel) === -1) {
      if (interpolatedChannels[channel] == null) {
        interpolatedChannels[channel] = getBlankEntry(mainSSID.id, signalKeyList, bandwidthList);
      }
      return;
    }

    _.each(bandwidthList, function (bandwidth) {
      var span = getSpan(channel, bandwidth);

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
        annotationObj.x = getCentralChannel(channel, span.leftSpan, span.rightSpan);
        annotations.push(annotationObj);
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
var prepareSignalLines = function (
  interpolatedChannels,
  annotations,
  mainSSID,
  signalsGroupBySSID,
  ssidList,
  signalKeyList,
  bandwidthList
) {
  _.each(ssidList, function (ssid) {
    _.each(signalsGroupBySSID[ssid], function (signal) {
      var channel = parseInt(signal['channel']);
      var bandwidth = signal['channel_bandwidth'].toUpperCase();
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
      }
      annotations.push(annotationObj);

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

function getSiteScanObj() {

  //  var result = Session.get(keyWifidiagSiteScan);
  var result = JSON.parse(localStorage.getItem(keyWifidiagSiteScan));

  radio24ChannelList = JSON.parse(localStorage.getItem('radio24ChannelList'));;
  if (isRadioFive()) {
    radio5ChannelList = JSON.parse(localStorage.getItem('radio5ChannelList'));;
  }
  if (result == null) {
    return null;
  }

  var busynesses = result.busyness;

  var signals = result.neighbor;
  var radioValue = isRadioFive() ? "5g" : "24g";
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

  // var channelsSelected = currentChannelFiter.get();
  // if (channelsSelected && channelsSelected.length > 0) {
  //   busynesses = _.filter(busynesses, function(busyness) {
  //     return _.contains(channelsSelected, busyness['channel']);
  //   });
  //   signals = _.filter(signals, function(signal) {
  //     return _.contains(channelsSelected, signal['channel']);
  //   });
  // }

  //group busyness by (channel,bandwidth)
  var busynessesGroupByChannel = _.groupBy(busynesses, function (busyness) {
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
  var busynessesGroupByBandwidth = _.groupBy(busynesses, function (busyness) {
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
  var mainSSIDObj = getMainSsidObj();
  var radio = getRadioObj();
  if (isRadioFive()) {
    radio[wlanOperatingChannelBandwidthStore] = "80MHz";
  } else {
    radio[wlanOperatingChannelBandwidthStore] = "20MHz";
  }

  //radio.bandwidth = bandwidthList[0];
  bandwidthList = getBusynessBandwidthList(radio, busynessesGroupByChannel, channelList, bandwidthList);

  prepareMainSSIDLines(interpolatedChannels, annotations, mainSSIDObj, radio, signalKeyList, bandwidthList);
  prepareBusynessLines(interpolatedChannels, annotations, mainSSIDObj, radio, busynessesGroupByChannel, channelList, signalKeyList, bandwidthList);
  prepareSignalLines(interpolatedChannels, annotations, mainSSIDObj, signalsGroupBySSID, ssidList, signalKeyList, bandwidthList);

  var addEmpty = function (channel) {
    if (!_.has(interpolatedChannels, channel)) {
      if (isRadioFive()) {
        if (_.contains(radio5ChannelList, channel)) {
          interpolatedChannels[channel] = getBlankEntry(mainSSIDObj.id, signalKeyList, bandwidthList);
        }
      } else {
        interpolatedChannels[channel] = getBlankEntry(mainSSIDObj.id, signalKeyList, bandwidthList);
      }
    }
  };

  var addSupplementChannels = function () {
    var currentTab = Session.get(keyWifidiagCurrentTab);
    if (currentTab === keyUnifiedWifiTabName) {
      return;
    }

    if (currentTab === keyWifiCurrentTabForTwo) {
      _.each(_.range(-1, 16), function (channel) {
        addEmpty(channel);
      });
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

  //addSupplementChannels();

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
  return siteScanObj;
};

var NORMAL = 'normal';

var busyness_colors = {};
busyness_colors[Band20] = {}, busyness_colors[Band40] = {}, busyness_colors[Band80] = {}, busyness_colors[Band160] = {};
busyness_colors[Band20][NORMAL] = '#FFA741';
busyness_colors[Band40][NORMAL] = '#FFA741';
busyness_colors[Band80][NORMAL] = '#FFA741';
busyness_colors[Band160][NORMAL] = '#FFA741';

//unused setVisibleForOne, clean up!
var setVisibleForOne = function (value, checked) {
  var siteScanObj = Session.get(keyWifidiagSiteScanObj);
  var bandwidthList = siteScanObj['bandwidthList'];
  var ssidList = siteScanObj['ssidList'];
  var signalKeyList = siteScanObj['signalKeyList'];
  var mainSSID = siteScanObj.mainSSID;
  var allkeysList = _.union(mainSSID.id, signalKeyList, bandwidthList);
  var index = _.indexOf(allkeysList, value);
  if (checked) {
    g.setVisibility(index, true);
  } else {
    g.setVisibility(index, false);
  }
};

var renderSelect2 = function () {
  $('#ssids').removeClass('hidden');
  $("#ssids").select2({
    placeholder: Utils.getLabel('ssid')
  }).on("change", function (e) {
    currentSsidFiter.set($("#ssids").val());
    renderSsidTable();
    renderSiteScanGraph(true);
  });
  $("#channel").removeClass('hidden');
  $("#channel").select2({
    placeholder: Utils.getLabel('channel')
  }).on("change", function (e) {
    currentChannelFiter.set($("#channel").val());
    //Session.set(keyWifidiagSiteScanObj,getSiteScanObj());
    renderSsidTable();
    renderSiteScanGraph(true);
  });
};
import Dygraph from 'dygraphs';
//var renderSiteScanGraph = function(reload) {
function renderSiteScanGraph(element) {
  var siteScanObj;
  var y1Top = 20;


  siteScanObj = getSiteScanObj();

  var lines = toCsv(siteScanObj);

  var bandwidthList = siteScanObj['bandwidthList'];

  var annotations = siteScanObj['annotations'];

  var ssidList = siteScanObj['ssidList'];

  var signalKeyList = siteScanObj['signalKeyList'];

  var mainSSID = siteScanObj.mainSSID;

  var lineLabels = getlabels(bandwidthList, signalKeyList);

  // Use step plot for Main SSID and busyness
  var stepPlotSeires = {
    'GigaCenterMainSSIDSeriesID': {
      stepPlot: true,
      strokeWidth: 3,
      strokePattern: Dygraph.DASHED_LINE,
      color: "#43367D"
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

  var currentTab = 'two';
  var axisLabelFormatter = (currentTab === 'five') ? axisLabelFormatterFor50 : axisLabelFormatterFor24;

  var getVisibleFlagList = function (ssids, bandwidths) {
    var allkeysList = _.union(mainSSID.id, signalKeyList, bandwidthList);
    var allSelectedIds = [];
    if (true) {
      if (!ssids) {
        allSelectedIds = _.union(allSelectedIds, ssidList);
      } else {
        allSelectedIds = _.union(allSelectedIds, ssids);
      }
    }
    if (!bandwidths) {
      allSelectedIds = _.union(allSelectedIds, bandwidthList);
    } else {
      allSelectedIds = _.union(allSelectedIds, bandwidths);
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
              matched.push(index);
            }
          } else if (startsWith(key, selected)) {
            matched.push(index);
          }
        });
      });
      return matched;
    };
    var flagList = [];
    _.each(allkeysList, function (key, index) {
      flagList.push(false);
    });
    flagList[0] = true; // Always display main SSID

    var visibleList = matchIndexesInAllKeysList(allSelectedIds);
    _.each(visibleList, function (index) {
      flagList[index] = true;
    });

    return flagList;

  };

  var ssids = "";
  var bandwidths = "";
  var visibleFlagList = getVisibleFlagList(ssids, bandwidths);

  g = new Dygraph(
    document.getElementById("graphdiv"),
    lines,
    {
      xlabel: 'Channel',
      ylabel: 'Power (dBm)',
      y2label: 'Busyness (%)',
      series: stepPlotSeires,
      legend: 'never',
      showRangeSelector: true,
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
          axisLabelFormatter: function (y) {
            if (y === 0) {
              return '';
            } else {
              return y;
            }
          },
          valueRange: [-100, y1Top]
        },
        y2: {
          pixelsPerLabel: 20,
          axisLabelFormatter: function (y2) {
            if (y2 === 0 || y2 > 100) {
              return '';
            } else {
              return y2;
            }
          },
          valueRange: [0, 120]
        }
      }
    }
  );
  g.setAnnotations(annotations);
};

var getMainSsidObj = function () {
  var radioObject = getRadioObj();
  return {
    id: "GigaCenterMainSSIDSeriesID",
    channel: eval(radioObject.Channel),
    name: radioObject.SSID
  };
};

function getlabels(bandwidthList, signalKeyList) {
  var ssidObj = getMainSsidObj();
  var labels = ["Channel", ssidObj.id];

  return labels.concat(signalKeyList, bandwidthList);
}

var toCsv = function (siteScanObj) {
  var interpolatedChannels = siteScanObj['interpolatedChannels'];
  var lines = "";

  _.each(interpolatedChannels, function (valueChannel, keyChannel) {
    lines += keyChannel + "," + _.values(valueChannel).join() + "\n";
  });

  return lines;
};