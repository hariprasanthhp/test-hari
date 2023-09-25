import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { wifiMockData } from './wifi-mock-data';


var keyNs = 'sxacc.';
const TR_181_DATA_MODEL_NAME = 'tr181';
const TR_181_DATA_MODEL_ROOT = 'Device';

@Injectable({
    providedIn: 'root'
})
export class DygraphSiteScanUtilsService {



    constructor(
        private http: HttpClient,
        public wifiMockData: wifiMockData
    ) { }

    getTR181DataModelName = function () {
        return TR_181_DATA_MODEL_NAME;
    };
    isTR181 = function (dataModelName) {
        return this.getTR181DataModelName() === dataModelName;
    };
    getSerialNumber = function () {
        var serialNumber = JSON.parse(sessionStorage.getItem('serialNumber'));
        return serialNumber
    };
    getParameterRealAttributeInner = function (path, model, cfg) {
        //  dd("getParameterRealAttributeInner >>> path [ "+path+" ] model [ "+model+" ]");
        var attribute = path.substring(path.lastIndexOf(".") + 1, path.length + 1);
        if (attribute.length < path.length) {
            //only full path supports alias
            if (cfg && cfg.parameterSupported) {
                for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
                    var paramFilter = cfg.parameterSupported[idx];
                    if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
                        if (paramFilter.alias && paramFilter.alias.length > 0) {
                            attribute = paramFilter.alias;
                        } else if (paramFilter.realPath && paramFilter.realPath.length > 0) {
                            attribute = paramFilter.realPath.substring(paramFilter.realPath.lastIndexOf(".") + 1, paramFilter.realPath.length + 1);
                        }
                        break;
                    }
                }
            } else {
                //console.log("Missing feature configuration for model [ " + model + " ]");
            }
        }
        return attribute;
    };
    getParameterRealAttributeBS = function (path) {
        var di = this.getDeviceInfo();
        if (!di) return null;
        return this.getParameterRealAttributeInner(path, di.modelName, this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));

    };
    isFeatureSupportedInner = function (feature, modelName, softwareVersion, configuration) {
        var result = false;
        if (feature) {
            var keys = feature.split(".");
            var iteratedConfig = this.getConfigurationValueInner(feature, configuration);
            if (iteratedConfig) {
                //TODO clean up condition below: === true doesn't need check for undefined!
                if (iteratedConfig.supported != undefined && iteratedConfig.supported === true) {
                    //   if (iteratedConfig.minSwVersion) {
                    //     result = this.compareVersion(softwareVersion, iteratedConfig.minSwVersion) >= 0;
                    //   } else {
                    //     result = true;
                    //   }
                    result = true;
                }
            }
        }
        return result;
    };
    isParameterSupportedInner = function (param, model, version, configuration) {
        if (configuration && configuration.parameterSupported) {
            for (var idx = 0; idx < configuration.parameterSupported.length; idx++) {
                var parameterObj = configuration.parameterSupported[idx];
                var parameterPattern = parameterObj.name;
                if (parameterPattern) {
                    if (new RegExp(parameterPattern).test(param)) {
                        // if (parameterObj.minSwVersion && version) {
                        //   return (Utils.compareVersion(version, parameterObj.minSwVersion) >= 0);
                        // } else {
                        //   return true;
                        // }
                        return true;
                    }
                }
            }
        } else {
            //console.log("isParameterSupported ... Cannot find feature configuration for " + model);
        }
        return false;
    };
    getParameterAttributeInner = function (path, attrName, model, cfg) {
        var realPath = path;
        if (cfg && cfg.parameterSupported) {
            for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
                var paramFilter = cfg.parameterSupported[idx];
                if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
                    return paramFilter[attrName];
                }
            }
        } else {
            //console.log("Missiong feature configuration for model [ " + model + " ]");
        }
    };
    getParameterAttributeBS = function (path, attrName) {
        var di = this.getDeviceInfo();
        if (!di) return null;
        return this.getParameterAttributeInner(path, attrName, di.modelName, this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };
    isParameterSupportedBS = function (path, modelName, dataModelName, swversion) {
        if (modelName == null) {
            var di = this.getDeviceInfo();
            if (!di) return false;
            modelName = di.modelName;
            swversion = di.softwareVersion;
            dataModelName = di.dataModelName;
        }
        return this.isParameterSupportedInner(path, modelName, swversion, this.getFeatureConfigurationBS(modelName, dataModelName, swversion));
    };
    isFeatureSupportedBS = function (feature, modelName, dataModelName, swversion) {
        if (modelName == null) {
            var di = this.getDeviceInfo();
            if (!di) return false;
            modelName = di.modelName;

            swversion = di.softwareVersion;
            dataModelName = di.dataModelName;
        }
        // console.trace();

        return this.isFeatureSupportedInner(feature, modelName, swversion, this.getFeatureConfigurationBS(modelName, dataModelName, swversion));
    };
    is24GWirelessSupported = function () {
        return this.isFeatureSupportedBS("featureSupported.wlan24G");
    };
    is5GWirelessSupported = function () {
        return this.isFeatureSupportedBS("featureSupported.wlan5G");
    };
    is6GWirelessSupported = function () {
        return this.isFeatureSupportedBS("featureSupported.wlan6G");
    };
    get5gPrimaryWlanPath = function () {
        var di = this.getDeviceInfo();
        if (!di) return null;
        var path = this.getConfigurationValueInner(
            "featureSupported.wlan5G.PrimarySSIDPath",
            this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
        if (path) {
            return path;
        }
        var wlanPath = this.get5gWlanPath();
        if (wlanPath == null || wlanPath.length == 0) {
            return null;
        }
        return wlanPath[0];
    };
    get6gPrimaryWlanPath = function () {
        var di = this.getDeviceInfo();
        if (!di) return null;
        var path = this.getConfigurationValueInner(
            "featureSupported.wlan6G.PrimarySSIDPath",
            this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
        if (path) {
            return path;
        }
        var wlanPath = this.get6gWlanPath();
        if (wlanPath == null || wlanPath.length == 0) {
            return null;
        }
        return wlanPath[0];
    };
    getConfigurationValueInner = function (path, configuration) {
        var keys = path.split(".");
        var iteratedConfig = configuration;
        for (var idx = 0; idx < keys.length; idx++) {
            var key = keys[idx];
            if (iteratedConfig) {
                iteratedConfig = iteratedConfig[key];
            } else {
                break;
            }
        }
        return iteratedConfig;
    };
    getFeatureConfigurationBS = function (pModel, dataModelName, swVersion) {

        var configArr = this.wifiMockData.configurations;
        ;
        if (pModel == null) {
            alert("model name cannot be null!");
            return;
        }

        var defaultFeatureConfig, dftTR181Cfg;
        var isTR181 = this.isTR181(dataModelName);
        var firstModelMatchedCfg = null;

        if (configArr && configArr.length && configArr.length > 0) {
            for (var idx = 0; idx < configArr.length; idx++) {
                var featureConfig = configArr[idx];

                if (featureConfig.models == null) {
                    continue;
                }

                if (featureConfig.models == "default") {
                    if (this.isTR181(featureConfig.dataModelName)) {
                        dftTR181Cfg = featureConfig;
                    } else {
                        defaultFeatureConfig = featureConfig;
                    }
                    continue;
                }

                for (var ii = 0; ii < featureConfig.models.length; ii++) {
                    var modelNameObj = featureConfig.models[ii];
                    var swVersions = featureConfig.swVersions;
                    var isCurTR181 = this.isTR181(featureConfig.dataModelName);

                    if (isTR181 === isCurTR181) {
                        if ("string" == typeof modelNameObj) {
                            if (pModel.toUpperCase() == modelNameObj.toUpperCase()) {
                                if (swVersions != null) {
                                    if (swVersion != null && swVersions.indexOf(swVersion) >= 0) {
                                        return featureConfig;
                                    }
                                } else {
                                    firstModelMatchedCfg = featureConfig;
                                }
                            }
                        } else {
                            if (modelNameObj.regex && pModel.match(modelNameObj.regex)) {
                                if (swVersions != null) {
                                    if (swVersion != null) {
                                        return featureConfig;
                                    }
                                } else {
                                    firstModelMatchedCfg = featureConfig;
                                }
                            }
                        }
                    }

                }
            }
        }

        if (firstModelMatchedCfg != null) {

            return firstModelMatchedCfg;
        }
        if (this.isTR181(dataModelName)) {
            return dftTR181Cfg;
        }
        return defaultFeatureConfig;
    };

    getDeviceInfo = function () {
        var deviceObj = JSON.parse(sessionStorage.getItem('calix.wifi.deviceInfo'));
        var di = deviceObj;
        return di;
    };
    get24gRadioPathCalix = function () {
        var di = this.getDeviceInfo();
        if (!di) return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";
        return this.getConfigurationValueInner("featureSupported.wlan24G.radioPathCalix", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
            || "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";
    };
    get24gRadioPath = function () {
        var di = this.getDeviceInfo();
        if (!di) return null;
        var radioPath;
        if (this.is24GWirelessSupported()) {
            radioPath = this.getConfigurationValueInner("featureSupported.wlan24G.radioPath", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
            if (radioPath == null) {
                radioPath = this.get24gPrimaryWlanPath();
            }
        }
        return radioPath;
    };
    get24gWlanPath = function () {

        var di = this.getDeviceInfo();
        if (!di) return null;
        if (this.is24GWirelessSupported()) {
            return this.getConfigurationValueInner("featureSupported.wlan24G.path", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
        }
    };
    get5gWlanPath = function () {
        var di = this.getDeviceInfo();
        if (!di) return null;
        if (this.is5GWirelessSupported()) {
            return this.getConfigurationValueInner("featureSupported.wlan5G.path", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
        }
    };
    get6gWlanPath = function () {
        var di = this.getDeviceInfo();
        if (!di) return null;
        if (this.is6GWirelessSupported()) {
            return this.getConfigurationValueInner("featureSupported.wlan6G.path", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
        }
    };
    get5gRadioPathCalix = function () {
        var di = this.getDeviceInfo();
        if (!di) return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.";
        return this.getConfigurationValueInner("featureSupported.wlan5G.radioPathCalix", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
            || "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.";
    };
    get6gRadioPathCalix = function () {
        var di = this.getDeviceInfo();
        if (!di) return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.3.";
        return this.getConfigurationValueInner("featureSupported.wlan6G.radioPathCalix", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
            || "InternetGatewayDevice.X_000631_Device.WiFi.Radio.3.";
    };
    get24gPrimaryWlanPath = function () {
        var di = this.getDeviceInfo();
        if (!di) return null;
        var path = this.getConfigurationValueInner("featureSupported.wlan24G.PrimarySSIDPath", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
        if (path) {
            return path;
        }
        var wlanPath = this.get24gWlanPath();
        if (wlanPath == null || wlanPath.length == 0) {
            return null;
        }
        return wlanPath[0];
    };
    get5gRadioPath = function () {
        var di = this.getDeviceInfo();
        if (!di) return null;
        var radioPath;
        if (this.is5GWirelessSupported()) {
            radioPath = this.getConfigurationValueInner("featureSupported.wlan5G.radioPath", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
            if (radioPath == null) {
                radioPath = this.get5gPrimaryWlanPath();
            }
        }
        return radioPath;
    };
    get6gRadioPath = function () {
        var di = this.getDeviceInfo();
        if (!di) return null;
        var radioPath;
        if (this.is6GWirelessSupported()) {
            radioPath = this.getConfigurationValueInner("featureSupported.wlan6G.radioPath", this.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
            if (radioPath == null) {
                radioPath = this.get6gPrimaryWlanPath();
            }
        }
        return radioPath;
    };
    getValueByPath = function (object, path) {
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


}


