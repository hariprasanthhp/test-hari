import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OntCategoryConfigurationService {

  constructor() { }

  public categoryConfigData(): Observable<{}> {
    const object = [{
      "_id": "5a1cea6a-3f7b-4667-b1ac-f1b421a4a449",
      "name": "2.4GHz WIFI Radio",
      "group": "Wi-Fi",
      "createTime": "2020-07-24T05:11:20.163Z",
      "description": "Define 2.4GHz Wi-Fi Radio Configurations parameters.",
      "displayName": "2.4GHz Wi-Fi Radio",
      "tr098PathPrefix": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.",
      "parameters": [{
        "name": "RadioEnabled",
        "type": "boolean",
        "description": "Enables or disables the Radio.",
        "displayName": "Wi-Fi Radio"
      }, {
        "name": "Standard",
        "type": "string",
        "valueEnums": [{
          "value": "bgn",
          "displayName": "802.11b, 802.11g and 802.11n"
        }, {
          "value": "gn",
          "displayName": "802.11g and 802.11n"
        }, {
          "value": "n",
          "displayName": "802.11n"
        }, {
          "value": "bg",
          "displayName": "802.11b and 802.11g"
        }, {
          "value": "g",
          "displayName": "802.11g"
        }, {
          "value": "b",
          "displayName": "802.11b"
        }, {
          "value": "ng",
          "displayName": "802.11n and 802.11g"
        }, {
          "value": "ax",
          "displayName": "802.11ax, 802.11n and 802.11g"
        }],
        "description": "Indicates which IEEE 802.11 standard this Radio is configured for.",
        "displayName": "Mode"
      }, {
        "name": "X_000631_OperatingChannelBandwidth",
        "type": "string",
        "valueEnums": [
          {
            "value": "20MHz",
            "displayName": "20MHz"
          },
          {
            "value": "40MHz",
            "displayName": "40MHz"
          }
        ],
        "description": "Indicates the operating channel bandwidth.",
        "displayName": "Bandwidth"
      }, {
        "name": "TransmitPower",
        "type": "unsignedInt",
        "valueEnums": [{
          "value": 100,
          "displayName": "100%"
        }, {
          "value": 90,
          "displayName": "90%"
        }, {
          "value": 80,
          "displayName": "80%"
        }, {
          "value": 75,
          "displayName": "75%"
        }, {
          "value": 70,
          "displayName": "70%"
        }, {
          "value": 60,
          "displayName": "60%"
        }, {
          "value": 50,
          "displayName": "50%"
        }, {
          "value": 40,
          "displayName": "40%"
        }, {
          "value": 30,
          "displayName": "30%"
        }, {
          "value": 25,
          "displayName": "25%"
        }, {
          "value": 20,
          "displayName": "20%"
        }, {
          "value": 10,
          "displayName": "10%"
        }],
        "description": "Indicates the current transmit power level as a percentage of full power. The value MUST be one of the values reported by the TransmitPowerSupported parameter.",
        "displayName": "Power Level"
      }, {
        "name": "X_CALIX_MulticastForwardEnable",
        "type": "boolean",
        "description": "Enables or disables Multicast Forwarding.",
        "displayName": "Multicast Forwarding"
      }, {
        "name": "X_000631_AirtimeFairness",
        "type": "boolean",
        "description": "Enables or disables airtime fairness for WiFi.",
        "displayName": "Airtime Fairness"
      }, {
        "name": "X_000631_FrameBurst",
        "type": "boolean",
        "description": "Enables or disables frame burst for WiFi.",
        "displayName": "Frame Burst"
      }]
    }, {
      "_id": "aa4e9652-56c8-4363-ac40-dec87eb8a3b0",
      "name": "5GHz WIFI Radio",
      "group": "Wi-Fi",
      "createTime": "2020-07-24T05:11:20.295Z",
      "description": "Define 5GHz Wi-Fi Radio Configurations parameters.",
      "displayName": "5GHz Wi-Fi Radio",
      "tr098PathPrefix": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.",
      "parameters": [{
        "name": "RadioEnabled",
        "type": "boolean",
        "description": "Enables or disables the Radio.",
        "displayName": "Wi-Fi Radio"
      }, {
        "name": "Standard",
        "type": "string",
        "valueEnums": [{
          "value": "n",
          "displayName": "802.11n Only"
        }, {
          "value": "ac",
          "displayName": "802.11ac and 802.11n"
        }, {
          "value": "nac",
          "displayName": "802.11n and 802.11ac[For 814G]"
        }, {
          "value": "ax",
          "displayName": "802.11ax, 802.11ac and 802.11n"
        }],
        "description": "Indicates which IEEE 802.11 standard this Radio is configured for.",
        "displayName": "Mode"
      }, {
        "name": "X_000631_OperatingChannelBandwidth",
        "type": "string",
        "valueEnums": [{
          "value": "20MHz",
          "displayName": "20MHz"
        }, {
          "value": "40MHz",
          "displayName": "40MHz"
        }, {
          "value": "80MHz",
          "displayName": "80MHz"
        }, {
          "value": "160MHz",
          "displayName": "160MHz"
        }, {
          "value": "80+80MHz",
          "displayName": "80+80MHz"
        }],
        "description": "Indicates the operating channel bandwidth.",
        "displayName": "Bandwidth"
      }, {
        "name": "TransmitPower",
        "type": "unsignedInt",
        "valueEnums": [{
          "value": 100,
          "displayName": "100%"
        }, {
          "value": 90,
          "displayName": "90%"
        }, {
          "value": 80,
          "displayName": "80%"
        }, {
          "value": 75,
          "displayName": "75%"
        }, {
          "value": 70,
          "displayName": "70%"
        }, {
          "value": 60,
          "displayName": "60%"
        }, {
          "value": 50,
          "displayName": "50%"
        }, {
          "value": 40,
          "displayName": "40%"
        }, {
          "value": 30,
          "displayName": "30%"
        }, {
          "value": 25,
          "displayName": "25%"
        }, {
          "value": 20,
          "displayName": "20%"
        }, {
          "value": 10,
          "displayName": "10%"
        }],
        "description": "Indicates the current transmit power level as a percentage of full power. The value MUST be one of the values reported by the TransmitPowerSupported parameter.",
        "displayName": "Power Level"
      }, {
        "name": "X_000631_EnableDfsChannels",
        "type": "boolean",
        "description": "Enables or disables DFS Channels.",
        "displayName": "DFS"
      }, {
        "name": "MUMIMOEnabled",
        "type": "boolean",
        "displayName": "MU-MIMO",
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.MultiUserMIMOEnable"]
      }]
    },


    // 6GHz WIFI Radio

    {
      "name": "6GHz WIFI Radio",
      "displayName": "6GHz Wi-Fi Radio",
      "description": "Define 6GHz Wi-Fi Radio Configurations parameters.",
      "tr098PathPrefix": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.17.",
      "group": "Wi-Fi",
      "parameters": [
        {
          "name": "RadioEnabled",
          "displayName": "Wi-Fi Radio",
          "description": "Enables or disables the Radio.",
          "type": "boolean"
        },
        {
          "name": "Standard",
          "displayName": "Mode",
          "description": "Indicates which IEEE 802.11 standard this Radio is configured for.",
          "type": "string",
          "valueEnums": [
            {
              "value": "ax",
              "displayName": "802.11ax, 802.11ac and 802.11n"
            }
          ]
        },
        {
          "name": "X_000631_OperatingChannelBandwidth",
          "displayName": "Bandwidth",
          "description": "Indicates the operating channel bandwidth.",
          "type": "string",
          "valueEnums": [
            {
              "value": "80MHz",
              "displayName": "80MHz"
            },
            {
              "value": "160MHz",
              "displayName": "160MHz"
            }
          ]
        },
        {
          "name": "TransmitPower",
          "displayName": "Power Level",
          "description": "Indicates the current transmit power level as a percentage of full power. The value MUST be one of the values reported by the TransmitPowerSupported parameter.",
          "type": "unsignedInt",
          "valueEnums": [
            {
              "value": 100,
              "displayName": "100%"
            },
            {
              "value": 90,
              "displayName": "90%"
            },
            {
              "value": 80,
              "displayName": "80%"
            },
            {
              "value": 70,
              "displayName": "70%"
            },
            {
              "value": 60,
              "displayName": "60%"
            },
            {
              "value": 50,
              "displayName": "50%"
            },
            {
              "value": 40,
              "displayName": "40%"
            },
            {
              "value": 30,
              "displayName": "30%"
            },
            {
              "value": 25,
              "displayName": "25%"
            },
            {
              "value": 20,
              "displayName": "20%"
            },
            {
              "value": 10,
              "displayName": "10%"
            }
          ]
        },
        {
          "name": "X_000631_PSCOnly",
          "displayName": "PSC Only",
          "description": "Enables or disables PSC.",
          "type": "boolean"
        }
      ]
    },


    {
      "_id": "3c78dcab-8452-44e4-a52d-1de5fce9c8cd",
      "name": "Add Object",
      "group": "TR-69 - Advanced",
      "createTime": "2020-07-24T05:11:16.721Z",
      "description": "Add Object",
      "displayName": "Add Object",
      "keyParameter": {
        "name": "tr098PathPrefix"
      },
      "multiInstance": true,
      "parameters": [{
        "name": "tr098PathPrefix",
        "type": "string",
        "tooltip": "The Partial Path of the object, for example \"InternetGatewayDevice.User.\" or \"InternetGatewayDevice.User.{i}.\" (the \"{i}.\" suffix is optional)",
        "mandatory": true,
        "displayName": "Object Path"
      }, {
        "name": "NumberOfParameters",
        "type": "int",
        "tooltip": "After the new object is created, values of these parameter(s) will be set via SetParameterValues",
        "valueEnums": [{
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }, {
          "value": 5,
          "displayName": "5"
        }, {
          "value": 6,
          "displayName": "6"
        }, {
          "value": 7,
          "displayName": "7"
        }, {
          "value": 8,
          "displayName": "8"
        }, {
          "value": 9,
          "displayName": "9"
        }, {
          "value": 10,
          "displayName": "10"
        }, {
          "value": 11,
          "displayName": "11"
        }, {
          "value": 12,
          "displayName": "12"
        }, {
          "value": 13,
          "displayName": "13"
        }, {
          "value": 14,
          "displayName": "14"
        }, {
          "value": 15,
          "displayName": "15"
        }, {
          "value": 16,
          "displayName": "16"
        }],
        "displayName": "Number of Child Parameter(s) in the newly created object that need configuration",
        "displayOnly": true,
        "defaultValue": 1
      }, {
        "name": "1stName",
        "type": "string",
        "tooltip": "If an existing object found with the same parameter value pair, the existing object will be re-configured and no new object will be added",
        "displayName": "Name of the Index Parameter"
      }, {
        "name": "1stType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the Index Parameter",
        "defaultValue": "string",
        "targetParamNames": ["1stValue"]
      }, {
        "name": "1stValue",
        "type": "string",
        "displayName": "Value of the Index Parameter",
        "minStringLength": 1
      }, {
        "name": "2ndName",
        "type": "string",
        "displayName": "Name of the 2nd Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "2ndType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 2nd Parameter",
        "defaultValue": "string",
        "targetParamNames": ["2ndValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "2ndValue",
        "type": "string",
        "displayName": "Value of the 2nd Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "3rdName",
        "type": "string",
        "displayName": "Name of the 3rd Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "3rdType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 3rd Parameter",
        "defaultValue": "string",
        "targetParamNames": ["3rdValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "3rdValue",
        "type": "string",
        "displayName": "Value of the 3rd Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "4thName",
        "type": "string",
        "displayName": "Name of the 4th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "4thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 4th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["4thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "4thValue",
        "type": "string",
        "displayName": "Value of the 4th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "5thName",
        "type": "string",
        "displayName": "Name of the 5th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "5thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 5th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["5thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "5thValue",
        "type": "string",
        "displayName": "Value of the 5th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "6thName",
        "type": "string",
        "displayName": "Name of the 6th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "6thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 6th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["6thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "6thValue",
        "type": "string",
        "displayName": "Value of the 6th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "7thName",
        "type": "string",
        "displayName": "Name of the 7th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "7thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 7th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["7thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "7thValue",
        "type": "string",
        "displayName": "Value of the 7th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "8thName",
        "type": "string",
        "displayName": "Name of the 8th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "8thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 8th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["8thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "8thValue",
        "type": "string",
        "displayName": "Value of the 8th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [8, 9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "9thName",
        "type": "string",
        "displayName": "Name of the 9th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "9thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 9th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["9thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "9thValue",
        "type": "string",
        "displayName": "Value of the 9th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [9, 10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "10thName",
        "type": "string",
        "displayName": "Name of the 10th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "10thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 10th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["10thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "10thValue",
        "type": "string",
        "displayName": "Value of the 10th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [10, 11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "11thName",
        "type": "string",
        "displayName": "Name of the 11th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "11thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 11th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["11thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "11thValue",
        "type": "string",
        "displayName": "Value of the 11th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [11, 12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "12thName",
        "type": "string",
        "displayName": "Name of the 12th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "12thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 12th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["12thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "12thValue",
        "type": "string",
        "displayName": "Value of the 12th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [12, 13, 14, 15, 16]
          }
        }
      }, {
        "name": "13thName",
        "type": "string",
        "displayName": "Name of the 13th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [13, 14, 15, 16]
          }
        }
      }, {
        "name": "13thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 13th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["13thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [13, 14, 15, 16]
          }
        }
      }, {
        "name": "13thValue",
        "type": "string",
        "displayName": "Value of the 13th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [13, 14, 15, 16]
          }
        }
      }, {
        "name": "14thName",
        "type": "string",
        "displayName": "Name of the 14th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [14, 15, 16]
          }
        }
      }, {
        "name": "14thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 14th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["14thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [14, 15, 16]
          }
        }
      }, {
        "name": "14thValue",
        "type": "string",
        "displayName": "Value of the 14th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [14, 15, 16]
          }
        }
      }, {
        "name": "15thName",
        "type": "string",
        "displayName": "Name of the 15th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [15, 16]
          }
        }
      }, {
        "name": "15thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 15th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["15thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [15, 16]
          }
        }
      }, {
        "name": "15thValue",
        "type": "string",
        "displayName": "Value of the 15th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [15, 16]
          }
        }
      }, {
        "name": "16thName",
        "type": "string",
        "displayName": "Name of the 16th Parameter",
        "requires": {
          "NumberOfParameters": {
            "$in": [16]
          }
        }
      }, {
        "name": "16thType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type of the 16th Parameter",
        "defaultValue": "string",
        "targetParamNames": ["16thValue"],
        "requires": {
          "NumberOfParameters": {
            "$in": [16]
          }
        }
      }, {
        "name": "16thValue",
        "type": "string",
        "displayName": "Value of the 16th Parameter",
        "minStringLength": 1,
        "requires": {
          "NumberOfParameters": {
            "$in": [16]
          }
        }
      }]
    }, {
      "_id": "7cb6a6fe-50de-4805-b33a-95a261473f0a",
      "name": "Bandwidth",
      "group": "Service Attributes",
      "inner": true,
      "createTime": "2020-07-24T05:11:16.905Z",
      "description": "Bandwidth",
      "displayName": "Bandwidth",
      "parameters": [{
        "name": "DownstreamCIR",
        "type": "string",
        "tooltip": "Please enter a value suffix k for Kbps (with 0k-2048k) or m for Mbps (1m-10000m)",
        "displayName": "Max Downstream Rate",
        // "stringPattern": "^([0-9]|[1-9]\\d|[1-9]\\d{2}|[1]\\d{3}|20[0-3]\\d|204[0-8])k$|^([1-9]|[1-9]\\d|[1-9]\\d{2}|10000)m$",
        "stringPattern": "^([0-9]|[1-9]\\d|[1-9]\\d{2}|[1]\\d{3}|20[0-3]\\d|204[0-8])k$|^([1-9]|[1-9]\\d|[1-9]\\d{2}|[1-9]\\d{3}|10000)m$",
        "minStringLength": 1,
        "validationErrorMessage": "Please enter a value suffix k for Kbps (with 0k-2048k) or m for Mbps (1m-10000m)"
      }, {
        "name": "DownstreamCBS",
        "type": "string",
        "hidden": true,
        "tooltip": "Please enter a value suffix k for Kbits (with 4k-16000k) or m for Mbits (1m-16m)",
        "displayName": "Downstream Committed Burst Size",
        "stringPattern": "^([4-9]|[1-9]\\d{1,3}|1[0-5]\\d{3}|16000)k$|^([1-9]|1[0-6])m$",
        "minStringLength": 1,
        "validationErrorMessage": "Please enter a value suffix k for Kbits (with 4k-16000k) or m for Mbits (1m-16m)"
      }, {
        "name": "UpstreamCIR",
        "type": "string",
        "tooltip": "Please enter a value suffix k for Kbps (with 0k-2048k) or m for Mbps (1m-10000m)",
        "displayName": "Max Upstream Rate",
        // "stringPattern": "^([0-9]|[1-9]\\d|[1-9]\\d{2}|[1]\\d{3}|20[0-3]\\d|204[0-8])k$|^([1-9]|[1-9]\\d|[1-9]\\d{2}|1000)m$",
        "stringPattern": "^([0-9]|[1-9]\\d|[1-9]\\d{2}|[1]\\d{3}|20[0-3]\\d|204[0-8])k$|^([1-9]|[1-9]\\d|[1-9]\\d{2}|[1-9]\\d{3}|10000)m$",
        "minStringLength": 1,
        "validationErrorMessage": "Please enter a value suffix k for Kbps (with 0k-2048k) or m for Mbps (1m-10000m)"
      }, {
        "name": "UpstreamCBS",
        "type": "string",
        "hidden": true,
        "tooltip": "Please enter a value suffix k for Kbits (with 4k-16000k) or m for Mbits (1m-16m)",
        "displayName": "Upstream Committed Burst Size",
        "stringPattern": "^([4-9]|[1-9]\\d{1,3}|1[0-5]\\d{3}|16000)k$|^([1-9]|1[0-6])m$",
        "minStringLength": 1,
        "validationErrorMessage": "Please enter a value suffix k for Kbits (with 4k-16000k) or m for Mbits (1m-16m)"
      }]
    }, {
      "_id": "c673b617-f00c-4124-8f77-ed8fc79c862e",
      "name": "Data Service",
      "group": "Services",
      "createTime": "2021-09-24T02:42:12.790Z",
      "description": "Define parameters for Data Service.",
      "displayName": "Data Service",
      "serviceType": "Service WAN VLAN",
      "serviceValues": {
        "Name": "Data Service"
      },
      "parameters": [
        {
          "name": "VlanTagAction",
          "type": "boolean",
          "implies": {
            "false": {
              "X_000631_VlanMuxID": -1,
              "X_000631_VlanMux8021p": -1
            }
          },
          "valueEnums": [
            {
              "value": true,
              "displayName": "Tagged"
            },
            {
              "value": false,
              "displayName": "Untagged"
            }
          ],
          "description": "Enable VLAN.",
          "displayName": "CE Tagging",
          "displayOnly": true,
          "defaultValue": true,
          "requires": {
            "Mode": "RG Routed"
          },
          "hidden": true
        },
        {
          "name": "X_000631_VlanMuxID",
          "type": "int",
          "maxValue": 4093,
          "minValue": 1,
          "mandatory": false,
          "hidden": true,
          "description": "The VLAN ID.",
          "displayName": "VLAN ID",
          "defaultValue": 7,
          "requires": {
            "VlanTagAction": true
          }
        },
        {
          "name": "X_000631_VlanMux8021p",
          "type": "int",
          "mandatory": true,
          "valueEnums": [
            {
              "value": 0,
              "displayName": "0"
            },
            {
              "value": 1,
              "displayName": "1"
            },
            {
              "value": 2,
              "displayName": "2"
            },
            {
              "value": 3,
              "displayName": "3"
            },
            {
              "value": 4,
              "displayName": "4"
            },
            {
              "value": 5,
              "displayName": "5"
            },
            {
              "value": 6,
              "displayName": "6"
            },
            {
              "value": 7,
              "displayName": "7"
            }
          ],
          "description": "The priority of the VLAN.",
          "displayName": "Priority (P-bits)",
          "defaultValue": 0,
          "requires": {
            "VlanTagAction": true,
          }
        },
        {
          "name": "X_000631_Dscp2PbitMapEnabled",
          "type": "boolean",
          "description": "Turn on/off DSCP Map for tagged service",
          "displayName": "DSCP to P-bit Map",
          "requires": {
            "VlanTagAction": true,
            "FramingType": "IPoE",
            "productFamily": "GigaCenter"
            // "ServiceConnectionType": {
            //   "$in": ["DHCP", "Bridged"]
            // }
          }
        },
        {
          "name": "productFamily",
          "type": "string",
          "mandatory": true,
          "valueEnums": [
            {
              "value": "GigaCenter",
              "displayName": "GigaCenter and GigaHub"
            },
            {
              "value": "EXOS",
              "displayName": "EXOS-Powered GigaSpire"
            }
          ],
          "description": "The CPE Product Family.",
          "displayName": "Product Family(s)",
          "defaultValue": "EXOS"
        },
        {
          "name": "Mode",
          "type": "string",
          "implies": {
            "RG Routed": {
              "X_000631_IGMPProxy": false
            },
            "RG L2 Bridged": {
              "X_000631_IGMPProxy": false,
              "ServiceConnectionType": "Bridged"
            },
            "ONT Half Bridge": {
              "Hairpin": false,
              "IgmpSnoopEnable": false,
              "ServiceConnectionType": "AE_L2_Bridged"
            }
          },
          "mandatory": true,
          "valueEnums": [
            {
              "value": "RG Routed",
              "displayName": "RG - Routed"
            },
            {
              "value": "RG L2 Bridged",  //CCL-49701 //CCL-56618
              "displayName": "RG - L2 Bridged",
              "requires": {
                "productFamily": "EXOS"
              }
            },
            // {
            //   "value": "ONT Half Bridge",
            //   "displayName": "ONT - Half Bridge"
            // }
          ],
          "description": "Specifies the Data Service Mode, DHCP / PPPOE / ONT-HB",
          "displayName": "Mode",
          "defaultValue": "RG Routed"
        },
        {
          "name": "defaultConnectionService",
          "type": "boolean",
          "valueEnums": [
            {
              "value": true,
              "displayName": "Yes"
            },
            {
              "value": false,
              "displayName": "No"
            }
          ],
          "displayName": "Default WAN",
          "defaultValue": true,
          "requires": {
            "Mode": {
              "$in": [
                "RG Routed",
                "RG L2 Bridged"
              ]
            }
          }
        },
        {
          "name": "ServiceConnectionType",
          "type": "string",
          "hidden": true
        },
        {
          "name": "FramingType",
          "type": "string",
          "implies": {
            "IPoE": {
              "ServiceConnectionType": "DHCP"
            },
            "PPPoE": {
              "NATEnabled": true,
              "X_000631_IPv4Enabled": true,
              "ServiceConnectionType": "Static"
            }
          },
          "valueEnums": [
            {
              "value": "IPoE",
              "displayName": "IPoE"
            },
            {
              "value": "PPPoE",
              "displayName": "PPPoE"
            }
          ],
          "description": "Framing Type (IPoE vs PPPOE)",
          "displayName": "Framing Type",
          "displayOnly": true,
          "defaultValue": "IPoE",
          "requires": {
            "Mode": {
              "$in": [
                "RG Routed",
               // "RG L2 Bridged" //69622
              ]
            }
          }
        },
        // { 
        //   "name": "AnyPortAnyServiceEnabled",    //CCL-49701 
        //   "displayName": "Any Port Any Service",
        //   "description": "Any Port Any Service",
        //   "type": "boolean",
        //   "defaultValue": false,
        //   "requires": {
        //     "ServiceConnectionType": "Bridged",
        //     "VlanTagAction": true
        //   }
        // }, {
        //   "name": "OUI_Enable",
        //   "displayName": "OUI Matching",
        //   "description": "LAN interface OUI binding",
        //   "type": "boolean",
        //   "defaultValue": false,
        //   "requires": {
        //     "AnyPortAnyServiceEnabled": true
        //   }
        // }, {
        //   "name": "OUI_FilterList",
        //   "displayName": "OUI List",
        //   "description": "Comma-separated list of MAC Addresses. Each list entry may optionally specify a bit-mask, where matching of a packet",
        //   "type": "MACAddressListWithWildcard",
        //   "tooltip": "Separate by comma. Use 'x' or 'X' as wildcard value. Example: To match OUI '00:33:66' to this bridge, type '00:33:66:xx:xx:xx')",
        //   "requires": {
        //     "OUI_Enable": true
        //   }
        // },
        // {
        //   "name": "ExosBridgedInterface",
        //   "type": "stringArray",
        //   "mandatory": false,
        //   "valueEnums": [{
        //     "value": "5GHz Operator SSID #1",
        //     "displayName": "5GHz Operator SSID #1"
        //   }, {
        //     "value": "5GHz Operator SSID #2",
        //     "displayName": "5GHz Operator SSID #2"
        //   }, {
        //     "value": "2.4GHz Operator SSID #1",
        //     "displayName": "2.4GHz Operator SSID #1"
        //   }, {
        //     "value": "2.4GHz Operator SSID #2",
        //     "displayName": "2.4GHz Operator SSID #2"
        //   }, {
        //     "value": "LAN Port 1",
        //     "displayName": "LAN Port 1"
        //   }, {
        //     "value": "LAN Port 2",
        //     "displayName": "LAN Port 2"
        //   }, {
        //     "value": "LAN Port 3",
        //     "displayName": "LAN Port 3"
        //   }, {
        //     "value": "LAN Port 4",
        //     "displayName": "LAN Port 4"
        //   }],
        //   "description": "The LAN Interface to be bridged to WAN",
        //   "displayName": "Bridge LAN Interface",
        //   "defaultValue": ["5GHz Operator SSID #1"],
        //   "requires": {
        //     "ServiceConnectionType": "Bridged",
        //   }
        // },
        //CCL-66221 removed
        // {
        //   "name": "X_CALIX_SXACC_BW_PROFILE",
        //   "displayName": "BW Profile",
        //   "description": "BW Profile",
        //   "type": "innerProfile",
        //   "innerProfileCategory": "Bandwidth",
        //   "requires": {
        //     "$or": [
        //       {
        //         "productFamily": "GigaCenter"
        //       },
        //       {
        //         "productFamily": "EXOS",
        //         "Mode": "ONT Half Bridge"
        //       }
        //     ]
        //   },
        // },
        // {
        //   "name": "X_CALIX_SXACC_BW_PROFILE",
        //   "type": "innerProfile",
        //   "description": "BW Profile",
        //   "displayName": "BW Profile",
        //   "innerProfileCategory": "Bandwidth",
        //   "requires": {
        //     "productFamily": "GigaCenter"
        //   }
        //  },
        // {
        //   "name": "USMaxMcastBcastRate",
        //   "type": "boolean",
        //   "displayName": "US Max Mcast/Bcast Rate",
        //   "displayOnly": true,
        //   "defaultValue": false,
        //   "requires": {
        //     "Mode": "ONT Half Bridge",
        //     "TLANEnable": false
        //   }
        // },
        // {
        //   "name": "UpstreamCIR",
        //   "type": "string",
        //   "tooltip": "Please enter a value suffix k for Kbps (with 1k-10240k)",
        //   "mandatory": true,
        //   "displayName": "US Max Rate",
        //   "defaultValue": "24k",
        //   "stringPattern": "^([1-9]\\d{0,3}|10[0-1]\\d\\d|102[0-3]\\d|10240)k$",
        //   "validationErrorMessage": "Please enter a value suffix k for Kbps (with 1k-10240k)",
        //   "requires": {
        //     "USMaxMcastBcastRate": true
        //   }
        // },
        {
          "name": "version",
          "type": "string",
          "implies": {
            "v4": {
              "NATEnabled": true,
              "AddressingType": "DHCP",
              "ConnectionType": "IP_Routed",
              "X_000631_IPv4Enabled": true,
              "X_000631_IPv6Enabled": false
            },
            "v6": {
              "NATEnabled": false,
              "X_000631_IPv4Enabled": false,
              "X_000631_IPv6Enabled": true,
              "IPv6DNSWANConnectionPath": "%IPV6_DATA_WAN_CONNECTION%",
              "X_000631_IPv6AddressingType": "DHCP"
            },
            "6rd": {
              "NATEnabled": true,
              "AddressingType": "DHCP",
              "ConnectionType": "IP_Routed",
              "X_000631_IPv4Enabled": true,
              "X_000631_IPv6Enabled": false,
              "IPv6DNSWANConnectionPath": "%IPV6_DATA_WAN_CONNECTION%",
              "X_000631_IPv6AddressingType": "DHCP"
            },
            "dsLite": {
              "NATEnabled": true,
              "X_000631_IPv4Enabled": false,
              "X_000631_IPv6Enabled": true,
              "IPv6DNSWANConnectionPath": "%IPV6_DATA_WAN_CONNECTION%",
              "X_000631_IPv6AddressingType": "DHCP"
            },
            "dualStack": {
              "NATEnabled": true,
              "AddressingType": "DHCP",
              "ConnectionType": "IP_Routed",
              "X_000631_IPv4Enabled": true,
              "X_000631_IPv6Enabled": true,
              "IPv6DNSWANConnectionPath": "%IPV6_DATA_WAN_CONNECTION%",
              "X_000631_IPv6AddressingType": "DHCP",
              "iapd": true
            }
          },
          "valueEnums": [
            {
              "value": "v4",
              "displayName": "IPv4 Only"
            },
            {
              "value": "v6",
              "displayName": "IPv6 Only",
              "requires": {
                "productFamily": "GigaCenter"
              }
            },
            {
              "value": "6rd",
              "displayName": "IPv6 Rapid Deployment (IPv6 via IPv4, aka 6rd)",
              "requires": {
                "productFamily": "GigaCenter"
              }
            },
            {
              "value": "dualStack",
              "displayName": "IPv6 + IPv4 Dual-Stack"
            }
          ],
          "displayName": "IP Version/Deployment Mode",
          "displayOnly": true,
          "defaultValue": "v4",
          "requires": {
            "Mode": {
              "$in": [
                "RG Routed",
                "RG L2 Bridged"
              ]
            },
            "FramingType": "IPoE"
          }
        },
        {
          "name": "versionForPPPoE",
          "displayName": "IP Version/Deployment Mode",
          "displayOnly": true,
          "type": "string",
          "requires":
          {
            "productFamily": "EXOS",
            "Mode": "RG Routed",
            "FramingType": "PPPoE"
          },
          "valueEnums": [
            {
              "value": "v4",
              "displayName": "IPv4 Only"
            },
            {
              "value": "dualStack",
              "displayName": "IPv6 + IPv4 Dual-Stack"
            }],
          "defaultValue": "v4",
          "implies":
          {
            "v4":
            {
              "X_000631_IPv4Enabled": true,
              "X_000631_IPv6Enabled": false
            },
            "dualStack":
            {
              "X_000631_IPv4Enabled": true,
              "X_000631_IPv6Enabled": true
            }
          }
        },
        // {
        //   "name": "BridgedInterface",
        //   "type": "stringArray",
        //   "mandatory": true,
        //   "valueEnums": [{
        //     "value": "5GHz IPTV SSID",
        //     "displayName": "5GHz IPTV SSID"
        //   }, {
        //     "value": "LAN Port 1",
        //     "displayName": "LAN Port 1"
        //   }, {
        //     "value": "LAN Port 2",
        //     "displayName": "LAN Port 2"
        //   }, {
        //     "value": "LAN Port 3",
        //     "displayName": "LAN Port 3"
        //   }, {
        //     "value": "LAN Port 4",
        //     "displayName": "LAN Port 4"
        //   }],
        //   "description": "The LAN Interface to be bridged to WAN",
        //   "displayName": "Bridge LAN Interface",
        //   "defaultValue": ["5GHz IPTV SSID"],
        //   "requires": {
        //     "ServiceConnectionType": "Bridged"
        //   }
        // },
        {
          "name": "ExosBridgedInterface",
          "displayName": "Bridge LAN Interface",
          "description": "The LAN Interface to be bridged to WAN",
          "type": "stringArray",
          "mandatory": true,
          "valueEnums": [
            { "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.7", "displayName": "5GHz Operator SSID #1" },
            { "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.8", "displayName": "5GHz Operator SSID #2" },
            { "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.14", "displayName": "2.4GHz Operator SSID #1" },
            { "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.15", "displayName": "2.4GHz Operator SSID #2" },
            { "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.16", "displayName": "2.4GHz Operator SSID #3" },
            { "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1", "displayName": "LAN Port 1" },
            { "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.2", "displayName": "LAN Port 2" },
            { "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.3", "displayName": "LAN Port 3" },
            { "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.4", "displayName": "LAN Port 4" },
            { "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.5", "displayName": "LAN Port 5" }

          ],
          "defaultValue": ["InternetGatewayDevice.Layer2Bridging.AvailableInterface.7"],
          "requires": {
            "ServiceConnectionType": "Bridged"
          }
        },
        {
          "name": "X_000631_IPv4Enabled",
          "type": "boolean",
          "hidden": true
        },
        {
          "name": "ConnectionType",
          "type": "string",
          "hidden": true,
          "requires": {
            "Mode": "RG-Routed",
            "FramingType": "IPoE"
          }
        },
        {
          "name": "AddressingType",
          "type": "string",
          "hidden": true,
          "requires": {
            "Mode": "RG-Routed",
            "ServiceConnectionType": "DHCP"
          }
        },
        {
          "name": "NATEnabled",
          "type": "boolean",
          "tooltip": "NAT must be enabled for IPv4 and 6rd",
          "description": "Indicates if Network Address Translation (NAT) is enabled for this connection",
          "displayName": "IPv4 NAT",
          "defaultValue": true,
          "requires": {
            "version": {
              "$in": [
                "v4",
                "6rd"
              ]
            }
          }
        },
        {
          "name": "X_000631_IPv6DNSServers",
          "type": "IPv6Address",
          "description": "Comma-separated list of maximum two DNS server addresses offered to DHCPv6 clients.",
          "displayName": "IPv6 DNS Servers",
          "requires": {
            "version": "6rd"
          }
        },
        {
          "name": "_6rdDynamic",
          "type": "boolean",
          "valueEnums": [
            {
              "value": true,
              "displayName": "Dynamic"
            },
            {
              "value": false,
              "displayName": "Static"
            }
          ],
          "description": "6rd Mode.",
          "displayName": "6rd Mode",
          "defaultValue": true,
          "tr098PathOverride": [
            "X_CALIX_SXACC_6RD.Dynamic"
          ],
          "requires": {
            "version": "6rd"
          }
        },
        {
          "name": "_6rdIpv4MaskLen",
          "type": "int",
          "maxValue": 32,
          "minValue": 0,
          "description": "Common bit number of IPv4 address for 6rd tunnel configuration. e.g. 8, 16, 24.",
          "displayName": "6rd IPv4 Mask Length",
          "defaultValue": 0,
          "tr098PathOverride": [
            "X_CALIX_SXACC_6RD.Ipv4MaskLen"
          ],
          "requires": {
            "version": "6rd",
            "_6rdDynamic": false
          }
        },
        {
          "name": "_6rdPrefix",
          "type": "IPv6Prefix",
          "description": "6rd prefix assigned by the ISP for 6rd tunnel configuration. e.g. \"2001:1234::/32\"",
          "displayName": "6rd Prefix",
          "tr098PathOverride": [
            "X_CALIX_SXACC_6RD.Prefix"
          ],
          "requires": {
            "version": "6rd",
            "_6rdDynamic": false
          }
        },
        {
          "name": "_6rdPrefixPltime",
          "type": "int",
          "maxValue": 2147483647,
          "minValue": -1,
          "description": "6rd Preferred Lifetime.",
          "displayName": "6rd Preferred Lifetime (value of -1 indicates infinity)",
          "defaultValue": 0,
          "tr098PathOverride": [
            "X_CALIX_SXACC_6RD.PrefixPltime"
          ],
          "requires": {
            "version": "6rd",
            "_6rdDynamic": false
          }
        },
        {
          "name": "_6rdValidPltime",
          "type": "int",
          "maxValue": 2147483647,
          "minValue": -1,
          "description": "6rd Valid Lifetime.",
          "displayName": "6rd Valid Lifetime (value of -1 indicates infinity)",
          "defaultValue": 0,
          "tr098PathOverride": [
            "X_CALIX_SXACC_6RD.PrefixVltime"
          ],
          "requires": {
            "version": "6rd",
            "_6rdDynamic": false
          }
        },
        {
          "name": "_6rdBorderRelayAddress",
          "type": "IPAddress",
          "description": "6rd Border relay address for 6rd tunnel configuration. e.g. \"192.88.99.1\"",
          "displayName": "6rd BorderRelayAddress",
          "tr098PathOverride": [
            "X_CALIX_SXACC_6RD.BorderRelayAddress"
          ],
          "requires": {
            "version": "6rd",
            "_6rdDynamic": false
          }
        },
        {
          "name": "X_000631_IPv6Enabled",
          "type": "boolean",
          "hidden": true
        },
        {
          "name": "iana",
          "type": "boolean",
          "description": "Indicates if the DHCPv6 client should ask for a non-temporary address",
          "displayName": "IANA (if the DHCPv6 client should ask for a non-temporary address)",
          "defaultValue": false,
          "requires": {
            "version": {
              "$in": [
                "dualStack",
                "dsLite",
                "v6"
              ]
            },
            "productFamily": "GigaCenter"
          }
        },
        {
          "name": "IAPD_Control",
          "type": "boolean",
          "hidden": true,
          "implies": {
            "true": {
              "iapd": true
            }
          },
          "description": "Hidden Control to make IAPD read-only and always enabled when applicable.",
          "displayOnly": true,
          "defaultValue": true,
          "requires": {
            "version": {
              "$in": [
                "dualStack",
                "dsLite",
                "v6"
              ]
            },
            "productFamily": "GigaCenter",
            "FramingType": "IPoE"
          }
        },
        {
          "name": "iapd",
          "type": "boolean",
          "description": "Indicates if the DHCPv6 client should ask for a delegated prefix",
          "displayName": "IAPD (if the DHCPv6 client should ask for a delegated prefix)",
          "defaultValue": true,
          "requires": {
            "IAPD_Control": true,
            "Mode": {
              "$in": [
                "RG Routed",
                "RG L2 Bridged"
              ]
            },
            "productFamily": "GigaCenter"
          }
        },
        {
          "name": "dhcp6cForAddress",
          "type": "string",
          "tooltip": "Request_IANA_tooltip",
          "valueEnums": [
            {
              "value": "try",
              "displayName": "Try (will not request IANA if \"NoAddrAvailable\" is received)"
            },
            {
              "value": "force",
              "displayName": "Force (will continue to request IANA even if \"NoAddrAvailable\" is received)"
            },
            {
              "value": "none",
              "displayName": "Disabled (will not request IANA)"
            }
          ],
          "displayName": "Request IANA",
          "defaultValue": "try",
          "requires": {
            "version": {
              "$in": [
                "dualStack",
                "dsLite",
                "v6"
              ]
            },
            "productFamily": "EXOS"
          }
        },
        {
          "name": "iapdLength",
          "type": "string",
          "valueEnums": [
            {
              "value": "auto",
              "displayName": "Auto (will request IAPD without specifying the length)"
            },
            {
              "value": "no",
              "displayName": "Disabled (will not request IAPD)"
            },
            // {
            //   "value": "0",
            //   "displayName": "0"
            // },
            // {
            //   "value": "1",
            //   "displayName": "1"
            // },
            // {
            //   "value": "2",
            //   "displayName": "2"
            // },
            // {
            //   "value": "3",
            //   "displayName": "3"
            // },
            // {
            //   "value": "4",
            //   "displayName": "4"
            // },
            // {
            //   "value": "5",
            //   "displayName": "5"
            // },
            // {
            //   "value": "6",
            //   "displayName": "6"
            // },
            // {
            //   "value": "7",
            //   "displayName": "7"
            // },
            // {
            //   "value": "8",
            //   "displayName": "8"
            // },
            // {
            //   "value": "9",
            //   "displayName": "9"
            // },
            // {
            //   "value": "10",
            //   "displayName": "10"
            // },
            // {
            //   "value": "11",
            //   "displayName": "11"
            // },
            // {
            //   "value": "12",
            //   "displayName": "12"
            // },
            // {
            //   "value": "13",
            //   "displayName": "13"
            // },
            // {
            //   "value": "14",
            //   "displayName": "14"
            // },
            // {
            //   "value": "15",
            //   "displayName": "15"
            // },
            // {
            //   "value": "16",
            //   "displayName": "16"
            // },
            // {
            //   "value": "17",
            //   "displayName": "17"
            // },
            // {
            //   "value": "18",
            //   "displayName": "18"
            // },
            // {
            //   "value": "19",
            //   "displayName": "19"
            // },
            // {
            //   "value": "20",
            //   "displayName": "10"
            // },
            // {
            //   "value": "21",
            //   "displayName": "21"
            // },
            // {
            //   "value": "22",
            //   "displayName": "22"
            // },
            // {
            //   "value": "23",
            //   "displayName": "23"
            // },
            // {
            //   "value": "24",
            //   "displayName": "24"
            // },
            // {
            //   "value": "25",
            //   "displayName": "25"
            // },
            // {
            //   "value": "26",
            //   "displayName": "26"
            // },
            // {
            //   "value": "27",
            //   "displayName": "27"
            // },
            // {
            //   "value": "28",
            //   "displayName": "28"
            // },
            // {
            //   "value": "29",
            //   "displayName": "29"
            // },
            // {
            //   "value": "30",
            //   "displayName": "30"
            // },
            // {
            //   "value": "31",
            //   "displayName": "31"
            // },
            // {
            //   "value": "32",
            //   "displayName": "32"
            // },
            // {
            //   "value": "33",
            //   "displayName": "33"
            // },
            // {
            //   "value": "34",
            //   "displayName": "34"
            // },
            // {
            //   "value": "35",
            //   "displayName": "35"
            // },
            // {
            //   "value": "36",
            //   "displayName": "36"
            // },
            // {
            //   "value": "37",
            //   "displayName": "37"
            // },
            // {
            //   "value": "38",
            //   "displayName": "38"
            // },
            // {
            //   "value": "39",
            //   "displayName": "39"
            // },
            // {
            //   "value": "40",
            //   "displayName": "40"
            // },
            // {
            //   "value": "41",
            //   "displayName": "41"
            // },
            // {
            //   "value": "42",
            //   "displayName": "42"
            // },
            // {
            //   "value": "43",
            //   "displayName": "43"
            // },
            // {
            //   "value": "44",
            //   "displayName": "44"
            // },
            // {
            //   "value": "45",
            //   "displayName": "45"
            // },
            // {
            //   "value": "46",
            //   "displayName": "46"
            // },
            // {
            //   "value": "47",
            //   "displayName": "47"
            // },
            {
              "value": "48",
              "displayName": "48"
            },
            {
              "value": "49",
              "displayName": "49"
            },
            {
              "value": "50",
              "displayName": "50"
            },
            {
              "value": "51",
              "displayName": "51"
            },
            {
              "value": "52",
              "displayName": "52"
            },
            {
              "value": "53",
              "displayName": "53"
            },
            {
              "value": "54",
              "displayName": "54"
            },
            {
              "value": "55",
              "displayName": "55"
            },
            {
              "value": "56",
              "displayName": "56"
            },
            {
              "value": "57",
              "displayName": "57"
            },
            {
              "value": "58",
              "displayName": "58"
            },
            {
              "value": "59",
              "displayName": "59"
            },
            {
              "value": "60",
              "displayName": "60"
            },
            {
              "value": "61",
              "displayName": "61"
            },
            {
              "value": "62",
              "displayName": "62"
            },
            {
              "value": "63",
              "displayName": "63"
            },
            {
              "value": "64",
              "displayName": "64"
            }
          ],
          "displayName": "IAPD Length",
          "defaultValue": "auto",
          "requires": {
            "Mode": {
              "$in": [
                "RG Routed",
                "RG L2 Bridged"
              ]
            },
            "productFamily": "EXOS",
            "version": {
              "$in": [
                "dualStack",
                "dsLite",
                "v6"
              ]
            }
          }
        },
        {
          "name": "IPv6DNSWANConnectionPath",
          "type": "string",
          "hidden": true,
          "allowDynamicValue": true,
          "tr098PathOverride": [
            "InternetGatewayDevice.LANDevice.1.X_000631_IPv6LANHostConfigManagement.IPv6DNSWANConnectionPath"
          ],
          "requires": {
            "version": {
              "$in": [
                "dualStack",
                "dsLite",
                "v6"
              ]
            }
          }
        },
        {
          "name": "DSLiteDynamic",
          "type": "boolean",
          "valueEnums": [
            {
              "value": true,
              "displayName": "Dynamic"
            },
            {
              "value": false,
              "displayName": "Static"
            }
          ],
          "displayName": "DS-Lite Mode",
          "defaultValue": true,
          "tr098PathOverride": [
            "X_CALIX_SXACC_DS_LITE.Dynamic"
          ],
          "requires": {
            "version": "dsLite"
          }
        },
        {
          "name": "AFTR",
          "type": "string",
          "mandatory": false,
          "description": "IPv6 SP Valid Lifetime.",
          "displayName": "AFTR (Address Family Transition Router)",
          "tr098PathOverride": [
            "X_CALIX_SXACC_DS_LITE.RemoteIpv6Address"
          ],
          "requires": {
            "DSLiteDynamic": false,
            "version": "dsLite"
          }
        },
        // {
        //   "name": "VLANID",
        //   "type": "int",
        //   "maxValue": 4094,
        //   "minValue": 0,
        //   "mandatory": true,
        //   "description": "The (outer) VLAN ID.",
        //   "displayName": "VLAN ID",
        //   "defaultValue": 0,
        //   "requires": {
        //     "ServiceConnectionType": "AE_L2_Bridged"
        //   }
        // },
        {
          "name": "MatchRule",
          "type": "string",
          "valueEnums": [
            {
              "value": "None",
              "displayName": "None"
            },
            {
              "value": "Vid",
              "displayName": "VLAN ID"
            },
            {
              "value": "Pbit",
              "displayName": "P-Bits"
            },
            {
              "value": "VidPbit",
              "displayName": "VLAN ID + P-Bits"
            },
            {
              "value": "Ethertype",
              "displayName": "EtherType"
            },
            {
              "value": "Untagged",
              "displayName": "Untagged"
            },
            {
              "value": "UntaggedSA",
              "displayName": "Untagged + Src MAC"
            },
            {
              "value": "Tagged",
              "displayName": "Tagged"
            },
            {
              "value": "IPv6Untagged",
              "implies": {
                "TagAction": "Drop"
              },
              "displayName": "Untagged IPv6"
            },
            {
              "value": "TaggedIPv6",
              "implies": {
                "TagAction": "Drop"
              },
              "displayName": "Tagged IPv6"
            }
          ],
          "description": "Defines how the device classifies subscriber traffic to determine the service in which it belongs",
          "displayName": "Subscriber Traffic Match Rule",
          "displayOnly": true,
          "requires": {
            "ServiceConnectionType": "AE_L2_Bridged"
          }
        },
        {
          "name": "VLANIDFilter",
          "type": "int",
          "maxValue": 4095,
          "minValue": -1,
          "mandatory": false,
          "description": "VLAN ID of Subscriber traffic that is used to match for this video service",
          "displayName": "VLAN ID to match on",
          "displayOnly": true,
          "requires": {
            "MatchRule": {
              "$in": [
                "Vid",
                "VidPbit"
              ]
            }
          }
        },
        {
          "name": "X_000631_PbitFilter",
          "type": "int",
          "valueEnums": [
            {
              "value": 0,
              "displayName": "0"
            },
            {
              "value": 1,
              "displayName": "1"
            },
            {
              "value": 2,
              "displayName": "2"
            },
            {
              "value": 3,
              "displayName": "3"
            },
            {
              "value": 4,
              "displayName": "4"
            },
            {
              "value": 5,
              "displayName": "5"
            },
            {
              "value": 6,
              "displayName": "6"
            },
            {
              "value": 7,
              "displayName": "7"
            }
          ],
          "description": "P-Bits of Subscriber traffic that is used to match for this video service",
          "displayName": "P-Bits to match on",
          "displayOnly": true,
          "requires": {
            "MatchRule": {
              "$in": [
                "VidPbit",
                "Pbit"
              ]
            }
          }
        },
        {
          "name": "EthertypeFilterList",
          "type": "string",
          "valueEnums": [
            {
              "value": "34915,34916",
              "displayName": "PPPoE"
            },
            {
              "value": "2048,2054",
              "displayName": "IPv4+ARP"
            },
            {
              "value": "2054",
              "displayName": "ARP"
            },
            {
              "value": "2048",
              "displayName": "IPv4"
            },
            {
              "value": "34525",
              "displayName": "IPv6"
            }
          ],
          "description": "EtherType(s) of Subscriber traffic that is used to match for this video service",
          "displayName": "EtherType Filter",
          "displayOnly": true,
          "maxStringLength": 256,
          "requires": {
            "MatchRule": "Ethertype"
          }
        },
        {
          "name": "SourceMACAddressFilterList",
          "type": "string",
          "tooltip": "Comma-separated list of MAC Address/Mask pairs, e.g. \"11:22:33:00:00:00/FF:FF:FF:00:00:00\" or \"11:22:33:00:00:00/FF:FF:FF:00:00:00,44:55:66:00:00:00/FF:FF:FF:00:00:00\". \nThe masks must be either \"FF:FF:FF:00:00:00\" or \"FF:FF:FF:FF:FF:FF\"",
          "mandatory": false,
          "description": "Source MAC Address Filters of Subscriber traffic that is used to match for this video service",
          "displayName": "Source MAC Address Filters",
          "displayOnly": true,
          "maxStringLength": 1160,
          "minStringLength": 1,
          "requires": {
            "MatchRule": "UntaggedSA"
          }
        },
        {
          "name": "TagAction",
          "type": "string",
          "valueEnums": [
            {
              "value": "AddVidExplicitPbit",
              "displayName": "Add Tag with Explicit Pbit",
              "requires": {
                "MatchRule": {
                  "$in": [
                    "Untagged",
                    "UntaggedSA",
                    "Ethertype",
                    "Vid",
                    "VidPbit",
                    "Pbit",
                    "Tagged",
                    "SA",
                    "DA"
                  ]
                }
              }
            },
            {
              "value": "AddVidDscp2Pbit",
              "displayName": "Add Tag and convert DSCP to Pbit",
              "requires": {
                "MatchRule": {
                  "$in": [
                    "Untagged",
                    "UntaggedSA",
                    "SA"
                  ]
                }
              }
            },
            {
              "value": "ChangeVidPropagatePbit",
              "displayName": "Change Tag and Propagate Pbit",
              "requires": {
                "MatchRule": {
                  "$in": [
                    "Vid"
                  ]
                }
              }
            },
            {
              "value": "ChangeVidExplicitPbit",
              "displayName": "Change Tag with Explicit Pbit",
              "requires": {
                "MatchRule": {
                  "$in": [
                    "VidPbit",
                    "Vid"
                  ]
                }
              }
            },
            {
              "value": "AddVidPropagatePbit",
              "displayName": "Add Tag and Propogate Pbit",
              "requires": {
                "MatchRule": {
                  "$in": [
                    "Vid",
                    "Tagged"
                  ]
                }
              }
            },
            {
              "value": "ChangeVidPropagatePbit_AddVidExplicitPbit",
              "displayName": "Change to Inner Tag and Propagate Pbit, Add Outer Tag with Explicit Pbit",
              "requires": {
                "MatchRule": {
                  "$in": [
                    "Vid"
                  ]
                }
              }
            },
            {
              "value": "ChangeVidPropagatePbit_AddVidPropagatePbit",
              "displayName": "Change to Inner Tag and Propagate Pbit, Add Outer Tag and Propagate Pbit",
              "requires": {
                "MatchRule": {
                  "$in": [
                    "Vid",
                    "VidPbit"
                  ]
                }
              }
            },
            {
              "value": "Drop",
              "displayName": "Drop",
              "requires": {
                "MatchRule": {
                  "$in": [
                    "IPv6Untagged",
                    "TaggedIPv6"
                  ]
                }
              }
            }
          ],
          "description": "Tag Action (on matched subscriber traffic)",
          "displayName": "Tag Action (on matched subscriber traffic)",
          "displayOnly": true,
          "requires": {
            "MatchRule": {
              "$in": [
                "Vid",
                "Pbit",
                "VidPbit",
                "Ethertype",
                "Untagged",
                "SA",
                "UntaggedSA",
                "DA",
                "Tagged",
                "IPv6Untagged",
                "TaggedIPv6"
              ]
            }
          }
        },
        {
          "name": "X_CALIX_SXACC_TAG_ACTION_FILTERS",
          "type": "stringArray",
          "hidden": true
        },
        {
          "name": "InnerVLANID",
          "type": "int",
          "maxValue": 4095,
          "minValue": 0,
          "mandatory": false,
          "description": "Value of the inner VLAN ID to be used for double tagged operations.",
          "displayName": "Inner Tag VLAN ID",
          "defaultValue": 0,
          "requires": {
            "ServiceConnectionType": "AE_L2_Bridged",
            "TagAction": {
              "$in": [
                "ChangeVidPropagatePbit_AddVidExplicitPbit",
                "ChangeVidPropagatePbit_AddVidPropagatePbit"
              ]
            }
          }
        },
        {
          "name": "Pbit",
          "type": "int",
          "mandatory": true,
          "valueEnums": [
            {
              "value": 0,
              "displayName": "0",
              "requires": {
                "TagAction": {
                  "$in": [
                    "AddVidExplicitPbit",
                    "ChangeVidExplicitPbit",
                    "ChangeVidPropagatePbit_AddVidExplicitPbit"
                  ]
                }
              }
            },
            {
              "value": 1,
              "displayName": "1",
              "requires": {
                "TagAction": {
                  "$in": [
                    "AddVidExplicitPbit",
                    "ChangeVidExplicitPbit",
                    "ChangeVidPropagatePbit_AddVidExplicitPbit"
                  ]
                }
              }
            },
            {
              "value": 2,
              "displayName": "2",
              "requires": {
                "TagAction": {
                  "$in": [
                    "AddVidExplicitPbit",
                    "ChangeVidExplicitPbit",
                    "ChangeVidPropagatePbit_AddVidExplicitPbit"
                  ]
                }
              }
            },
            {
              "value": 3,
              "displayName": "3",
              "requires": {
                "TagAction": {
                  "$in": [
                    "AddVidExplicitPbit",
                    "ChangeVidExplicitPbit",
                    "ChangeVidPropagatePbit_AddVidExplicitPbit"
                  ]
                }
              }
            },
            {
              "value": 4,
              "displayName": "4",
              "requires": {
                "TagAction": {
                  "$in": [
                    "AddVidExplicitPbit",
                    "ChangeVidExplicitPbit",
                    "ChangeVidPropagatePbit_AddVidExplicitPbit"
                  ]
                }
              }
            },
            {
              "value": 5,
              "displayName": "5",
              "requires": {
                "TagAction": {
                  "$in": [
                    "AddVidExplicitPbit",
                    "ChangeVidExplicitPbit",
                    "ChangeVidPropagatePbit_AddVidExplicitPbit"
                  ]
                }
              }
            },
            {
              "value": 6,
              "displayName": "6",
              "requires": {
                "TagAction": {
                  "$in": [
                    "AddVidExplicitPbit",
                    "ChangeVidExplicitPbit",
                    "ChangeVidPropagatePbit_AddVidExplicitPbit"
                  ]
                }
              }
            },
            {
              "value": 7,
              "displayName": "7",
              "requires": {
                "TagAction": {
                  "$in": [
                    "AddVidExplicitPbit",
                    "ChangeVidExplicitPbit",
                    "ChangeVidPropagatePbit_AddVidExplicitPbit"
                  ]
                }
              }
            },
            {
              "value": -1,
              "displayName": "Propagate",
              "requires": {
                "ServiceConnectionType": "AE_L2_Bridged",
                "TagAction": {
                  "$in": [
                    "AddVidPropagatePbit",
                    "ChangeVidPropagatePbit",
                    "ChangeVidPropagatePbit_AddVidPropagatePbit"
                  ]
                }
              }
            },
            {
              "value": -2,
              "displayName": "DSCP to P-Bits",
              "requires": {
                "ServiceConnectionType": "AE_L2_Bridged",
                "TagAction": {
                  "$in": [
                    "AddVidDscp2Pbit"
                  ]
                }
              }
            }
          ],
          "description": "The priority of the (outer) VLAN.",
          "displayName": "Priority (P-Bits)",
          "defaultValue": 3,
          "requires": {
            "ServiceConnectionType": "AE_L2_Bridged",
            "TagAction": {
              "$in": [
                "AddVidExplicitPbit",
                "ChangeVidExplicitPbit",
                "ChangeVidPropagatePbit_AddVidExplicitPbit"
              ]
            }
          }
        },
        {
          "name": "X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS",
          "type": "stringArray",
          "mandatory": false,
          "valueEnums": [
            {
              "value": "1",
              "displayName": "ETH Port 1"
            },
            {
              "value": "2",
              "displayName": "ETH Port 2"
            },
            {
              "value": "3",
              "displayName": "ETH Port 3"
            },
            {
              "value": "4",
              "displayName": "ETH Port 4"
            }
          ],
          "description": "The LAN ETH Ports belong to this AE L2 Bridge",
          "displayName": "Member ETH Ports",
          "defaultValue": [
            "1"
          ],
          "requires": {
            "ServiceConnectionType": "AE_L2_Bridged"
          }
        },
        {
          "name": "Hairpin",
          "type": "boolean",
          "hidden": true
        },
        {
          "name": "AdvancedSettings",
          "type": "boolean",
          "valueEnums": [
            {
              "value": true,
              "displayName": "Show"
            },
            {
              "value": false,
              "displayName": "Hide"
            }
          ],
          "description": "Show/Hide Advanced ONT Bridge Settings",
          "displayName": "Advanced Settings",
          "displayOnly": true,
          "defaultValue": false,
          "inputAuxiliary": true,
          "requires": {
            "ServiceConnectionType": "AE_L2_Bridged"
          }
        },
        {
          "name": "USMaxMcastBcastRate",
          "type": "boolean",
          "displayName": "US Max Mcast/Bcast Rate",
          "displayOnly": true,
          "defaultValue": false,
          "requires": {
            "Mode": "ONT Half Bridge",
            "TLANEnable": false
          }
        },
        {
          "name": "UpstreamCIR",
          "type": "string",
          "tooltip": "Please enter a value suffix k for Kbps (with 1k-10240k)",
          "mandatory": false,
          "displayName": "US Max Rate",
          "defaultValue": "24k",
          "stringPattern": "^([1-9]\\d{0,3}|10[0-1]\\d\\d|102[0-3]\\d|10240)k$",
          "validationErrorMessage": "Please enter a value suffix k for Kbps (with 1k-10240k)",
          "requires": {
            "USMaxMcastBcastRate": true
          }
        },

        {
          "name": "MacLimit",
          "type": "int",
          "maxValue": 512,
          "minValue": 0,
          "description": "controls the MAC limiting feature. Default is 0 which means no MAC limiting. Range: 0..512",
          "displayName": "MAC Limit",
          "defaultValue": 0,
          "requires": {
            "AdvancedSettings": true
          }
        },
        {
          "name": "L2CPConfigured",
          "type": "boolean",
          "description": "Enable/Disable L2CP",
          "displayName": "L2CP",
          "defaultValue": false,
          "requires": {
            "AdvancedSettings": true
          }
        },
        {
          "name": "L2CPBpduFilter",
          "type": "string",
          "valueEnums": [
            {
              "value": "Discard",
              "displayName": "Discard"
            },
            {
              "value": "Tunnel",
              "displayName": "Tunnel"
            }
          ],
          "description": "Enable/Disable L2CP BPDU Filtering",
          "displayName": "BPDU Filtering",
          "requires": {
            "L2CPConfigured": true
          }
        },
        {
          "name": "L2CPGarpFilter",
          "type": "string",
          "valueEnums": [
            {
              "value": "Discard",
              "displayName": "Discard"
            },
            {
              "value": "Tunnel",
              "displayName": "Tunnel"
            }
          ],
          "description": "Enable/Disable L2CP GARP Filtering",
          "displayName": "GARP Filtering",
          "requires": {
            "L2CPConfigured": true
          }
        },
        {
          "name": "L2CPAllLansFilter",
          "type": "string",
          "valueEnums": [
            {
              "value": "Discard",
              "displayName": "Discard"
            },
            {
              "value": "Tunnel",
              "displayName": "Tunnel"
            }
          ],
          "description": "Enable/Disable L2CP All LANs Filtering",
          "displayName": "All LANs Filtering",
          "requires": {
            "L2CPConfigured": true
          }
        },
        {
          "name": "MacFFEnable",
          "type": "boolean",
          "description": "Enable/Disable MAC Forced Forwarding",
          "displayName": "MAC Forced Forwarding",
          "defaultValue": false,
          "requires": {
            "AdvancedSettings": true
          }
        },
        {
          "name": "IPSourceVerifyEnable",
          "type": "boolean",
          "description": "Enable/Disable IP Source Verification",
          "displayName": "IP Source Verification",
          "defaultValue": false,
          "requires": {
            "AdvancedSettings": true
          }
        },
        {
          "name": "TLANEnable",
          "type": "boolean",
          "description": "Enable/Disable TLAN",
          "displayName": "TLAN",
          "defaultValue": false,
          "requires": {
            "AdvancedSettings": true
          }
        },
        {
          "name": "IPv6Transparent",
          "type": "boolean",
          "description": "Enable/Disable IPv6 Transparent",
          "displayName": "IPv6 Transparent",
          "defaultValue": false,
          "requires": {
            "AdvancedSettings": true
          }
        },
        {
          "name": "DhcpMode",
          "type": "string",
          "valueEnums": [
            {
              "value": "None",
              "displayName": "None"
            },
            {
              "value": "Snoop",
              "displayName": "Snoop"
            },
            {
              "value": "L2Relay",
              "displayName": "L2 Relay"
            }
          ],
          "description": "DHCP Mode",
          "displayName": "DHCP Mode",
          "defaultValue": "None",
          "requires": {
            "AdvancedSettings": true
          }
        },
        {
          "name": "Option82Profile",
          "type": "innerProfile",
          "mandatory": false,
          "description": "DHCP Option82 Profile",
          "displayName": "DHCP Option82 Profile",
          "innerProfileCategory": "DHCP Option82",
          "requires": {
            "AdvancedSettings": true,
            "DhcpMode": "L2Relay"
          }
        }
      ]
    }, {
      "_id": "4562fdaa-4f8e-4b08-b49a-e0e45861557c",
      "name": "Delete Object",
      "group": "TR-69 - Advanced",
      "createTime": "2020-07-24T05:11:17.027Z",
      "description": "Delete Object",
      "displayName": "Delete Object",
      "keyParameter": {
        "name": "tr098PathPrefix"
      },
      "multiInstance": true,
      "parameters": [{
        "name": "tr098PathPrefix",
        "type": "string",
        "tooltip": "The Partial Path of the Objects, for example \"InternetGatewayDevice.User.\" or \"InternetGatewayDevice.User.{i}.\" (the \"{i}.\" suffix is optional)",
        "mandatory": true,
        "displayName": "Object Path"
      }, {
        "name": "keyParameter",
        "type": "string",
        "tooltip": "Name of the parameter that uniquely identifies each object, for example \"Username\" for \"InternetGatewayDevice.User.{i}.\" objects",
        "mandatory": true,
        "displayName": "Index Parameter"
      }, {
        "name": "deleteObjectsInTheList",
        "type": "boolean",
        "tooltip": "\"Delete objects in the list\" option will keep all objects that are NOT in the list, while the \"Delete Objects NOT in the list\" option will keep the objects in the list and delete everything else.\nIf the \"Delete Objects NOT in the list\" option is selected but the list is empty, all objects will be deleted",
        "valueEnums": [{
          "value": true,
          "displayName": "Delete Objects in the list"
        }, {
          "value": false,
          "displayName": "Delete Objects NOT in the list"
        }],
        "displayName": "Delete Objects in the list or NOT in the list?",
        "defaultValue": true
      }, {
        "name": "objectList",
        "type": "string",
        "tooltip": "A comma separated list of values of the index parameters that identify the object(s) to be deleted or kept",
        "displayName": "List of Objects"
      }]
    }, {
      "_id": "13ca3921-6326-4829-8b4a-50afec3c3f24",
      "name": "DHCP Option82",
      "group": "Service Attributes",
      "inner": true,
      "createTime": "2020-07-24T05:11:17.571Z",
      "description": "DHCP Option82",
      "displayName": "DHCP Option82",
      "parameters": [{
        "name": "CircuitIDFormat",
        "type": "string",
        "watermark": "Supported tokens include: %sn, %vlan, %iftype, %ontport, %desc, %clab, %oltsystemid, %oltport, %ronta, %mac, %macstr",
        "description": "CircuitID Format",
        "displayName": "CircuitID Format",
        "maxStringLength": 63
      }, {
        "name": "RemoteIDFormat",
        "type": "string",
        "watermark": "Supported tokens include: %sn, %vlan, %iftype, %ontport, %desc, %clab, %oltsystemid, %oltport, %ronta, %mac, %macstr",
        "description": "RemoteID Format",
        "displayName": "RemoteID Format",
        "maxStringLength": 63
      }, {
        "name": "Description",
        "type": "string",
        "description": "Description",
        "displayName": "Description",
        "maxStringLength": 31
      }]
    }, {
      "_id": "1f823c68-4e48-4419-807c-758b4a500e54",
      "name": "DHCP Server",
      "group": "IP Addressing",
      "createTime": "2020-07-24T05:11:17.330Z",
      "description": "Define configuration parameters for the DHCP server on the LAN interface.",
      "displayName": "DHCP Server",
      "tr098PathPrefix": "InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.",
      "parameters": [{
        "name": "DHCPServerEnable",
        "type": "boolean",
        "description": "Enables or disables the DHCP server on the LAN interface.",
        "displayName": "DHCP Server"
      }, {
        "name": "DeviceIpAddress",
        "type": "IPAddress",
        "description": "Specifies the IP address of the Device itself.",
        "displayName": "Device IP Address",
        "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.IPInterface.1.IPInterfaceIPAddress"]
      }, {
        "name": "MinAddress",
        "type": "IPAddress",
        "description": "Specifies first address in the pool to be assigned by the DHCP server on the LAN interface.\nThis parameter MUST have a valid value before the DHCP server can be enabled.",
        "displayName": "Beginning IP Address"
      }, {
        "name": "MaxAddress",
        "type": "IPAddress",
        "description": "Specifies last address in the pool to be assigned by the DHCP server on the LAN interface.\nThis parameter MUST have a valid value before the DHCP server can be enabled.",
        "displayName": "Ending IP Address"
      }, {
        "name": "SubnetMask",
        "type": "IPAddress",
        "description": "Specifies the client's network subnet mask.\nThis parameter MUST have a valid value before the DHCP server can be enabled.",
        "displayName": "Subnet Mask"
      }, {
        "name": "DNSServers",
        "type": "string",
        "tooltip": "Comma-separated list (maximum list length 64) of DNS servers offered to DHCP clients. Support for more than three DNS Servers is OPTIONAL.",
        "description": "Comma-separated list (maximum list length 64) of IPAddresses. DNS servers offered to DHCP clients. Support for more than three DNS Servers is OPTIONAL.",
        "displayName": "DNS Servers",
        "maxStringLength": 64
      }, {
        "name": "X_000631_HostName",
        "type": "string",
        "description": "Sets the Device's Hostname",
        "displayName": "Host Name",
        "maxStringLength": 64
      }, {
        "name": "DomainName",
        "type": "string",
        "description": "Sets the domain name to provide to clients on the LAN interface.",
        "displayName": "Domain Name",
        "maxStringLength": 64
      }, {
        "name": "DHCPLeaseTime",
        "type": "int",
        "minValue": -1,
        "description": "Specifies the lease time in seconds of client assigned addresses. A value of -1 indicates an infinite lease.",
        "displayName": "DHCP Server Lease Time (in seconds)",
        "defaultValue": 86400,
        "excludedValueEnums": [0],
        "validationErrorMessage": "Please enter a positive number, or -1 for infinite lease"
      }]
    }, {
      "_id": "073891b5-9954-406e-806b-7477e9f4f487",
      "name": "DHCPv6 Server",
      "group": "IP Addressing",
      "createTime": "2020-07-24T05:11:17.450Z",
      "description": "Define DHCPv6 server configuration on the LAN interface.",
      "displayName": "DHCPv6 Server",
      "tr098PathPrefix": "InternetGatewayDevice.LANDevice.1.X_000631_IPv6LANHostConfigManagement.",
      "parameters": [{
        "name": "productFamily",
        "type": "string",
        "valueEnums": [{
          "value": "GigaCenter",
          "displayName": "GigaCenter and GigaHub"
        }, {
          "value": "EXOS",
          "displayName": "EXOS-Powered GigaSpire"
        }],
        "description": "The CPE Product Family.",
        "displayName": "Product Family(s)",
        "displayOnly": true,
        "defaultValue": "GigaCenter"
      }, {
        "name": "X_000631_RA",
        "type": "string",
        "valueEnums": [{
          "value": "disabled",
          "displayName": "Disabled"
        }, {
          "value": "server",
          "displayName": "Server"
        }],
        "description": "Enable or disable the RA on the default LAN",
        "displayName": "RA Service",
        "defaultValue": "disabled",
        "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_RA"],
        "requires": {
          "productFamily": "EXOS"
        }
      }, {
        "name": "X_000631_DHCPv6",
        "type": "string",
        "valueEnums": [{
          "value": "disabled",
          "displayName": "Disabled"
        }, {
          "value": "server",
          "displayName": "Server"
        }],
        "description": "Enable or disable the DHCPv6 on the default LAN",
        "displayName": "DHCPv6 Service",
        "defaultValue": "disabled",
        "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_DHCPv6"],
        "requires": {
          "productFamily": "EXOS"
        }
      }, {
        "name": "X_000631_RAManagement",
        "type": "string",
        "valueEnums": [{
          "value": "A-flag",
          "displayName": "Stateless"
        }, {
          "value": "M-flag",
          "displayName": "Stateful"
        }, {
          "value": "M-and-A",
          "displayName": "Both"
        }],
        "description": "Enable or disable the DHCPv6 on the default LAN",
        "displayName": "DHCPv6 Mode",
        "defaultValue": "M-and-A",
        "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_RAManagement"],
        "requires": {
          "productFamily": "EXOS"
        }
      }, {
        "name": "IPv6DNSModeDisplay",
        "type": "boolean",
        "valueEnums": [{
          "value": true,
          "displayName": "Default"
        }, {
          "value": false,
          "displayName": "Custom"
        }],
        "displayName": "DNS Mode",
        "displayOnly": true,
        "defaultValue": true,
        "requires": {
          "productFamily": "EXOS"
        }
      }, {
        "name": "X_000631_IPv6DNSServers",
        "type": "IPv6Address",
        "tooltip": "Comma-separated list of maximum two DNS server addresses offered to DHCPv6 clients.",
        "mandatory": true,
        "description": "Comma-separated list of maximum two DNS server addresses offered to DHCPv6 clients.",
        "displayName": "DNS Servers",
        "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_IPv6DNSServers"],
        "requires": {
          "productFamily": "EXOS",
          "IPv6DNSModeDisplay": false
        }
      }, {
        "name": "DHCPv6ServerEnable",
        "type": "boolean",
        "implies": {
          "true": {
            "IPv6DNSWANConnectionPath": "%IPV6_DATA_WAN_CONNECTION%"
          }
        },
        "valueEnums": [{
          "value": true,
          "displayName": "Enabled"
        }, {
          "value": false,
          "displayName": "Disabled"
        }],
        "description": "Enable or disable the DHCPv6 server on the LAN interface.",
        "displayName": "DHCP Server",
        "defaultValue": true,
        "requires": {
          "productFamily": "GigaCenter"
        }
      }, {
        "name": "StatefulDHCPv6Server",
        "type": "boolean",
        "valueEnums": [{
          "value": true,
          "displayName": "Stateful"
        }, {
          "value": false,
          "displayName": "Stateless"
        }],
        "description": "Indicate whether the DHCPv6 server is stateful or stateless.",
        "displayName": "Addressing State",
        "defaultValue": true,
        "requires": {
          "productFamily": "GigaCenter",
          "DHCPv6ServerEnable": true
        }
      }, {
        "name": "MinInterfaceID",
        "type": "string",
        "description": "Last 64-bits of the IPv6 address that marks the beginning of the interface pool used by the DHCPv6 server to assign addresses.",
        "displayName": "Minimum Interface ID",
        "defaultValue": "0:0:0:2",
        "stringPattern": "^([0-9a-fA-F]{1,4}:){3}([0-9a-fA-F]{1,4})$",
        "requires": {
          "productFamily": "GigaCenter",
          "StatefulDHCPv6Server": true,
          "DHCPv6ServerEnable": true
        }
      }, {
        "name": "MaxInterfaceID",
        "type": "string",
        "description": "Last 64-bits of the IPv6 address that marks the end of the interface pool used by the DHCPv6 server to assign addresses.",
        "displayName": "Maximum Interface ID",
        "defaultValue": "0:0:0:254",
        "stringPattern": "^([0-9a-fA-F]{1,4}:){3}([0-9a-fA-F]{1,4})$",
        "requires": {
          "productFamily": "GigaCenter",
          "StatefulDHCPv6Server": true,
          "DHCPv6ServerEnable": true
        }
      }, {
        "name": "DHCPv6LeaseTime",
        "type": "int",
        "minValue": -1,
        "description": "Specifies the lease time in seconds. A value of -1 indicates an infinite lease.",
        "displayName": "Lease Time (seconds)",
        "defaultValue": 86400,
        "excludedValueEnums": [0],
        "validationErrorMessage": "Please enter a positive number, or -1 for an infinite lease",
        "requires": {
          "DHCPv6ServerEnable": true,
          "StatefulDHCPv6Server": true,
          "productFamily": "GigaCenter"
        }
      }, {
        "name": "DNSModeDisplay",
        "type": "boolean",
        "implies": {
          "true": {
            "IPv6DNSConfigType": "DHCP"
          },
          "false": {
            "IPv6DNSConfigType": "Static"
          }
        },
        "valueEnums": [{
          "value": true,
          "displayName": "Auto"
        }, {
          "value": false,
          "displayName": "Custom"
        }],
        "displayName": "DNS Mode",
        "displayOnly": true,
        "defaultValue": true,
        "requires": {
          "DHCPv6ServerEnable": true,
          "productFamily": "GigaCenter"
        }
      }, {
        "name": "IPv6DNSWANConnectionPath",
        "type": "string",
        "hidden": true,
        "allowDynamicValue": true,
        "requires": {
          "productFamily": "GigaCenter",
          "DHCPv6ServerEnable": true
        }
      }, {
        "name": "IPv6DNSConfigType",
        "type": "string",
        "hidden": true
      }, {
        "name": "IPv6DNSServers",
        "type": "IPv6Address",
        "mandatory": true,
        "description": "Comma-separated list of maximum two DNS server addresses offered to DHCPv6 clients.",
        "displayName": "DNS Servers",
        "requires": {
          "productFamily": "GigaCenter",
          "DNSModeDisplay": false,
          "DHCPv6ServerEnable": true
        }
      }]
    }, {
      "_id": "b52fe49c-487b-4fc4-8eb3-607e003f834b",
      "name": "DNS Host Mapping",
      "group": "IP Addressing",
      "createTime": "2020-07-24T05:11:17.692Z",
      "description": "Configure host mapping for CPE device.",
      "displayName": "DNS Host Mapping",
      "keyParameter": {
        "name": "HostName",
        "allowOverwrite": false
      },
      "multiInstance": true,
      "tr098PathPrefix": "InternetGatewayDevice.X_000631_DNSHostMapping.{i}.",
      "parameters": [{
        "name": "HostName",
        "type": "string",
        "mandatory": true,
        "description": "The host name that to be mapped to a certain IP Address",
        "displayName": "Host Name",
        "maxStringLength": 63,
        "minStringLength": 1
      }, {
        "name": "IPAddress",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The IP Address that a host name maps to",
        "displayName": "IP Address"
      }]
    }, {
      "_id": "3f14036e-f133-4cdc-a9c3-5ede298986a0",
      "name": "DSCP",
      "group": "Service Attributes",
      "tr098Path": "InternetGatewayDevice.X_000631_Device.Dscp2PbitMap",
      "createTime": "2020-07-24T05:11:17.819Z",
      "description": "The DSCP to P-Bit mapping table consists of 64 bytes string.  Each byte represents the value of the DSCP to P-bit mapping in ASCII.",
      "displayName": "DSCP",
      "parameters": [{
        "name": "CS0 (0)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 0
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "CS0 (0)",
        "defaultValue": 0
      }, {
        "name": "CS1 (8)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 8
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "CS1 (8)",
        "defaultValue": 1
      }, {
        "name": "AF11 (10)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 10
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF11 (10)",
        "defaultValue": 1
      }, {
        "name": "AF12 (12)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 12
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF12 (12)",
        "defaultValue": 1
      }, {
        "name": "AF13 (14)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 14
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF13 (14)",
        "defaultValue": 1
      }, {
        "name": "CS2 (16)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 16
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "CS2 (16)",
        "defaultValue": 2
      }, {
        "name": "AF21 (18)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 18
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF21 (18)",
        "defaultValue": 2
      }, {
        "name": "AF22 (20)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 20
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF22 (20)",
        "defaultValue": 2
      }, {
        "name": "AF23 (22)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 22
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF23 (22)",
        "defaultValue": 2
      }, {
        "name": "CS3 (24)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 24
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "CS3 (24)",
        "defaultValue": 3
      }, {
        "name": "AF31 (26)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 26
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF31 (26)",
        "defaultValue": 3
      }, {
        "name": "AF32 (28)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 28
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF32 (28)",
        "defaultValue": 3
      }, {
        "name": "AF33 (30)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 30
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF33 (30)",
        "defaultValue": 3
      }, {
        "name": "CS4 (32)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 32
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "CS4 (32)",
        "defaultValue": 4
      }, {
        "name": "AF41 (34)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 34
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF41 (34)",
        "defaultValue": 4
      }, {
        "name": "AF42 (36)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 36
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF42 (36)",
        "defaultValue": 4
      }, {
        "name": "AF43 (38)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 38
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "AF43 (38)",
        "defaultValue": 4
      }, {
        "name": "CS5 (40)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 40
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "CS5 (40)",
        "defaultValue": 5
      }, {
        "name": "EF (46)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 46
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "EF (46)",
        "defaultValue": 5
      }, {
        "name": "CS6 (48)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 48
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "CS6 (48)",
        "defaultValue": 0
      }, {
        "name": "CS7 (56)",
        "type": "int",
        "mappedInfo": {
          "type": "int",
          "value": 56
        },
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "CS7 (56)",
        "defaultValue": 0
      }, {
        "name": "Default",
        "type": "int",
        "valueEnums": [{
          "value": 0,
          "displayName": "pbit-0"
        }, {
          "value": 1,
          "displayName": "pbit-1"
        }, {
          "value": 2,
          "displayName": "pbit-2"
        }, {
          "value": 3,
          "displayName": "pbit-3"
        }, {
          "value": 4,
          "displayName": "pbit-4"
        }, {
          "value": 5,
          "displayName": "pbit-5"
        }, {
          "value": 6,
          "displayName": "pbit-6"
        }, {
          "value": 7,
          "displayName": "pbit-7"
        }],
        "displayName": "Default",
        "defaultValue": 0
      }]
    }, {
      "_id": "1b7c4156-ef88-4e96-8b5f-a119deaf956e",
      "name": "Firewall",
      "group": "Security",
      "createTime": "2020-07-24T05:11:17.962Z",
      "description": "Configure Firewall",
      "displayName": "Firewall",
      "tr098PathPrefix": "InternetGatewayDevice.Firewall.",
      "parameters": [{
        "name": "Config",
        "type": "string",
        "tooltip": "Security Off -> No filtering of inbound or outbound traffic.        \nLow Security -> Inbound traffic is blocked based on the settings under 'Service Blocking'. Outbound traffic is not blocked.        \nMedium Security -> Inbound traffic is blocked based on the settings under 'Service Blocking'. Outbound traffic is not blocked. There is more inbound traffic blocked when compared to 'Low Security'.        \nHigh Security -> Inbound traffic is blocked based on the settings under 'Service Blocking'. Outbound traffic is blocked based on the settings under 'Service Blocking' including DNS.",
        "mandatory": true,
        "valueEnums": [{
          "value": "Off",
          "displayName": "Off"
        }, {
          "value": "Low",
          "displayName": "Low"
        }, {
          "value": "X_000631_Medium",
          "displayName": "Medium"
        }, {
          "value": "High",
          "displayName": "High"
        }],
        "description": "The secourity of firewall",
        "displayName": "Security Level",
        "defaultValue": "Off"
      }, {
        "name": "X_000631_StealthMode",
        "type": "boolean",
        "mandatory": true,
        "description": "Steal mode, ping request will be blocked if it is enabled",
        "displayName": "Stealth Mode"
      }]
    }, {
      "_id": "833d5dec-be36-488e-918c-be951a0acbdf",
      "name": "LED Management",
      "group": "Misc",
      "createTime": "2020-07-24T05:11:18.218Z",
      "description": "Calix LED Management",
      "displayName": "LED Management",
      "tr098PathPrefix": "InternetGatewayDevice.X_000631_Device.LedSuppress.",
      "parameters": [{
        "name": "SuppressMode",
        "type": "int",
        "mandatory": true,
        "valueEnums": [{
          "value": 0,
          "displayName": "None Suppressed"
        }, {
          "value": 1,
          "displayName": "All Suppressed"
        }, {
          "value": 2,
          "displayName": "Custom Suppression"
        }],
        "description": "Specific Led Suppress mode,include three mode:all unsuppressed|all suppressed|custom.",
        "displayName": "LED Control",
        "defaultValue": 0
      }, {
        "name": "LedPower",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Power",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.1.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedBroadBand",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Broadband",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.2.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedService",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Service",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.3.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedWifi2.4G",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED WiFi 2.4GHz",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.4.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedWifi5G",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED WiFi 5GHz",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.5.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedEth1",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Eth1",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.6.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedEth2",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Eth2",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.7.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedEth3",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Eth3",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.8.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedEth4",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Eth4",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.9.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedPhone1",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Phone1",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.10.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedPhone2",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED Phone2",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.11.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }, {
        "name": "LedUSB",
        "type": "boolean",
        "description": "The led mode of suppress",
        "displayName": "LED USB",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_Device.LedSuppress.LedSuppressItem.12.SuppressEnable"],
        "requires": {
          "SuppressMode": 2
        }
      }]
    }, {
      "_id": "274fc04c-4090-424e-9a8b-838f9d61173c",
      "name": "Management Server",
      "group": "MGMT Server",
      "createTime": "2020-07-24T05:11:18.081Z",
      "description": "Define parameters relating to the CPE's association with an ACS.",
      "displayName": "Management Server",
      "tr098PathPrefix": "InternetGatewayDevice.ManagementServer.",
      "parameters": [{
        "name": "PeriodicInformEnableControl",
        "type": "boolean",
        "hidden": true,
        "implies": {
          "true": {
            "PeriodicInformEnable": true
          },
          "false": {
            "PeriodicInformEnable": true
          }
        },
        "description": "Hidden Control to make PeriodicInformEnable read-only and always true.",
        "displayOnly": true,
        "defaultValue": true
      }, {
        "name": "PeriodicInformEnable",
        "type": "boolean",
        "description": "Whether or not the CPE MUST periodically send CPE information to the ACS using the Inform method call.",
        "displayName": "Main TR069 Client Periodic Inform",
        "defaultValue": true
      }, {
        "name": "PeriodicInformIntervalControl",
        "type": "unsignedInt",
        "hidden": true,
        "implies": {
          "86400": {
            "PeriodicInformInterval": 86400
          }
        },
        "maxValue": 86400,
        "minValue": 86400,
        "description": "Hidden Control to make PeriodicInformInterval read-only and always 86400.",
        "displayOnly": true,
        "defaultValue": 86400
      }, {
        "name": "PeriodicInformInterval",
        "type": "unsignedInt",
        "maxValue": 86400,
        "minValue": 86400,
        "description": "The duration in seconds of the interval for which the CPE MUST attempt to connect with the ACS and call the Inform method if PeriodicInformEnable is true.",
        "displayName": "Main TR069 Client Periodic Inform Interval (in seconds)",
        "defaultValue": 86400
      }, {
        "name": "ConfigureMain",
        "type": "boolean",
        "valueEnums": [{
          "value": true,
          "displayName": "Yes"
        }, {
          "value": false,
          "displayName": "No"
        }],
        "description": "Enable Main ACS server Configuration.",
        "displayName": "Configure Main ACS URL/Credentials",
        "displayOnly": true,
        "defaultValue": false
      }, {
        "name": "URL",
        "type": "string",
        "description": "URL, as defined in [RFC3986], for the CPE to connect to the ACS using the CPE WAN Management Protocol.",
        "displayName": "Main ACS URL",
        "maxStringLength": 256,
        "minStringLength": 1,
        "requires": {
          "ConfigureMain": true
        }
      }, {
        "name": "Username",
        "type": "string",
        "allowEmpty": true,
        "description": "Username used to authenticate the CPE when making a connection to the ACS using the CPE WAN Management Protocol.",
        "displayName": "Main ACS Username",
        "maxStringLength": 256,
        "minStringLength": 1,
        "requires": {
          "ConfigureMain": true
        }
      }, {
        "name": "Password",
        "type": "string",
        "allowEmpty": true,
        "description": "Password used to authenticate the CPE when making a connection to the ACS using the CPE WAN Management Protocol.",
        "displayName": "Main ACS Password",
        "maxStringLength": 256,
        "minStringLength": 1,
        "requires": {
          "ConfigureMain": true
        }
      }, {
        "name": "STUNEnable",
        "type": "boolean",
        "hidden": true,
        "implies": {
          "true": {
            "STUNServerPort": "%STUN_SERVER_PORT%",
            "STUNServerAddress": "%STUN_SERVER_ADDRESS%"
          }
        },
        "displayName": "Main STUN Client",
        "notifications": {
          "true": ["InternetGatewayDevice.ManagementServer.UDPConnectionRequestAddress", "InternetGatewayDevice.ManagementServer.NATDetected"]
        }
      }, {
        "name": "STUNServerAddress",
        "type": "string",
        "hidden": true,
        "maxStringLength": 256,
        "minStringLength": 1,
        "allowDynamicValue": true,
        "requires": {
          "STUNEnable": true
        }
      }, {
        "name": "STUNServerPort",
        "type": "string",
        "hidden": true,
        "allowDynamicValue": true,
        "requires": {
          "STUNEnable": true
        }
      }, {
        "name": "SupplementClient",
        "type": "boolean",
        "displayName": "Supplement TR069 Client",
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.EnableCWMP"]
      }, {
        "name": "SupplementPeriodicInformEnableControl",
        "type": "boolean",
        "hidden": true,
        "implies": {
          "true": {
            "SupplementPeriodicInformEnable": true
          },
          "false": {
            "SupplementPeriodicInformEnable": true
          }
        },
        "description": "Hidden Control for SupplementPeriodicInformEnable to be read-only and always Enabled.",
        "displayOnly": true,
        "defaultValue": true,
        "requires": {
          "SupplementClient": true
        }
      }, {
        "name": "SupplementPeriodicInformEnable",
        "type": "boolean",
        "description": "Whether or not the CPE MUST periodically send CPE information to the ACS using the Inform method call.",
        "displayName": "Supplement TR069 Client Periodic Inform",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.PeriodicInformEnable"],
        "requires": {
          "SupplementClient": true
        }
      }, {
        "name": "SupplementPeriodicInformIntervalControl",
        "type": "unsignedInt",
        "hidden": true,
        "implies": {
          "86400": {
            "SupplementPeriodicInformInterval": 86400
          }
        },
        "maxValue": 86400,
        "minValue": 86400,
        "description": "Hidden Control to set SupplementPeriodicInformInterval to 86400 and read-only.",
        "displayOnly": true,
        "defaultValue": 86400,
        "requires": {
          "SupplementClient": true
        }
      }, {
        "name": "SupplementPeriodicInformInterval",
        "type": "unsignedInt",
        "maxValue": 86400,
        "minValue": 86400,
        "description": "The duration in seconds of the interval for which the CPE MUST attempt to connect with the ACS and call the Inform method if PeriodicInformEnable is true.",
        "displayName": "Supplement TR069 Client Periodic Inform Interval (in seconds)",
        "defaultValue": 86400,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.PeriodicInformInterval"],
        "requires": {
          "SupplementClient": true
        }
      }, {
        "name": "SupplementURL",
        "type": "string",
        "description": "URL, as defined in [RFC3986], for the CPE to connect to the ACS using the CPE WAN Management Protocol.",
        "displayName": "Supplement ACS URL",
        "maxStringLength": 256,
        "minStringLength": 1,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.URL"],
        "requires": {
          "SupplementClient": true
        }
      }, {
        "name": "SupplementUsername",
        "type": "string",
        "allowEmpty": true,
        "description": "Username used to authenticate the CPE when making a connection to the ACS using the CPE WAN Management Protocol.",
        "displayName": "Supplement ACS Username",
        "maxStringLength": 256,
        "minStringLength": 1,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.Username"],
        "requires": {
          "SupplementClient": true
        }
      }, {
        "name": "SupplementPassword",
        "type": "string",
        "allowEmpty": true,
        "description": "Password used to authenticate the CPE when making a connection to the ACS using the CPE WAN Management Protocol.",
        "displayName": "Supplement ACS Password",
        "maxStringLength": 256,
        "minStringLength": 1,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.Password"],
        "requires": {
          "SupplementClient": true
        }
      }, {
        "name": "SupplementSTUNEnable",
        "type": "boolean",
        "hidden": true,
        "implies": {
          "true": {
            "SupplementSTUNServerPort": "%STUN_SERVER_PORT%",
            "SupplementSTUNServerAddress": "%STUN_SERVER_ADDRESS%"
          }
        },
        "displayName": "Supplement STUN Client",
        "notifications": {
          "true": ["InternetGatewayDevice.X_000631_ManagementServer.UDPConnectionRequestAddress", "InternetGatewayDevice.X_000631_ManagementServer.NATDetected"]
        },
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.STUNEnable"],
        "requires": {
          "SupplementClient": true
        }
      }, {
        "name": "SupplementSTUNServerAddress",
        "type": "string",
        "hidden": true,
        "maxStringLength": 256,
        "minStringLength": 1,
        "allowDynamicValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.STUNServerAddress"],
        "requires": {
          "SupplementSTUNEnable": true
        }
      }, {
        "name": "SupplementSTUNServerPort",
        "type": "string",
        "hidden": true,
        "allowDynamicValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.X_000631_ManagementServer.STUNServerPort"],
        "requires": {
          "SupplementSTUNEnable": true
        }
      }]
    }, {
      "_id": "ffa5d9b3-2876-4705-9a7d-bbc4b349ce19",
      "name": "PPPoE",
      "group": "Service Attributes",
      "createTime": "2020-07-24T05:11:18.336Z",
      "description": "Configure PPPoE",
      "displayName": "PPPoE",
      "tr098PathPrefix": "X_CALIX_SXACC_PPPOE_WanConnectionPath.",
      "parameters": [{
        "name": "Username",
        "type": "string",
        "mandatory": true,
        "watermark": "Use %EMAIL% as the token to use subscriber's email address as the user name",
        "description": "The Username of PPPoE",
        "displayName": "Username",
        "maxStringLength": 32,
        "allowDynamicValue": true
      }, {
        "name": "Password",
        "type": "string",
        "mandatory": true,
        "watermark": "Use %PHONE_NUMBER% as the token to use subscriber's phone number as the password",
        "description": "The Password of PPPoE",
        "displayName": "Password",
        "maxStringLength": 32,
        "allowDynamicValue": true
      }]
    }, {
      "_id": "4c773cf8-65ef-4a3b-805c-3f64d5566f51",
      "name": "QOS Rule",
      "group": "Service Attributes",
      "createTime": "2020-07-24T05:11:18.592Z",
      "description": "QoS Rule",
      "displayName": "QoS Rule",
      "keyParameter": {
        "name": "X_000631_ClassName",
        "allowOverwrite": false
      },
      "multiInstance": true,
      "tr098PathPrefix": "InternetGatewayDevice.QueueManagement.Classification.{i}.",
      "parameters": [{
        "name": "QosType",
        "type": "string",
        "implies": {
          "VOIP Up": {
            "DestIP": "",
            "DSCPMark": 184,
            "DestMask": "255.255.255.0",
            "DestPort": -1,
            "SourceIP": "",
            "DSCPCheck": 184,
            "Ethertype": 2048,
            "ClassQueue": 5,
            "SourceMask": "255.255.255.0",
            "SourcePort": -1,
            "ClassInterface": "LAN",
            "DestPortRangeMax": -1,
            "SourcePortRangeMax": -1,
            "X_000631_ClassName": "VOIP Up"
          },
          "Video Up": {
            "DestIP": "",
            "DSCPMark": 184,
            "DestMask": "255.255.255.0",
            "DestPort": -1,
            "SourceIP": "",
            "DSCPCheck": 88,
            "Ethertype": 2048,
            "ClassQueue": 5,
            "SourceMask": "255.255.255.0",
            "SourcePort": -1,
            "ClassInterface": "LAN",
            "DestPortRangeMax": -1,
            "SourcePortRangeMax": -1,
            "X_000631_ClassName": "Video Up"
          },
          "VOIP Down": {
            "DestIP": "",
            "DSCPMark": 184,
            "DestMask": "255.255.255.0",
            "DestPort": -1,
            "SourceIP": "",
            "DSCPCheck": 184,
            "Ethertype": 2048,
            "ClassQueue": 9,
            "SourceMask": "255.255.255.0",
            "SourcePort": -1,
            "ClassInterface": "WAN",
            "DestPortRangeMax": -1,
            "SourcePortRangeMax": -1,
            "X_000631_ClassName": "VOIP Down"
          },
          "Video Down": {
            "DestIP": "",
            "DSCPMark": 184,
            "DestMask": "255.255.255.0",
            "DestPort": -1,
            "SourceIP": "",
            "DSCPCheck": 88,
            "Ethertype": 2048,
            "ClassQueue": 9,
            "SourceMask": "255.255.255.0",
            "SourcePort": -1,
            "ClassInterface": "WAN",
            "DestPortRangeMax": -1,
            "SourcePortRangeMax": -1,
            "X_000631_ClassName": "Video Down"
          },
          "VOIP Signaling Up": {
            "DestIP": "",
            "DSCPMark": 184,
            "DestMask": "255.255.255.0",
            "DestPort": -1,
            "SourceIP": "",
            "DSCPCheck": 104,
            "Ethertype": 2048,
            "ClassQueue": 5,
            "SourceMask": "255.255.255.0",
            "SourcePort": -1,
            "ClassInterface": "LAN",
            "DestPortRangeMax": -1,
            "SourcePortRangeMax": -1,
            "X_000631_ClassName": "VOIP Signaling Up"
          },
          "VOIP Signaling Down": {
            "DestIP": "",
            "DSCPMark": 184,
            "DestMask": "255.255.255.0",
            "DestPort": -1,
            "SourceIP": "",
            "DSCPCheck": 104,
            "Ethertype": 2048,
            "ClassQueue": 9,
            "SourceMask": "255.255.255.0",
            "SourcePort": -1,
            "ClassInterface": "WAN",
            "DestPortRangeMax": -1,
            "SourcePortRangeMax": -1,
            "X_000631_ClassName": "VOIP Signaling Down"
          }
        },
        "mandatory": true,
        "valueEnums": [{
          "value": "Custom",
          "displayName": "Custom"
        }, {
          "value": "Video Up",
          "displayName": "Video Upstream"
        }, {
          "value": "Video Down",
          "displayName": "Video Downstream"
        }, {
          "value": "VOIP Up",
          "displayName": "VOIP Upstream"
        }, {
          "value": "VOIP Down",
          "displayName": "VOIP Downstream"
        }, {
          "value": "VOIP Signaling Up",
          "displayName": "VOIP Signaling Upstream"
        }, {
          "value": "VOIP Signaling Down",
          "displayName": "VOIP Signaling Downstream"
        }],
        "description": "QoS Type",
        "displayName": "QoS Type",
        "displayOnly": true,
        "defaultValue": "Custom"
      }, {
        "name": "X_000631_ClassName",
        "type": "string",
        "mandatory": true,
        "description": "Custom Rule Name",
        "displayName": "Rule Name",
        "requires": {
          "QosType": "Custom"
        }
      }, {
        "name": "ClassQueue",
        "type": "int",
        "implies": {
          "5": {
            "DSCPMark": 184,
            "ClassInterface": "LAN"
          },
          "6": {
            "DSCPMark": 104,
            "ClassInterface": "LAN"
          },
          "7": {
            "DSCPMark": 72,
            "ClassInterface": "LAN"
          },
          "8": {
            "DSCPMark": 0,
            "ClassInterface": "LAN"
          },
          "9": {
            "DSCPMark": 184,
            "ClassInterface": "WAN"
          },
          "10": {
            "DSCPMark": 104,
            "ClassInterface": "WAN"
          },
          "11": {
            "DSCPMark": 72,
            "ClassInterface": "WAN"
          },
          "12": {
            "DSCPMark": 0,
            "ClassInterface": "WAN"
          }
        },
        "valueEnums": [{
          "value": 5,
          "displayName": "Upstream High Priority Queue"
        }, {
          "value": 6,
          "displayName": "Upstream Medium Priority Queue"
        }, {
          "value": 7,
          "displayName": "Upstream Low Priority Queue"
        }, {
          "value": 8,
          "displayName": "Upstream Best Effort Queue"
        }, {
          "value": 9,
          "displayName": "Downstream High Priority Queue"
        }, {
          "value": 10,
          "displayName": "Downstream Medium Priority Queue"
        }, {
          "value": 11,
          "displayName": "Downstream Low Priority Queue"
        }, {
          "value": 12,
          "displayName": "Downstream Best Effort Queue"
        }],
        "description": "QoS Direction and Queue Priority",
        "displayName": "QoS Direction and Queue Priority",
        "defaultValue": 5
      }, {
        "name": "ClassificationEnable",
        "type": "boolean",
        "hidden": true,
        "description": "Enables or disables this QoS rule",
        "displayName": "Enable",
        "defaultValue": true
      }, {
        "name": "ClassInterface",
        "type": "string",
        "hidden": true,
        "description": "Classification Interface",
        "displayName": "Direction"
      }, {
        "name": "DSCPCheck",
        "type": "int",
        "valueEnums": [{
          "value": -1,
          "displayName": "Default (000000) - Best Effort"
        }, {
          "value": 184,
          "displayName": "EF (101110) - Expedited Forwarding"
        }, {
          "value": 32,
          "displayName": "Class 1 - CS1  (001000)"
        }, {
          "value": 40,
          "displayName": "Class 1 - AF11 (001010) - Low Drop"
        }, {
          "value": 48,
          "displayName": "Class 1 - AF12 (001100) - Med Drop"
        }, {
          "value": 56,
          "displayName": "Class 1 - AF13 (001110) - Hi Drop"
        }, {
          "value": 64,
          "displayName": "Class 2 - CS2  (010000)"
        }, {
          "value": 72,
          "displayName": "Class 2 - AF21 (010010) - Low Drop"
        }, {
          "value": 80,
          "displayName": "Class 2 - AF22 (010100) - Med Drop"
        }, {
          "value": 88,
          "displayName": "Class 2 - AF23 (010110) - Hi Drop"
        }, {
          "value": 96,
          "displayName": "Class 3 - CS3  (011000)"
        }, {
          "value": 104,
          "displayName": "Class 3 - AF31 (011010) - Low Drop"
        }, {
          "value": 112,
          "displayName": "Class 3 - AF32 (011100) - Med Drop"
        }, {
          "value": 120,
          "displayName": "Class 3 - AF33 (011110) - Hi Drop"
        }, {
          "value": 128,
          "displayName": "Class 4 - CS4  (100000)"
        }, {
          "value": 136,
          "displayName": "Class 4 - AF41 (100010) - Low Drop"
        }, {
          "value": 144,
          "displayName": "Class 4 - AF42 (100100) - Med Drop"
        }, {
          "value": 152,
          "displayName": "Class 4 - AF43 (100110) - Hi Drop"
        }, {
          "value": 160,
          "displayName": "Class 5 - CS5 (101000)"
        }, {
          "value": 192,
          "displayName": "Class 6 - CS6 (110000)"
        }, {
          "value": 224,
          "displayName": "Class 7 - CS7 (111000)"
        }],
        "description": "DSCPMark",
        "displayName": "DSCP Class",
        "defaultValue": -1
      }, {
        "name": "AllIPAddresses",
        "type": "boolean",
        "valueEnums": [{
          "value": false,
          "displayName": "Define"
        }, {
          "value": true,
          "displayName": "All"
        }],
        "description": "IP Addresses",
        "displayName": "IP Addresses",
        "displayOnly": true,
        "defaultValue": true,
        "requires": {
          "QosType": "Custom"
        }
      }, {
        "name": "SourceIP",
        "type": "IPAddress",
        "tooltip": "Source IP address. An empty value indicates this criterion is not used for classification.",
        "description": "Destination IP",
        "displayName": "Source IP",
        "requires": {
          "AllIPAddresses": false
        }
      }, {
        "name": "SourceMask",
        "type": "IPAddress",
        "tooltip": "Source IP address mask. If non-empty, only the indicated network portion of the DestIP address is to be used for classification.\nAn empty value indicates that the full DestIP address is to be used for classification",
        "description": "Source Mask",
        "displayName": "Source IP Address Mask",
        "requires": {
          "AllIPAddresses": false
        }
      }, {
        "name": "SourcePort",
        "type": "int",
        "tooltip": "Source port number. A value of -1 indicates this criterion is not used for classification.",
        "minValue": -1,
        "description": "Source Port Number",
        "displayName": "Source Port Number",
        "defaultValue": -1,
        "requires": {
          "AllIPAddresses": false
        }
      }, {
        "name": "SourcePortRangeMax",
        "type": "int",
        "tooltip": "If specified, indicates the classification criterion is to include the port range from SourcePort through SourcePortRangeMax (inclusive).\nIf specified, Source-PortRangeMax MUST be greater than or equal to SourcePort.\nA value of -1 indicates that no port range is specified.",
        "minValue": -1,
        "description": "Source Port Number Range Max",
        "displayName": "Source Port Number Range Max",
        "defaultValue": -1,
        "requires": {
          "AllIPAddresses": false
        }
      }, {
        "name": "DestIP",
        "type": "IPAddress",
        "tooltip": "Destination IP address. An empty value indicates this criterion is not used for classification.",
        "description": "Destination IP",
        "displayName": "Destination IP",
        "requires": {
          "AllIPAddresses": false
        }
      }, {
        "name": "DestMask",
        "type": "IPAddress",
        "tooltip": "Destination IP address mask. If non-empty, only the indicated network portion of the DestIP address is to be used for classification.\nAn empty value indicates that the full DestIP address is to be used for classification",
        "description": "Destination Mask",
        "displayName": "Destination IP Address Mask",
        "requires": {
          "AllIPAddresses": false
        }
      }, {
        "name": "DestPort",
        "type": "int",
        "tooltip": "Destination port number. A value of -1 indicates this criterion is not used for classification.",
        "minValue": -1,
        "description": "Destination Port Number",
        "displayName": "Destination Port Number",
        "defaultValue": -1,
        "requires": {
          "AllIPAddresses": false
        }
      }, {
        "name": "DestPortRangeMax",
        "type": "int",
        "tooltip": "If specified, indicates the classification criterion is to include the port range from DestPort through DestPortRangeMax (inclusive).\nIf specified, Dest-PortRangeMax MUST be greater than or equal to DestPort.\nA value of -1 indicates that no port range is specified.",
        "minValue": -1,
        "description": "Destination Port Number Range Max",
        "displayName": "Destination Port Number Range Max",
        "defaultValue": -1,
        "requires": {
          "AllIPAddresses": false
        }
      }, {
        "name": "Ethertype",
        "type": "int",
        "hidden": true,
        "tooltip": "Ethertype as indicated in either the Ethernet or SNAP Type header. A value of -1 indicates this criterion is not used for classification.\nGigaCenter/GigaHub devices only support 2048",
        "valueEnums": [{
          "value": -1,
          "displayName": "-1 (disable classification by Ethertype)"
        }, {
          "value": 2048,
          "displayName": "0x800"
        }],
        "description": "Ethertype",
        "displayName": "Ethertype",
        "defaultValue": 2048
      }, {
        "name": "DSCPMark",
        "type": "int",
        "hidden": true,
        "description": "DSCPMark",
        "displayName": "DSCP Mark"
      }]
    }, {
      "_id": "5646e934-14dd-4549-952d-0715191547db",
      "name": "QOS State",
      "group": "Service Attributes",
      "createTime": "2020-07-24T05:11:18.459Z",
      "description": "Enable/Disable all QOS Rules",
      "displayName": "QoS State",
      "tr098PathPrefix": "InternetGatewayDevice.QueueManagement.",
      "parameters": [{
        "name": "Enable",
        "type": "boolean",
        "tooltip": "Enables or disables all QoS rules",
        "valueEnums": [{
          "value": true,
          "displayName": "Enable"
        }, {
          "value": false,
          "displayName": "Disable"
        }],
        "displayName": "QoS State",
        "defaultValue": true
      }]
    }, {
      "_id": "76fe1d68-85a3-408e-a6ba-d6baf10587d4",
      "name": "Set Parameter Value",
      "group": "TR-69 - Advanced",
      "createTime": "2020-07-24T05:11:20.664Z",
      "description": "Set Parameter Value",
      "displayName": "Set Parameter Value",
      "keyParameter": {
        "name": "SetParamValueProfileName"
      },
      "multiInstance": true,
      "tr098PathPrefix": "SXACC_SET_PARAM_VALUE_PROFILE.${SetParamValueProfileName}.",
      "parameters": [{
        "name": "SetParamValueProfileName",
        "type": "string",
        "mandatory": true,
        "displayName": "Name"
      }, {
        "name": "SetParamValueProfileValue",
        "type": "string",
        "mandatory": true,
        "displayName": "Value"
      }, {
        "name": "SetParamValueProfileType",
        "type": "string",
        "valueEnums": [{
          "value": "string",
          "displayName": "string"
        }, {
          "value": "boolean",
          "displayName": "boolean"
        }, {
          "value": "int",
          "displayName": "int"
        }, {
          "value": "unsignedInt",
          "displayName": "unsignedInt"
        }, {
          "value": "long",
          "displayName": "long"
        }, {
          "value": "base64Binary",
          "displayName": "base64Binary"
        }, {
          "value": "dateTime",
          "displayName": "dateTime"
        }],
        "displayName": "Type",
        "defaultValue": "string",
        "targetParamNames": ["SetParamValueProfileValue"]
      }]
    }, {
      "_id": "0bd65737-0196-4da6-8ca9-8cfb6b2fd15f",
      "name": "SNMP",
      "group": "MGMT Server",
      "createTime": "2020-07-24T05:11:18.743Z",
      "description": "Configure SNMP",
      "displayName": "SNMP",
      "tr098PathPrefix": "InternetGatewayDevice.X_000631_Device.SNMP.",
      "parameters": [{
        "name": "EnableSnmp",
        "type": "boolean",
        "displayName": "Enable SNMP"
      }, {
        "name": "X_000631_VlanMuxID",
        "type": "int",
        "maxValue": 4093,
        "minValue": 1,
        "mandatory": false,
        "hidden": true,
        "displayName": "VLAN ID",
        "requires": {
          "EnableSnmp": true
        }
      }, {
        "name": "Dedicated_SNMP_VLAN",
        "type": "boolean",
        "tooltip": "Is this a dedicated SNMP VLAN?",
        "valueEnums": [{
          "value": true,
          "displayName": "Yes"
        }, {
          "value": false,
          "displayName": "No"
        }],
        "displayName": "Dedicated VLAN",
        "displayOnly": true,
        "defaultValue": true,
        "requires": {
          "EnableSnmp": true
        }
      }, {
        "name": "X_000631_VlanMux8021p",
        "type": "int",
        "tooltip": "This parameter is only used to create new VLAN connection.",
        "valueEnums": [{
          "value": 0,
          "displayName": "0"
        }, {
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }, {
          "value": 5,
          "displayName": "5"
        }, {
          "value": 6,
          "displayName": "6"
        }, {
          "value": 7,
          "displayName": "7"
        }],
        "displayName": "P-Bits",
        "requires": {
          "EnableSnmp": true,
          "Dedicated_SNMP_VLAN": true
        }
      }, {
        "name": "ROCommunity",
        "type": "string",
        "description": "Read Community string.",
        "displayName": "Read Community",
        "defaultValue": "public",
        "maxStringLength": 32
      }, {
        "name": "RWCommunity",
        "type": "string",
        "description": "Write Community string. If this is blank (the default), then it inherits from ROCommunity.",
        "displayName": "Write Community",
        "maxStringLength": 32
      }, {
        "name": "SysName",
        "type": "string",
        "description": "System name.",
        "displayName": "System Name",
        "defaultValue": "NA",
        "maxStringLength": 32
      }, {
        "name": "SysLocation",
        "type": "string",
        "description": "System location.",
        "displayName": "System Location",
        "defaultValue": "NA",
        "maxStringLength": 32
      }, {
        "name": "SysContact",
        "type": "string",
        "description": "System contact.",
        "displayName": "System Contact",
        "defaultValue": "NA",
        "maxStringLength": 32
      }, {
        "name": "TrapSink1",
        "type": "IPAddress",
        "mandatory": false,
        "description": "IP address of trap sink #1.",
        "displayName": "Trap Sink1",
        "maxStringLength": 16
      }, {
        "name": "TrapSink2",
        "type": "IPAddress",
        "mandatory": false,
        "description": "IP address of trap sink #2.",
        "displayName": "Trap Sink2",
        "maxStringLength": 16
      }, {
        "name": "TrapSink3",
        "type": "IPAddress",
        "mandatory": false,
        "description": "IP address of trap sink #3.",
        "displayName": "Trap Sink3",
        "maxStringLength": 16
      }, {
        "name": "TrapSink4",
        "type": "IPAddress",
        "mandatory": false,
        "description": "IP address of trap sink #4.",
        "displayName": "Trap Sink4",
        "maxStringLength": 16
      }]
    }, {
      "_id": "4ef1de7c-ca5a-4905-b331-25ab9eca3446",
      "name": "SPID",
      "group": "MGMT Server",
      "createTime": "2020-07-24T05:11:18.862Z",
      "description": "Set Calix SPID Field towards Calix GigaSPIRE Devices",
      "displayName": "SPID",
      "tr098PathPrefix": "InternetGatewayDevice.DeviceInfo.",
      "parameters": [{
        "name": "X_000631_SPId",
        "type": "string",
        "tooltip": "Calix Service Provider ID used by Calix GigaSPIRE Devices",
        "description": "SPID",
        "displayName": "SPID"
      }, {
        "name": "X_000631_SPIdOverrideAllowed",
        "type": "boolean",
        "tooltip": "Select \"No\" to prevent DHCPv4 Option-43 or DHCPv6 Option-17 from overwriting the SPID",
        "valueEnums": [{
          "value": true,
          "displayName": "Yes"
        }, {
          "value": false,
          "displayName": "No"
        }],
        "description": "X_000631_SPIdOverrideAllowed",
        "displayName": "Allow DHCP Override?",
        "defaultValue": true
      }]
    }, {
      "_id": "06732ffe-9a98-42b4-aea5-be62b306d388",
      "name": "Support User Credentials",
      "group": "MGMT Server",
      "createTime": "2020-07-24T05:11:18.981Z",
      "description": "Support User Credentials.",
      "displayName": "Support User Credentials",
      "tr098PathPrefix": "InternetGatewayDevice.User.2.",
      "parameters": [{
        "name": "Username",
        "type": "string",
        "mandatory": true,
        "description": "Username",
        "displayName": "Username"
      }, {
        "name": "Password",
        "type": "string",
        "mandatory": true,
        "description": "Password",
        "tooltip": "Rules: \nAt least 16 chars \nAt least one upper case letter \nAt least one lower case letter \nAt least one number \nAt least one special charaacter eg. ! @ # ?",
        "displayName": "Password"
      }]
    }, {
      "_id": "acaf76e7-6e38-40e2-a877-dd0c0ea4b126",
      "name": "Syslog",
      "group": "MGMT Server",
      "createTime": "2020-07-24T05:11:19.102Z",
      "description": "Syslog configuration",
      "displayName": "Syslog",
      "tr098PathPrefix": "InternetGatewayDevice.X_000631_Device.SysLog.",
      "parameters": [{
        "name": "PrimaryServer",
        "type": "string",
        "description": "IP address of primary syslog server.",
        "displayName": "Primary Server",
        "mandatory": true
      }, {
        "name": "SecondaryServer",
        "type": "string",
        "description": "IP address of secondary syslog server.",
        "displayName": "Secondary Server",
        "mandatory": true
      }, {
        "name": "Facility",
        "type": "int",
        "maxValue": 7,
        "minValue": 0,
        "description": "Syslog local facility number.",
        "displayName": "Facility",
        "defaultValue": 0
      }]
    }, {
      "_id": "b2da4e4b-4201-4a95-a572-011aedb42a10",
      "name": "Timezone",
      "group": "Misc",
      "createTime": "2020-07-24T05:11:19.229Z",
      "description": "Configure Time Zone for CPE device.",
      "displayName": "Time Zone",
      "parameters": [{
        "name": "Tz",
        "type": "string",
        "implies": {
          "Timezone_000": {
            "TzName": "International Date Line West",
            "TzOffset": "-12:00"
          },
          "Timezone_001": {
            "TzName": "Coordinated Universal Time-11",
            "TzOffset": "-11:00"
          },
          "Timezone_002": {
            "TzName": "Hawaii",
            "TzOffset": "-10:00"
          },
          "Timezone_003": {
            "TzName": "Alaska",
            "TzOffset": "-09:00"
          },
          "Timezone_004": {
            "TzName": "Baja California",
            "TzOffset": "-08:00"
          },
          "Timezone_005": {
            "TzName": "Pacific Time (US, Canada)",
            "TzOffset": "-08:00"
          },
          "Timezone_006": {
            "TzName": "Arizona",
            "TzOffset": "-07:00"
          },
          "Timezone_007": {
            "TzName": "Chihuahua, La Paz, Mazatlan",
            "TzOffset": "-07:00"
          },
          "Timezone_008": {
            "TzName": "Mountain Time (US, Canada)",
            "TzOffset": "-07:00"
          },
          "Timezone_009": {
            "TzName": "Central America",
            "TzOffset": "-06:00"
          },
          "Timezone_010": {
            "TzName": "Central Time (US, Canada)",
            "TzOffset": "-06:00"
          },
          "Timezone_011": {
            "TzName": "Guadalajara, Mexico City, Monterrey",
            "TzOffset": "-06:00"
          },
          "Timezone_012": {
            "TzName": "Saskatchewan",
            "TzOffset": "-06:00"
          },
          "Timezone_013": {
            "TzName": "Bogota, Lima, Quito",
            "TzOffset": "-05:00"
          },
          "Timezone_014": {
            "TzName": "Eastern Time (US, Canada)",
            "TzOffset": "-05:00"
          },
          "Timezone_015": {
            "TzName": "Indiana (East)",
            "TzOffset": "-05:00"
          },
          "Timezone_016": {
            "TzName": "Caracas",
            "TzOffset": "-04:30"
          },
          "Timezone_017": {
            "TzName": "Asuncion",
            "TzOffset": "-04:00"
          },
          "Timezone_018": {
            "TzName": "Atlantic Time (Canada)",
            "TzOffset": "-04:00"
          },
          "Timezone_019": {
            "TzName": "Cuiaba",
            "TzOffset": "-04:00"
          },
          "Timezone_020": {
            "TzName": "Georgetown, La Paz, Manaus, San Juan",
            "TzOffset": "-04:00"
          },
          "Timezone_021": {
            "TzName": "Santiago",
            "TzOffset": "-04:00"
          },
          "Timezone_022": {
            "TzName": "Newfoundland",
            "TzOffset": "-03:30"
          },
          "Timezone_023": {
            "TzName": "Brasilia",
            "TzOffset": "-03:00"
          },
          "Timezone_024": {
            "TzName": "Buenos Aires",
            "TzOffset": "-03:00"
          },
          "Timezone_025": {
            "TzName": "Cayenne, Fortaleza",
            "TzOffset": "-03:00"
          },
          "Timezone_026": {
            "TzName": "Greenland",
            "TzOffset": "-03:00"
          },
          "Timezone_027": {
            "TzName": "Montevideo",
            "TzOffset": "-03:00"
          },
          "Timezone_028": {
            "TzName": "Salvador",
            "TzOffset": "-03:00"
          },
          "Timezone_029": {
            "TzName": "Coordinated Universal Time-02",
            "TzOffset": "-02:00"
          },
          "Timezone_030": {
            "TzName": "Mid-Atlantic",
            "TzOffset": "-02:00"
          },
          "Timezone_031": {
            "TzName": "Azores",
            "TzOffset": "-01:00"
          },
          "Timezone_032": {
            "TzName": "Cape Verde Is.",
            "TzOffset": "-01:00"
          },
          "Timezone_033": {
            "TzName": "Casablanca",
            "TzOffset": "+00:00"
          },
          "Timezone_034": {
            "TzName": "Coordinated Universal Time",
            "TzOffset": "+00:00"
          },
          "Timezone_035": {
            "TzName": "Dublin, Edinburgh, Lisbon, London",
            "TzOffset": "+00:00"
          },
          "Timezone_036": {
            "TzName": "Monrovia, Reykjavik",
            "TzOffset": "+00:00"
          },
          "Timezone_037": {
            "TzName": "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
            "TzOffset": "+01:00"
          },
          "Timezone_038": {
            "TzName": "Belgrade, Bratislava, Budapest, Ljubljana, Prague",
            "TzOffset": "+01:00"
          },
          "Timezone_039": {
            "TzName": "Brussels, Copenhagen, Madrid, Paris",
            "TzOffset": "+01:00"
          },
          "Timezone_040": {
            "TzName": "Sarajevo, Skopje, Warsaw, Zagreb",
            "TzOffset": "+01:00"
          },
          "Timezone_041": {
            "TzName": "West Central Africa",
            "TzOffset": "+01:00"
          },
          "Timezone_042": {
            "TzName": "Windhoek",
            "TzOffset": "+01:00"
          },
          "Timezone_043": {
            "TzName": "Amman",
            "TzOffset": "+02:00"
          },
          "Timezone_044": {
            "TzName": "Athens, Bucharest",
            "TzOffset": "+02:00"
          },
          "Timezone_045": {
            "TzName": "Beirut",
            "TzOffset": "+02:00"
          },
          "Timezone_046": {
            "TzName": "Cairo",
            "TzOffset": "+02:00"
          },
          "Timezone_047": {
            "TzName": "Damascus",
            "TzOffset": "+02:00"
          },
          "Timezone_048": {
            "TzName": "Harare, Pretoria",
            "TzOffset": "+02:00"
          },
          "Timezone_049": {
            "TzName": "Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
            "TzOffset": "+02:00"
          },
          "Timezone_050": {
            "TzName": "Istanbul",
            "TzOffset": "+02:00"
          },
          "Timezone_051": {
            "TzName": "Jerusalem",
            "TzOffset": "+02:00"
          },
          "Timezone_052": {
            "TzName": "Nicosia",
            "TzOffset": "+02:00"
          },
          "Timezone_053": {
            "TzName": "Baghdad",
            "TzOffset": "+03:00"
          },
          "Timezone_054": {
            "TzName": "Kaliningrad, Minsk",
            "TzOffset": "+03:00"
          },
          "Timezone_055": {
            "TzName": "Kuwait, Riyadh",
            "TzOffset": "+03:00"
          },
          "Timezone_056": {
            "TzName": "Nairobi",
            "TzOffset": "+03:00"
          },
          "Timezone_057": {
            "TzName": "Tehran",
            "TzOffset": "+03:30"
          },
          "Timezone_058": {
            "TzName": "Abu Dhabi, Muscat",
            "TzOffset": "+04:00"
          },
          "Timezone_059": {
            "TzName": "Baku",
            "TzOffset": "+04:00"
          },
          "Timezone_060": {
            "TzName": "Moscow, St. Petersburg, Volgograd",
            "TzOffset": "+04:00"
          },
          "Timezone_061": {
            "TzName": "Port Louis",
            "TzOffset": "+04:00"
          },
          "Timezone_062": {
            "TzName": "Tbilisi",
            "TzOffset": "+04:00"
          },
          "Timezone_063": {
            "TzName": "Yerevan",
            "TzOffset": "+04:00"
          },
          "Timezone_064": {
            "TzName": "Kabul",
            "TzOffset": "+04:30"
          },
          "Timezone_065": {
            "TzName": "Islamabad, Karachi",
            "TzOffset": "+05:00"
          },
          "Timezone_066": {
            "TzName": "Tashkent",
            "TzOffset": "+05:00"
          },
          "Timezone_067": {
            "TzName": "Chennai, Kolkata, Mumbai, New Delhi",
            "TzOffset": "+05:30"
          },
          "Timezone_068": {
            "TzName": "Sri Jayawardenepura",
            "TzOffset": "+05:30"
          },
          "Timezone_069": {
            "TzName": "Kathmandu",
            "TzOffset": "+05:45"
          },
          "Timezone_070": {
            "TzName": "Astana",
            "TzOffset": "+06:00"
          },
          "Timezone_071": {
            "TzName": "Dhaka",
            "TzOffset": "+06:00"
          },
          "Timezone_072": {
            "TzName": "Ekaterinburg",
            "TzOffset": "+06:00"
          },
          "Timezone_073": {
            "TzName": "Yangon (Rangoon)",
            "TzOffset": "+06:30"
          },
          "Timezone_074": {
            "TzName": "Bangkok, Hanoi, Jakarta",
            "TzOffset": "+07:00"
          },
          "Timezone_075": {
            "TzName": "Novosibirsk",
            "TzOffset": "+07:00"
          },
          "Timezone_076": {
            "TzName": "Beijing, Chongqing, Hong Kong, Urumqi",
            "TzOffset": "+08:00"
          },
          "Timezone_077": {
            "TzName": "Krasnoyarsk",
            "TzOffset": "+08:00"
          },
          "Timezone_078": {
            "TzName": "Kuala Lumpur, Singapore",
            "TzOffset": "+08:00"
          },
          "Timezone_079": {
            "TzName": "Perth",
            "TzOffset": "+08:00"
          },
          "Timezone_080": {
            "TzName": "Taipei",
            "TzOffset": "+08:00"
          },
          "Timezone_081": {
            "TzName": "Ulaanbaatar",
            "TzOffset": "+08:00"
          },
          "Timezone_082": {
            "TzName": "Irkutsk",
            "TzOffset": "+09:00"
          },
          "Timezone_083": {
            "TzName": "Osaka, Sapporo, Tokyo",
            "TzOffset": "+09:00"
          },
          "Timezone_084": {
            "TzName": "Seoul",
            "TzOffset": "+09:00"
          },
          "Timezone_085": {
            "TzName": "Adelaide",
            "TzOffset": "+09:30"
          },
          "Timezone_086": {
            "TzName": "Darwin",
            "TzOffset": "+09:30"
          },
          "Timezone_087": {
            "TzName": "Brisbane",
            "TzOffset": "+10:00"
          },
          "Timezone_088": {
            "TzName": "Canberra, Melbourne, Sydney",
            "TzOffset": "+10:00"
          },
          "Timezone_089": {
            "TzName": "Guam, Port Moresby",
            "TzOffset": "+10:00"
          },
          "Timezone_090": {
            "TzName": "Hobart",
            "TzOffset": "+10:00"
          },
          "Timezone_091": {
            "TzName": "Yakutsk",
            "TzOffset": "+10:00"
          },
          "Timezone_092": {
            "TzName": "Solomon Is., New Caledonia",
            "TzOffset": "+11:00"
          },
          "Timezone_093": {
            "TzName": "Vladivostok",
            "TzOffset": "+11:00"
          },
          "Timezone_094": {
            "TzName": "Auckland, Wellington",
            "TzOffset": "+12:00"
          },
          "Timezone_095": {
            "TzName": "Coordinated Universal Time+12",
            "TzOffset": "+12:00"
          },
          "Timezone_096": {
            "TzName": "Fiji",
            "TzOffset": "+12:00"
          },
          "Timezone_097": {
            "TzName": "Magadan",
            "TzOffset": "+12:00"
          },
          "Timezone_098": {
            "TzName": "Nuku'alofa",
            "TzOffset": "+13:00"
          },
          "Timezone_099": {
            "TzName": "Samoa",
            "TzOffset": "+13:00"
          }
        },
        "mandatory": true,
        "valueEnums": [{
          "value": "Timezone_000",
          "displayName": "(UTC-12:00) International Date Line West"
        }, {
          "value": "Timezone_001",
          "displayName": "(UTC-11:00) Coordinated Universal Time-11"
        }, {
          "value": "Timezone_002",
          "displayName": "(UTC-10:00) Hawaii"
        }, {
          "value": "Timezone_003",
          "displayName": "(UTC-09:00) Alaska"
        }, {
          "value": "Timezone_004",
          "displayName": "(UTC-08:00) Baja California"
        }, {
          "value": "Timezone_005",
          "displayName": "(UTC-08:00) Pacific Time (US and Canada)"
        }, {
          "value": "Timezone_006",
          "displayName": "(UTC-07:00) Arizona"
        }, {
          "value": "Timezone_007",
          "displayName": "(UTC-07:00) Chihuahua, La Paz, Mazatlan"
        }, {
          "value": "Timezone_008",
          "displayName": "(UTC-07:00) Mountain Time (US and Canada)"
        }, {
          "value": "Timezone_009",
          "displayName": "(UTC-06:00) Central America"
        }, {
          "value": "Timezone_010",
          "displayName": "(UTC-06:00) Central Time (US and Canada)"
        }, {
          "value": "Timezone_011",
          "displayName": "(UTC-06:00) Guadalajara, Mexico City, Monterrey"
        }, {
          "value": "Timezone_012",
          "displayName": "(UTC-06:00) Saskatchewan"
        }, {
          "value": "Timezone_013",
          "displayName": "(UTC-05:00) Bogota, Lima, Quito"
        }, {
          "value": "Timezone_014",
          "displayName": "(UTC-05:00) Eastern Time (US and Canada)"
        }, {
          "value": "Timezone_015",
          "displayName": "(UTC-05:00) Indiana (East)"
        }, {
          "value": "Timezone_016",
          "displayName": "(UTC-04:30) Caracas"
        }, {
          "value": "Timezone_017",
          "displayName": "(UTC-04:00) Asuncion"
        }, {
          "value": "Timezone_018",
          "displayName": "(UTC-04:00) Atlantic Time (Canada)"
        }, {
          "value": "Timezone_019",
          "displayName": "(UTC-04:00) Cuiaba"
        }, {
          "value": "Timezone_020",
          "displayName": "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan"
        }, {
          "value": "Timezone_021",
          "displayName": "(UTC-04:00) Santiago"
        }, {
          "value": "Timezone_022",
          "displayName": "(UTC-03:30) Newfoundland"
        }, {
          "value": "Timezone_023",
          "displayName": "(UTC-03:00) Brasilia"
        }, {
          "value": "Timezone_024",
          "displayName": "(UTC-03:00) Buenos Aires"
        }, {
          "value": "Timezone_025",
          "displayName": "(UTC-03:00) Cayenne, Fortaleza"
        }, {
          "value": "Timezone_026",
          "displayName": "(UTC-03:00) Greenland"
        }, {
          "value": "Timezone_027",
          "displayName": "(UTC-03:00) Montevideo"
        }, {
          "value": "Timezone_028",
          "displayName": "(UTC-03:00) Salvador"
        }, {
          "value": "Timezone_029",
          "displayName": "(UTC-02:00) Coordinated Universal Time-02"
        }, {
          "value": "Timezone_030",
          "displayName": "(UTC-02:00) Mid-Atlantic"
        }, {
          "value": "Timezone_031",
          "displayName": "(UTC-01:00) Azores"
        }, {
          "value": "Timezone_032",
          "displayName": "(UTC-01:00) Cape Verde Is."
        }, {
          "value": "Timezone_033",
          "displayName": "(UTC) Casablanca"
        }, {
          "value": "Timezone_034",
          "displayName": "(UTC) Coordinated Universal Time"
        }, {
          "value": "Timezone_035",
          "displayName": "(UTC) Dublin, Edinburgh, Lisbon, London"
        }, {
          "value": "Timezone_036",
          "displayName": "(UTC) Monrovia, Reykjavik"
        }, {
          "value": "Timezone_037",
          "displayName": "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
        }, {
          "value": "Timezone_038",
          "displayName": "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
        }, {
          "value": "Timezone_039",
          "displayName": "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris"
        }, {
          "value": "Timezone_040",
          "displayName": "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
        }, {
          "value": "Timezone_041",
          "displayName": "(UTC+01:00) West Central Africa"
        }, {
          "value": "Timezone_042",
          "displayName": "(UTC+01:00) Windhoek"
        }, {
          "value": "Timezone_043",
          "displayName": "(UTC+02:00) Amman"
        }, {
          "value": "Timezone_044",
          "displayName": "(UTC+02:00) Athens, Bucharest"
        }, {
          "value": "Timezone_045",
          "displayName": "(UTC+02:00) Beirut"
        }, {
          "value": "Timezone_046",
          "displayName": "(UTC+02:00) Cairo"
        }, {
          "value": "Timezone_047",
          "displayName": "(UTC+02:00) Damascus"
        }, {
          "value": "Timezone_048",
          "displayName": "(UTC+02:00) Harare, Pretoria"
        }, {
          "value": "Timezone_049",
          "displayName": "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
        }, {
          "value": "Timezone_050",
          "displayName": "(UTC+02:00) Istanbul"
        }, {
          "value": "Timezone_051",
          "displayName": "(UTC+02:00) Jerusalem"
        }, {
          "value": "Timezone_052",
          "displayName": "(UTC+02:00) Nicosia"
        }, {
          "value": "Timezone_053",
          "displayName": "(UTC+03:00) Baghdad"
        }, {
          "value": "Timezone_054",
          "displayName": "(UTC+03:00) Kaliningrad, Minsk"
        }, {
          "value": "Timezone_055",
          "displayName": "(UTC+03:00) Kuwait, Riyadh"
        }, {
          "value": "Timezone_056",
          "displayName": "(UTC+03:00) Nairobi"
        }, {
          "value": "Timezone_057",
          "displayName": "(UTC+03:30) Tehran"
        }, {
          "value": "Timezone_058",
          "displayName": "(UTC+04:00) Abu Dhabi, Muscat"
        }, {
          "value": "Timezone_059",
          "displayName": "(UTC+04:00) Baku"
        }, {
          "value": "Timezone_060",
          "displayName": "(UTC+04:00) Moscow, St. Petersburg, Volgograd"
        }, {
          "value": "Timezone_061",
          "displayName": "(UTC+04:00) Port Louis"
        }, {
          "value": "Timezone_062",
          "displayName": "(UTC+04:00) Tbilisi"
        }, {
          "value": "Timezone_063",
          "displayName": "(UTC+04:00) Yerevan"
        }, {
          "value": "Timezone_064",
          "displayName": "(UTC+04:30) Kabul"
        }, {
          "value": "Timezone_065",
          "displayName": "(UTC+05:00) Islamabad, Karachi"
        }, {
          "value": "Timezone_066",
          "displayName": "(UTC+05:00) Tashkent"
        }, {
          "value": "Timezone_067",
          "displayName": "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi"
        }, {
          "value": "Timezone_068",
          "displayName": "(UTC+05:30) Sri Jayawardenepura"
        }, {
          "value": "Timezone_069",
          "displayName": "(UTC+05:45) Kathmandu"
        }, {
          "value": "Timezone_070",
          "displayName": "(UTC+06:00) Astana"
        }, {
          "value": "Timezone_071",
          "displayName": "(UTC+06:00) Dhaka"
        }, {
          "value": "Timezone_072",
          "displayName": "(UTC+06:00) Ekaterinburg"
        }, {
          "value": "Timezone_073",
          "displayName": "(UTC+06:30) Yangon (Rangoon)"
        }, {
          "value": "Timezone_074",
          "displayName": "(UTC+07:00) Bangkok, Hanoi, Jakarta"
        }, {
          "value": "Timezone_075",
          "displayName": "(UTC+07:00) Novosibirsk"
        }, {
          "value": "Timezone_076",
          "displayName": "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
        }, {
          "value": "Timezone_077",
          "displayName": "(UTC+08:00) Krasnoyarsk"
        }, {
          "value": "Timezone_078",
          "displayName": "(UTC+08:00) Kuala Lumpur, Singapore"
        }, {
          "value": "Timezone_079",
          "displayName": "(UTC+08:00) Perth"
        }, {
          "value": "Timezone_080",
          "displayName": "(UTC+08:00) Taipei"
        }, {
          "value": "Timezone_081",
          "displayName": "(UTC+08:00) Ulaanbaatar"
        }, {
          "value": "Timezone_082",
          "displayName": "(UTC+09:00) Irkutsk"
        }, {
          "value": "Timezone_083",
          "displayName": "(UTC+09:00) Osaka, Sapporo, Tokyo"
        }, {
          "value": "Timezone_084",
          "displayName": "(UTC+09:00) Seoul"
        }, {
          "value": "Timezone_085",
          "displayName": "(UTC+09:30) Adelaide"
        }, {
          "value": "Timezone_086",
          "displayName": "(UTC+09:30) Darwin"
        }, {
          "value": "Timezone_087",
          "displayName": "(UTC+10:00) Brisbane"
        }, {
          "value": "Timezone_088",
          "displayName": "(UTC+10:00) Canberra, Melbourne, Sydney"
        }, {
          "value": "Timezone_089",
          "displayName": "(UTC+10:00) Guam, Port Moresby"
        }, {
          "value": "Timezone_090",
          "displayName": "(UTC+10:00) Hobart"
        }, {
          "value": "Timezone_091",
          "displayName": "(UTC+10:00) Yakutsk"
        }, {
          "value": "Timezone_092",
          "displayName": "(UTC+11:00) Solomon Is., New Caledonia"
        }, {
          "value": "Timezone_093",
          "displayName": "(UTC+11:00) Vladivostok"
        }, {
          "value": "Timezone_094",
          "displayName": "(UTC+12:00) Auckland, Wellington"
        }, {
          "value": "Timezone_095",
          "displayName": "(UTC+12:00) Coordinated Universal Time+12"
        }, {
          "value": "Timezone_096",
          "displayName": "(UTC+12:00) Fiji"
        }, {
          "value": "Timezone_097",
          "displayName": "(UTC+12:00) Magadan"
        }, {
          "value": "Timezone_098",
          "displayName": "(UTC+13:00) Nuku'alofa"
        }, {
          "value": "Timezone_099",
          "displayName": "(UTC+13:00) Samoa"
        }],
        "description": "The time zone to be selected",
        "displayName": "Time Zone",
        "displayOnly": true
      }, {
        "name": "TzOffset",
        "type": "string",
        "hidden": true,
        "description": "The time zone Offset to be set in Tr098",
        "tr098PathOverride": ["InternetGatewayDevice.Time.LocalTimeZone"]
      }, {
        "name": "TzName",
        "type": "string",
        "hidden": true,
        "description": "The time zone Name to be set in Tr098",
        "tr098PathOverride": ["InternetGatewayDevice.Time.LocalTimeZoneName"]
      }, {
        "name": "DaylightSaving",
        "type": "boolean",
        "description": "Enable the daylight saving time",
        "displayName": "Daylight Saving",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.Time.DaylightSavingsUsed"]
      }, {
        "name": "NTPEnable",
        "type": "boolean",
        "mandatory": true,
        "description": "Enable to use use network time",
        "displayName": "Network Time",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.Time.Enable"]
      }, {
        "name": "NTPServer1",
        "type": "string",
        "mandatory": true,
        "description": "First NTP timeserver",
        "displayName": "1st NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer1"],
        "requires": {
          "NTPEnable": true
        }
      }, {
        "name": "NTPServer2",
        "type": "string",
        "description": "Second NTP timeserver",
        "displayName": "2nd NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer2"],
        "requires": {
          "NTPEnable": true
        }
      }, {
        "name": "NTPServer3",
        "type": "string",
        "description": "Third NTP timeserver",
        "displayName": "3rd NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer3"],
        "requires": {
          "NTPEnable": true
        }
      }, {
        "name": "NTPServer4",
        "type": "string",
        "description": "Fourth NTP timeserver",
        "displayName": "4th NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer4"],
        "requires": {
          "NTPEnable": true
        }
      }, {
        "name": "NTPServer5",
        "type": "string",
        "description": "Fifth NTP timeserver",
        "displayName": "5th NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer5"],
        "requires": {
          "NTPEnable": true
        }
      }]
    }, {
      "_id": "973887c6-ec78-409d-8fd9-174a1905c5ac",
      "name": "TimezonePosix",
      "group": "Misc",
      "createTime": "2020-07-24T05:11:19.395Z",
      "description": "Configure Time Zone for CPE device.",
      "displayName": "Time Zone - POSIX",
      "parameters": [{
        "name": "Tz",
        "type": "string",
        "implies": {
          "Asia/Aden": {
            "TzName": "Asia/Aden",
            "TzValue": "AST-3"
          },
          "Asia/Baku": {
            "TzName": "Asia/Baku",
            "TzValue": "AZT-4AZST,M3.5.0/4,M10.5.0/5"
          },
          "Asia/Dili": {
            "TzName": "Asia/Dili",
            "TzValue": "TLT-9"
          },
          "Asia/Gaza": {
            "TzName": "Asia/Gaza",
            "TzValue": "EET-2EEST,M3.5.6/0:01,M9.1.5"
          },
          "Asia/Hovd": {
            "TzName": "Asia/Hovd",
            "TzValue": "HOVT-7"
          },
          "Asia/Omsk": {
            "TzName": "Asia/Omsk",
            "TzValue": "OMST-7"
          },
          "Asia/Oral": {
            "TzName": "Asia/Oral",
            "TzValue": "ORAT-5"
          },
          "Asia/Aqtau": {
            "TzName": "Asia/Aqtau",
            "TzValue": "AQTT-5"
          },
          "Asia/Dhaka": {
            "TzName": "Asia/Dhaka",
            "TzValue": "BDT-6"
          },
          "Asia/Dubai": {
            "TzName": "Asia/Dubai",
            "TzValue": "GST-4"
          },
          "Asia/Kabul": {
            "TzName": "Asia/Kabul",
            "TzValue": "AFT-4:30"
          },
          "Asia/Macau": {
            "TzName": "Asia/Macau",
            "TzValue": "CST-8"
          },
          "Asia/Qatar": {
            "TzName": "Asia/Qatar",
            "TzValue": "AST-3"
          },
          "Asia/Seoul": {
            "TzName": "Asia/Seoul",
            "TzValue": "KST-9"
          },
          "Asia/Tokyo": {
            "TzName": "Asia/Tokyo",
            "TzValue": "JST-9"
          },
          "Africa/Lome": {
            "TzName": "Africa/Lome",
            "TzValue": "GMT0"
          },
          "Asia/Almaty": {
            "TzName": "Asia/Almaty",
            "TzValue": "ALMT-6"
          },
          "Asia/Anadyr": {
            "TzName": "Asia/Anadyr",
            "TzValue": "ANAT-11ANAST,M3.5.0,M10.5.0/3"
          },
          "Asia/Aqtobe": {
            "TzName": "Asia/Aqtobe",
            "TzValue": "AQTT-5"
          },
          "Asia/Beirut": {
            "TzName": "Asia/Beirut",
            "TzValue": "EET-2EEST,M3.5.0/0,M10.5.0/0"
          },
          "Asia/Brunei": {
            "TzName": "Asia/Brunei",
            "TzValue": "BNT-8"
          },
          "Asia/Harbin": {
            "TzName": "Asia/Harbin",
            "TzValue": "CST-8"
          },
          "Asia/Kuwait": {
            "TzName": "Asia/Kuwait",
            "TzValue": "AST-3"
          },
          "Asia/Manila": {
            "TzName": "Asia/Manila",
            "TzValue": "PHT-8"
          },
          "Asia/Muscat": {
            "TzName": "Asia/Muscat",
            "TzValue": "GST-4"
          },
          "Asia/Riyadh": {
            "TzName": "Asia/Riyadh",
            "TzValue": "AST-3"
          },
          "Asia/Taipei": {
            "TzName": "Asia/Taipei",
            "TzValue": "CST-8"
          },
          "Asia/Tehran": {
            "TzName": "Asia/Tehran",
            "TzValue": "IRST-3:30IRDT,80/0,264/0"
          },
          "Asia/Urumqi": {
            "TzName": "Asia/Urumqi",
            "TzValue": "CST-8"
          },
          "Europe/Kiev": {
            "TzName": "Europe/Kiev",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Oslo": {
            "TzName": "Europe/Oslo",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Riga": {
            "TzName": "Europe/Riga",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Rome": {
            "TzName": "Europe/Rome",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Indian/Mahe": {
            "TzName": "Indian/Mahe",
            "TzValue": "SCT-4"
          },
          "Africa/Accra": {
            "TzName": "Africa/Accra",
            "TzValue": "GMT0"
          },
          "Africa/Ceuta": {
            "TzName": "Africa/Ceuta",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Africa/Dakar": {
            "TzName": "Africa/Dakar",
            "TzValue": "GMT0"
          },
          "Africa/Lagos": {
            "TzName": "Africa/Lagos",
            "TzValue": "WAT-1"
          },
          "Africa/Tunis": {
            "TzName": "Africa/Tunis",
            "TzValue": "CET-1"
          },
          "America/Adak": {
            "TzName": "America/Adak",
            "TzValue": "HAST10HADT,M3.2.0,M11.1.0"
          },
          "America/Lima": {
            "TzName": "America/Lima",
            "TzValue": "PET5"
          },
          "America/Nome": {
            "TzName": "America/Nome",
            "TzValue": "AKST9AKDT,M3.2.0,M11.1.0"
          },
          "Asia/Baghdad": {
            "TzName": "Asia/Baghdad",
            "TzValue": "AST-3"
          },
          "Asia/Bahrain": {
            "TzName": "Asia/Bahrain",
            "TzValue": "AST-3"
          },
          "Asia/Bangkok": {
            "TzName": "Asia/Bangkok",
            "TzValue": "ICT-7"
          },
          "Asia/Bishkek": {
            "TzName": "Asia/Bishkek",
            "TzValue": "KGT-6"
          },
          "Asia/Colombo": {
            "TzName": "Asia/Colombo",
            "TzValue": "IST-5:30"
          },
          "Asia/Irkutsk": {
            "TzName": "Asia/Irkutsk",
            "TzValue": "IRKT-8IRKST,M3.5.0,M10.5.0/3"
          },
          "Asia/Jakarta": {
            "TzName": "Asia/Jakarta",
            "TzValue": "WIT-7"
          },
          "Asia/Karachi": {
            "TzName": "Asia/Karachi",
            "TzValue": "PKT-5"
          },
          "Asia/Kashgar": {
            "TzName": "Asia/Kashgar",
            "TzValue": "CST-8"
          },
          "Asia/Kolkata": {
            "TzName": "Asia/Kolkata",
            "TzValue": "IST-5:30"
          },
          "Asia/Kuching": {
            "TzName": "Asia/Kuching",
            "TzValue": "MYT-8"
          },
          "Asia/Magadan": {
            "TzName": "Asia/Magadan",
            "TzValue": "MAGT-11MAGST,M3.5.0,M10.5.0/3"
          },
          "Asia/Nicosia": {
            "TzName": "Asia/Nicosia",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Asia/Rangoon": {
            "TzName": "Asia/Rangoon",
            "TzValue": "MMT-6:30"
          },
          "Asia/Tbilisi": {
            "TzName": "Asia/Tbilisi",
            "TzValue": "GET-4"
          },
          "Asia/Thimphu": {
            "TzName": "Asia/Thimphu",
            "TzValue": "BTT-6"
          },
          "Asia/Yakutsk": {
            "TzName": "Asia/Yakutsk",
            "TzValue": "YAKT-9YAKST,M3.5.0,M10.5.0/3"
          },
          "Asia/Yerevan": {
            "TzName": "Asia/Yerevan",
            "TzValue": "AMT-4AMST,M3.5.0,M10.5.0/3"
          },
          "Europe/Malta": {
            "TzName": "Europe/Malta",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Minsk": {
            "TzName": "Europe/Minsk",
            "TzValue": "EET-2EEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Paris": {
            "TzName": "Europe/Paris",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Sofia": {
            "TzName": "Europe/Sofia",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Vaduz": {
            "TzName": "Europe/Vaduz",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Indian/Cocos": {
            "TzName": "Indian/Cocos",
            "TzValue": "CCT-6:30"
          },
          "Pacific/Apia": {
            "TzName": "Pacific/Apia",
            "TzValue": "WST11"
          },
          "Pacific/Fiji": {
            "TzName": "Pacific/Fiji",
            "TzValue": "FJT-12"
          },
          "Pacific/Guam": {
            "TzName": "Pacific/Guam",
            "TzValue": "ChST-10"
          },
          "Pacific/Niue": {
            "TzName": "Pacific/Niue",
            "TzValue": "NUT11"
          },
          "Pacific/Truk": {
            "TzName": "Pacific/Truk",
            "TzValue": "TRUT-10"
          },
          "Pacific/Wake": {
            "TzName": "Pacific/Wake",
            "TzValue": "WAKT-12"
          },
          "Africa/Asmara": {
            "TzName": "Africa/Asmara",
            "TzValue": "EAT-3"
          },
          "Africa/Bamako": {
            "TzName": "Africa/Bamako",
            "TzValue": "GMT0"
          },
          "Africa/Bangui": {
            "TzName": "Africa/Bangui",
            "TzValue": "WAT-1"
          },
          "Africa/Banjul": {
            "TzName": "Africa/Banjul",
            "TzValue": "GMT0"
          },
          "Africa/Bissau": {
            "TzName": "Africa/Bissau",
            "TzValue": "GMT0"
          },
          "Africa/Douala": {
            "TzName": "Africa/Douala",
            "TzValue": "WAT-1"
          },
          "Africa/Harare": {
            "TzName": "Africa/Harare",
            "TzValue": "CAT-2"
          },
          "Africa/Kigali": {
            "TzName": "Africa/Kigali",
            "TzValue": "CAT-2"
          },
          "Africa/Luanda": {
            "TzName": "Africa/Luanda",
            "TzValue": "WAT-1"
          },
          "Africa/Lusaka": {
            "TzName": "Africa/Lusaka",
            "TzValue": "CAT-2"
          },
          "Africa/Malabo": {
            "TzName": "Africa/Malabo",
            "TzValue": "WAT-1"
          },
          "Africa/Maputo": {
            "TzName": "Africa/Maputo",
            "TzValue": "CAT-2"
          },
          "Africa/Maseru": {
            "TzName": "Africa/Maseru",
            "TzValue": "SAST-2"
          },
          "Africa/Niamey": {
            "TzName": "Africa/Niamey",
            "TzValue": "WAT-1"
          },
          "America/Aruba": {
            "TzName": "America/Aruba",
            "TzValue": "AST4"
          },
          "America/Bahia": {
            "TzName": "America/Bahia",
            "TzValue": "BRT3"
          },
          "America/Belem": {
            "TzName": "America/Belem",
            "TzValue": "BRT3"
          },
          "America/Boise": {
            "TzName": "America/Boise",
            "TzValue": "MST7MDT,M3.2.0,M11.1.0"
          },
          "America/Thule": {
            "TzName": "America/Thule",
            "TzValue": "AST4ADT,M3.2.0,M11.1.0"
          },
          "Asia/Ashgabat": {
            "TzName": "Asia/Ashgabat",
            "TzValue": "TMT-5"
          },
          "Asia/Damascus": {
            "TzName": "Asia/Damascus",
            "TzValue": "EET-2EEST,M4.1.5/0,M10.5.5/0"
          },
          "Asia/Dushanbe": {
            "TzName": "Asia/Dushanbe",
            "TzValue": "TJT-5"
          },
          "Asia/Jayapura": {
            "TzName": "Asia/Jayapura",
            "TzValue": "EIT-9"
          },
          "Asia/Makassar": {
            "TzName": "Asia/Makassar",
            "TzValue": "CIT-8"
          },
          "Asia/Sakhalin": {
            "TzName": "Asia/Sakhalin",
            "TzValue": "SAKT-10SAKST,M3.5.0,M10.5.0/3"
          },
          "Asia/Shanghai": {
            "TzName": "Asia/Shanghai",
            "TzValue": "CST-8"
          },
          "Asia/Tashkent": {
            "TzName": "Asia/Tashkent",
            "TzValue": "UZT-5"
          },
          "Europe/Athens": {
            "TzName": "Europe/Athens",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Berlin": {
            "TzName": "Europe/Berlin",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Dublin": {
            "TzName": "Europe/Dublin",
            "TzValue": "GMT0IST,M3.5.0/1,M10.5.0"
          },
          "Europe/Jersey": {
            "TzName": "Europe/Jersey",
            "TzValue": "GMT0BST,M3.5.0/1,M10.5.0"
          },
          "Europe/Lisbon": {
            "TzName": "Europe/Lisbon",
            "TzValue": "WET0WEST,M3.5.0/1,M10.5.0"
          },
          "Europe/London": {
            "TzName": "Europe/London",
            "TzValue": "GMT0BST,M3.5.0/1,M10.5.0"
          },
          "Europe/Madrid": {
            "TzName": "Europe/Madrid",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Monaco": {
            "TzName": "Europe/Monaco",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Moscow": {
            "TzName": "Europe/Moscow",
            "TzValue": "MSK-4"
          },
          "Europe/Prague": {
            "TzName": "Europe/Prague",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Samara": {
            "TzName": "Europe/Samara",
            "TzValue": "SAMT-3SAMST,M3.5.0,M10.5.0/3"
          },
          "Europe/Skopje": {
            "TzName": "Europe/Skopje",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Tirane": {
            "TzName": "Europe/Tirane",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Vienna": {
            "TzName": "Europe/Vienna",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Warsaw": {
            "TzName": "Europe/Warsaw",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Zagreb": {
            "TzName": "Europe/Zagreb",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Zurich": {
            "TzName": "Europe/Zurich",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Indian/Chagos": {
            "TzName": "Indian/Chagos",
            "TzValue": "IOT-6"
          },
          "Indian/Comoro": {
            "TzName": "Indian/Comoro",
            "TzValue": "EAT-3"
          },
          "Pacific/Efate": {
            "TzName": "Pacific/Efate",
            "TzValue": "VUT-11"
          },
          "Pacific/Nauru": {
            "TzName": "Pacific/Nauru",
            "TzValue": "NRT-12"
          },
          "Pacific/Palau": {
            "TzName": "Pacific/Palau",
            "TzValue": "PWT-9"
          },
          "Africa/Abidjan": {
            "TzName": "Africa/Abidjan",
            "TzValue": "GMT0"
          },
          "Africa/Algiers": {
            "TzName": "Africa/Algiers",
            "TzValue": "CET-1"
          },
          "Africa/Conakry": {
            "TzName": "Africa/Conakry",
            "TzValue": "GMT0"
          },
          "Africa/Kampala": {
            "TzName": "Africa/Kampala",
            "TzValue": "EAT-3"
          },
          "Africa/Mbabane": {
            "TzName": "Africa/Mbabane",
            "TzValue": "SAST-2"
          },
          "Africa/Nairobi": {
            "TzName": "Africa/Nairobi",
            "TzValue": "EAT-3"
          },
          "Africa/Tripoli": {
            "TzName": "Africa/Tripoli",
            "TzValue": "EET-2"
          },
          "America/Belize": {
            "TzName": "America/Belize",
            "TzValue": "CST6"
          },
          "America/Bogota": {
            "TzName": "America/Bogota",
            "TzValue": "COT5"
          },
          "America/Cancun": {
            "TzName": "America/Cancun",
            "TzValue": "CST6CDT,M4.1.0,M10.5.0"
          },
          "America/Cayman": {
            "TzName": "America/Cayman",
            "TzValue": "EST5"
          },
          "America/Cuiaba": {
            "TzName": "America/Cuiaba",
            "TzValue": "AMT4AMST,M10.3.0/0,M2.3.0/0"
          },
          "America/Dawson": {
            "TzName": "America/Dawson",
            "TzValue": "PST8PDT,M3.2.0,M11.1.0"
          },
          "America/Denver": {
            "TzName": "America/Denver",
            "TzValue": "MST7MDT,M3.2.0,M11.1.0"
          },
          "America/Guyana": {
            "TzName": "America/Guyana",
            "TzValue": "GYT4"
          },
          "America/Havana": {
            "TzName": "America/Havana",
            "TzValue": "CST5CDT,M3.2.0/0,M10.5.0/1"
          },
          "America/Inuvik": {
            "TzName": "America/Inuvik",
            "TzValue": "MST7MDT,M3.2.0,M11.1.0"
          },
          "America/Juneau": {
            "TzName": "America/Juneau",
            "TzValue": "AKST9AKDT,M3.2.0,M11.1.0"
          },
          "America/La Paz": {
            "TzName": "America/La Paz",
            "TzValue": "BOT4"
          },
          "America/Maceio": {
            "TzName": "America/Maceio",
            "TzValue": "BRT3"
          },
          "America/Manaus": {
            "TzName": "America/Manaus",
            "TzValue": "AMT4"
          },
          "America/Merida": {
            "TzName": "America/Merida",
            "TzValue": "CST6CDT,M4.1.0,M10.5.0"
          },
          "America/Nassau": {
            "TzName": "America/Nassau",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Panama": {
            "TzName": "America/Panama",
            "TzValue": "EST5"
          },
          "America/Recife": {
            "TzName": "America/Recife",
            "TzValue": "BRT3"
          },
          "America/Regina": {
            "TzName": "America/Regina",
            "TzValue": "CST6"
          },
          "Asia/Chongqing": {
            "TzName": "Asia/Chongqing",
            "TzValue": "CST-8"
          },
          "Asia/Hong Kong": {
            "TzName": "Asia/Hong Kong",
            "TzValue": "HKT-8"
          },
          "Asia/Kamchatka": {
            "TzName": "Asia/Kamchatka",
            "TzValue": "PETT-11PETST,M3.5.0,M10.5.0/3"
          },
          "Asia/Kathmandu": {
            "TzName": "Asia/Kathmandu",
            "TzValue": "NPT-5:45"
          },
          "Asia/Pontianak": {
            "TzName": "Asia/Pontianak",
            "TzValue": "WIT-7"
          },
          "Asia/Pyongyang": {
            "TzName": "Asia/Pyongyang",
            "TzValue": "KST-9"
          },
          "Asia/Qyzylorda": {
            "TzName": "Asia/Qyzylorda",
            "TzValue": "QYZT-6"
          },
          "Asia/Samarkand": {
            "TzName": "Asia/Samarkand",
            "TzValue": "UZT-5"
          },
          "Asia/Singapore": {
            "TzName": "Asia/Singapore",
            "TzValue": "SGT-8"
          },
          "Asia/Vientiane": {
            "TzName": "Asia/Vientiane",
            "TzValue": "ICT-7"
          },
          "Atlantic/Faroe": {
            "TzName": "Atlantic/Faroe",
            "TzValue": "WET0WEST,M3.5.0/1,M10.5.0"
          },
          "Europe/Andorra": {
            "TzName": "Europe/Andorra",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Tallinn": {
            "TzName": "Europe/Tallinn",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Vatican": {
            "TzName": "Europe/Vatican",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Vilnius": {
            "TzName": "Europe/Vilnius",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Indian/Mayotte": {
            "TzName": "Indian/Mayotte",
            "TzValue": "EAT-3"
          },
          "Indian/Reunion": {
            "TzName": "Indian/Reunion",
            "TzValue": "RET-4"
          },
          "Pacific/Kosrae": {
            "TzName": "Pacific/Kosrae",
            "TzValue": "KOST-11"
          },
          "Pacific/Majuro": {
            "TzName": "Pacific/Majuro",
            "TzValue": "MHT-12"
          },
          "Pacific/Midway": {
            "TzName": "Pacific/Midway",
            "TzValue": "SST11"
          },
          "Pacific/Noumea": {
            "TzName": "Pacific/Noumea",
            "TzValue": "NCT-11"
          },
          "Pacific/Ponape": {
            "TzName": "Pacific/Ponape",
            "TzValue": "PONT-11"
          },
          "Pacific/Saipan": {
            "TzName": "Pacific/Saipan",
            "TzValue": "ChST-10"
          },
          "Pacific/Tahiti": {
            "TzName": "Pacific/Tahiti",
            "TzValue": "TAHT10"
          },
          "Pacific/Tarawa": {
            "TzName": "Pacific/Tarawa",
            "TzValue": "GILT-12"
          },
          "Pacific/Wallis": {
            "TzName": "Pacific/Wallis",
            "TzValue": "WFT-12"
          },
          "Africa/Blantyre": {
            "TzName": "Africa/Blantyre",
            "TzValue": "CAT-2"
          },
          "Africa/Djibouti": {
            "TzName": "Africa/Djibouti",
            "TzValue": "EAT-3"
          },
          "Africa/El Aaiun": {
            "TzName": "Africa/El Aaiun",
            "TzValue": "WET0"
          },
          "Africa/Freetown": {
            "TzName": "Africa/Freetown",
            "TzValue": "GMT0"
          },
          "Africa/Gaborone": {
            "TzName": "Africa/Gaborone",
            "TzValue": "CAT-2"
          },
          "Africa/Khartoum": {
            "TzName": "Africa/Khartoum",
            "TzValue": "EAT-3"
          },
          "Africa/Kinshasa": {
            "TzName": "Africa/Kinshasa",
            "TzValue": "WAT-1"
          },
          "Africa/Monrovia": {
            "TzName": "Africa/Monrovia",
            "TzValue": "GMT0"
          },
          "Africa/Ndjamena": {
            "TzName": "Africa/Ndjamena",
            "TzValue": "WAT-1"
          },
          "Africa/Sao Tome": {
            "TzName": "Africa/Sao Tome",
            "TzValue": "GMT0"
          },
          "Africa/Windhoek": {
            "TzName": "Africa/Windhoek",
            "TzValue": "WAT-1WAST,M9.1.0,M4.1.0"
          },
          "America/Antigua": {
            "TzName": "America/Antigua",
            "TzValue": "AST4"
          },
          "America/Caracas": {
            "TzName": "America/Caracas",
            "TzValue": "VET4:30"
          },
          "America/Cayenne": {
            "TzName": "America/Cayenne",
            "TzValue": "GFT3"
          },
          "America/Chicago": {
            "TzName": "America/Chicago",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "America/Curacao": {
            "TzName": "America/Curacao",
            "TzValue": "AST4"
          },
          "America/Detroit": {
            "TzName": "America/Detroit",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Grenada": {
            "TzName": "America/Grenada",
            "TzValue": "AST4"
          },
          "America/Halifax": {
            "TzName": "America/Halifax",
            "TzValue": "AST4ADT,M3.2.0,M11.1.0"
          },
          "America/Iqaluit": {
            "TzName": "America/Iqaluit",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Jamaica": {
            "TzName": "America/Jamaica",
            "TzValue": "EST5"
          },
          "America/Managua": {
            "TzName": "America/Managua",
            "TzValue": "CST6"
          },
          "America/Marigot": {
            "TzName": "America/Marigot",
            "TzValue": "AST4"
          },
          "America/Moncton": {
            "TzName": "America/Moncton",
            "TzValue": "AST4ADT,M3.2.0,M11.1.0"
          },
          "America/Nipigon": {
            "TzName": "America/Nipigon",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Noronha": {
            "TzName": "America/Noronha",
            "TzValue": "FNT2"
          },
          "America/Ojinaga": {
            "TzName": "America/Ojinaga",
            "TzValue": "MST7MDT,M3.2.0,M11.1.0"
          },
          "America/Phoenix": {
            "TzName": "America/Phoenix",
            "TzValue": "MST7"
          },
          "America/Tijuana": {
            "TzName": "America/Tijuana",
            "TzValue": "PST8PDT,M3.2.0,M11.1.0"
          },
          "America/Toronto": {
            "TzName": "America/Toronto",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Tortola": {
            "TzName": "America/Tortola",
            "TzValue": "AST4"
          },
          "America/Yakutat": {
            "TzName": "America/Yakutat",
            "TzValue": "AKST9AKDT,M3.2.0,M11.1.0"
          },
          "Asia/Choibalsan": {
            "TzName": "Asia/Choibalsan",
            "TzValue": "CHOT-8"
          },
          "Asia/Phnom Penh": {
            "TzName": "Asia/Phnom Penh",
            "TzValue": "ICT-7"
          },
          "Atlantic/Azores": {
            "TzName": "Atlantic/Azores",
            "TzValue": "AZOT1AZOST,M3.5.0/0,M10.5.0/1"
          },
          "Atlantic/Canary": {
            "TzName": "Atlantic/Canary",
            "TzValue": "WET0WEST,M3.5.0/1,M10.5.0"
          },
          "Australia/Eucla": {
            "TzName": "Australia/Eucla",
            "TzValue": "CWST-8:45"
          },
          "Australia/Perth": {
            "TzName": "Australia/Perth",
            "TzValue": "WST-8"
          },
          "Europe/Belgrade": {
            "TzName": "Europe/Belgrade",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Brussels": {
            "TzName": "Europe/Brussels",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Budapest": {
            "TzName": "Europe/Budapest",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Chisinau": {
            "TzName": "Europe/Chisinau",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Guernsey": {
            "TzName": "Europe/Guernsey",
            "TzValue": "GMT0BST,M3.5.0/1,M10.5.0"
          },
          "Europe/Helsinki": {
            "TzName": "Europe/Helsinki",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Istanbul": {
            "TzName": "Europe/Istanbul",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Sarajevo": {
            "TzName": "Europe/Sarajevo",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Uzhgorod": {
            "TzName": "Europe/Uzhgorod",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Indian/Maldives": {
            "TzName": "Indian/Maldives",
            "TzValue": "MVT-5"
          },
          "Pacific/Chatham": {
            "TzName": "Pacific/Chatham",
            "TzValue": "CHAST-12:45CHADT,M9.5.0/2:45,M4.1.0/3:45"
          },
          "Pacific/Fakaofo": {
            "TzName": "Pacific/Fakaofo",
            "TzValue": "TKT10"
          },
          "Pacific/Gambier": {
            "TzName": "Pacific/Gambier",
            "TzValue": "GAMT9"
          },
          "Pacific/Norfolk": {
            "TzName": "Pacific/Norfolk",
            "TzValue": "NFT-11:30"
          },
          "Africa/Bujumbura": {
            "TzName": "Africa/Bujumbura",
            "TzValue": "CAT-2"
          },
          "Africa/Mogadishu": {
            "TzName": "Africa/Mogadishu",
            "TzValue": "EAT-3"
          },
          "America/Anguilla": {
            "TzName": "America/Anguilla",
            "TzValue": "AST4"
          },
          "America/Asuncion": {
            "TzName": "America/Asuncion",
            "TzValue": "PYT4PYST,M10.1.0/0,M4.2.0/0"
          },
          "America/Atikokan": {
            "TzName": "America/Atikokan",
            "TzValue": "EST5"
          },
          "America/Barbados": {
            "TzName": "America/Barbados",
            "TzValue": "AST4"
          },
          "America/Dominica": {
            "TzName": "America/Dominica",
            "TzValue": "AST4"
          },
          "America/Edmonton": {
            "TzName": "America/Edmonton",
            "TzValue": "MST7MDT,M3.2.0,M11.1.0"
          },
          "America/Eirunepe": {
            "TzName": "America/Eirunepe",
            "TzValue": "AMT4"
          },
          "America/Mazatlan": {
            "TzName": "America/Mazatlan",
            "TzValue": "MST7MDT,M4.1.0,M10.5.0"
          },
          "America/Miquelon": {
            "TzName": "America/Miquelon",
            "TzValue": "PMST3PMDT,M3.2.0,M11.1.0"
          },
          "America/Montreal": {
            "TzName": "America/Montreal",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/New York": {
            "TzName": "America/New York",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Santarem": {
            "TzName": "America/Santarem",
            "TzValue": "BRT3"
          },
          "America/Shiprock": {
            "TzName": "America/Shiprock",
            "TzValue": "MST7MDT,M3.2.0,M11.1.0"
          },
          "America/St Johns": {
            "TzName": "America/St Johns",
            "TzValue": "NST3:30NDT,M3.2.0/0:01,M11.1.0/0:01"
          },
          "America/St Kitts": {
            "TzName": "America/St Kitts",
            "TzValue": "AST4"
          },
          "America/St Lucia": {
            "TzName": "America/St Lucia",
            "TzValue": "AST4"
          },
          "America/Winnipeg": {
            "TzName": "America/Winnipeg",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "Antarctica/Casey": {
            "TzName": "Antarctica/Casey",
            "TzValue": "WST-8"
          },
          "Antarctica/Davis": {
            "TzName": "Antarctica/Davis",
            "TzValue": "DAVT-7"
          },
          "Antarctica/Syowa": {
            "TzName": "Antarctica/Syowa",
            "TzValue": "SYOT-3"
          },
          "Asia/Ho Chi Minh": {
            "TzName": "Asia/Ho Chi Minh",
            "TzValue": "ICT-7"
          },
          "Asia/Krasnoyarsk": {
            "TzName": "Asia/Krasnoyarsk",
            "TzValue": "KRAT-7KRAST,M3.5.0,M10.5.0/3"
          },
          "Asia/Novosibirsk": {
            "TzName": "Asia/Novosibirsk",
            "TzValue": "NOVT-6NOVST,M3.5.0,M10.5.0/3"
          },
          "Asia/Ulaanbaatar": {
            "TzName": "Asia/Ulaanbaatar",
            "TzValue": "ULAT-8"
          },
          "Asia/Vladivostok": {
            "TzName": "Asia/Vladivostok",
            "TzValue": "VLAT-10VLAST,M3.5.0,M10.5.0/3"
          },
          "Atlantic/Bermuda": {
            "TzName": "Atlantic/Bermuda",
            "TzValue": "AST4ADT,M3.2.0,M11.1.0"
          },
          "Atlantic/Madeira": {
            "TzName": "Atlantic/Madeira",
            "TzValue": "WET0WEST,M3.5.0/1,M10.5.0"
          },
          "Atlantic/Stanley": {
            "TzName": "Atlantic/Stanley",
            "TzValue": "FKT4FKST,M9.1.0,M4.3.0"
          },
          "Australia/Currie": {
            "TzName": "Australia/Currie",
            "TzValue": "EST-10EST,M10.1.0,M4.1.0/3"
          },
          "Australia/Darwin": {
            "TzName": "Australia/Darwin",
            "TzValue": "CST-9:30"
          },
          "Australia/Hobart": {
            "TzName": "Australia/Hobart",
            "TzValue": "EST-10EST,M10.1.0,M4.1.0/3"
          },
          "Australia/Sydney": {
            "TzName": "Australia/Sydney",
            "TzValue": "EST-10EST,M10.1.0,M4.1.0/3"
          },
          "Europe/Amsterdam": {
            "TzName": "Europe/Amsterdam",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Bucharest": {
            "TzName": "Europe/Bucharest",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Gibraltar": {
            "TzName": "Europe/Gibraltar",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Ljubljana": {
            "TzName": "Europe/Ljubljana",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Mariehamn": {
            "TzName": "Europe/Mariehamn",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Podgorica": {
            "TzName": "Europe/Podgorica",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Stockholm": {
            "TzName": "Europe/Stockholm",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Volgograd": {
            "TzName": "Europe/Volgograd",
            "TzValue": "VOLT-3VOLST,M3.5.0,M10.5.0/3"
          },
          "Indian/Christmas": {
            "TzName": "Indian/Christmas",
            "TzValue": "CXT-7"
          },
          "Indian/Kerguelen": {
            "TzName": "Indian/Kerguelen",
            "TzValue": "TFT-5"
          },
          "Indian/Mauritius": {
            "TzName": "Indian/Mauritius",
            "TzValue": "MUT-4"
          },
          "Pacific/Auckland": {
            "TzName": "Pacific/Auckland",
            "TzValue": "NZST-12NZDT,M9.5.0,M4.1.0/3"
          },
          "Pacific/Funafuti": {
            "TzName": "Pacific/Funafuti",
            "TzValue": "TVT-12"
          },
          "Pacific/Honolulu": {
            "TzName": "Pacific/Honolulu",
            "TzValue": "HST10"
          },
          "Pacific/Johnston": {
            "TzName": "Pacific/Johnston",
            "TzValue": "HST10"
          },
          "Pacific/Pitcairn": {
            "TzName": "Pacific/Pitcairn",
            "TzValue": "PST8"
          },
          "Africa/Casablanca": {
            "TzName": "Africa/Casablanca",
            "TzValue": "WET0"
          },
          "Africa/Libreville": {
            "TzName": "Africa/Libreville",
            "TzValue": "WAT-1"
          },
          "Africa/Lubumbashi": {
            "TzName": "Africa/Lubumbashi",
            "TzValue": "CAT-2"
          },
          "Africa/Nouakchott": {
            "TzName": "Africa/Nouakchott",
            "TzValue": "GMT0"
          },
          "Africa/Porto-Novo": {
            "TzName": "Africa/Porto-Novo",
            "TzValue": "WAT-1"
          },
          "America/Anchorage": {
            "TzName": "America/Anchorage",
            "TzValue": "AKST9AKDT,M3.2.0,M11.1.0"
          },
          "America/Araguaina": {
            "TzName": "America/Araguaina",
            "TzValue": "BRT3"
          },
          "America/Boa Vista": {
            "TzName": "America/Boa Vista",
            "TzValue": "AMT4"
          },
          "America/Chihuahua": {
            "TzName": "America/Chihuahua",
            "TzValue": "MST7MDT,M4.1.0,M10.5.0"
          },
          "America/Fortaleza": {
            "TzName": "America/Fortaleza",
            "TzValue": "BRT3"
          },
          "America/Glace Bay": {
            "TzName": "America/Glace Bay",
            "TzValue": "AST4ADT,M3.2.0,M11.1.0"
          },
          "America/Goose Bay": {
            "TzName": "America/Goose Bay",
            "TzValue": "AST4ADT,M3.2.0/0:01,M11.1.0/0:01"
          },
          "America/Guatemala": {
            "TzName": "America/Guatemala",
            "TzValue": "CST6"
          },
          "America/Guayaquil": {
            "TzName": "America/Guayaquil",
            "TzValue": "ECT5"
          },
          "America/Matamoros": {
            "TzName": "America/Matamoros",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "America/Menominee": {
            "TzName": "America/Menominee",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "America/Monterrey": {
            "TzName": "America/Monterrey",
            "TzValue": "CST6CDT,M4.1.0,M10.5.0"
          },
          "America/Sao Paulo": {
            "TzName": "America/Sao Paulo",
            "TzValue": "BRT3BRST,M10.3.0/0,M2.3.0/0"
          },
          "America/St Thomas": {
            "TzName": "America/St Thomas",
            "TzValue": "AST4"
          },
          "America/Vancouver": {
            "TzName": "America/Vancouver",
            "TzValue": "PST8PDT,M3.2.0,M11.1.0"
          },
          "Antarctica/Mawson": {
            "TzName": "Antarctica/Mawson",
            "TzValue": "MAWT-5"
          },
          "Antarctica/Vostok": {
            "TzName": "Antarctica/Vostok",
            "TzValue": "VOST-6"
          },
          "Asia/Kuala Lumpur": {
            "TzName": "Asia/Kuala Lumpur",
            "TzValue": "MYT-8"
          },
          "Asia/Novokuznetsk": {
            "TzName": "Asia/Novokuznetsk",
            "TzValue": "NOVT-6NOVST,M3.5.0,M10.5.0/3"
          },
          "Europe/Bratislava": {
            "TzName": "Europe/Bratislava",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Copenhagen": {
            "TzName": "Europe/Copenhagen",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Luxembourg": {
            "TzName": "Europe/Luxembourg",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/San Marino": {
            "TzName": "Europe/San Marino",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Europe/Simferopol": {
            "TzName": "Europe/Simferopol",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Europe/Zaporozhye": {
            "TzName": "Europe/Zaporozhye",
            "TzValue": "EET-2EEST,M3.5.0/3,M10.5.0/4"
          },
          "Pacific/Enderbury": {
            "TzName": "Pacific/Enderbury",
            "TzValue": "PHOT-13"
          },
          "Pacific/Galapagos": {
            "TzName": "Pacific/Galapagos",
            "TzValue": "GALT6"
          },
          "Pacific/Kwajalein": {
            "TzName": "Pacific/Kwajalein",
            "TzValue": "MHT-12"
          },
          "Pacific/Marquesas": {
            "TzName": "Pacific/Marquesas",
            "TzValue": "MART9:30"
          },
          "Pacific/Pago Pago": {
            "TzName": "Pacific/Pago Pago",
            "TzValue": "SST11"
          },
          "Pacific/Rarotonga": {
            "TzName": "Pacific/Rarotonga",
            "TzValue": "CKT10"
          },
          "Pacific/Tongatapu": {
            "TzName": "Pacific/Tongatapu",
            "TzValue": "TOT-13"
          },
          "Africa/Addis Ababa": {
            "TzName": "Africa/Addis Ababa",
            "TzValue": "EAT-3"
          },
          "Africa/Brazzaville": {
            "TzName": "Africa/Brazzaville",
            "TzValue": "WAT-1"
          },
          "Africa/Ouagadougou": {
            "TzName": "Africa/Ouagadougou",
            "TzValue": "GMT0"
          },
          "America/Costa Rica": {
            "TzName": "America/Costa Rica",
            "TzValue": "CST6"
          },
          "America/Grand Turk": {
            "TzName": "America/Grand Turk",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Guadeloupe": {
            "TzName": "America/Guadeloupe",
            "TzValue": "AST4"
          },
          "America/Hermosillo": {
            "TzName": "America/Hermosillo",
            "TzValue": "MST7"
          },
          "America/Martinique": {
            "TzName": "America/Martinique",
            "TzValue": "AST4"
          },
          "America/Montevideo": {
            "TzName": "America/Montevideo",
            "TzValue": "UYT3UYST,M10.1.0,M3.2.0"
          },
          "America/Montserrat": {
            "TzName": "America/Montserrat",
            "TzValue": "AST4"
          },
          "America/Paramaribo": {
            "TzName": "America/Paramaribo",
            "TzValue": "SRT3"
          },
          "America/Rio Branco": {
            "TzName": "America/Rio Branco",
            "TzValue": "AMT4"
          },
          "America/St Vincent": {
            "TzName": "America/St Vincent",
            "TzValue": "AST4"
          },
          "America/Whitehorse": {
            "TzName": "America/Whitehorse",
            "TzValue": "PST8PDT,M3.2.0,M11.1.0"
          },
          "Antarctica/McMurdo": {
            "TzName": "Antarctica/McMurdo",
            "TzValue": "NZST-12NZDT,M9.5.0,M4.1.0/3"
          },
          "Antarctica/Rothera": {
            "TzName": "Antarctica/Rothera",
            "TzValue": "ROTT3"
          },
          "Asia/Yekaterinburg": {
            "TzName": "Asia/Yekaterinburg",
            "TzValue": "YEKT-5YEKST,M3.5.0,M10.5.0/3"
          },
          "Atlantic/Reykjavik": {
            "TzName": "Atlantic/Reykjavik",
            "TzValue": "GMT0"
          },
          "Atlantic/St Helena": {
            "TzName": "Atlantic/St Helena",
            "TzValue": "GMT0"
          },
          "Australia/Adelaide": {
            "TzName": "Australia/Adelaide",
            "TzValue": "CST-9:30CST,M10.1.0,M4.1.0/3"
          },
          "Australia/Brisbane": {
            "TzName": "Australia/Brisbane",
            "TzValue": "EST-10"
          },
          "Australia/Lindeman": {
            "TzName": "Australia/Lindeman",
            "TzValue": "EST-10"
          },
          "Europe/Isle of Man": {
            "TzName": "Europe/Isle of Man",
            "TzValue": "GMT0BST,M3.5.0/1,M10.5.0"
          },
          "Europe/Kaliningrad": {
            "TzName": "Europe/Kaliningrad",
            "TzValue": "EET-2EEST,M3.5.0,M10.5.0/3"
          },
          "Pacific/Kiritimati": {
            "TzName": "Pacific/Kiritimati",
            "TzValue": "LINT-14"
          },
          "Africa/Johannesburg": {
            "TzName": "Africa/Johannesburg",
            "TzValue": "SAST-2"
          },
          "America/El Salvador": {
            "TzName": "America/El Salvador",
            "TzValue": "CST6"
          },
          "America/Los Angeles": {
            "TzName": "America/Los Angeles",
            "TzValue": "PST8PDT,M3.2.0,M11.1.0"
          },
          "America/Mexico City": {
            "TzName": "America/Mexico City",
            "TzValue": "CST6CDT,M4.1.0,M10.5.0"
          },
          "America/Pangnirtung": {
            "TzName": "America/Pangnirtung",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Porto Velho": {
            "TzName": "America/Porto Velho",
            "TzValue": "AMT4"
          },
          "America/Puerto Rico": {
            "TzName": "America/Puerto Rico",
            "TzValue": "AST4"
          },
          "America/Rainy River": {
            "TzName": "America/Rainy River",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "America/Tegucigalpa": {
            "TzName": "America/Tegucigalpa",
            "TzValue": "CST6"
          },
          "America/Thunder Bay": {
            "TzName": "America/Thunder Bay",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Yellowknife": {
            "TzName": "America/Yellowknife",
            "TzValue": "MST7MDT,M3.2.0,M11.1.0"
          },
          "Arctic/Longyearbyen": {
            "TzName": "Arctic/Longyearbyen",
            "TzValue": "CET-1CEST,M3.5.0,M10.5.0/3"
          },
          "Atlantic/Cape Verde": {
            "TzName": "Atlantic/Cape Verde",
            "TzValue": "CVT1"
          },
          "Australia/Lord Howe": {
            "TzName": "Australia/Lord Howe",
            "TzValue": "LHST-10:30LHST-11,M10.1.0,M4.1.0"
          },
          "Australia/Melbourne": {
            "TzName": "Australia/Melbourne",
            "TzValue": "EST-10EST,M10.1.0,M4.1.0/3"
          },
          "Indian/Antananarivo": {
            "TzName": "Indian/Antananarivo",
            "TzValue": "EAT-3"
          },
          "Pacific/Guadalcanal": {
            "TzName": "Pacific/Guadalcanal",
            "TzValue": "SBT-11"
          },
          "Africa/Dar es Salaam": {
            "TzName": "Africa/Dar es Salaam",
            "TzValue": "EAT-3"
          },
          "America/Blanc-Sablon": {
            "TzName": "America/Blanc-Sablon",
            "TzValue": "AST4"
          },
          "America/Campo Grande": {
            "TzName": "America/Campo Grande",
            "TzValue": "AMT4AMST,M10.3.0/0,M2.3.0/0"
          },
          "America/Danmarkshavn": {
            "TzName": "America/Danmarkshavn",
            "TzValue": "GMT0"
          },
          "America/Dawson Creek": {
            "TzName": "America/Dawson Creek",
            "TzValue": "MST7"
          },
          "America/Indiana/Knox": {
            "TzName": "America/Indiana/Knox",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "America/Rankin Inlet": {
            "TzName": "America/Rankin Inlet",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "America/Santa Isabel": {
            "TzName": "America/Santa Isabel",
            "TzValue": "PST8PDT,M4.1.0,M10.5.0"
          },
          "America/Scoresbysund": {
            "TzName": "America/Scoresbysund",
            "TzValue": "EGT1EGST,M3.5.0/0,M10.5.0/1"
          },
          "Antarctica/Macquarie": {
            "TzName": "Antarctica/Macquarie",
            "TzValue": "MIST-11"
          },
          "Pacific/Port Moresby": {
            "TzName": "Pacific/Port Moresby",
            "TzValue": "PGT-10"
          },
          "America/Cambridge Bay": {
            "TzName": "America/Cambridge Bay",
            "TzValue": "MST7MDT,M3.2.0,M11.1.0"
          },
          "America/Indiana/Vevay": {
            "TzName": "America/Indiana/Vevay",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Port of Spain": {
            "TzName": "America/Port of Spain",
            "TzValue": "AST4"
          },
          "America/Santo Domingo": {
            "TzName": "America/Santo Domingo",
            "TzValue": "AST4"
          },
          "America/St Barthelemy": {
            "TzName": "America/St Barthelemy",
            "TzValue": "AST4"
          },
          "America/Swift Current": {
            "TzName": "America/Swift Current",
            "TzValue": "CST6"
          },
          "Antarctica/South Pole": {
            "TzName": "Antarctica/South Pole",
            "TzValue": "NZST-12NZDT,M9.5.0,M4.1.0/3"
          },
          "Australia/Broken Hill": {
            "TzName": "Australia/Broken Hill",
            "TzValue": "CST-9:30CST,M10.1.0,M4.1.0/3"
          },
          "America/Port-au-Prince": {
            "TzName": "America/Port-au-Prince",
            "TzValue": "EST5"
          },
          "Atlantic/South Georgia": {
            "TzName": "Atlantic/South Georgia",
            "TzValue": "GST2"
          },
          "America/Argentina/Jujuy": {
            "TzName": "America/Argentina/Jujuy",
            "TzValue": "ART3"
          },
          "America/Argentina/Salta": {
            "TzName": "America/Argentina/Salta",
            "TzValue": "ART3"
          },
          "America/Indiana/Marengo": {
            "TzName": "America/Indiana/Marengo",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Indiana/Winamac": {
            "TzName": "America/Indiana/Winamac",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Argentina/Cordoba": {
            "TzName": "America/Argentina/Cordoba",
            "TzValue": "ART3"
          },
          "America/Argentina/Mendoza": {
            "TzName": "America/Argentina/Mendoza",
            "TzValue": "ART3"
          },
          "America/Argentina/Tucuman": {
            "TzName": "America/Argentina/Tucuman",
            "TzValue": "ART3"
          },
          "America/Argentina/Ushuaia": {
            "TzName": "America/Argentina/Ushuaia",
            "TzValue": "ART3"
          },
          "America/Indiana/Tell City": {
            "TzName": "America/Indiana/Tell City",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "America/Indiana/Vincennes": {
            "TzName": "America/Indiana/Vincennes",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "Antarctica/DumontDUrville": {
            "TzName": "Antarctica/DumontDUrville",
            "TzValue": "DDUT-10"
          },
          "America/Argentina/La Rioja": {
            "TzName": "America/Argentina/La Rioja",
            "TzValue": "ART3"
          },
          "America/Argentina/San Juan": {
            "TzName": "America/Argentina/San Juan",
            "TzValue": "ART3"
          },
          "America/Indiana/Petersburg": {
            "TzName": "America/Indiana/Petersburg",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Argentina/Catamarca": {
            "TzName": "America/Argentina/Catamarca",
            "TzValue": "ART3"
          },
          "America/Kentucky/Louisville": {
            "TzName": "America/Kentucky/Louisville",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Kentucky/Monticello": {
            "TzName": "America/Kentucky/Monticello",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/North Dakota/Center": {
            "TzName": "America/North Dakota/Center",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          },
          "America/Indiana/Indianapolis": {
            "TzName": "America/Indiana/Indianapolis",
            "TzValue": "EST5EDT,M3.2.0,M11.1.0"
          },
          "America/Argentina/Buenos Aires": {
            "TzName": "America/Argentina/Buenos Aires",
            "TzValue": "ART3"
          },
          "America/Argentina/Rio Gallegos": {
            "TzName": "America/Argentina/Rio Gallegos",
            "TzValue": "ART3"
          },
          "America/North Dakota/New Salem": {
            "TzName": "America/North Dakota/New Salem",
            "TzValue": "CST6CDT,M3.2.0,M11.1.0"
          }
        },
        "mandatory": true,
        "valueEnums": [{
          "value": "Africa/Abidjan",
          "displayName": "Africa/Abidjan"
        }, {
          "value": "Africa/Accra",
          "displayName": "Africa/Accra"
        }, {
          "value": "Africa/Addis Ababa",
          "displayName": "Africa/Addis Ababa"
        }, {
          "value": "Africa/Algiers",
          "displayName": "Africa/Algiers"
        }, {
          "value": "Africa/Asmara",
          "displayName": "Africa/Asmara"
        }, {
          "value": "Africa/Bamako",
          "displayName": "Africa/Bamako"
        }, {
          "value": "Africa/Bangui",
          "displayName": "Africa/Bangui"
        }, {
          "value": "Africa/Banjul",
          "displayName": "Africa/Banjul"
        }, {
          "value": "Africa/Bissau",
          "displayName": "Africa/Bissau"
        }, {
          "value": "Africa/Blantyre",
          "displayName": "Africa/Blantyre"
        }, {
          "value": "Africa/Brazzaville",
          "displayName": "Africa/Brazzaville"
        }, {
          "value": "Africa/Bujumbura",
          "displayName": "Africa/Bujumbura"
        }, {
          "value": "Africa/Casablanca",
          "displayName": "Africa/Casablanca"
        }, {
          "value": "Africa/Ceuta",
          "displayName": "Africa/Ceuta"
        }, {
          "value": "Africa/Conakry",
          "displayName": "Africa/Conakry"
        }, {
          "value": "Africa/Dakar",
          "displayName": "Africa/Dakar"
        }, {
          "value": "Africa/Dar es Salaam",
          "displayName": "Africa/Dar es Salaam"
        }, {
          "value": "Africa/Djibouti",
          "displayName": "Africa/Djibouti"
        }, {
          "value": "Africa/Douala",
          "displayName": "Africa/Douala"
        }, {
          "value": "Africa/El Aaiun",
          "displayName": "Africa/El Aaiun"
        }, {
          "value": "Africa/Freetown",
          "displayName": "Africa/Freetown"
        }, {
          "value": "Africa/Gaborone",
          "displayName": "Africa/Gaborone"
        }, {
          "value": "Africa/Harare",
          "displayName": "Africa/Harare"
        }, {
          "value": "Africa/Johannesburg",
          "displayName": "Africa/Johannesburg"
        }, {
          "value": "Africa/Kampala",
          "displayName": "Africa/Kampala"
        }, {
          "value": "Africa/Khartoum",
          "displayName": "Africa/Khartoum"
        }, {
          "value": "Africa/Kigali",
          "displayName": "Africa/Kigali"
        }, {
          "value": "Africa/Kinshasa",
          "displayName": "Africa/Kinshasa"
        }, {
          "value": "Africa/Lagos",
          "displayName": "Africa/Lagos"
        }, {
          "value": "Africa/Libreville",
          "displayName": "Africa/Libreville"
        }, {
          "value": "Africa/Lome",
          "displayName": "Africa/Lome"
        }, {
          "value": "Africa/Luanda",
          "displayName": "Africa/Luanda"
        }, {
          "value": "Africa/Lubumbashi",
          "displayName": "Africa/Lubumbashi"
        }, {
          "value": "Africa/Lusaka",
          "displayName": "Africa/Lusaka"
        }, {
          "value": "Africa/Malabo",
          "displayName": "Africa/Malabo"
        }, {
          "value": "Africa/Maputo",
          "displayName": "Africa/Maputo"
        }, {
          "value": "Africa/Maseru",
          "displayName": "Africa/Maseru"
        }, {
          "value": "Africa/Mbabane",
          "displayName": "Africa/Mbabane"
        }, {
          "value": "Africa/Mogadishu",
          "displayName": "Africa/Mogadishu"
        }, {
          "value": "Africa/Monrovia",
          "displayName": "Africa/Monrovia"
        }, {
          "value": "Africa/Nairobi",
          "displayName": "Africa/Nairobi"
        }, {
          "value": "Africa/Ndjamena",
          "displayName": "Africa/Ndjamena"
        }, {
          "value": "Africa/Niamey",
          "displayName": "Africa/Niamey"
        }, {
          "value": "Africa/Nouakchott",
          "displayName": "Africa/Nouakchott"
        }, {
          "value": "Africa/Ouagadougou",
          "displayName": "Africa/Ouagadougou"
        }, {
          "value": "Africa/Porto-Novo",
          "displayName": "Africa/Porto-Novo"
        }, {
          "value": "Africa/Sao Tome",
          "displayName": "Africa/Sao Tome"
        }, {
          "value": "Africa/Tripoli",
          "displayName": "Africa/Tripoli"
        }, {
          "value": "Africa/Tunis",
          "displayName": "Africa/Tunis"
        }, {
          "value": "Africa/Windhoek",
          "displayName": "Africa/Windhoek"
        }, {
          "value": "America/Adak",
          "displayName": "America/Adak"
        }, {
          "value": "America/Anchorage",
          "displayName": "America/Anchorage"
        }, {
          "value": "America/Anguilla",
          "displayName": "America/Anguilla"
        }, {
          "value": "America/Antigua",
          "displayName": "America/Antigua"
        }, {
          "value": "America/Araguaina",
          "displayName": "America/Araguaina"
        }, {
          "value": "America/Argentina/Buenos Aires",
          "displayName": "America/Argentina/Buenos Aires"
        }, {
          "value": "America/Argentina/Catamarca",
          "displayName": "America/Argentina/Catamarca"
        }, {
          "value": "America/Argentina/Cordoba",
          "displayName": "America/Argentina/Cordoba"
        }, {
          "value": "America/Argentina/Jujuy",
          "displayName": "America/Argentina/Jujuy"
        }, {
          "value": "America/Argentina/La Rioja",
          "displayName": "America/Argentina/La Rioja"
        }, {
          "value": "America/Argentina/Mendoza",
          "displayName": "America/Argentina/Mendoza"
        }, {
          "value": "America/Argentina/Rio Gallegos",
          "displayName": "America/Argentina/Rio Gallegos"
        }, {
          "value": "America/Argentina/Salta",
          "displayName": "America/Argentina/Salta"
        }, {
          "value": "America/Argentina/San Juan",
          "displayName": "America/Argentina/San Juan"
        }, {
          "value": "America/Argentina/Tucuman",
          "displayName": "America/Argentina/Tucuman"
        }, {
          "value": "America/Argentina/Ushuaia",
          "displayName": "America/Argentina/Ushuaia"
        }, {
          "value": "America/Aruba",
          "displayName": "America/Aruba"
        }, {
          "value": "America/Asuncion",
          "displayName": "America/Asuncion"
        }, {
          "value": "America/Atikokan",
          "displayName": "America/Atikokan"
        }, {
          "value": "America/Bahia",
          "displayName": "America/Bahia"
        }, {
          "value": "America/Barbados",
          "displayName": "America/Barbados"
        }, {
          "value": "America/Belem",
          "displayName": "America/Belem"
        }, {
          "value": "America/Belize",
          "displayName": "America/Belize"
        }, {
          "value": "America/Blanc-Sablon",
          "displayName": "America/Blanc-Sablon"
        }, {
          "value": "America/Boa Vista",
          "displayName": "America/Boa Vista"
        }, {
          "value": "America/Bogota",
          "displayName": "America/Bogota"
        }, {
          "value": "America/Boise",
          "displayName": "America/Boise"
        }, {
          "value": "America/Cambridge Bay",
          "displayName": "America/Cambridge Bay"
        }, {
          "value": "America/Campo Grande",
          "displayName": "America/Campo Grande"
        }, {
          "value": "America/Cancun",
          "displayName": "America/Cancun"
        }, {
          "value": "America/Caracas",
          "displayName": "America/Caracas"
        }, {
          "value": "America/Cayenne",
          "displayName": "America/Cayenne"
        }, {
          "value": "America/Cayman",
          "displayName": "America/Cayman"
        }, {
          "value": "America/Chicago",
          "displayName": "America/Chicago"
        }, {
          "value": "America/Chihuahua",
          "displayName": "America/Chihuahua"
        }, {
          "value": "America/Costa Rica",
          "displayName": "America/Costa Rica"
        }, {
          "value": "America/Cuiaba",
          "displayName": "America/Cuiaba"
        }, {
          "value": "America/Curacao",
          "displayName": "America/Curacao"
        }, {
          "value": "America/Danmarkshavn",
          "displayName": "America/Danmarkshavn"
        }, {
          "value": "America/Dawson",
          "displayName": "America/Dawson"
        }, {
          "value": "America/Dawson Creek",
          "displayName": "America/Dawson Creek"
        }, {
          "value": "America/Denver",
          "displayName": "America/Denver"
        }, {
          "value": "America/Detroit",
          "displayName": "America/Detroit"
        }, {
          "value": "America/Dominica",
          "displayName": "America/Dominica"
        }, {
          "value": "America/Edmonton",
          "displayName": "America/Edmonton"
        }, {
          "value": "America/Eirunepe",
          "displayName": "America/Eirunepe"
        }, {
          "value": "America/El Salvador",
          "displayName": "America/El Salvador"
        }, {
          "value": "America/Fortaleza",
          "displayName": "America/Fortaleza"
        }, {
          "value": "America/Glace Bay",
          "displayName": "America/Glace Bay"
        }, {
          "value": "America/Goose Bay",
          "displayName": "America/Goose Bay"
        }, {
          "value": "America/Grand Turk",
          "displayName": "America/Grand Turk"
        }, {
          "value": "America/Grenada",
          "displayName": "America/Grenada"
        }, {
          "value": "America/Guadeloupe",
          "displayName": "America/Guadeloupe"
        }, {
          "value": "America/Guatemala",
          "displayName": "America/Guatemala"
        }, {
          "value": "America/Guayaquil",
          "displayName": "America/Guayaquil"
        }, {
          "value": "America/Guyana",
          "displayName": "America/Guyana"
        }, {
          "value": "America/Halifax",
          "displayName": "America/Halifax"
        }, {
          "value": "America/Havana",
          "displayName": "America/Havana"
        }, {
          "value": "America/Hermosillo",
          "displayName": "America/Hermosillo"
        }, {
          "value": "America/Indiana/Indianapolis",
          "displayName": "America/Indiana/Indianapolis"
        }, {
          "value": "America/Indiana/Knox",
          "displayName": "America/Indiana/Knox"
        }, {
          "value": "America/Indiana/Marengo",
          "displayName": "America/Indiana/Marengo"
        }, {
          "value": "America/Indiana/Petersburg",
          "displayName": "America/Indiana/Petersburg"
        }, {
          "value": "America/Indiana/Tell City",
          "displayName": "America/Indiana/Tell City"
        }, {
          "value": "America/Indiana/Vevay",
          "displayName": "America/Indiana/Vevay"
        }, {
          "value": "America/Indiana/Vincennes",
          "displayName": "America/Indiana/Vincennes"
        }, {
          "value": "America/Indiana/Winamac",
          "displayName": "America/Indiana/Winamac"
        }, {
          "value": "America/Inuvik",
          "displayName": "America/Inuvik"
        }, {
          "value": "America/Iqaluit",
          "displayName": "America/Iqaluit"
        }, {
          "value": "America/Jamaica",
          "displayName": "America/Jamaica"
        }, {
          "value": "America/Juneau",
          "displayName": "America/Juneau"
        }, {
          "value": "America/Kentucky/Louisville",
          "displayName": "America/Kentucky/Louisville"
        }, {
          "value": "America/Kentucky/Monticello",
          "displayName": "America/Kentucky/Monticello"
        }, {
          "value": "America/La Paz",
          "displayName": "America/La Paz"
        }, {
          "value": "America/Lima",
          "displayName": "America/Lima"
        }, {
          "value": "America/Los Angeles",
          "displayName": "America/Los Angeles"
        }, {
          "value": "America/Maceio",
          "displayName": "America/Maceio"
        }, {
          "value": "America/Managua",
          "displayName": "America/Managua"
        }, {
          "value": "America/Manaus",
          "displayName": "America/Manaus"
        }, {
          "value": "America/Marigot",
          "displayName": "America/Marigot"
        }, {
          "value": "America/Martinique",
          "displayName": "America/Martinique"
        }, {
          "value": "America/Matamoros",
          "displayName": "America/Matamoros"
        }, {
          "value": "America/Mazatlan",
          "displayName": "America/Mazatlan"
        }, {
          "value": "America/Menominee",
          "displayName": "America/Menominee"
        }, {
          "value": "America/Merida",
          "displayName": "America/Merida"
        }, {
          "value": "America/Mexico City",
          "displayName": "America/Mexico City"
        }, {
          "value": "America/Miquelon",
          "displayName": "America/Miquelon"
        }, {
          "value": "America/Moncton",
          "displayName": "America/Moncton"
        }, {
          "value": "America/Monterrey",
          "displayName": "America/Monterrey"
        }, {
          "value": "America/Montevideo",
          "displayName": "America/Montevideo"
        }, {
          "value": "America/Montreal",
          "displayName": "America/Montreal"
        }, {
          "value": "America/Montserrat",
          "displayName": "America/Montserrat"
        }, {
          "value": "America/Nassau",
          "displayName": "America/Nassau"
        }, {
          "value": "America/New York",
          "displayName": "America/New York"
        }, {
          "value": "America/Nipigon",
          "displayName": "America/Nipigon"
        }, {
          "value": "America/Nome",
          "displayName": "America/Nome"
        }, {
          "value": "America/Noronha",
          "displayName": "America/Noronha"
        }, {
          "value": "America/North Dakota/Center",
          "displayName": "America/North Dakota/Center"
        }, {
          "value": "America/North Dakota/New Salem",
          "displayName": "America/North Dakota/New Salem"
        }, {
          "value": "America/Ojinaga",
          "displayName": "America/Ojinaga"
        }, {
          "value": "America/Panama",
          "displayName": "America/Panama"
        }, {
          "value": "America/Pangnirtung",
          "displayName": "America/Pangnirtung"
        }, {
          "value": "America/Paramaribo",
          "displayName": "America/Paramaribo"
        }, {
          "value": "America/Phoenix",
          "displayName": "America/Phoenix"
        }, {
          "value": "America/Port of Spain",
          "displayName": "America/Port of Spain"
        }, {
          "value": "America/Port-au-Prince",
          "displayName": "America/Port-au-Prince"
        }, {
          "value": "America/Porto Velho",
          "displayName": "America/Porto Velho"
        }, {
          "value": "America/Puerto Rico",
          "displayName": "America/Puerto Rico"
        }, {
          "value": "America/Rainy River",
          "displayName": "America/Rainy River"
        }, {
          "value": "America/Rankin Inlet",
          "displayName": "America/Rankin Inlet"
        }, {
          "value": "America/Recife",
          "displayName": "America/Recife"
        }, {
          "value": "America/Regina",
          "displayName": "America/Regina"
        }, {
          "value": "America/Rio Branco",
          "displayName": "America/Rio Branco"
        }, {
          "value": "America/Santa Isabel",
          "displayName": "America/Santa Isabel"
        }, {
          "value": "America/Santarem",
          "displayName": "America/Santarem"
        }, {
          "value": "America/Santo Domingo",
          "displayName": "America/Santo Domingo"
        }, {
          "value": "America/Sao Paulo",
          "displayName": "America/Sao Paulo"
        }, {
          "value": "America/Scoresbysund",
          "displayName": "America/Scoresbysund"
        }, {
          "value": "America/Shiprock",
          "displayName": "America/Shiprock"
        }, {
          "value": "America/St Barthelemy",
          "displayName": "America/St Barthelemy"
        }, {
          "value": "America/St Johns",
          "displayName": "America/St Johns"
        }, {
          "value": "America/St Kitts",
          "displayName": "America/St Kitts"
        }, {
          "value": "America/St Lucia",
          "displayName": "America/St Lucia"
        }, {
          "value": "America/St Thomas",
          "displayName": "America/St Thomas"
        }, {
          "value": "America/St Vincent",
          "displayName": "America/St Vincent"
        }, {
          "value": "America/Swift Current",
          "displayName": "America/Swift Current"
        }, {
          "value": "America/Tegucigalpa",
          "displayName": "America/Tegucigalpa"
        }, {
          "value": "America/Thule",
          "displayName": "America/Thule"
        }, {
          "value": "America/Thunder Bay",
          "displayName": "America/Thunder Bay"
        }, {
          "value": "America/Tijuana",
          "displayName": "America/Tijuana"
        }, {
          "value": "America/Toronto",
          "displayName": "America/Toronto"
        }, {
          "value": "America/Tortola",
          "displayName": "America/Tortola"
        }, {
          "value": "America/Vancouver",
          "displayName": "America/Vancouver"
        }, {
          "value": "America/Whitehorse",
          "displayName": "America/Whitehorse"
        }, {
          "value": "America/Winnipeg",
          "displayName": "America/Winnipeg"
        }, {
          "value": "America/Yakutat",
          "displayName": "America/Yakutat"
        }, {
          "value": "America/Yellowknife",
          "displayName": "America/Yellowknife"
        }, {
          "value": "Antarctica/Casey",
          "displayName": "Antarctica/Casey"
        }, {
          "value": "Antarctica/Davis",
          "displayName": "Antarctica/Davis"
        }, {
          "value": "Antarctica/DumontDUrville",
          "displayName": "Antarctica/DumontDUrville"
        }, {
          "value": "Antarctica/Macquarie",
          "displayName": "Antarctica/Macquarie"
        }, {
          "value": "Antarctica/Mawson",
          "displayName": "Antarctica/Mawson"
        }, {
          "value": "Antarctica/McMurdo",
          "displayName": "Antarctica/McMurdo"
        }, {
          "value": "Antarctica/Rothera",
          "displayName": "Antarctica/Rothera"
        }, {
          "value": "Antarctica/South Pole",
          "displayName": "Antarctica/South Pole"
        }, {
          "value": "Antarctica/Syowa",
          "displayName": "Antarctica/Syowa"
        }, {
          "value": "Antarctica/Vostok",
          "displayName": "Antarctica/Vostok"
        }, {
          "value": "Arctic/Longyearbyen",
          "displayName": "Arctic/Longyearbyen"
        }, {
          "value": "Asia/Aden",
          "displayName": "Asia/Aden"
        }, {
          "value": "Asia/Almaty",
          "displayName": "Asia/Almaty"
        }, {
          "value": "Asia/Anadyr",
          "displayName": "Asia/Anadyr"
        }, {
          "value": "Asia/Aqtau",
          "displayName": "Asia/Aqtau"
        }, {
          "value": "Asia/Aqtobe",
          "displayName": "Asia/Aqtobe"
        }, {
          "value": "Asia/Ashgabat",
          "displayName": "Asia/Ashgabat"
        }, {
          "value": "Asia/Baghdad",
          "displayName": "Asia/Baghdad"
        }, {
          "value": "Asia/Bahrain",
          "displayName": "Asia/Bahrain"
        }, {
          "value": "Asia/Baku",
          "displayName": "Asia/Baku"
        }, {
          "value": "Asia/Bangkok",
          "displayName": "Asia/Bangkok"
        }, {
          "value": "Asia/Beirut",
          "displayName": "Asia/Beirut"
        }, {
          "value": "Asia/Bishkek",
          "displayName": "Asia/Bishkek"
        }, {
          "value": "Asia/Brunei",
          "displayName": "Asia/Brunei"
        }, {
          "value": "Asia/Choibalsan",
          "displayName": "Asia/Choibalsan"
        }, {
          "value": "Asia/Chongqing",
          "displayName": "Asia/Chongqing"
        }, {
          "value": "Asia/Colombo",
          "displayName": "Asia/Colombo"
        }, {
          "value": "Asia/Damascus",
          "displayName": "Asia/Damascus"
        }, {
          "value": "Asia/Dhaka",
          "displayName": "Asia/Dhaka"
        }, {
          "value": "Asia/Dili",
          "displayName": "Asia/Dili"
        }, {
          "value": "Asia/Dubai",
          "displayName": "Asia/Dubai"
        }, {
          "value": "Asia/Dushanbe",
          "displayName": "Asia/Dushanbe"
        }, {
          "value": "Asia/Gaza",
          "displayName": "Asia/Gaza"
        }, {
          "value": "Asia/Harbin",
          "displayName": "Asia/Harbin"
        }, {
          "value": "Asia/Ho Chi Minh",
          "displayName": "Asia/Ho Chi Minh"
        }, {
          "value": "Asia/Hong Kong",
          "displayName": "Asia/Hong Kong"
        }, {
          "value": "Asia/Hovd",
          "displayName": "Asia/Hovd"
        }, {
          "value": "Asia/Irkutsk",
          "displayName": "Asia/Irkutsk"
        }, {
          "value": "Asia/Jakarta",
          "displayName": "Asia/Jakarta"
        }, {
          "value": "Asia/Jayapura",
          "displayName": "Asia/Jayapura"
        }, {
          "value": "Asia/Kabul",
          "displayName": "Asia/Kabul"
        }, {
          "value": "Asia/Kamchatka",
          "displayName": "Asia/Kamchatka"
        }, {
          "value": "Asia/Karachi",
          "displayName": "Asia/Karachi"
        }, {
          "value": "Asia/Kashgar",
          "displayName": "Asia/Kashgar"
        }, {
          "value": "Asia/Kathmandu",
          "displayName": "Asia/Kathmandu"
        }, {
          "value": "Asia/Kolkata",
          "displayName": "Asia/Kolkata"
        }, {
          "value": "Asia/Krasnoyarsk",
          "displayName": "Asia/Krasnoyarsk"
        }, {
          "value": "Asia/Kuala Lumpur",
          "displayName": "Asia/Kuala Lumpur"
        }, {
          "value": "Asia/Kuching",
          "displayName": "Asia/Kuching"
        }, {
          "value": "Asia/Kuwait",
          "displayName": "Asia/Kuwait"
        }, {
          "value": "Asia/Macau",
          "displayName": "Asia/Macau"
        }, {
          "value": "Asia/Magadan",
          "displayName": "Asia/Magadan"
        }, {
          "value": "Asia/Makassar",
          "displayName": "Asia/Makassar"
        }, {
          "value": "Asia/Manila",
          "displayName": "Asia/Manila"
        }, {
          "value": "Asia/Muscat",
          "displayName": "Asia/Muscat"
        }, {
          "value": "Asia/Nicosia",
          "displayName": "Asia/Nicosia"
        }, {
          "value": "Asia/Novokuznetsk",
          "displayName": "Asia/Novokuznetsk"
        }, {
          "value": "Asia/Novosibirsk",
          "displayName": "Asia/Novosibirsk"
        }, {
          "value": "Asia/Omsk",
          "displayName": "Asia/Omsk"
        }, {
          "value": "Asia/Oral",
          "displayName": "Asia/Oral"
        }, {
          "value": "Asia/Phnom Penh",
          "displayName": "Asia/Phnom Penh"
        }, {
          "value": "Asia/Pontianak",
          "displayName": "Asia/Pontianak"
        }, {
          "value": "Asia/Pyongyang",
          "displayName": "Asia/Pyongyang"
        }, {
          "value": "Asia/Qatar",
          "displayName": "Asia/Qatar"
        }, {
          "value": "Asia/Qyzylorda",
          "displayName": "Asia/Qyzylorda"
        }, {
          "value": "Asia/Rangoon",
          "displayName": "Asia/Rangoon"
        }, {
          "value": "Asia/Riyadh",
          "displayName": "Asia/Riyadh"
        }, {
          "value": "Asia/Sakhalin",
          "displayName": "Asia/Sakhalin"
        }, {
          "value": "Asia/Samarkand",
          "displayName": "Asia/Samarkand"
        }, {
          "value": "Asia/Seoul",
          "displayName": "Asia/Seoul"
        }, {
          "value": "Asia/Shanghai",
          "displayName": "Asia/Shanghai"
        }, {
          "value": "Asia/Singapore",
          "displayName": "Asia/Singapore"
        }, {
          "value": "Asia/Taipei",
          "displayName": "Asia/Taipei"
        }, {
          "value": "Asia/Tashkent",
          "displayName": "Asia/Tashkent"
        }, {
          "value": "Asia/Tbilisi",
          "displayName": "Asia/Tbilisi"
        }, {
          "value": "Asia/Tehran",
          "displayName": "Asia/Tehran"
        }, {
          "value": "Asia/Thimphu",
          "displayName": "Asia/Thimphu"
        }, {
          "value": "Asia/Tokyo",
          "displayName": "Asia/Tokyo"
        }, {
          "value": "Asia/Ulaanbaatar",
          "displayName": "Asia/Ulaanbaatar"
        }, {
          "value": "Asia/Urumqi",
          "displayName": "Asia/Urumqi"
        }, {
          "value": "Asia/Vientiane",
          "displayName": "Asia/Vientiane"
        }, {
          "value": "Asia/Vladivostok",
          "displayName": "Asia/Vladivostok"
        }, {
          "value": "Asia/Yakutsk",
          "displayName": "Asia/Yakutsk"
        }, {
          "value": "Asia/Yekaterinburg",
          "displayName": "Asia/Yekaterinburg"
        }, {
          "value": "Asia/Yerevan",
          "displayName": "Asia/Yerevan"
        }, {
          "value": "Atlantic/Azores",
          "displayName": "Atlantic/Azores"
        }, {
          "value": "Atlantic/Bermuda",
          "displayName": "Atlantic/Bermuda"
        }, {
          "value": "Atlantic/Canary",
          "displayName": "Atlantic/Canary"
        }, {
          "value": "Atlantic/Cape Verde",
          "displayName": "Atlantic/Cape Verde"
        }, {
          "value": "Atlantic/Faroe",
          "displayName": "Atlantic/Faroe"
        }, {
          "value": "Atlantic/Madeira",
          "displayName": "Atlantic/Madeira"
        }, {
          "value": "Atlantic/Reykjavik",
          "displayName": "Atlantic/Reykjavik"
        }, {
          "value": "Atlantic/South Georgia",
          "displayName": "Atlantic/South Georgia"
        }, {
          "value": "Atlantic/St Helena",
          "displayName": "Atlantic/St Helena"
        }, {
          "value": "Atlantic/Stanley",
          "displayName": "Atlantic/Stanley"
        }, {
          "value": "Australia/Adelaide",
          "displayName": "Australia/Adelaide"
        }, {
          "value": "Australia/Brisbane",
          "displayName": "Australia/Brisbane"
        }, {
          "value": "Australia/Broken Hill",
          "displayName": "Australia/Broken Hill"
        }, {
          "value": "Australia/Currie",
          "displayName": "Australia/Currie"
        }, {
          "value": "Australia/Darwin",
          "displayName": "Australia/Darwin"
        }, {
          "value": "Australia/Eucla",
          "displayName": "Australia/Eucla"
        }, {
          "value": "Australia/Hobart",
          "displayName": "Australia/Hobart"
        }, {
          "value": "Australia/Lindeman",
          "displayName": "Australia/Lindeman"
        }, {
          "value": "Australia/Lord Howe",
          "displayName": "Australia/Lord Howe"
        }, {
          "value": "Australia/Melbourne",
          "displayName": "Australia/Melbourne"
        }, {
          "value": "Australia/Perth",
          "displayName": "Australia/Perth"
        }, {
          "value": "Australia/Sydney",
          "displayName": "Australia/Sydney"
        }, {
          "value": "Europe/Amsterdam",
          "displayName": "Europe/Amsterdam"
        }, {
          "value": "Europe/Andorra",
          "displayName": "Europe/Andorra"
        }, {
          "value": "Europe/Athens",
          "displayName": "Europe/Athens"
        }, {
          "value": "Europe/Belgrade",
          "displayName": "Europe/Belgrade"
        }, {
          "value": "Europe/Berlin",
          "displayName": "Europe/Berlin"
        }, {
          "value": "Europe/Bratislava",
          "displayName": "Europe/Bratislava"
        }, {
          "value": "Europe/Brussels",
          "displayName": "Europe/Brussels"
        }, {
          "value": "Europe/Bucharest",
          "displayName": "Europe/Bucharest"
        }, {
          "value": "Europe/Budapest",
          "displayName": "Europe/Budapest"
        }, {
          "value": "Europe/Chisinau",
          "displayName": "Europe/Chisinau"
        }, {
          "value": "Europe/Copenhagen",
          "displayName": "Europe/Copenhagen"
        }, {
          "value": "Europe/Dublin",
          "displayName": "Europe/Dublin"
        }, {
          "value": "Europe/Gibraltar",
          "displayName": "Europe/Gibraltar"
        }, {
          "value": "Europe/Guernsey",
          "displayName": "Europe/Guernsey"
        }, {
          "value": "Europe/Helsinki",
          "displayName": "Europe/Helsinki"
        }, {
          "value": "Europe/Isle of Man",
          "displayName": "Europe/Isle of Man"
        }, {
          "value": "Europe/Istanbul",
          "displayName": "Europe/Istanbul"
        }, {
          "value": "Europe/Jersey",
          "displayName": "Europe/Jersey"
        }, {
          "value": "Europe/Kaliningrad",
          "displayName": "Europe/Kaliningrad"
        }, {
          "value": "Europe/Kiev",
          "displayName": "Europe/Kiev"
        }, {
          "value": "Europe/Lisbon",
          "displayName": "Europe/Lisbon"
        }, {
          "value": "Europe/Ljubljana",
          "displayName": "Europe/Ljubljana"
        }, {
          "value": "Europe/London",
          "displayName": "Europe/London"
        }, {
          "value": "Europe/Luxembourg",
          "displayName": "Europe/Luxembourg"
        }, {
          "value": "Europe/Madrid",
          "displayName": "Europe/Madrid"
        }, {
          "value": "Europe/Malta",
          "displayName": "Europe/Malta"
        }, {
          "value": "Europe/Mariehamn",
          "displayName": "Europe/Mariehamn"
        }, {
          "value": "Europe/Minsk",
          "displayName": "Europe/Minsk"
        }, {
          "value": "Europe/Monaco",
          "displayName": "Europe/Monaco"
        }, {
          "value": "Europe/Moscow",
          "displayName": "Europe/Moscow"
        }, {
          "value": "Europe/Oslo",
          "displayName": "Europe/Oslo"
        }, {
          "value": "Europe/Paris",
          "displayName": "Europe/Paris"
        }, {
          "value": "Europe/Podgorica",
          "displayName": "Europe/Podgorica"
        }, {
          "value": "Europe/Prague",
          "displayName": "Europe/Prague"
        }, {
          "value": "Europe/Riga",
          "displayName": "Europe/Riga"
        }, {
          "value": "Europe/Rome",
          "displayName": "Europe/Rome"
        }, {
          "value": "Europe/Samara",
          "displayName": "Europe/Samara"
        }, {
          "value": "Europe/San Marino",
          "displayName": "Europe/San Marino"
        }, {
          "value": "Europe/Sarajevo",
          "displayName": "Europe/Sarajevo"
        }, {
          "value": "Europe/Simferopol",
          "displayName": "Europe/Simferopol"
        }, {
          "value": "Europe/Skopje",
          "displayName": "Europe/Skopje"
        }, {
          "value": "Europe/Sofia",
          "displayName": "Europe/Sofia"
        }, {
          "value": "Europe/Stockholm",
          "displayName": "Europe/Stockholm"
        }, {
          "value": "Europe/Tallinn",
          "displayName": "Europe/Tallinn"
        }, {
          "value": "Europe/Tirane",
          "displayName": "Europe/Tirane"
        }, {
          "value": "Europe/Uzhgorod",
          "displayName": "Europe/Uzhgorod"
        }, {
          "value": "Europe/Vaduz",
          "displayName": "Europe/Vaduz"
        }, {
          "value": "Europe/Vatican",
          "displayName": "Europe/Vatican"
        }, {
          "value": "Europe/Vienna",
          "displayName": "Europe/Vienna"
        }, {
          "value": "Europe/Vilnius",
          "displayName": "Europe/Vilnius"
        }, {
          "value": "Europe/Volgograd",
          "displayName": "Europe/Volgograd"
        }, {
          "value": "Europe/Warsaw",
          "displayName": "Europe/Warsaw"
        }, {
          "value": "Europe/Zagreb",
          "displayName": "Europe/Zagreb"
        }, {
          "value": "Europe/Zaporozhye",
          "displayName": "Europe/Zaporozhye"
        }, {
          "value": "Europe/Zurich",
          "displayName": "Europe/Zurich"
        }, {
          "value": "Indian/Antananarivo",
          "displayName": "Indian/Antananarivo"
        }, {
          "value": "Indian/Chagos",
          "displayName": "Indian/Chagos"
        }, {
          "value": "Indian/Christmas",
          "displayName": "Indian/Christmas"
        }, {
          "value": "Indian/Cocos",
          "displayName": "Indian/Cocos"
        }, {
          "value": "Indian/Comoro",
          "displayName": "Indian/Comoro"
        }, {
          "value": "Indian/Kerguelen",
          "displayName": "Indian/Kerguelen"
        }, {
          "value": "Indian/Mahe",
          "displayName": "Indian/Mahe"
        }, {
          "value": "Indian/Maldives",
          "displayName": "Indian/Maldives"
        }, {
          "value": "Indian/Mauritius",
          "displayName": "Indian/Mauritius"
        }, {
          "value": "Indian/Mayotte",
          "displayName": "Indian/Mayotte"
        }, {
          "value": "Indian/Reunion",
          "displayName": "Indian/Reunion"
        }, {
          "value": "Pacific/Apia",
          "displayName": "Pacific/Apia"
        }, {
          "value": "Pacific/Auckland",
          "displayName": "Pacific/Auckland"
        }, {
          "value": "Pacific/Chatham",
          "displayName": "Pacific/Chatham"
        }, {
          "value": "Pacific/Efate",
          "displayName": "Pacific/Efate"
        }, {
          "value": "Pacific/Enderbury",
          "displayName": "Pacific/Enderbury"
        }, {
          "value": "Pacific/Fakaofo",
          "displayName": "Pacific/Fakaofo"
        }, {
          "value": "Pacific/Fiji",
          "displayName": "Pacific/Fiji"
        }, {
          "value": "Pacific/Funafuti",
          "displayName": "Pacific/Funafuti"
        }, {
          "value": "Pacific/Galapagos",
          "displayName": "Pacific/Galapagos"
        }, {
          "value": "Pacific/Gambier",
          "displayName": "Pacific/Gambier"
        }, {
          "value": "Pacific/Guadalcanal",
          "displayName": "Pacific/Guadalcanal"
        }, {
          "value": "Pacific/Guam",
          "displayName": "Pacific/Guam"
        }, {
          "value": "Pacific/Honolulu",
          "displayName": "Pacific/Honolulu"
        }, {
          "value": "Pacific/Johnston",
          "displayName": "Pacific/Johnston"
        }, {
          "value": "Pacific/Kiritimati",
          "displayName": "Pacific/Kiritimati"
        }, {
          "value": "Pacific/Kosrae",
          "displayName": "Pacific/Kosrae"
        }, {
          "value": "Pacific/Kwajalein",
          "displayName": "Pacific/Kwajalein"
        }, {
          "value": "Pacific/Majuro",
          "displayName": "Pacific/Majuro"
        }, {
          "value": "Pacific/Marquesas",
          "displayName": "Pacific/Marquesas"
        }, {
          "value": "Pacific/Midway",
          "displayName": "Pacific/Midway"
        }, {
          "value": "Pacific/Nauru",
          "displayName": "Pacific/Nauru"
        }, {
          "value": "Pacific/Niue",
          "displayName": "Pacific/Niue"
        }, {
          "value": "Pacific/Norfolk",
          "displayName": "Pacific/Norfolk"
        }, {
          "value": "Pacific/Noumea",
          "displayName": "Pacific/Noumea"
        }, {
          "value": "Pacific/Pago Pago",
          "displayName": "Pacific/Pago Pago"
        }, {
          "value": "Pacific/Palau",
          "displayName": "Pacific/Palau"
        }, {
          "value": "Pacific/Pitcairn",
          "displayName": "Pacific/Pitcairn"
        }, {
          "value": "Pacific/Ponape",
          "displayName": "Pacific/Ponape"
        }, {
          "value": "Pacific/Port Moresby",
          "displayName": "Pacific/Port Moresby"
        }, {
          "value": "Pacific/Rarotonga",
          "displayName": "Pacific/Rarotonga"
        }, {
          "value": "Pacific/Saipan",
          "displayName": "Pacific/Saipan"
        }, {
          "value": "Pacific/Tahiti",
          "displayName": "Pacific/Tahiti"
        }, {
          "value": "Pacific/Tarawa",
          "displayName": "Pacific/Tarawa"
        }, {
          "value": "Pacific/Tongatapu",
          "displayName": "Pacific/Tongatapu"
        }, {
          "value": "Pacific/Truk",
          "displayName": "Pacific/Truk"
        }, {
          "value": "Pacific/Wake",
          "displayName": "Pacific/Wake"
        }, {
          "value": "Pacific/Wallis",
          "displayName": "Pacific/Wallis"
        }],
        "description": "The time zone to be selected",
        "displayName": "Time Zone",
        "displayOnly": true
      }, {
        "name": "TzName",
        "type": "string",
        "hidden": true,
        "description": "The time zone name to be set in Tr098",
        "tr098PathOverride": ["InternetGatewayDevice.Time.X_000631_ZoneName"]
      }, {
        "name": "TzValue",
        "type": "string",
        "hidden": true,
        "description": "The time zone value to be set in Tr098",
        "tr098PathOverride": ["InternetGatewayDevice.Time.LocalTimeZoneName"]
      }, {
        "name": "NTPEnable",
        "type": "boolean",
        "mandatory": true,
        "description": "Enable to use use network time",
        "displayName": "Network Time",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.Time.Enable"]
      }, {
        "name": "NTPServer1",
        "type": "string",
        "mandatory": true,
        "description": "First NTP timeserver",
        "displayName": "1st NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer1"],
        "requires": {
          "NTPEnable": true
        }
      }, {
        "name": "NTPServer2",
        "type": "string",
        "description": "Second NTP timeserver",
        "displayName": "2nd NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer2"],
        "requires": {
          "NTPEnable": true
        }
      }, {
        "name": "NTPServer3",
        "type": "string",
        "description": "Third NTP timeserver",
        "displayName": "3rd NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer3"],
        "requires": {
          "NTPEnable": true
        }
      }, {
        "name": "NTPServer4",
        "type": "string",
        "description": "Fourth NTP timeserver",
        "displayName": "4th NTP Server",
        "tr098PathOverride": ["InternetGatewayDevice.Time.NTPServer4"],
        "requires": {
          "NTPEnable": true
        }
      }]
    }, {
      "_id": "4d77ed9e-155c-4223-83d1-e8f71294d965",
      "name": "Video - Multicast Range Filters",
      "group": "Service Attributes",
      "inner": true,
      "createTime": "2020-07-24T05:11:19.898Z",
      "description": "Video - Multicast Range Filters",
      "displayName": "Video - Multicast Range Filters",
      "parameters": [{
        "name": "NumberOfFilters",
        "type": "int",
        "maxValue": 8,
        "minValue": 1,
        "valueEnums": [{
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }, {
          "value": 5,
          "displayName": "5"
        }, {
          "value": 6,
          "displayName": "6"
        }, {
          "value": 7,
          "displayName": "7"
        }, {
          "value": 8,
          "displayName": "8"
        }],
        "displayName": "Total Number of Multicast Range Filters",
        "displayOnly": true,
        "defaultValue": 1
      }, {
        "name": "Range1Start",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #1 Starting IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [1, 2, 3, 4, 5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range1End",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #1 Ending IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [1, 2, 3, 4, 5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range2Start",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #2 Starting IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [2, 3, 4, 5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range2End",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #2 Ending IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [2, 3, 4, 5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range3Start",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #3 Starting IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [3, 4, 5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range3End",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #3 Ending IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [3, 4, 5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range4Start",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #4 Starting IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [4, 5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range4End",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #4 Ending IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [4, 5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range5Start",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #5 Starting IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range5End",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #5 Ending IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [5, 6, 7, 8]
          }
        }
      }, {
        "name": "Range6Start",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #6 Starting IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [6, 7, 8]
          }
        }
      }, {
        "name": "Range6End",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #6 Ending IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [6, 7, 8]
          }
        }
      }, {
        "name": "Range7Start",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #7 Starting IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [7, 8]
          }
        }
      }, {
        "name": "Range7End",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #7 Ending IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [7, 8]
          }
        }
      }, {
        "name": "Range8Start",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #8 Starting IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [8]
          }
        }
      }, {
        "name": "Range8End",
        "type": "IPv4MulticastAddress",
        "displayName": "Filter #8 Ending IP Address",
        "requires": {
          "NumberOfFilters": {
            "$in": [8]
          }
        }
      }]
    }, {
      "_id": "4ee8ef1a-2a18-4450-9e0f-13d7db332485",
      "name": "Video - Multicast VLAN Registration (MVR)",
      "group": "Service Attributes",
      "inner": true,
      "createTime": "2020-07-24T05:11:19.777Z",
      "description": "Video - Multicast VLAN Registration (MVR)",
      "displayName": "Video - Multicast VLAN Registration (MVR)",
      "parameters": [{
        "name": "NumberOfVLANs",
        "type": "int",
        "valueEnums": [{
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }],
        "displayName": "Total Number of MVR VLAN(s)",
        "displayOnly": true,
        "defaultValue": 1
      }, {
        "name": "Vlan1",
        "type": "int",
        "maxValue": 4095,
        "minValue": 1,
        "displayName": "1st MVR VLAN ID",
        "requires": {
          "NumberOfVLANs": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan1NumberOfRanges",
        "type": "int",
        "valueEnums": [{
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }],
        "displayName": "1st VLAN - Total # of Range(s)",
        "defaultValue": 1,
        "requires": {
          "NumberOfVLANs": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan1Range1Start",
        "type": "IPv4MulticastAddress",
        "displayName": "1st VLAN - Range #1 Starting IP Address",
        "requires": {
          "Vlan1NumberOfRanges": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan1Range1End",
        "type": "IPv4MulticastAddress",
        "displayName": "1st VLAN - Range #1 Ending IP Address",
        "requires": {
          "Vlan1NumberOfRanges": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan1Range2Start",
        "type": "IPv4MulticastAddress",
        "displayName": "1st VLAN - Range #2 Starting IP Address",
        "requires": {
          "Vlan1NumberOfRanges": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan1Range2End",
        "type": "IPv4MulticastAddress",
        "displayName": "1st VLAN - Range #2 Ending IP Address",
        "requires": {
          "Vlan1NumberOfRanges": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan1Range3Start",
        "type": "IPv4MulticastAddress",
        "displayName": "1st VLAN - Range #3 Starting IP Address",
        "requires": {
          "Vlan1NumberOfRanges": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan1Range3End",
        "type": "IPv4MulticastAddress",
        "displayName": "1st VLAN - Range #3 Ending IP Address",
        "requires": {
          "Vlan1NumberOfRanges": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan1Range4Start",
        "type": "IPv4MulticastAddress",
        "displayName": "1st VLAN - Range #4 Starting IP Address",
        "requires": {
          "Vlan1NumberOfRanges": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan1Range4End",
        "type": "IPv4MulticastAddress",
        "displayName": "1st VLAN - Range #4 Ending IP Address",
        "requires": {
          "Vlan1NumberOfRanges": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan2",
        "type": "int",
        "maxValue": 4095,
        "minValue": 1,
        "displayName": "2nd MVR VLAN ID",
        "requires": {
          "NumberOfVLANs": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan2NumberOfRanges",
        "type": "int",
        "valueEnums": [{
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }],
        "displayName": "2nd VLAN - Total # of Range(s) ",
        "defaultValue": 1,
        "requires": {
          "NumberOfVLANs": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan2Range1Start",
        "type": "IPv4MulticastAddress",
        "displayName": "2nd VLAN - Range #1 Starting IP Address",
        "requires": {
          "Vlan2NumberOfRanges": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan2Range1End",
        "type": "IPv4MulticastAddress",
        "displayName": "2nd VLAN - Range #1 Ending IP Address",
        "requires": {
          "Vlan2NumberOfRanges": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan2Range2Start",
        "type": "IPv4MulticastAddress",
        "displayName": "2nd VLAN - Range #2 Starting IP Address",
        "requires": {
          "Vlan2NumberOfRanges": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan2Range2End",
        "type": "IPv4MulticastAddress",
        "displayName": "2nd VLAN - Range #2 Ending IP Address",
        "requires": {
          "Vlan2NumberOfRanges": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan2Range3Start",
        "type": "IPv4MulticastAddress",
        "displayName": "2nd VLAN - Range #3 Starting IP Address",
        "requires": {
          "Vlan2NumberOfRanges": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan2Range3End",
        "type": "IPv4MulticastAddress",
        "displayName": "2nd VLAN - Range #3 Ending IP Address",
        "requires": {
          "Vlan2NumberOfRanges": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan2Range4Start",
        "type": "IPv4MulticastAddress",
        "displayName": "2nd VLAN - Range #4 Starting IP Address",
        "requires": {
          "Vlan2NumberOfRanges": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan2Range4End",
        "type": "IPv4MulticastAddress",
        "displayName": "2nd VLAN - Range #4 Ending IP Address",
        "requires": {
          "Vlan2NumberOfRanges": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan3",
        "type": "int",
        "maxValue": 4095,
        "minValue": 1,
        "displayName": "3rd MVR VLAN ID",
        "requires": {
          "NumberOfVLANs": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan3NumberOfRanges",
        "type": "int",
        "valueEnums": [{
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }],
        "displayName": "3rd VLAN - Total # of Range(s)",
        "defaultValue": 1,
        "requires": {
          "NumberOfVLANs": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan3Range1Start",
        "type": "IPv4MulticastAddress",
        "displayName": "3rd VLAN - Range #1 Starting IP Address",
        "requires": {
          "Vlan3NumberOfRanges": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan3Range1End",
        "type": "IPv4MulticastAddress",
        "displayName": "3rd VLAN - Range #1 Ending IP Address",
        "requires": {
          "Vlan3NumberOfRanges": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan3Range2Start",
        "type": "IPv4MulticastAddress",
        "displayName": "3rd VLAN - Range #2 Starting IP Address",
        "requires": {
          "Vlan3NumberOfRanges": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan3Range2End",
        "type": "IPv4MulticastAddress",
        "displayName": "3rd VLAN - Range #2 Ending IP Address",
        "requires": {
          "Vlan3NumberOfRanges": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan3Range3Start",
        "type": "IPv4MulticastAddress",
        "displayName": "3rd VLAN - Range #3 Starting IP Address",
        "requires": {
          "Vlan3NumberOfRanges": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan3Range3End",
        "type": "IPv4MulticastAddress",
        "displayName": "3rd VLAN - Range #3 Ending IP Address",
        "requires": {
          "Vlan3NumberOfRanges": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan3Range4Start",
        "type": "IPv4MulticastAddress",
        "displayName": "3rd VLAN - Range #4 Starting IP Address",
        "requires": {
          "Vlan3NumberOfRanges": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan3Range4End",
        "type": "IPv4MulticastAddress",
        "displayName": "3rd VLAN - Range #4 Ending IP Address",
        "requires": {
          "Vlan3NumberOfRanges": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan4",
        "type": "int",
        "maxValue": 4095,
        "minValue": 1,
        "displayName": "4th MVR VLAN ID",
        "requires": {
          "NumberOfVLANs": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan4NumberOfRanges",
        "type": "int",
        "valueEnums": [{
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }],
        "displayName": "4th VLAN - Total # of Range(s)",
        "defaultValue": 1,
        "requires": {
          "NumberOfVLANs": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan4Range1Start",
        "type": "IPv4MulticastAddress",
        "displayName": "4th VLAN - Range #1 Starting IP Address",
        "requires": {
          "Vlan4NumberOfRanges": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan4Range1End",
        "type": "IPv4MulticastAddress",
        "displayName": "4th VLAN - Range #1 Ending IP Address",
        "requires": {
          "Vlan4NumberOfRanges": {
            "$in": [1, 2, 3, 4]
          }
        }
      }, {
        "name": "Vlan4Range2Start",
        "type": "IPv4MulticastAddress",
        "displayName": "4th VLAN - Range #2 Starting IP Address",
        "requires": {
          "Vlan4NumberOfRanges": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan4Range2End",
        "type": "IPv4MulticastAddress",
        "displayName": "4th VLAN - Range #2 Ending IP Address",
        "requires": {
          "Vlan4NumberOfRanges": {
            "$in": [2, 3, 4]
          }
        }
      }, {
        "name": "Vlan4Range3Start",
        "type": "IPv4MulticastAddress",
        "displayName": "4th VLAN - Range #3 Starting IP Address",
        "requires": {
          "Vlan4NumberOfRanges": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan4Range3End",
        "type": "IPv4MulticastAddress",
        "displayName": "4th VLAN - Range #3 Ending IP Address",
        "requires": {
          "Vlan4NumberOfRanges": {
            "$in": [3, 4]
          }
        }
      }, {
        "name": "Vlan4Range4Start",
        "type": "IPv4MulticastAddress",
        "displayName": "4th VLAN - Range #4 Starting IP Address",
        "requires": {
          "Vlan4NumberOfRanges": {
            "$in": [4]
          }
        }
      }, {
        "name": "Vlan4Range4End",
        "type": "IPv4MulticastAddress",
        "displayName": "4th VLAN - Range #4 Ending IP Address",
        "requires": {
          "Vlan4NumberOfRanges": {
            "$in": [4]
          }
        }
      }]
    },

    // Video service



    // {
    //   "_id": "736cf471-b693-4182-b10b-ea12236fdbe9",
    //   "name": "Video Service",
    //   "group": "Services",
    //   "createTime": "2020-07-24T05:11:19.631Z",
    //   "description": "Define parameters for Video Service.",
    //   "displayName": "Video Service",
    //   "serviceType": "Service WAN VLAN",
    //   "serviceValues": {
    //     "Name": "Video Service"
    //   },
    //   "parameters": [{
    //     "name": "productFamily",
    //     "type": "string",
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": "GigaCenter",
    //       "displayName": "GigaCenter and GigaHub"
    //     }, {
    //       "value": "EXOS",
    //       "displayName": "EXOS-Powered GigaFamily"
    //     }],
    //     "description": "The CPE Product Family.",
    //     "displayName": "Product Family(s)",
    //     "defaultValue": "GigaCenter"
    //   }, {
    //     "name": "Mode",
    //     "type": "string",
    //     "implies": {
    //       "RG Routed": {
    //         "NATEnabled": true,
    //         "X_000631_IGMPProxy": true,
    //         "ServiceConnectionType": "DHCP"
    //       },
    //       "RG L2 Bridged": {
    //         "X_000631_IGMPProxy": true,
    //         "ServiceConnectionType": "Bridged"
    //       },
    //       "ONT Full Bridge": {
    //         "Hairpin": true,
    //         "IgmpSnoopEnable": true,
    //         "ServiceConnectionType": "AE_L2_Bridged"
    //       },
    //       "ONT Half Bridge": {
    //         "Hairpin": false,
    //         "IgmpSnoopEnable": true,
    //         "ServiceConnectionType": "AE_L2_Bridged"
    //       }
    //     },
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": "RG Routed",
    //       "displayName": "RG - Routed"
    //     }, {
    //       "value": "RG L2 Bridged",
    //       "displayName": "RG - L2 Bridged"
    //     }, {
    //       "value": "ONT Full Bridge",
    //       "displayName": "ONT - Full Bridge"
    //     }, {
    //       "value": "ONT Half Bridge",
    //       "displayName": "ONT - Half Bridge"
    //     }],
    //     "description": "Specifies the Video Service Mode, RG-Routed / RG-Bridged / ONT-FB / ONT-HB",
    //     "displayName": "Mode",
    //     "defaultValue": "RG Routed"
    //   }, {
    //     "name": "ServiceConnectionType",
    //     "type": "string",
    //     "hidden": true
    //   }, {
    //     "name": "VlanTagAction",
    //     "type": "boolean",
    //     "implies": {
    //       "false": {
    //         "X_000631_VlanMuxID": -1,
    //         "X_000631_VlanMux8021p": -1,
    //         "AnyPortAnyServiceEnabled": false
    //       }
    //     },
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": true,
    //       "displayName": "Tagged"
    //     }, {
    //       "value": false,
    //       "displayName": "Un-tagged"
    //     }],
    //     "description": "Enable VLAN.",
    //     "displayName": "VLAN Tag Action",
    //     "displayOnly": true,
    //     "defaultValue": true,
    //     "requires": {
    //       "ServiceConnectionType": {
    //         "$in": ["DHCP", "Bridged"]
    //       }
    //     }
    //   }, {
    //     "name": "X_000631_VlanMuxID",
    //     "type": "int",
    //     "maxValue": 4093,
    //     "minValue": 1,
    //     "mandatory": true,
    //     "description": "The VLAN ID.",
    //     "displayName": "VLAN ID",
    //     "defaultValue": 7,
    //     "requires": {
    //       "VlanTagAction": true
    //     }
    //   }, {
    //     "name": "X_000631_VlanMux8021p",
    //     "type": "int",
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": 0,
    //       "displayName": "0"
    //     }, {
    //       "value": 1,
    //       "displayName": "1"
    //     }, {
    //       "value": 2,
    //       "displayName": "2"
    //     }, {
    //       "value": 3,
    //       "displayName": "3"
    //     }, {
    //       "value": 4,
    //       "displayName": "4"
    //     }, {
    //       "value": 5,
    //       "displayName": "5"
    //     }, {
    //       "value": 6,
    //       "displayName": "6"
    //     }, {
    //       "value": 7,
    //       "displayName": "7"
    //     }],
    //     "description": "The priority of the VLAN.",
    //     "displayName": "Priority (P-Bits)",
    //     "defaultValue": 4,
    //     "requires": {
    //       "VlanTagAction": true
    //     }
    //   }, {
    //     "name": "NATEnabled",
    //     "type": "boolean",
    //     "hidden": true,
    //     "description": "NAT"
    //   }, {
    //     "name": "X_000631_Dscp2PbitMapEnabled",
    //     "type": "boolean",
    //     "description": "Turn on/off DSCP Map for tagged service",
    //     "displayName": "DSCP to Pbit Map",
    //     "requires": {
    //       "VlanTagAction": true,
    //       "ServiceConnectionType": {
    //         "$in": ["DHCP", "Bridged"]
    //       }
    //     }
    //   }, {
    //     "name": "X_000631_IGMPProxy",
    //     "type": "boolean",
    //     "hidden": true,
    //     "requires": {
    //       "ServiceConnectionType": {
    //         "$in": ["DHCP", "Bridged"]
    //       }
    //     }
    //},
    //  {
    //   "name": "EnableIPTV_SSID",
    //   "type": "boolean",
    //   "description": "Enable/Disable 5GHz IPTV SSID",
    //   "displayName": "5GHz IPTV SSID",
    //   "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.Enable"],
    //   "requires": {
    //     "Mode": "RG Routed"
    //   }
    // }, 
    //{
    //     "name": "Enable5GHz_Radio",
    //     "type": "boolean",
    //     "hidden": true,
    //     "description": "Enable 5GHz Wi-Fi Radio",
    //     "defaultValue": true,
    //     "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.RadioEnabled"],
    //     "requires": {
    //       "EnableIPTV_SSID": true
    //     }
    //   }, {
    //     "name": "AnyPortAnyServiceEnabled",
    //     "type": "boolean",
    //     "description": "Any Port Any Service",
    //     "displayName": "Any Port Any Service",
    //     "defaultValue": false,
    //     "requires": {
    //       "ServiceConnectionType": "Bridged",
    //       "VlanTagAction": true
    //     }
    //   }, {
    //     "name": "APAS_EnableIPTV_SSID",
    //     "type": "boolean",
    //     "description": "Enable/Disable 5GHz IPTV SSID",
    //     "displayName": "5GHz IPTV SSID",
    //     "defaultValue": true,
    //     "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.Enable"],
    //     "requires": {
    //       "AnyPortAnyServiceEnabled": true
    //     }
    //   }, {
    //     "name": "VLAN_Enable",
    //     "type": "boolean",
    //     "hidden": true,
    //     "description": "Enable or Disable VLAN Virtual Interfaces",
    //     "defaultValue": true,
    //     "requires": {
    //       "AnyPortAnyServiceEnabled": true
    //     }
    //   }, {
    //     "name": "OUI_Enable",
    //     "type": "boolean",
    //     "description": "LAN interface OUI binding",
    //     "displayName": "OUI Matching",
    //     "defaultValue": false,
    //     "requires": {
    //       "AnyPortAnyServiceEnabled": true
    //     }
    //   }, {
    //     "name": "OUI_FilterList",
    //     "type": "MACAddressListWithWildcard",
    //     "tooltip": "Separate by comma. Use 'x' or 'X' as wildcard value. Example: To match OUI '00:33:66' to this bridge, type '00:33:66:xx:xx:xx')",
    //     "mandatory": true,
    //     "description": "Comma-separated list of MAC Addresses. Each list entry may optionally specify a bit-mask, where matching of a packet",
    //     "displayName": "OUI List",
    //     "requires": {
    //       "OUI_Enable": true
    //     }
    //   }, {
    //     "name": "BridgedInterface",
    //     "type": "stringArray",
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.15",
    //       "displayName": "5GHz IPTV SSID"
    //     }, {
    //       "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.1",
    //       "displayName": "LAN Port 1"
    //     }, {
    //       "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.2",
    //       "displayName": "LAN Port 2"
    //     }, {
    //       "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.3",
    //       "displayName": "LAN Port 3"
    //     }, {
    //       "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.4",
    //       "displayName": "LAN Port 4"
    //     }],
    //     "description": "The LAN Interface to be bridged to WAN",
    //     "displayName": "Bridge LAN Interface",
    //     "defaultValue": ["InternetGatewayDevice.Layer2Bridging.AvailableInterface.15"],
    //     "requires": {
    //       "productFamily": "GigaCenter",
    //       "ServiceConnectionType": "Bridged",
    //       "AnyPortAnyServiceEnabled": false
    //     }
    //   }, {
    //     "name": "ExosBridgedInterface",
    //     "type": "stringArray",
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.6",
    //       "displayName": "5GHz IPTV SSID"
    //     }, {
    //       "value": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.17",
    //       "displayName": "LAN Port 1"
    //     }, {
    //       "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.2",
    //       "displayName": "LAN Port 2"
    //     }, {
    //       "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.3",
    //       "displayName": "LAN Port 3"
    //     }, {
    //       "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.4",
    //       "displayName": "LAN Port 4"
    //     }],
    //     "description": "The LAN Interface to be bridged to WAN",
    //     "displayName": "Bridge LAN Interface",
    //     "defaultValue": ["InternetGatewayDevice.Layer2Bridging.AvailableInterface.6"],
    //     "requires": {
    //       "productFamily": "EXOS",
    //       "ServiceConnectionType": "Bridged",
    //       "AnyPortAnyServiceEnabled": false
    //     }
    //   }, {
    //     "name": "VLANID",
    //     "type": "int",
    //     "maxValue": 4094,
    //     "minValue": 0,
    //     "mandatory": true,
    //     "description": "The (outer) VLAN ID.",
    //     "displayName": "VLAN ID",
    //     "defaultValue": 0,
    //     "requires": {
    //       "ServiceConnectionType": "AE_L2_Bridged"
    //     }
    //   }, {
    //     "name": "MatchRule",
    //     "type": "string",
    //     "valueEnums": [{
    //       "value": "None",
    //       "displayName": "None"
    //     }, {
    //       "value": "Vid",
    //       "displayName": "VLAN ID"
    //     }, {
    //       "value": "Pbit",
    //       "displayName": "Pbit"
    //     }, {
    //       "value": "VidPbit",
    //       "displayName": "VLAN ID + P-Bits"
    //     }, {
    //       "value": "Ethertype",
    //       "displayName": "EtherType"
    //     }, {
    //       "value": "Untagged",
    //       "displayName": "Untagged"
    //     }, {
    //       "value": "UntaggedSA",
    //       "displayName": "Untagged + Src MAC"
    //     }, {
    //       "value": "Tagged",
    //       "displayName": "Tagged"
    //     }, {
    //       "value": "IPv6Untagged",
    //       "implies": {
    //         "TagAction": "Drop"
    //       },
    //       "displayName": "Untagged IPv6"
    //     }, {
    //       "value": "TaggedIPv6",
    //       "implies": {
    //         "TagAction": "Drop"
    //       },
    //       "displayName": "Tagged IPv6"
    //     }],
    //     "description": "Defines how the device classifies subscriber traffic to determine the service in which it belongs",
    //     "displayName": "Subscriber Traffic Match Rule",
    //     "displayOnly": true,
    //     "requires": {
    //       "ServiceConnectionType": "AE_L2_Bridged"
    //     }
    //   }, {
    //     "name": "VLANIDFilter",
    //     "type": "int",
    //     "maxValue": 4095,
    //     "minValue": -1,
    //     "description": "VLAN ID of Subscriber traffic that is used to match for this video service",
    //     "displayName": "VLAN ID to match on",
    //     "displayOnly": true,
    //     "defaultValue": -1,
    //     "requires": {
    //       "MatchRule": {
    //         "$in": ["Vid", "VidPbit"]
    //       }
    //     }
    //   }, {
    //     "name": "X_000631_PbitFilter",
    //     "type": "int",
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": 0,
    //       "displayName": "0"
    //     }, {
    //       "value": 1,
    //       "displayName": "1"
    //     }, {
    //       "value": 2,
    //       "displayName": "2"
    //     }, {
    //       "value": 3,
    //       "displayName": "3"
    //     }, {
    //       "value": 4,
    //       "displayName": "4"
    //     }, {
    //       "value": 5,
    //       "displayName": "5"
    //     }, {
    //       "value": 6,
    //       "displayName": "6"
    //     }, {
    //       "value": 7,
    //       "displayName": "7"
    //     }],
    //     "description": "P-Bits of Subscriber traffic that is used to match for this video service",
    //     "displayName": "P-Bits to match on",
    //     "displayOnly": true,
    //     "requires": {
    //       "MatchRule": {
    //         "$in": ["Pbit", "VidPbit"]
    //       }
    //     }
    //   }, {
    //     "name": "EthertypeFilterList",
    //     "type": "string",
    //     "valueEnums": [{
    //       "value": "34915,34916",
    //       "displayName": "PPPoE"
    //     }, {
    //       "value": "2054",
    //       "displayName": "ARP"
    //     }, {
    //       "value": "2048",
    //       "displayName": "IPv4"
    //     }, {
    //       "value": "34525",
    //       "displayName": "IPv6"
    //     }],
    //     "description": "EtherType of Subscriber traffic that is used to match for this video service",
    //     "displayName": "EtherType Filter",
    //     "displayOnly": true,
    //     "maxStringLength": 256,
    //     "requires": {
    //       "MatchRule": "Ethertype"
    //     }
    //   }, {
    //     "name": "SourceMACAddressFilterList",
    //     "type": "string",
    //     "tooltip": "Comma-separated list of MAC Address/Mask pairs, e.g. \"11:22:33:00:00:00/FF:FF:FF:00:00:00\" or \"11:22:33:00:00:00/FF:FF:FF:00:00:00,44:55:66:00:00:00/FF:FF:FF:00:00:00\". \nThe masks must be either \"FF:FF:FF:00:00:00\" or \"FF:FF:FF:FF:FF:FF\"",
    //     "mandatory": true,
    //     "description": "Source MAC Address Filters of Subscriber traffic that is used to match for this video service",
    //     "displayName": "Source MAC Address Filters",
    //     "displayOnly": true,
    //     "maxStringLength": 1160,
    //     "minStringLength": 1,
    //     "requires": {
    //       "MatchRule": "UntaggedSA"
    //     }
    //   }, {
    //     "name": "TagAction",
    //     "type": "string",
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": "AddVidExplicitPbit",
    //       "displayName": "Add Tag with Explicit Pbit",
    //       "requires": {
    //         "MatchRule": {
    //           "$in": ["Untagged", "UntaggedSA", "Ethertype", "Vid", "VidPbit", "Pbit", "Tagged", "SA", "DA"]
    //         }
    //       }
    //     }, {
    //       "value": "AddVidDscp2Pbit",
    //       "displayName": "Add Tag and convert DSCP to Pbit",
    //       "requires": {
    //         "MatchRule": {
    //           "$in": ["Untagged", "UntaggedSA"]
    //         }
    //       }
    //     }, {
    //       "value": "ChangeVidPropagatePbit",
    //       "displayName": "Change Tag and Propagate Pbit",
    //       "requires": {
    //         "MatchRule": {
    //           "$in": ["Vid"]
    //         }
    //       }
    //     }, {
    //       "value": "ChangeVidExplicitPbit",
    //       "displayName": "Change Tag with Explicit Pbit",
    //       "requires": {
    //         "MatchRule": {
    //           "$in": ["Vid", "VidPbit"]
    //         }
    //       }
    //     }, {
    //       "value": "AddVidPropagatePbit",
    //       "displayName": "Add Tag and Propogate Pbit",
    //       "requires": {
    //         "MatchRule": {
    //           "$in": ["Vid", "Tagged"]
    //         }
    //       }
    //     }, {
    //       "value": "ChangeVidPropagatePbit_AddVidExplicitPbit",
    //       "displayName": "Change to Inner Tag and Propagate Pbit, Add Outer Tag with Explicit Pbit",
    //       "requires": {
    //         "MatchRule": {
    //           "$in": ["Vid"]
    //         }
    //       }
    //     }, {
    //       "value": "ChangeVidPropagatePbit_AddVidPropagatePbit",
    //       "displayName": "Change to Inner Tag and Propagate Pbit, Add Outer Tag and Propagate Pbit",
    //       "requires": {
    //         "MatchRule": {
    //           "$in": ["Vid", "VidPbit"]
    //         }
    //       }
    //     }, {
    //       "value": "Drop",
    //       "displayName": "Drop",
    //       "requires": {
    //         "MatchRule": {
    //           "$in": ["IPv6Untagged", "TaggedIPv6"]
    //         }
    //       }
    //     }],
    //     "description": "Tag Action (on matched subscriber traffic)",
    //     "displayName": "Tag Action (on matched subscriber traffic)",
    //     "displayOnly": true,
    //     "requires": {
    //       "MatchRule": {
    //         "$in": ["Vid", "Pbit", "VidPbit", "Ethertype", "Untagged", "UntaggedSA", "SA", "DA", "Tagged", "IPv6Untagged", "TaggedIPv6"]
    //       }
    //     }
    //   }, {
    //     "name": "X_CALIX_SXACC_TAG_ACTION_FILTERS",
    //     "type": "stringArray",
    //     "hidden": true
    //   }, {
    //     "name": "InnerVLANID",
    //     "type": "int",
    //     "maxValue": 4095,
    //     "minValue": 0,
    //     "mandatory": true,
    //     "description": "Value of the inner VLAN ID to be used for double tagged operations.",
    //     "displayName": "Inner Tag VLAN ID",
    //     "defaultValue": 0,
    //     "requires": {
    //       "ServiceConnectionType": "AE_L2_Bridged",
    //       "TagAction": {
    //         "$in": ["ChangeVidPropagatePbit_AddVidExplicitPbit", "ChangeVidPropagatePbit_AddVidPropagatePbit"]
    //       }
    //     }
    //   }, {
    //     "name": "Pbit",
    //     "type": "int",
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": 0,
    //       "displayName": "0",
    //       "requires": {
    //         "TagAction": {
    //           "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //         }
    //       }
    //     }, {
    //       "value": 1,
    //       "displayName": "1",
    //       "requires": {
    //         "TagAction": {
    //           "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //         }
    //       }
    //     }, {
    //       "value": 2,
    //       "displayName": "2",
    //       "requires": {
    //         "TagAction": {
    //           "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //         }
    //       }
    //     }, {
    //       "value": 3,
    //       "displayName": "3",
    //       "requires": {
    //         "TagAction": {
    //           "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //         }
    //       }
    //     }, {
    //       "value": 4,
    //       "displayName": "4",
    //       "requires": {
    //         "TagAction": {
    //           "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //         }
    //       }
    //     }, {
    //       "value": 5,
    //       "displayName": "5",
    //       "requires": {
    //         "TagAction": {
    //           "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //         }
    //       }
    //     }, {
    //       "value": 6,
    //       "displayName": "6",
    //       "requires": {
    //         "TagAction": {
    //           "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //         }
    //       }
    //     }, {
    //       "value": 7,
    //       "displayName": "7",
    //       "requires": {
    //         "TagAction": {
    //           "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //         }
    //       }
    //     }, {
    //       "value": -1,
    //       "displayName": "Propagate",
    //       "requires": {
    //         "ServiceConnectionType": "AE_L2_Bridged",
    //         "TagAction": {
    //           "$in": ["AddVidPropagatePbit", "ChangeVidPropagatePbit", "ChangeVidPropagatePbit_AddVidPropagatePbit"]
    //         }
    //       }
    //     }, {
    //       "value": -2,
    //       "displayName": "DSCP to P-Bits",
    //       "requires": {
    //         "ServiceConnectionType": "AE_L2_Bridged",
    //         "TagAction": {
    //           "$in": ["AddVidDscp2Pbit"]
    //         }
    //       }
    //     }],
    //     "description": "The priority of the (outer) VLAN.",
    //     "displayName": "Priority (P-Bits)",
    //     "defaultValue": 3,
    //     "requires": {
    //       "ServiceConnectionType": "AE_L2_Bridged",
    //       "TagAction": {
    //         "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
    //       }
    //     }
    //   }, {
    //     "name": "X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS",
    //     "type": "stringArray",
    //     "mandatory": true,
    //     "valueEnums": [{
    //       "value": "1",
    //       "displayName": "ETH Port 1"
    //     }, {
    //       "value": "2",
    //       "displayName": "ETH Port 2"
    //     }, {
    //       "value": "3",
    //       "displayName": "ETH Port 3"
    //     }, {
    //       "value": "4",
    //       "displayName": "ETH Port 4"
    //     }],
    //     "description": "The LAN ETH Ports belong to this AE L2 Bridge",
    //     "displayName": "Member ETH Ports",
    //     "defaultValue": ["1"],
    //     "requires": {
    //       "ServiceConnectionType": "AE_L2_Bridged"
    //     }
    //   }, {
    //     "name": "Hairpin",
    //     "type": "boolean",
    //     "hidden": true,
    //     "requires": {
    //       "ServiceConnectionType": "AE_L2_Bridged"
    //     }
    //   }, {
    //     "name": "IgmpSnoopEnable",
    //     "type": "boolean",
    //     "hidden": true,
    //     "requires": {
    //       "ServiceConnectionType": "AE_L2_Bridged"
    //     }
    //   }, {
    //     "name": "QueryInterval",
    //     "type": "int",
    //     "tooltip": "Range: 10..3600, Default: 125",
    //     "maxValue": 3600,
    //     "minValue": 10,
    //     "displayName": "IGMP Query Interval (in seconds)",
    //     "tr098PathOverride": ["InternetGatewayDevice.Layer2Bridging.X_000631_IgmpGlobal.QueryInterval"]
    //   }, {
    //     "name": "X_000631_MaxStreams",
    //     "type": "int",
    //     "tooltip": "Range: 0..512 (0 means no limit)",
    //     "maxValue": 512,
    //     "minValue": 0,
    //     "description": "Maximum number of multicast streams (range 0..512).",
    //     "displayName": "Maximum # of Multicast Streams"
    //   }, {
    //     "name": "X_CALIX_SXACC_BW_PROFILE",
    //     "type": "innerProfile",
    //     "description": "BW Profile",
    //     "displayName": "BW Profile",
    //     "innerProfileCategory": "Bandwidth",
    //     "requires": {
    //       "productFamily": "GigaCenter"
    //     }
    //   }, {
    //     "name": "USMaxMcastBcastRate",
    //     "type": "boolean",
    //     "mandatory": true,
    //     "displayName": "US Max Mcast/Bcast Rate",
    //     "displayOnly": true,
    //     "defaultValue": false,
    //     "requires": {
    //       "Mode": {
    //         "$in": ["ONT Full Bridge", "ONT Half Bridge"]
    //       },
    //       "TLANEnable": false
    //     }
    //   }, {
    //     "name": "UpstreamCIR",
    //     "type": "string",
    //     "tooltip": "Please enter a value suffix k for Kbps (with 1k-10240k)",
    //     "mandatory": true,
    //     "displayName": "US Max Rate",
    //     "defaultValue": "24k",
    //     "stringPattern": "^([1-9]\\d{0,3}|10[0-1]\\d\\d|102[0-3]\\d|10240)k$",
    //     "validationErrorMessage": "Please enter a value suffix k for Kbps (with 1k-10240k)",
    //     "requires": {
    //       "USMaxMcastBcastRate": true
    //     }
    //   }, {
    //     "name": "X_000631_MvrProfile",
    //     "type": "innerProfile",
    //     "displayName": "Multicast VLAN Registration (MVR) Profile",
    //     "innerProfileCategory": "Video - Multicast VLAN Registration (MVR)"
    //   }, {
    //     "name": "X_000631_McastFilter",
    //     "type": "innerProfile",
    //     "displayName": "Multicast Range Filter Profile",
    //     "innerProfileCategory": "Video - Multicast Range Filters"
    //   }, {
    //     "name": "AdvancedSettings",
    //     "type": "boolean",
    //     "valueEnums": [{
    //       "value": true,
    //       "displayName": "Show"
    //     }, {
    //       "value": false,
    //       "displayName": "Hide"
    //     }],
    //     "description": "Show/Hide Advanced ONT Bridge Settings",
    //     "displayName": "Advanced Settings",
    //     "displayOnly": true,
    //     "defaultValue": false,
    //     "inputAuxiliary": true,
    //     "requires": {
    //       "ServiceConnectionType": "AE_L2_Bridged"
    //     }
    //   }, {
    //     "name": "MacLimit",
    //     "type": "int",
    //     "maxValue": 512,
    //     "minValue": 0,
    //     "description": "controls the MAC limiting feature. Default is 0 which means no MAC limiting. Range: 0..512",
    //     "displayName": "MAC Limit",
    //     "defaultValue": 0,
    //     "requires": {
    //       "AdvancedSettings": true
    //     }
    //   }, {
    //     "name": "L2CPConfigured",
    //     "type": "boolean",
    //     "description": "Enable/Disable L2CP",
    //     "displayName": "L2CP",
    //     "defaultValue": false,
    //     "requires": {
    //       "AdvancedSettings": true
    //     }
    //   }, {
    //     "name": "L2CPBpduFilter",
    //     "type": "string",
    //     "valueEnums": [{
    //       "value": "Discard",
    //       "displayName": "Discard"
    //     }, {
    //       "value": "Tunnel",
    //       "displayName": "Tunnel"
    //     }],
    //     "description": "Enable/Disable L2CP BPDU Filtering",
    //     "displayName": "BPDU Filtering",
    //     "requires": {
    //       "L2CPConfigured": true
    //     }
    //   }, {
    //     "name": "L2CPGarpFilter",
    //     "type": "string",
    //     "valueEnums": [{
    //       "value": "Discard",
    //       "displayName": "Discard"
    //     }, {
    //       "value": "Tunnel",
    //       "displayName": "Tunnel"
    //     }],
    //     "description": "Enable/Disable L2CP GARP Filtering",
    //     "displayName": "GARP Filtering",
    //     "requires": {
    //       "L2CPConfigured": true
    //     }
    //   }, {
    //     "name": "L2CPAllLansFilter",
    //     "type": "string",
    //     "valueEnums": [{
    //       "value": "Discard",
    //       "displayName": "Discard"
    //     }, {
    //       "value": "Tunnel",
    //       "displayName": "Tunnel"
    //     }],
    //     "description": "Enable/Disable L2CP All LANs Filtering",
    //     "displayName": "All LANs Filtering",
    //     "requires": {
    //       "L2CPConfigured": true
    //     }
    //   }, {
    //     "name": "MacFFEnable",
    //     "type": "boolean",
    //     "description": "Enable/Disable MAC Forced Forwarding",
    //     "displayName": "MAC Forced Forwarding",
    //     "defaultValue": false,
    //     "requires": {
    //       "AdvancedSettings": true
    //     }
    //   }, {
    //     "name": "IPSourceVerifyEnable",
    //     "type": "boolean",
    //     "description": "Enable/Disable IP Source Verification",
    //     "displayName": "IP Source Verification",
    //     "defaultValue": false,
    //     "requires": {
    //       "AdvancedSettings": true
    //     }
    //   }, {
    //     "name": "TLANEnable",
    //     "type": "boolean",
    //     "description": "Enable/Disable TLAN",
    //     "displayName": "TLAN",
    //     "defaultValue": false,
    //     "requires": {
    //       "AdvancedSettings": true
    //     }
    //   }, {
    //     "name": "IPv6Transparent",
    //     "type": "boolean",
    //     "description": "Enable/Disable IPv6 Transparent",
    //     "displayName": "IPv6 Transparent",
    //     "defaultValue": false,
    //     "requires": {
    //       "AdvancedSettings": true
    //     }
    //   }, {
    //     "name": "DhcpMode",
    //     "type": "string",
    //     "valueEnums": [{
    //       "value": "None",
    //       "displayName": "None"
    //     }, {
    //       "value": "Snoop",
    //       "displayName": "Snoop"
    //     }, {
    //       "value": "L2Relay",
    //       "displayName": "L2 Relay"
    //     }],
    //     "description": "DHCP Mode",
    //     "displayName": "DHCP Mode",
    //     "defaultValue": "None",
    //     "requires": {
    //       "AdvancedSettings": true
    //     }
    //   }, {
    //     "name": "Option82Profile",
    //     "type": "innerProfile",
    //     "mandatory": true,
    //     "description": "DHCP Option82 Profile",
    //     "displayName": "DHCP Option82 Profile",
    //     "innerProfileCategory": "DHCP Option82",
    //     "requires": {
    //       "AdvancedSettings": true,
    //       "DhcpMode": "L2Relay"
    //     }
    //   }]
    // },

    {
      "_id": "736cf471-b693-4182-b10b-ea12236fdbe9",
      "name": "Video Service",
      "group": "Services",
      "createTime": "2020-07-24T05:11:19.631Z",
      "description": "Define parameters for Video Service.",
      "displayName": "Video Service",
      "serviceType": "Service WAN VLAN",
      "serviceValues": {
        "Name": "Video Service"
      },
      "parameters": [{
        "name": "VlanTagAction",
        "type": "boolean",
        "implies": {
          "false": {
            "X_000631_VlanMuxID": -1,
            "X_000631_VlanMux8021p": -1,
            //"AnyPortAnyServiceEnabled": false  //CCL-41159
          }
        },
        "mandatory": false,
        "valueEnums": [{
          "value": true,
          "displayName": "Tagged"
        }, {
          "value": false,
          "displayName": "Un-tagged"
        }],
        "description": "Enable VLAN.",
        "displayName": "CE Tagging",
        "displayOnly": true,
        "defaultValue": true,
        "requires": {
          "ServiceConnectionType": {
            "$in": ["DHCP", "Bridged"]
          }
        },
        "hidden": true
      }, {
        "name": "X_000631_VlanMuxID",
        "type": "int",
        "maxValue": 4093,
        "minValue": 1,
        "mandatory": false,
        "hidden": true,
        "description": "The VLAN ID.",
        "displayName": "VLAN ID",
        "defaultValue": 7,
        "requires": {
          "VlanTagAction": true
        }
      }, {
        "name": "X_000631_VlanMux8021p",
        "type": "int",
        "mandatory": true,
        "valueEnums": [{
          "value": 0,
          "displayName": "0"
        }, {
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }, {
          "value": 5,
          "displayName": "5"
        }, {
          "value": 6,
          "displayName": "6"
        }, {
          "value": 7,
          "displayName": "7"
        }],
        "description": "The priority of the VLAN.",
        "displayName": "Priority (P-bits)",
        "defaultValue": 4,
        "requires": {
          "VlanTagAction": true,
        }
      }, {
        "name": "X_000631_Dscp2PbitMapEnabled",
        "type": "boolean",
        "description": "Turn on/off DSCP Map for tagged service",
        "displayName": "DSCP to P-bit Map",
        "requires": {
          "VlanTagAction": true,
          "ServiceConnectionType": {
            "$in": ["DHCP", "Bridged"]
          }
        }
      }, {
        "name": "productFamily",
        "type": "string",
        "mandatory": true,
        "valueEnums": [{
          "value": "GigaCenter",
          "displayName": "GigaCenter and GigaHub"
        }, {
          "value": "EXOS",
          "displayName": "EXOS-Powered GigaSpire"
        }],
        "description": "The CPE Product Family.",
        "displayName": "Product Family(s)",
        "defaultValue": "EXOS"
      }, {
        "name": "Mode",
        "type": "string",
        "implies": {
          "RG Routed": {
            "NATEnabled": true,
            "X_000631_IGMPProxy": true,
            "ServiceConnectionType": "DHCP"
          },
          "RG L2 Bridged": {
            "X_000631_IGMPProxy": true,
            "ServiceConnectionType": "Bridged"
          },
          "ONT Full Bridge": {
            "Hairpin": true,
            "IgmpSnoopEnable": true,
            "ServiceConnectionType": "AE_L2_Bridged"
          },
          "ONT Half Bridge": {
            "Hairpin": false,
            "IgmpSnoopEnable": true,
            "ServiceConnectionType": "AE_L2_Bridged"
          }
        },
        "mandatory": true,
        "valueEnums": [{
          "value": "RG Routed",
          "displayName": "RG - Routed"
        }, {
          "value": "RG L2 Bridged",
          "displayName": "RG - L2 Bridged"
        },
          // {
          //   "value": "ONT Full Bridge",
          //   "displayName": "ONT - Full Bridge"
          // }, {
          //   "value": "ONT Half Bridge",
          //   "displayName": "ONT - Half Bridge"
          // }
        ],
        "description": "Specifies the Video Service Mode, RG-Routed / RG-Bridged / ONT-FB / ONT-HB",
        "displayName": "Mode",
        "defaultValue": "RG Routed"
      }, {
        "name": "ServiceConnectionType",
        "type": "string",
        "hidden": true
      }, {
        "name": "NATEnabled",
        "type": "boolean",
        "hidden": true,
        "description": "NAT"
      }, {
        "name": "X_000631_IGMPProxy",
        "type": "boolean",
        "hidden": true,
        "requires": {
          "ServiceConnectionType": {
            "$in": ["DHCP", "Bridged"]
          }
        }
      },
      {
        "name": "EnableIPTV_SSID",
        "type": "boolean",
        "description": "Enable/Disable 5GHz IPTV SSID",
        "displayName": "5GHz IPTV SSID",
        "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.Enable"],
        "requires": {
          "Mode": {
            "$in": [
              "RG Routed",
            ]
          }
        }
      },
      {
        "name": "Enable5GHz_Radio",
        "type": "boolean",
        "hidden": true,
        "description": "Enable 5GHz Wi-Fi Radio",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.RadioEnabled"],
        "requires": {
          "EnableIPTV_SSID": true
        }
      }, {
        "name": "AnyPortAnyServiceEnabled",
        "type": "boolean",
        "description": "Any Port Any Service",
        "displayName": "Any Port Any Service",
        "defaultValue": false,
        "requires": {
          "ServiceConnectionType": "Bridged",
          "VlanTagAction": true
        }
      }, {
        "name": "APAS_EnableIPTV_SSID",
        "type": "boolean",
        "description": "Enable/Disable 5GHz IPTV SSID",
        "displayName": "5GHz IPTV SSID",
        "defaultValue": true,
        "tr098PathOverride": ["InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.Enable"],
        "requires": {
          "AnyPortAnyServiceEnabled": true
        }
      }, {
        "name": "VLAN_Enable",
        "type": "boolean",
        "hidden": true,
        "description": "Enable or Disable VLAN Virtual Interfaces",
        "defaultValue": true,
        "requires": {
          "AnyPortAnyServiceEnabled": true
        }
      },
      {
        "name": "OUI_Enable",
        "type": "boolean",
        "description": "LAN interface OUI binding",
        "displayName": "OUI Matching",
        "defaultValue": true,
        "valueEnums": [{
          "value": true,
          "displayName": "Enabled"
        }, {
          "value": false,
          "displayName": "Disabled"
        }],
        "requires": {
          "productFamily": "GigaCenter",
          "AnyPortAnyServiceEnabled": true
        }
      },
      // {
      //   "name": "OUI_FilterList",
      //   "type": "MACAddressListWithWildcard",
      //   "tooltip": "Separate by comma. Use 'x' or 'X' as wildcard value. Example: To match OUI '00:33:66' to this bridge, type '00:33:66:xx:xx:xx')",
      //   "mandatory": false,
      //   "description": "Comma-separated list of MAC Addresses. Each list entry may optionally specify a bit-mask, where matching of a packet",
      //   "displayName": "OUI List",
      //   "requires": {
      //     "OUI_Enable": true,
      //     "AnyPortAnyServiceEnabled": true
      //   }
      // }, 
      {
        "name": "X_000631_OUI_Enable",
        "displayName": "OUI Matching",
        "description": "LAN interface OUI binding",
        "type": "boolean",
        "defaultValue": true,
        "hidden": true,
        "requires": {
          "productFamily": "EXOS",
          "AnyPortAnyServiceEnabled": true
        }
      },
      {
        "name": "BridgedInterface",
        "type": "stringArray",
        "mandatory": true,
        "valueEnums": [{
          "value": "5GHz IPTV SSID",
          "displayName": "5GHz IPTV SSID"
        }, {
          "value": "LAN Port 1",
          "displayName": "LAN Port 1"
        }, {
          "value": "LAN Port 2",
          "displayName": "LAN Port 2"
        }, {
          "value": "LAN Port 3",
          "displayName": "LAN Port 3"
        }, {
          "value": "LAN Port 4",
          "displayName": "LAN Port 4"
        }],
        "description": "The LAN Interface to be bridged to WAN",
        "displayName": "Bridge LAN Interface",
        "defaultValue": ["5GHz IPTV SSID"],
        "requires": {
          "productFamily": "GigaCenter",
          "ServiceConnectionType": "Bridged",
          "AnyPortAnyServiceEnabled": false
        }
      }, {
        "name": "ExosBridgedInterface",
        "type": "stringArray",
        "mandatory": true,
        "valueEnums": [{
          "value": "5GHz IPTV SSID",
          "displayName": "5GHz IPTV SSID"
        }, {
          "value": "LAN Port 1",
          "displayName": "LAN Port 1"
        }, {
          "value": "LAN Port 2",
          "displayName": "LAN Port 2"
        }, {
          "value": "LAN Port 3",
          "displayName": "LAN Port 3"
        }, {
          "value": "LAN Port 4",
          "displayName": "LAN Port 4"
        }, {
          "value": "LAN Port 5",
          "displayName": "LAN Port 5"
        }],
        "description": "The LAN Interface to be bridged to WAN",
        "displayName": "Bridge LAN Interface",
        "defaultValue": ["5GHz IPTV SSID"],
        "requires": {
          "productFamily": "EXOS",
          "ServiceConnectionType": "Bridged",
          "AnyPortAnyServiceEnabled": false
        }
      },  // {
      //   "name": "VLANID",
      //   "type": "int",
      //   "maxValue": 4094,
      //   "minValue": 0,
      //   "mandatory": false,
      //   "description": "The (outer) VLAN ID.",
      //   "displayName": "VLAN ID",
      //   "defaultValue": 0,
      //   "requires": {
      //     "ServiceConnectionType": "AE_L2_Bridged"
      //   }
      // }, 
      {
        "name": "MatchRule",
        "type": "string",
        "valueEnums": [{
          "value": "None",
          "displayName": "None"
        }, {
          "value": "Vid",
          "displayName": "VLAN ID"
        }, {
          "value": "Pbit",
          "displayName": "Pbit"
        }, {
          "value": "VidPbit",
          "displayName": "VLAN ID + P-Bits"
        }, {
          "value": "Ethertype",
          "displayName": "EtherType"
        }, {
          "value": "Untagged",
          "displayName": "Untagged"
        }, {
          "value": "UntaggedSA",
          "displayName": "Untagged + Src MAC"
        }, {
          "value": "Tagged",
          "displayName": "Tagged"
        }, {
          "value": "IPv6Untagged",
          "implies": {
            "TagAction": "Drop"
          },
          "displayName": "Untagged IPv6"
        }, {
          "value": "TaggedIPv6",
          "implies": {
            "TagAction": "Drop"
          },
          "displayName": "Tagged IPv6"
        }],
        "description": "Defines how the device classifies subscriber traffic to determine the service in which it belongs",
        "displayName": "Subscriber Traffic Match Rule",
        "displayOnly": true,
        "requires": {
          "ServiceConnectionType": "AE_L2_Bridged"
        }
      }, {
        "name": "VLANIDFilter",
        "type": "int",
        "maxValue": 4095,
        "minValue": -1,
        "description": "VLAN ID of Subscriber traffic that is used to match for this video service",
        "displayName": "VLAN ID to match on",
        "displayOnly": true,
        "defaultValue": -1,
        "requires": {
          "MatchRule": {
            "$in": ["Vid", "VidPbit"]
          }
        }
      }, {
        "name": "X_000631_PbitFilter",
        "type": "int",
        "mandatory": false,
        "valueEnums": [{
          "value": 0,
          "displayName": "0"
        }, {
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }, {
          "value": 5,
          "displayName": "5"
        }, {
          "value": 6,
          "displayName": "6"
        }, {
          "value": 7,
          "displayName": "7"
        }],
        "description": "P-Bits of Subscriber traffic that is used to match for this video service",
        "displayName": "P-Bits to match on",
        "displayOnly": true,
        "requires": {
          "MatchRule": {
            "$in": ["Pbit", "VidPbit"]
          }
        }
      }, {
        "name": "EthertypeFilterList",
        "type": "string",
        "valueEnums": [{
          "value": "34915,34916",
          "displayName": "PPPoE"
        }, {
          "value": "2054",
          "displayName": "ARP"
        }, {
          "value": "2048",
          "displayName": "IPv4"
        }, {
          "value": "34525",
          "displayName": "IPv6"
        }],
        "description": "EtherType of Subscriber traffic that is used to match for this video service",
        "displayName": "EtherType Filter",
        "displayOnly": true,
        "maxStringLength": 256,
        "requires": {
          "MatchRule": "Ethertype"
        }
      }, {
        "name": "SourceMACAddressFilterList",
        "type": "string",
        "tooltip": "Comma-separated list of MAC Address/Mask pairs, e.g. \"11:22:33:00:00:00/FF:FF:FF:00:00:00\" or \"11:22:33:00:00:00/FF:FF:FF:00:00:00,44:55:66:00:00:00/FF:FF:FF:00:00:00\". \nThe masks must be either \"FF:FF:FF:00:00:00\" or \"FF:FF:FF:FF:FF:FF\"",
        "mandatory": false,
        "description": "Source MAC Address Filters of Subscriber traffic that is used to match for this video service",
        "displayName": "Source MAC Address Filters",
        "displayOnly": true,
        "maxStringLength": 1160,
        "minStringLength": 1,
        "requires": {
          "MatchRule": "UntaggedSA"
        }
      }, {
        "name": "TagAction",
        "type": "string",
        "mandatory": false,
        "valueEnums": [{
          "value": "AddVidExplicitPbit",
          "displayName": "Add Tag with Explicit Pbit",
          "requires": {
            "MatchRule": {
              "$in": ["Untagged", "UntaggedSA", "Ethertype", "Vid", "VidPbit", "Pbit", "Tagged", "SA", "DA"]
            }
          }
        }, {
          "value": "AddVidDscp2Pbit",
          "displayName": "Add Tag and convert DSCP to Pbit",
          "requires": {
            "MatchRule": {
              "$in": ["Untagged", "UntaggedSA"]
            }
          }
        }, {
          "value": "ChangeVidPropagatePbit",
          "displayName": "Change Tag and Propagate Pbit",
          "requires": {
            "MatchRule": {
              "$in": ["Vid"]
            }
          }
        }, {
          "value": "ChangeVidExplicitPbit",
          "displayName": "Change Tag with Explicit Pbit",
          "requires": {
            "MatchRule": {
              "$in": ["Vid", "VidPbit"]
            }
          }
        }, {
          "value": "AddVidPropagatePbit",
          "displayName": "Add Tag and Propogate Pbit",
          "requires": {
            "MatchRule": {
              "$in": ["Vid", "Tagged"]
            }
          }
        }, {
          "value": "ChangeVidPropagatePbit_AddVidExplicitPbit",
          "displayName": "Change to Inner Tag and Propagate Pbit, Add Outer Tag with Explicit Pbit",
          "requires": {
            "MatchRule": {
              "$in": ["Vid"]
            }
          }
        }, {
          "value": "ChangeVidPropagatePbit_AddVidPropagatePbit",
          "displayName": "Change to Inner Tag and Propagate Pbit, Add Outer Tag and Propagate Pbit",
          "requires": {
            "MatchRule": {
              "$in": ["Vid", "VidPbit"]
            }
          }
        }, {
          "value": "Drop",
          "displayName": "Drop",
          "requires": {
            "MatchRule": {
              "$in": ["IPv6Untagged", "TaggedIPv6"]
            }
          }
        }],
        "description": "Tag Action (on matched subscriber traffic)",
        "displayName": "Tag Action (on matched subscriber traffic)",
        "displayOnly": true,
        "requires": {
          "MatchRule": {
            "$in": ["Vid", "Pbit", "VidPbit", "Ethertype", "Untagged", "UntaggedSA", "SA", "DA", "Tagged", "IPv6Untagged", "TaggedIPv6"]
          }
        }
      }, {
        "name": "X_CALIX_SXACC_TAG_ACTION_FILTERS",
        "type": "stringArray",
        "hidden": true
      }, {
        "name": "InnerVLANID",
        "type": "int",
        "maxValue": 4095,
        "minValue": 0,
        "mandatory": false,
        "description": "Value of the inner VLAN ID to be used for double tagged operations.",
        "displayName": "Inner Tag VLAN ID",
        "defaultValue": 0,
        "requires": {
          "ServiceConnectionType": "AE_L2_Bridged",
          "TagAction": {
            "$in": ["ChangeVidPropagatePbit_AddVidExplicitPbit", "ChangeVidPropagatePbit_AddVidPropagatePbit"]
          }
        }
      }, {
        "name": "Pbit",
        "type": "int",
        "mandatory": true,
        "valueEnums": [{
          "value": 0,
          "displayName": "0",
          "requires": {
            "TagAction": {
              "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
            }
          }
        }, {
          "value": 1,
          "displayName": "1",
          "requires": {
            "TagAction": {
              "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
            }
          }
        }, {
          "value": 2,
          "displayName": "2",
          "requires": {
            "TagAction": {
              "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
            }
          }
        }, {
          "value": 3,
          "displayName": "3",
          "requires": {
            "TagAction": {
              "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
            }
          }
        }, {
          "value": 4,
          "displayName": "4",
          "requires": {
            "TagAction": {
              "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
            }
          }
        }, {
          "value": 5,
          "displayName": "5",
          "requires": {
            "TagAction": {
              "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
            }
          }
        }, {
          "value": 6,
          "displayName": "6",
          "requires": {
            "TagAction": {
              "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
            }
          }
        }, {
          "value": 7,
          "displayName": "7",
          "requires": {
            "TagAction": {
              "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
            }
          }
        }, {
          "value": -1,
          "displayName": "Propagate",
          "requires": {
            "ServiceConnectionType": "AE_L2_Bridged",
            "TagAction": {
              "$in": ["AddVidPropagatePbit", "ChangeVidPropagatePbit", "ChangeVidPropagatePbit_AddVidPropagatePbit"]
            }
          }
        }, {
          "value": -2,
          "displayName": "DSCP to P-Bits",
          "requires": {
            "ServiceConnectionType": "AE_L2_Bridged",
            "TagAction": {
              "$in": ["AddVidDscp2Pbit"]
            }
          }
        }],
        "description": "The priority of the (outer) VLAN.",
        "displayName": "Priority (P-Bits)",
        "defaultValue": 3,
        "requires": {
          "ServiceConnectionType": "AE_L2_Bridged",
          "TagAction": {
            "$in": ["AddVidExplicitPbit", "ChangeVidExplicitPbit", "ChangeVidPropagatePbit_AddVidExplicitPbit"]
          }
        }
      }, {
        "name": "X_CALIX_SXACC_AE_L2_BRIDGE_MBR_PORTS",
        "type": "stringArray",
        "mandatory": false,
        "valueEnums": [{
          "value": "1",
          "displayName": "ETH Port 1"
        }, {
          "value": "2",
          "displayName": "ETH Port 2"
        }, {
          "value": "3",
          "displayName": "ETH Port 3"
        }, {
          "value": "4",
          "displayName": "ETH Port 4"
        }],
        "description": "The LAN ETH Ports belong to this AE L2 Bridge",
        "displayName": "Member ETH Ports",
        "defaultValue": ["1"],
        "requires": {
          "ServiceConnectionType": "AE_L2_Bridged"
        }
      }, {
        "name": "Hairpin",
        "type": "boolean",
        "hidden": true,
        "requires": {
          "ServiceConnectionType": "AE_L2_Bridged"
        }
      }, {
        "name": "IgmpSnoopEnable",
        "type": "boolean",
        "hidden": true,
        "requires": {
          "ServiceConnectionType": "AE_L2_Bridged"
        }
      }, {
        "name": "QueryInterval",
        "type": "int",
        "tooltip": "Range: 10..3600, Default: 125",
        "maxValue": 3600,
        "minValue": 10,
        "displayName": "IGMP Query Interval (in seconds)",
        "tr098PathOverride": ["InternetGatewayDevice.Layer2Bridging.X_000631_IgmpGlobal.QueryInterval"],
      },
      //  {
      //   "name": "X_000631_MaxStreams",
      //   "type": "int",
      //   "tooltip": "Range: 0..512 (0 means no limit)",
      //   "maxValue": 512,
      //   "minValue": 0,
      //   "description": "Maximum number of multicast streams (range 0..512).",
      //   "displayName": "Maximum # of Multicast Streams"
      // },
      //CCL-66221 removed
      // {
      //   "name": "X_CALIX_SXACC_BW_PROFILE",
      //   "type": "innerProfile",
      //   "description": "BW Profile",
      //   "displayName": "BW Profile",
      //   "innerProfileCategory": "Bandwidth",
      //   "requires": {
      //     "productFamily": "GigaCenter"
      //   },
      //   "hidden": false,
      // },


      {
        "name": "AdvancedSettings",
        "type": "boolean",
        "valueEnums": [{
          "value": true,
          "displayName": "Show"
        }, {
          "value": false,
          "displayName": "Hide"
        }],
        "description": "Show/Hide Advanced ONT Bridge Settings",
        "displayName": "Advanced Settings",
        "displayOnly": true,
        "defaultValue": false,
        "inputAuxiliary": true,
        "requires": {
          "ServiceConnectionType": "AE_L2_Bridged"
        }
      },

      {
        "name": "USMaxMcastBcastRate",
        "type": "boolean",
        "mandatory": false,
        "displayName": "US Max Mcast/Bcast Rate",
        "displayOnly": true,
        "defaultValue": false,
        "requires": {
          "Mode": {
            "$in": ["ONT Full Bridge", "ONT Half Bridge"]
          },
          "TLANEnable": false
        }
      }, {
        "name": "UpstreamCIR",
        "type": "string",
        "tooltip": "Please enter a value suffix k for Kbps (with 1k-10240k)",
        "mandatory": false,
        "displayName": "US Max Rate",
        "defaultValue": "24k",
        "stringPattern": "^([1-9]\\d{0,3}|10[0-1]\\d\\d|102[0-3]\\d|10240)k$",
        "validationErrorMessage": "Please enter a value suffix k for Kbps (with 1k-10240k)",
        "requires": {
          "USMaxMcastBcastRate": true
        }
      },
      //CCL-66221 removed
      // {
      //   "name": "X_000631_MvrProfile",
      //   "type": "innerProfile",
      //   "displayName": "Multicast VLAN Registration (MVR) Profile",
      //   "innerProfileCategory": "Video - Multicast VLAN Registration (MVR)",
      //   "hidden": false
      // },
      // {
      //   "name": "X_000631_McastFilter",
      //   "type": "innerProfile",
      //   "displayName": "Multicast Range Filter Profile",
      //   "innerProfileCategory": "Video - Multicast Range Filters",
      //   "hidden": false
      // },
      {
        "name": "MacLimit",
        "type": "int",
        "maxValue": 512,
        "minValue": 0,
        "description": "controls the MAC limiting feature. Default is 0 which means no MAC limiting. Range: 0..512",
        "displayName": "MAC Limit",
        "defaultValue": 0,
        "requires": {
          "AdvancedSettings": true
        }
      }, {
        "name": "L2CPConfigured",
        "type": "boolean",
        "description": "Enable/Disable L2CP",
        "displayName": "L2CP",
        "defaultValue": false,
        "requires": {
          "AdvancedSettings": true
        }
      }, {
        "name": "L2CPBpduFilter",
        "type": "string",
        "valueEnums": [{
          "value": "Discard",
          "displayName": "Discard"
        }, {
          "value": "Tunnel",
          "displayName": "Tunnel"
        }],
        "description": "Enable/Disable L2CP BPDU Filtering",
        "displayName": "BPDU Filtering",
        "requires": {
          "L2CPConfigured": true
        }
      }, {
        "name": "L2CPGarpFilter",
        "type": "string",
        "valueEnums": [{
          "value": "Discard",
          "displayName": "Discard"
        }, {
          "value": "Tunnel",
          "displayName": "Tunnel"
        }],
        "description": "Enable/Disable L2CP GARP Filtering",
        "displayName": "GARP Filtering",
        "requires": {
          "L2CPConfigured": true
        }
      }, {
        "name": "L2CPAllLansFilter",
        "type": "string",
        "valueEnums": [{
          "value": "Discard",
          "displayName": "Discard"
        }, {
          "value": "Tunnel",
          "displayName": "Tunnel"
        }],
        "description": "Enable/Disable L2CP All LANs Filtering",
        "displayName": "All LANs Filtering",
        "requires": {
          "L2CPConfigured": true
        }
      }, {
        "name": "MacFFEnable",
        "type": "boolean",
        "description": "Enable/Disable MAC Forced Forwarding",
        "displayName": "MAC Forced Forwarding",
        "defaultValue": false,
        "requires": {
          "AdvancedSettings": true
        }
      }, {
        "name": "IPSourceVerifyEnable",
        "type": "boolean",
        "description": "Enable/Disable IP Source Verification",
        "displayName": "IP Source Verification",
        "defaultValue": false,
        "requires": {
          "AdvancedSettings": true
        }
      }, {
        "name": "TLANEnable",
        "type": "boolean",
        "description": "Enable/Disable TLAN",
        "displayName": "TLAN",
        "defaultValue": false,
        "requires": {
          "AdvancedSettings": true
        }
      }, {
        "name": "IPv6Transparent",
        "type": "boolean",
        "description": "Enable/Disable IPv6 Transparent",
        "displayName": "IPv6 Transparent",
        "defaultValue": false,
        "requires": {
          "AdvancedSettings": true
        }
      }, {
        "name": "DhcpMode",
        "type": "string",
        "valueEnums": [{
          "value": "None",
          "displayName": "None"
        }, {
          "value": "Snoop",
          "displayName": "Snoop"
        }, {
          "value": "L2Relay",
          "displayName": "L2 Relay"
        }],
        "description": "DHCP Mode",
        "displayName": "DHCP Mode",
        "defaultValue": "None",
        "requires": {
          "AdvancedSettings": true
        }
      }, {
        "name": "Option82Profile",
        "type": "innerProfile",
        "mandatory": false,
        "description": "DHCP Option82 Profile",
        "displayName": "DHCP Option82 Profile",
        "innerProfileCategory": "DHCP Option82",
        "requires": {
          "AdvancedSettings": true,
          "DhcpMode": "L2Relay"
        }
      }]
    },
    {
      "name": "Voice Service",
      "displayName": "Voice Service",
      "description": "Define parameters for Voice Service.",
      "group": "Services",
      "serviceType": "Service Voice",
      "parameters": [{
        "name": "VlanTagAction",
        "displayName": "CE Tagging",
        "description": "Enable VLAN.",
        "type": "boolean",
        "defaultValue": true,
        "valueEnums": [{
          "value": true,
          "displayName": "Tagged"
        }, {
          "value": false,
          "displayName": "Untagged"
        }],
        "displayOnly": true,
        "implies": {
          "false": {
            "X_000631_VlanMuxID": -1,
            "X_000631_VlanMux8021p": -1
          }
        },
        "requires": {
          "Type": {
            "$in": ["SIP", "H.248", "MGCP", "X_000631_TDMGW"]
          }
        },
        "hidden": true
      }, {
        "name": "X_000631_VlanMuxID",
        "displayName": "VLAN ID",
        "description": "The VLAN ID.",
        "type": "int",
        "mandatory": false,
        "hidden": true,
        "minValue": 1,
        "maxValue": 4093,
        "defaultValue": 2,
        "requires": {
          "VlanTagAction": true
        }
      }, {
        "name": "X_000631_VlanMux8021p",
        "displayName": "Priority (P-bits)",
        "description": "The priority of the VLAN.",
        "type": "int",
        "mandatory": true,
        "valueEnums": [{
          "value": 0,
          "displayName": "0"
        }, {
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }, {
          "value": 5,
          "displayName": "5"
        }, {
          "value": 6,
          "displayName": "6"
        }, {
          "value": 7,
          "displayName": "7"
        }],
        "defaultValue": 6,
        "requires": {
          "VlanTagAction": true
        }
      }, {
        "name": "Model",
        "displayName": "Product Family",
        "description": "The CPE Product Family.",
        "type": "string",
        "mandatory": true,
        "valueEnums": [{
          "value": "GigaCenter",
          "displayName": "GigaCenter & GigaHub & GigaSpire(GS4227E,GS4220E,GS4227,GS4227W,GS4237)"
        }, {
          "value": "T-Series",
          "displayName": "T-Series",
          "requires": {
            "Type": "SIP"
          }
        }],
        "defaultValue": "GigaCenter",
        "implies": {
          "GigaCenter": {
            "ipType": "IPv4"
          },
          "T-Series": {
            "RegistrarServerTransport": "UDP"
          }
        }
      }, {
        "name": "Type",
        "displayName": "Service Type",
        "description": "The Voice Service Protocol.",
        "type": "string",
        "hidden": true,
        "valueEnums": [{
          "value": "SIP",
          "displayName": "SIP"
        }, {
          "value": "H.248",
          "displayName": "H.248",
          "requires": {
            "Model": "GigaCenter"
          }
        }, {
          "value": "MGCP",
          "displayName": "MGCP",
          "requires": {
            "Model": "GigaCenter"
          }
        }, {
          "value": "X_000631_TDMGW",
          "displayName": "TDM GW",
          "requires": {
            "Model": "GigaCenter"
          }
        }],
        "defaultValue": "SIP",
        "implies": {
          "SIP": {
            "ControlDscpValue": 46
          }
        }
      }, {
        "name": "ServiceConnectionType",
        "type": "string",
        "defaultValue": "DHCP",
        "hidden": true
      }, 
      {
        "name": "FramingType",
        "displayName": "WAN Connection Framing Type",
        "description": "Specifies the WAN Connection Framing Type, IPoE vs. PPPoE.",
        "type": "string",
        "requires": {
          "Model": "GigaCenter"
        },
        "valueEnums": [{
          "value": "IPoE",
          "displayName": "IPoE"
        }, {
          "value": "PPPoE",
          "displayName": "PPPoE"
        }],
        "defaultValue": "IPoE",
        "implies": {
          "IPoE": {
            "ServiceConnectionType": "DHCP"
          },
          "PPPoE": {
            "ServiceConnectionType": "Static"
          }
        }
      },
       {
        "name": "ipType",
        "displayName": "IP Type (For EXOS Only)",
        "type": "string",
        "valueEnums": [{
          "value": "IPv4",
          "displayName": "IPv4"
        }],
        "defaultValue": "IPv4",
        "requires": {
          "Model": "GigaCenter",
          "FramingType": "IPoE"
        }
      }, {
        "name": "RTPBasePort",
        "displayName": "RTP Base Port",
        "description": "Base of port range to be used for incoming RTP streams for this profile.",
        "type": "int",
        "minValue": 49152,
        "maxValue": 65280,
        "defaultValue": 49152,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.RTP.LocalPortMin"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "PrimaryGWController",
        "description": "Primary H.248 Gateway controller or IP address of the main H.248 call agent",
        "type": "HostNameOrIPAddress",
        "mandatory": false,
        "displayName": "Primary GW Controller",
        "maxStringLength": 256,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_H248.PrimaryGwController"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "PrimarySwitchType",
        "description": "Primary H.248 Gateway controller switch type",
        "type": "string",
        "defaultValue": "GENERIC",
        "displayName": "Primary Switch Type",
        "maxStringLength": 256,
        "valueEnums": [{
          "value": "GENERIC",
          "displayName": "GENERIC"
        }, {
          "value": "CS2000",
          "displayName": "CS2000"
        }, {
          "value": "CS1500",
          "displayName": "CS1500"
        }, {
          "value": "METASWITCH",
          "displayName": "METASWITCH"
        }, {
          "value": "SONUS",
          "displayName": "SONUS"
        }, {
          "value": "GENBANDG2",
          "displayName": "GENBANDG2"
        }, {
          "value": "GENBANDG9",
          "displayName": "GENBANDG9"
        }, {
          "value": "TAQUA",
          "displayName": "TAQUA"
        }, {
          "value": "TSS",
          "displayName": "TSS"
        }, {
          "value": "HUAWEI",
          "displayName": "HUAWEI"
        }],
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_H248.PrimaryGwSwitchType"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "SecondaryGWController",
        "description": "Secondary H.248 Gateweay controller or IP address",
        "type": "HostNameOrIPAddress",
        "displayName": "Secondary GW Controller",
        "maxStringLength": 256,
        "allowEmpty": true,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_H248.SecondaryGwController"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "SecondarySwitchType",
        "description": "Secondary H.248 Gateway controller switch type",
        "type": "string",
        "defaultValue": "GENERIC",
        "displayName": "Secondary Switch Type",
        "maxStringLength": 256,
        "valueEnums": [{
          "value": "GENERIC",
          "displayName": "GENERIC"
        }, {
          "value": "CS2000",
          "displayName": "CS2000"
        }, {
          "value": "CS1500",
          "displayName": "CS1500"
        }, {
          "value": "METASWITCH",
          "displayName": "METASWITCH"
        }, {
          "value": "SONUS",
          "displayName": "SONUS"
        }, {
          "value": "GENBANDG2",
          "displayName": "GENBANDG2"
        }, {
          "value": "GENBANDG9",
          "displayName": "GENBANDG9"
        }, {
          "value": "TAQUA",
          "displayName": "TAQUA"
        }, {
          "value": "TSS",
          "displayName": "TSS"
        }, {
          "value": "HUAWEI",
          "displayName": "HUAWEI"
        }],
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_H248.SecondaryGwSwitchType"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "TermPrefixH248",
        "description": "Used to termination prefix",
        "type": "string",
        "defaultValue": "TP",
        "displayName": "Term Prefix",
        "maxStringLength": 25,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_H248.TermPrefix"],
        "stringPattern": "^[^\\s]*$",
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "EphemeralTermID",
        "description": "Ephemeral termination ID",
        "type": "string",
        "defaultValue": "RTP",
        "displayName": "Ephemeral Termination ID",
        "maxStringLength": 26,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_H248.EphemeralTermId"],
        "stringPattern": "^[^\\s]*$",
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "ESAMode",
        "description": "When true, enable Emergency Stand Alone mode",
        "type": "boolean",
        "defaultValue": false,
        "displayName": "ESA Mode",
        "maxStringLength": 26,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_H248.ESAMode"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "ServerIP",
        "displayName": "Server IP",
        "description": "Tdm Server IP address",
        "mandatory": false,
        "type": "IPAddress",
        "allowEmpty": true,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_TdmGw.ServerIp"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "X_000631_TDMGW"
        }
      }, {
        "name": "DHCPFilter",
        "displayName": "DHCP Filter",
        "description": "When true, use the server IP as DHCP offer filter.",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_TdmGw.DhcpFilter"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "X_000631_TDMGW"
        }
      }, {
        "name": "RTPCodec1st_H248",
        "displayName": "RTP Codec",
        "description": "The first order RTP Codec.",
        "type": "string",
        "valueEnums": [{
          "value": "G.711MuLaw",
          "displayName": "G.711MuLaw"
        }, {
          "value": "G.711ALaw",
          "displayName": "G.711ALaw"
        }],
        "defaultValue": "G.711MuLaw",
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_1ST_ORDER.Codec"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "PacketRate1st_H248",
        "displayName": "Packet Rate (ms)",
        "description": "The first order packet rate (period) in milliseconds.",
        "type": "string",
        "valueEnums": [{
          "value": 10,
          "displayName": "10"
        }, {
          "value": 20,
          "displayName": "20"
        }],
        "defaultValue": 10,
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_1ST_ORDER.PacketizationPeriod"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "H.248"
        }
      }, {
        "name": "RTPCodec1st_TDMGW",
        "displayName": "", //RTP Codec
        "description": "The first order RTP Codec.",
        "type": "string",
        // "hidden": true,
        "defaultValue": "G.711MuLaw",
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_1ST_ORDER.Codec"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "X_000631_TDMGW"
        }
      }, {
        "name": "ProxyServer",
        "displayName": "Proxy Server",
        "description": "Host name or IP address of the SIP proxy server.",
        "type": "HostNameOrIPAddress",
        "mandatory": false,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.ProxyServer"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "ProxyServerPort",
        "displayName": "Proxy Server Port",
        "description": "Destination port to be used in connecting to the SIP server.",
        "type": "unsignedInt",
        "minValue": 0,
        "maxValue": 65535,
        "defaultValue": 5060,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.ProxyServerPort"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "ProxyServerSecondary",
        "displayName": "Secondary Proxy Server",
        "description": "Host name or IP address of the SIP secondary proxy server.",
        "type": "HostNameOrIPAddress",
        "allowEmpty": true,
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP",
          "ProxyServer": "notEmpty"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_000631_ProxyServerSecondary"]
      }, {
        "name": "X_SecondaryProxyServer",
        "displayName": "Secondary Proxy Server",
        "description": "Host name or IP address of the SIP secondary proxy server.",
        "type": "HostNameOrIPAddress",
        "allowEmpty": true,
        "requires": {
          "Model": "T-Series",
          "ProxyServer": "notEmpty"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_SecondaryProxyServer"]
      }, {
        "name": "ProxyServerPortSecondary",
        "displayName": "Secondary Proxy Server Port",
        "description": "Secondary proxy destination port to be used in connecting to the SIP server.",
        "type": "unsignedInt",
        "minValue": 0,
        "maxValue": 65535,
        "defaultValue": 5060,
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP",
          "ProxyServer": "notEmpty"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_000631_ProxyServerPortSecondary"]
      }, {
        "name": "X_SecondaryProxyServerPort",
        "displayName": "Secondary Proxy Server Port",
        "description": "Secondary proxy destination port to be used in connecting to the SIP server.",
        "type": "unsignedInt",
        "minValue": 0,
        "maxValue": 65535,
        "defaultValue": 5060,
        "requires": {
          "Model": "T-Series",
          "ProxyServer": "notEmpty"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_SecondaryProxyServerPort"]
      }, {
        "name": "OutboundProxy",
        "displayName": "Outbound Proxy",
        "description": "T-Series Outbound Proxy.",
        "type": "HostNameOrIPAddress",
        "allowEmpty": true,
        "requires": {
          "Model": "T-Series"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.OutboundProxy"]
      }, {
        "name": "OutboundProxyPort",
        "displayName": "Outbound Proxy Port",
        "description": "T-Series Outbound Proxy Port.",
        "type": "unsignedInt",
        "minValue": 0,
        "maxValue": 65535,
        "defaultValue": "5060",
        "requires": {
          "Model": "T-Series"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.OutboundProxyPort"]
      },

      {
        "name": "Revertive",
        "displayName": "Revertive",
        "description": "Once the Revertive feature is enabled, Options Timer should automatically be enabled with the default value or the value saved from the configuration. User is allowed to enable Options timer but leave the revertive feature disabled",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_000631_RevertiveSwitching"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        "implies": {
          "true": {
            "OptionsTimerSwitch": true
          }
        }
      },
      {
        "name": "OptionsTimerSwitch",
        "displayName": "Options Timer",
        "description": "It shouldn't be edited when Revertive is true",
        "type": "boolean",
        "displayOnly": true,
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        //"defaultValue": false,
        "defaultValue": [
          {
            "condition": { "Revertive": false },
            "value": false
          }
        ]
      },
      {
        "name": "OptionsInterval",
        "displayName": "Options Interval(Seconds)",
        "description": "X_000631_OptionsInterval",
        "type": "unsignedInt",
        "mandatory": false,
        "defaultValue": 60,
        "minValue": 60,
        "maxValue": 65535,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_000631_OptionsInterval"],
        "requires": {
          "OptionsTimerSwitch": true
        }
      },

      {
        "name": "RegistrarServer",
        "displayName": "Registrar Server",
        "description": "T-Series Registrar Server.",
        "type": "HostNameOrIPAddress",
        "mandatory": true,
        "requires": {
          "Model": "T-Series"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.RegistrarServer"]
      }, {
        "name": "RegistrarServerPort",
        "displayName": "Registrar Server Port",
        "description": "T-Series Registrar Server Port.",
        "type": "unsignedInt",
        "mandatory": true,
        "minValue": 0,
        "maxValue": 65535,
        "requires": {
          "Model": "T-Series"
        },
        "defaultValue": 5060,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.RegistrarServerPort"]
      }, {
        "name": "RegistrarServerTransport",
        "description": "T-Series Registrar Server Transport.",
        "type": "string",
        "hidden": true,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.RegistrarServerTransport"]
      }, {
        "name": "UserAgentPort",
        "displayName": "User Agent Port",
        "description": "T-Series User Agent Port.",
        "type": "unsignedInt",
        "minValue": 0,
        "maxValue": 65535,
        "mandatory": true,
        "requires": {
          "Model": "T-Series"
        },
        "defaultValue": 5060,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.UserAgentPort"]
      }, {
        "name": "DNSPrimary",
        "displayName": "Primary DNS Server",
        "description": "Primary DNS Server for proxy server.",
        "type": "IPAddress",
        "allowEmpty": true,
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_000631_DnsPrimary"]
      }, {
        "name": "DNSSecondary",
        "displayName": "Secondary DNS Server",
        "description": "Secondary DNS Server for proxy server.",
        "type": "IPAddress",
        "allowEmpty": true,
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_000631_DnsSecondary"]
      },
      {
        "name": "RTPCodec1st",
        "displayName": "RTP Codec First Order",
        "description": "The first order RTP Codec.",
        "type": "string",
        "mandatory": true,
        "valueEnums": [{
          "value": "G.711MuLaw",
          "displayName": "G.711MuLaw"
        }, {
          "value": "G.711ALaw",
          "displayName": "G.711ALaw"
        }, {
          "value": "G.729",
          "displayName": "G.729"
        }, {
          "value": "G.723.1",
          "displayName": "G.723.1",
          "requires": {
            "Model": "T-Series"
          }
        }],
        "defaultValue": "G.711MuLaw",
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_1ST_ORDER.Codec"],
        "requires": {
          "Type": "SIP"
        }
      },
      {
        "name": "PacketRate1st_TDMGW",
        "displayName": "Packet Rate (ms)",
        "description": "The first order packet rate (period) in milliseconds.",
        "type": "string",
        "valueEnums": [{
          "value": 10,
          "displayName": "10"
        }, {
          "value": 20,
          "displayName": "20"
        }],
        "defaultValue": 10,
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_1ST_ORDER.PacketizationPeriod"],
        "requires": {
          "Type": "X_000631_TDMGW"
        }
      }, {
        "name": "PacketRate1st",
        "displayName": "Packet Rate First Order (ms)",
        "description": "The first order packet rate (period) in milliseconds.",
        "type": "int",
        "valueEnums": [{
          "value": 10,
          "displayName": "10"
        }, {
          "value": 20,
          "displayName": "20"
        }, {
          "value": 30,
          "displayName": "30"
        }],
        "defaultValue": 10,
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_1ST_ORDER.PacketizationPeriod"],
        "requires": {
          "Type": {
            "$in": ["SIP"]
          }
        }
      }, {
        "name": "SilenceSuppression1st",
        "displayName": "Silence Suppression First Order",
        "description": "The first order boolean value indicates whether to support silence suppression for the codec.",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_1ST_ORDER.SilenceSuppression"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "RTPCodec2nd",
        "displayName": "RTP Codec Second Order",
        "description": "The second order RTP Codec.",
        "type": "string",
        "valueEnums": [{
          "value": "G.711MuLaw",
          "displayName": "G.711MuLaw"
        }, {
          "value": "G.711ALaw",
          "displayName": "G.711ALaw"
        }, {
          "value": "G.729",
          "displayName": "G.729"
        }, {
          "value": "G.723.1",
          "displayName": "G.723.1",
          "requires": {
            "Model": "T-Series"
          }
        }, {
          "value": "",
          "displayName": "None"
        }],
        "defaultValue": "",
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_2ND_ORDER.Codec"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "PacketRate2nd",
        "displayName": "Packet Rate Second Order (ms)",
        "description": "The second order packet rate (period) in milliseconds.",
        "type": "int",
        "valueEnums": [{
          "value": 10,
          "displayName": "10"
        }, {
          "value": 20,
          "displayName": "20"
        }, {
          "value": 30,
          "displayName": "30"
        }],
        "defaultValue": 10,
        "tr098PathOverride": [
          "X_CALIX_SXACC_RTP_CODEC_2ND_ORDER.PacketizationPeriod"
        ],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "SilenceSuppression2nd",
        "displayName": "Silence Suppression Second Order",
        "description": "The second order boolean value indicates whether to support silence suppression for the codec.",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": [
          "X_CALIX_SXACC_RTP_CODEC_2ND_ORDER.SilenceSuppression"
        ],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "RTPCodec3rd",
        "displayName": "RTP Codec Third Order",
        "description": "The third order RTP Codec.",
        "type": "string",
        "valueEnums": [{
          "value": "G.711MuLaw",
          "displayName": "G.711MuLaw"
        }, {
          "value": "G.711ALaw",
          "displayName": "G.711ALaw"
        }, {
          "value": "G.729",
          "displayName": "G.729"
        }, {
          "value": "G.723.1",
          "displayName": "G.723.1",
          "requires": {
            "Model": "T-Series"
          }
        }, {
          "value": "",
          "displayName": "None"
        }],
        "defaultValue": "",
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_3RD_ORDER.Codec"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "PacketRate3rd",
        "displayName": "Packet Rate Third Order (ms)",
        "description": "The third order packet rate (period) in milliseconds.",
        "type": "int",
        "valueEnums": [{
          "value": 10,
          "displayName": "10"
        }, {
          "value": 20,
          "displayName": "20"
        }, {
          "value": 30,
          "displayName": "30"
        }],
        "defaultValue": 10,
        "tr098PathOverride": [
          "X_CALIX_SXACC_RTP_CODEC_3RD_ORDER.PacketizationPeriod"
        ],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "SilenceSuppression3rd",
        "displayName": "Silence Suppression Third Order",
        "description": "The third order boolean value indicates whether to support silence suppression for the codec.",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": [
          "X_CALIX_SXACC_RTP_CODEC_3RD_ORDER.SilenceSuppression"
        ],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "RTPCodec4th",
        "displayName": "RTP Codec Fourth Order",
        "description": "The fourth order RTP Codec.",
        "type": "string",
        "valueEnums": [{
          "value": "G.711MuLaw",
          "displayName": "G.711MuLaw"
        }, {
          "value": "G.711ALaw",
          "displayName": "G.711ALaw"
        }, {
          "value": "G.729",
          "displayName": "G.729"
        }, {
          "value": "G.723.1",
          "displayName": "G.723.1"
        }, {
          "value": "",
          "displayName": "None"
        }],
        "defaultValue": "",
        "tr098PathOverride": ["X_CALIX_SXACC_RTP_CODEC_4TH_ORDER.Codec"],
        "requires": {
          "Model": "T-Series"
        }
      }, {
        "name": "PacketRate4th",
        "displayName": "Packet Rate Fourth Order (ms)",
        "description": "The fourth order packet rate (period) in milliseconds.",
        "type": "int",
        "valueEnums": [{
          "value": 10,
          "displayName": "10"
        }, {
          "value": 20,
          "displayName": "20"
        }, {
          "value": 30,
          "displayName": "30"
        }],
        "defaultValue": 10,
        "tr098PathOverride": [
          "X_CALIX_SXACC_RTP_CODEC_4TH_ORDER.PacketizationPeriod"
        ],
        "requires": {
          "Model": "T-Series"
        }
      }, {
        "name": "SilenceSuppression4th",
        "displayName": "Silence Suppression Fourth Order",
        "description": "The fourth order boolean value indicates whether to support silence suppression for the codec.",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": [
          "X_CALIX_SXACC_RTP_CODEC_4TH_ORDER.SilenceSuppression"
        ],
        "requires": {
          "Model": "T-Series"
        }
      }, {
        "name": "TimerT1",
        "displayName": "T1 Timer (ms)",
        "description": "SIP timer T1, in milliseconds",
        "type": "int",
        "minValue": 100,
        "maxValue": 1500,
        "defaultValue": 500,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.TimerT1"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "TimerT2",
        "displayName": "T2 Timer (ms)",
        "description": "SIP timer T2, in milliseconds",
        "type": "int",
        "minValue": 1000,
        "maxValue": 5000,
        "defaultValue": 4000,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.TimerT2"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "RegistrationPeriod",
        "displayName": "Registration Period (s)",
        "description": "Period over which the user agent must periodically register, in seconds.",
        "type": "int",
        "minValue": 60,
        "maxValue": 86400,
        "defaultValue": 3600,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.RegistrationPeriod"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "DistinctiveRingPrefix",
        "displayName": "Distinctive Ring Prefix",
        "description": "Prefix to use predefined distinctive ringing tone",
        "type": "string",
        "defaultValue": "Bellcore-dr",
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        "tr098PathOverride": [
          "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.CallingFeatures.X_000631_DistinctiveRingPrefix",
          "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.CallingFeatures.X_000631_DistinctiveRingPrefix"
        ]
      }, {
        "name": "CallWaitingTonePrefix",
        "displayName": "Call Waiting Prefix",
        "description": "Prefix to use predefined Call waiting tone",
        "type": "string",
        "defaultValue": "CallWaitingTone",
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        "tr098PathOverride": [
          "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.CallingFeatures.X_000631_CallWaitingTonePrefix",
          "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.CallingFeatures.X_000631_CallWaitingTonePrefix"
        ]
      }, {
        "name": "DTMFMethod",
        "displayName": "DTMF Method",
        "description": "Method by which DTMF digits MUST be passed.",
        "type": "string",
        "defaultValue": "InBand",
        "valueEnums": [{
          "value": "InBand",
          "displayName": "In Band"
        }, {
          "value": "RFC2833",
          "displayName": "RFC2833"
        }, {
          "value": "SIPInfo",
          "displayName": "SIP Info"
        }],
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.DTMFMethod"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "LocalHookFlash",
        "displayName": "Local Hook Flash",
        "description": "Specifies hookflash relay method to use.",
        "type": "boolean",
        "defaultValue": true,
        "displayOnly": true,
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        "implies": {
          "true": {
            "HookFlashMethod": "None"
          },
          "false": {
            "HookFlashMethod": "SIPInfo"
          }
        }
      }, {
        "name": "HookFlashMethod",
        "type": "string",
        "hidden": true,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_HookFlashMethod"]
      }, {
        "name": "RTPDscpInputType",
        "displayName": "RTP DSCP Input Type",
        "description": "Input type of RTP DSCP Parameter.",
        "displayOnly": true,
        "inputAuxiliary": true,
        "type": "boolean",
        "defaultValue": true,
        "valueEnums": [{
          "value": true,
          "displayName": "Input <0-63>"
        }, {
          "value": false,
          "displayName": "Select Options"
        }],
        "requires": {
          "Type": {
            "$in": ["SIP", "X_000631_TDMGW"]
          }
        }
      },
      {
        "name": "RTPDscpValue",
        "displayName": "RTP DSCP",
        "description": "Diffserv code point to be used for outgoing RTP packets for this profile.",
        "type": "int",
        "minValue": 0,
        "maxValue": 63,
        "defaultValue": 46,
        "requires": {
          "RTPDscpInputType": true
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.RTP.DSCPMark"]
      },
      {
        "name": "RTPDscpOptions",
        "displayName": "RTP DSCP",
        "description": "Diffserv code point to be used for outgoing RTP packets for this profile.",
        "type": "int",
        "minValue": 0,
        "maxValue": 63,
        "defaultValue": 46,
        "valueEnums": [{
          "value": 0,
          "displayName": "CS0 (0)"
        }, {
          "value": 8,
          "displayName": "CS1 (8)"
        }, {
          "value": 10,
          "displayName": "AF11 (10)"
        }, {
          "value": 12,
          "displayName": "AF12 (12)"
        }, {
          "value": 14,
          "displayName": "AF13 (14)"
        }, {
          "value": 16,
          "displayName": "CS2 (16)"
        }, {
          "value": 18,
          "displayName": "AF21 (18)"
        }, {
          "value": 20,
          "displayName": "AF22 (20)"
        }, {
          "value": 22,
          "displayName": "AF23 (22)"
        }, {
          "value": 24,
          "displayName": "CS3 (24)"
        }, {
          "value": 26,
          "displayName": "AF31 (26)"
        }, {
          "value": 28,
          "displayName": "AF32 (28)"
        }, {
          "value": 30,
          "displayName": "AF33 (30)"
        }, {
          "value": 32,
          "displayName": "CS4 (32)"
        }, {
          "value": 34,
          "displayName": "AF41 (34)"
        }, {
          "value": 36,
          "displayName": "AF42 (36)"
        }, {
          "value": 38,
          "displayName": "AF43 (38)"
        }, {
          "value": 40,
          "displayName": "CS5 (40)"
        }, {
          "value": 46,
          "displayName": "EF (46)"
        }, {
          "value": 48,
          "displayName": "CS6 (48)"
        }, {
          "value": 56,
          "displayName": "CS7 (56)"
        }],
        "requires": {
          "RTPDscpInputType": false
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.RTP.DSCPMark"]
      },
      {
        "name": "ControlDscpValue",
        "displayName": "Control DSCP",
        "description": "Diffserv code point to be used for outgoing RTP packets for this profile.",
        "type": "int",
        "minValue": 0,
        "maxValue": 63,
        "defaultValue": 46,
        "requires": {
          "Type": "SIP"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.DSCPMark"]
      }, {
        "name": "UserAgentDomain",
        "displayName": "Domain",
        "description": "CPE domain string.",
        "type": "string",
        "maxStringLength": 256,
        "allowEmpty": true,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.UserAgentDomain"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "CountryCode",
        "displayName": "Country/Region",
        "description": "The geographic region associated with this profile.",
        "type": "string",
        "valueEnums": [{
          "value": "US",
          "displayName": "North America"
        }, {
          "value": "DZ",
          "displayName": "Algeria"
        }, {
          "value": "AU",
          "displayName": "Australia"
        }, {
          "value": "BE",
          "displayName": "Belgium"
        }, {
          "value": "BR",
          "displayName": "Brazil"
        }, {
          "value": "CL",
          "displayName": "Chile"
        }, {
          "value": "CN",
          "displayName": "China"
        }, {
          "value": "CY",
          "displayName": "Cyprus"
        }, {
          "value": "CZ",
          "displayName": "Czech"
        }, {
          "value": "DK",
          "displayName": "Denmark"
        }, {
          "value": "XE",
          "displayName": "ETSI"
        }, {
          "value": "FI",
          "displayName": "Finland"
        }, {
          "value": "FR",
          "displayName": "France"
        }, {
          "value": "DE",
          "displayName": "Germany"
        }, {
          "value": "IN",
          "displayName": "India"
        }, {
          "value": "IT",
          "displayName": "Italy"
        }, {
          "value": "JP",
          "displayName": "Japan"
        }, {
          "value": "MX",
          "displayName": "Mexico"
        }, {
          "value": "NL",
          "displayName": "Netherlands"
        }, {
          "value": "NZ",
          "displayName": "New Zealand"
        }, {
          "value": "NO",
          "displayName": "Norway"
        }, {
          "value": "PL",
          "displayName": "Poland"
        }, {
          "value": "ES",
          "displayName": "Spain"
        }, {
          "value": "RS",
          "displayName": "Serbia"
        }, {
          "value": "SE",
          "displayName": "Sweden"
        }, {
          "value": "CH",
          "displayName": "Switzerland"
        }, {
          "value": "TW",
          "displayName": "Taiwan"
        }, {
          "value": "AE",
          "displayName": "United Arab Emirates"
        }, {
          "value": "GB",
          "displayName": "United Kingdom"
        }],
        "defaultValue": "US",
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Region"]
      }, {
        "name": "ReleaseTimer",
        "displayName": "Release Timer (s)",
        "description": "Delay before applying permanent signal treatment.",
        "type": "int",
        "minValue": 1,
        "maxValue": 20,
        "defaultValue": 10,
        "requires": {
          "Model": "GigaCenter",
          "Type": "SIP"
        },
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_000631_ReleaseTimer"]
      }, {
        "name": "RTPPort",
        "displayName": "RTP Port",
        "description": "Base of port range to be used for incoming RTP streams for this profile.",
        "type": "int",
        "minValue": 49152,
        "maxValue": 65535,
        "defaultValue": 49152,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.RTP.LocalPortMin"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "SwitchType",
        "displayName": "Switch Type",
        "description": "Softswitch vendor name.",
        "type": "string",
        "valueEnums": [{
          "value": "None",
          "displayName": "None"
        }, {
          "value": "ZTE",
          "displayName": "ZTE"
        }, {
          "value": "HUAW",
          "displayName": "HUAW"
        }, {
          "value": "SYLA",
          "displayName": "SYLA"
        }, {
          "value": "ERIC",
          "displayName": "ERIC"
        }, {
          "value": "CS15",
          "displayName": "CS15"
        }, {
          "value": "CS2K",
          "displayName": "CS2K"
        }, {
          "value": "BELL",
          "displayName": "BELL"
        }, {
          "value": "SIPY",
          "displayName": "SIPY"
        }, {
          "value": "BWRK",
          "displayName": "BWRK"
        }],
        "defaultValue": "None",
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.X_000631_SoftSwitch"],
        "requires": {
          "Type": "SIP"
        }
      }, {
        "name": "dialPlanRg",
        "displayName": "Dial Plan",
        "description": "Dial Plan",
        "type": "string",
        "valueEnums": [],
        "requires": {
          "Type": {
            "$in": ["SIP"]
          }
        }
      }, {
        "name": "PrimaryCallMainAgent",
        "displayName": " Primary Call Agent",
        "description": "Host name or IP address of the main MGCP call agent.",
        "type": "HostNameOrIPAddress",
        "mandatory": false,
        "maxStringLength": 256,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.CallAgent1"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "PrimaryCallBackupAgent",
        "displayName": "Secondary Call Agent",
        "description": "Host name or IP address of the backup MGCP call agent.",
        "type": "HostNameOrIPAddress",
        "maxStringLength": 256,
        "allowEmpty": true,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.CallAgent2"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "TermPrefixMGCP",
        "displayName": "Term Prefix",
        "description": "Termination prefix.",
        "type": "string",
        "maxStringLength": 25,
        "defaultValue": "aaln",
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.X_000631_TermPrefix"],
        "stringPattern": "^[^\\s]*$",
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "RetryTimeOut",
        "displayName": "Retry Timeout",
        "description": "Retry timeout, in seconds.",
        "type": "unsignedInt",
        "defaultValue": 30,
        "minValue": 4,
        "maxValue": 50,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.X_000631_RetryTimeout"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "RestartDelay",
        "displayName": "Restart Delay",
        "description": "Message retransfer interval, in seconds",
        "type": "unsignedInt",
        "defaultValue": 1,
        "minValue": 1,
        "maxValue": 600,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.RetranIntervalTimer"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "FlashHookPersist",
        "displayName": "Flash Hook",
        "description": "When true, persists Flash hook event",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.X_000631_FlashHookPersist"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "OffHookPersist",
        "displayName": "Off Hook",
        "description": "When true, persists offhook event",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.X_000631_OffHookPersist"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "OnHookPersist",
        "displayName": "On Hook",
        "description": "When true, persists onhook event",
        "type": "boolean",
        "defaultValue": false,
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.X_000631_OnHookPersist"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "SwitchTypeMGCP",
        "displayName": "SwitchType",
        "description": "Switch Type",
        "type": "string",
        "defaultValue": "GENERIC",
        "maxStringLength": 256,
        "valueEnums": [{
          "value": "GENERIC",
          "displayName": "GENERIC"
        }, {
          "value": "CS2000",
          "displayName": "CS2000"
        }, {
          "value": "CS1500",
          "displayName": "CS1500"
        }, {
          "value": "METASWITCH",
          "displayName": "METASWITCH"
        }, {
          "value": "SONUS",
          "displayName": "SONUS"
        }, {
          "value": "GENBANDG2",
          "displayName": "GENBANDG2"
        }, {
          "value": "GENBANDG9",
          "displayName": "GENBANDG9"
        }, {
          "value": "TAQUA",
          "displayName": "TAQUA"
        }],
        "tr098PathOverride": ["InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.X_000631_SwitchType"],
        "requires": {
          "Model": "GigaCenter",
          "Type": "MGCP"
        }
      }, {
        "name": "X_000631_IGMPProxy",
        "defaultValue": false,
        "hidden": true,
        "type": "boolean",
        "requires": {
          "Model": "GigaCenter"
        }
      }],
      "serviceValues": {
        "Name": "Voice Service",
        "NATEnabled": false
      }
    }, {
      "_id": "95d84f76-2608-471b-a16b-361e884efc8b",
      "name": "WiFi Country",
      "group": "Wi-Fi",
      "createTime": "2020-07-24T05:11:20.539Z",
      "description": "Configure Per Wi-Fi 802.11 Network Service Set (Country) parameters.",
      "displayName": "Wi-Fi Country",
      "multiInstance": true,
      "tr098PathPrefix": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.",
      "parameters": [{
        "name": "RegulatoryDomain",
        "type": "string",
        "mandatory": true,
        "valueEnums": [{
          "value": "AT",
          "displayName": "Austria"
        }, {
          "value": "AU",
          "displayName": "Australia"
        }, {
          "value": "BE",
          "displayName": "Belgium"
        }, {
          "value": "BR",
          "displayName": "Brazil"
        }, {
          "value": "BG",
          "displayName": "Bulgaria"
        }, {
          "value": "CA",
          "displayName": "Canada"
        }, {
          "value": "HR",
          "displayName": "Croatia"
        }, {
          "value": "CY",
          "displayName": "Cyprus"
        }, {
          "value": "CZ",
          "displayName": "Czech Republic"
        }, {
          "value": "DK",
          "displayName": "Denmark"
        }, {
          "value": "EE",
          "displayName": "Estonia"
        }, {
          "value": "FI",
          "displayName": "Finland"
        }, {
          "value": "FR",
          "displayName": "France"
        }, {
          "value": "DE",
          "displayName": "Germany"
        }, {
          "value": "GR",
          "displayName": "Greece"
        }, {
          "value": "HU",
          "displayName": "Hungary"
        }, {
          "value": "IE",
          "displayName": "Ireland"
        }, {
          "value": "IL",
          "displayName": "Israel"
        }, {
          "value": "IT",
          "displayName": "Italy"
        }, {
          "value": "LV",
          "displayName": "Latvia"
        }, {
          "value": "LT",
          "displayName": "Lithuania"
        }, {
          "value": "LU",
          "displayName": "Luxembourg"
        }, {
          "value": "MY",
          "displayName": "Malaysia"
        }, {
          "value": "NL",
          "displayName": "Netherlands"
        }, {
          "value": "PL",
          "displayName": "Poland"
        }, {
          "value": "PT",
          "displayName": "Portugal"
        }, {
          "value": "RO",
          "displayName": "Romania"
        }, {
          "value": "SA",
          "displayName": "Saudi Arabia"
        }, {
          "value": "SK",
          "displayName": "Slovakia"
        }, {
          "value": "SI",
          "displayName": "Slovenia"
        }, {
          "value": "ZA",
          "displayName": "South Africa"
        }, {
          "value": "ES",
          "displayName": "Spain"
        }, {
          "value": "SE",
          "displayName": "Sweden"
        }, {
          "value": "CH",
          "displayName": "Switzerland"
        }, {
          "value": "TW",
          "displayName": "Taiwan, Province of China"
        }, {
          "value": "TR",
          "displayName": "Turkey"
        }, {
          "value": "AE",
          "displayName": "United Arab Emirates"
        }, {
          "value": "GB",
          "displayName": "United Kingdom"
        }, {
          "value": "US",
          "displayName": "United States"
        }, {
          "value": "EU",
          "displayName": "European Union"
        }],
        "description": "Select the Wi-Fi Country to set parameters",
        "displayName": "Select Country"
      }]
    }, {
      "_id": "942d64da-0eec-4ee7-b7e0-b1e5b17d68fb",
      "name": "WiFi SSID",
      "group": "Wi-Fi",
      "createTime": "2020-07-24T05:11:20.417Z",
      "description": "Configure Per Wi-Fi 802.11 Network Service Set (SSID) parameters.",
      "displayName": "Wi-Fi SSID",
      "keyParameter": {
        "name": "WlanIndex"
      },
      "multiInstance": true,
      "tr098PathPrefix": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.${WlanIndex}.",
      "parameters": [{
        "name": "WlanIndex",
        "type": "string",
        "mandatory": true,
        "valueEnums": [{
          "value": "1",
          "displayName": "2.4GHz Primary SSID"
        }, {
          "value": "2",
          "displayName": "2.4GHz Guest SSID"
        }, {
          "value": "3",
          "displayName": "2.4GHz Operator SSID #1"
        }, {
          "value": "4",
          "displayName": "2.4GHz Operator SSID #2"
        }, {
          "value": "5",
          "displayName": "2.4GHz Operator SSID #3"
        }, {
          "value": "6",
          "displayName": "2.4GHz Operator SSID #4"
        }, {
          "value": "7",
          "displayName": "2.4GHz Operator SSID #5"
        }, {
          "value": "8",
          "displayName": "2.4GHz Operator SSID #6"
        }, {
          "value": "9",
          "displayName": "5GHz Primary SSID"
        }, {
          "value": "10",
          "displayName": "5GHz Guest SSID"
        }, {
          "value": "11",
          "displayName": "5GHz IPTV SSID"
        }, {
          "value": "12",
          "displayName": "5GHz Operator SSID #1"
        }, {
          "value": "13",
          "displayName": "5GHz Operator SSID #2"
        }, {
          "value": "14",
          "displayName": "5GHz Operator SSID #3"
        }, {
          "value": "15",
          "displayName": "5GHz Operator SSID #4"
        }, {
          "value": "16",
          "displayName": "5GHz Operator SSID #5"
        }],
        "description": "Select the Wi-Fi SSID to set parameters",
        "displayName": "Select SSID",
        "displayOnly": true
      }, {
        "name": "Enable",
        "type": "boolean",
        "description": "Enables or disables this Wi-Fi service set.",
        "displayName": "Service",
        "defaultValue": false
      }, {
        "name": "SSID",
        "type": "string",
        "description": "Wi-Fi Network Name, i.e. the Service Set Identifier (SSID) in use by the connection.",
        "displayName": "Name",
        "maxStringLength": 32,
        "allowDynamicValue": true,
        "requires": {
          "Enable": true
        }
      }, {
        "name": "SSIDAdvertisementEnabled",
        "type": "boolean",
        "description": "Indicates whether or not beacons include the SSID name.",
        "displayName": "Broadcasting",
        "defaultValue": true,
        "requires": {
          "Enable": true
        }
      }, {
        "name": "BeaconType",
        "type": "string",
        "valueEnums": [
          {
            "value": "WPAand11i",
            "displayName": "WPA-WPA2-Personal"
          }, {
            "value": "11i",
            "displayName": "WPA2-Personal"
          }, {
            "value": "WPA",
            "displayName": "WPA-Personal"
          }, {
            "value": "Basic",
            "displayName": "Security Off"
          }],
        "description": "WLAN Security Type.",
        "displayName": "Security",
        "defaultValue": "Basic",
        "requires": {
          "Enable": true
        }
      }, {
        "name": "BasicEncryptionModes",
        "type": "string",
        "hidden": true,
        "description": "Basic Encryption Mode in Tr098 Model"
      }, {
        "name": "BasicAuthenticationMode",
        "type": "string",
        "hidden": true,
        "description": "Basic Authentication Mode in Tr098 Model"
      }, {
        "name": "IEEE11iAuthenticationMode",
        "type": "string",
        "hidden": true,
        "description": "WPA2 Personal Authentication Mode in Tr098 Model"
      }, {
        "name": "WPAAuthenticationMode",
        "type": "string",
        "hidden": true,
        "description": "WPA WPA2 Personal Authentication Mode in Tr098 Model"
      }, {
        "name": "WPAEncryption",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "WPAEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "WPAEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "WPAEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPA",
          "WlanIndex": {
            "$in": ["1", "2", "3", "4", "5", "6", "7", "8"]
          }
        }
      }, {
        "name": "WPAEncryptionRadio5GHz",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "WPAEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "WPAEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "WPAEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPA",
          "WlanIndex": {
            "$in": ["9", "10", "11", "12", "13", "14", "15", "16"]
          }
        }
      }, {
        "name": "WPA2Encryption",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "IEEE11iEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "IEEE11iEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "IEEE11iEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA2",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "11i",
          "WlanIndex": {
            "$in": ["1", "2", "3", "4", "5", "6", "7", "8"]
          }
        }
      }, {
        "name": "WPA2EncryptionRadio5GHz",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "IEEE11iEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "IEEE11iEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "IEEE11iEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA2",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "11i",
          "WlanIndex": {
            "$in": ["9", "10", "11", "12", "13", "14", "15", "16"]
          }
        }
      }, {
        "name": "IEEE11iEncryptionModes",
        "type": "string",
        "hidden": true,
        "description": "WPA2 Encryption Mode in Tr098 Model"
      }, {
        "name": "WPAandWPA2Encryption",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "WPAEncryptionModes": "AESEncryption",
            "IEEE11iEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "WPAEncryptionModes": "TKIPEncryption",
            "IEEE11iEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "WPAEncryptionModes": "TKIPandAESEncryption",
            "IEEE11iEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA WPA2 Personal",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPAand11i",
          "WlanIndex": {
            "$in": ["1", "2", "3", "4", "5", "6", "7", "8"]
          }
        }
      }, {
        "name": "WPAandWPA2EncryptionRadio5GHz",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "WPAEncryptionModes": "AESEncryption",
            "IEEE11iEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "WPAEncryptionModes": "TKIPEncryption",
            "IEEE11iEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "WPAEncryptionModes": "TKIPandAESEncryption",
            "IEEE11iEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA WPA2 Personal",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPAand11i",
          "WlanIndex": {
            "$in": ["9", "10", "11", "12", "13", "14", "15", "16"]
          }
        }
      }, {
        "name": "WPAEncryptionModes",
        "type": "string",
        "hidden": true,
        "description": "WPA Encryption Mode in Tr098 Model"
      }, {
        "name": "PreSharedKey.1.KeyPassphrase",
        "type": "string",
        "description": "The password to access this Wi-Fi",
        "displayName": "Passphrase",
        "maxStringLength": 63,
        "minStringLength": 8,
        "requires": {
          "BeaconType": {
            "$in": ["11i", "WPA", "WPAand11i"]
          }
        },
        "passwordIcon": true
      }, {
        "name": "MACAddressControlEnabled",
        "type": "boolean",
        "description": "Indicates whether MAC Address Control is enabled or not on this interface",
        "displayName": "MAC Authentication",
        "defaultValue": false,
        "requires": {
          "Enable": true
        }
      }, {
        "name": "X_000631_SplitHorizon",
        "type": "boolean",
        "description": "Enables or disables SplitHorizon on the associated interface.",
        "displayName": "Split Horizon (Inter-BSS Isolation)",
        "defaultValue": false,
        "requires": {
          "Enable": true
        }
      }, {
        "name": "X_000631_IntraSsidIsolation",
        "type": "boolean",
        "description": "Enables or disables Inter-BSS Isolation on the associated interface.",
        "displayName": "Intra-BSS Isolation",
        "defaultValue": false,
        "requires": {
          "Enable": true
        }
      }, {
        "name": "X_CALIX_InterSSID_Isolate",
        "type": "boolean",
        "description": "This parameter enables or disabled the secondary SSID subnet feature.         Once enabled, the LAN clients connected to the secondary SSID would be assigned a DHCP IP address based on         the values set to X_000631_SubnetMinAddress, X_000631_SubnetMaxAddress, X_000631_SubnetMaskAddress         and X_000631_SubnetGatewayAddress",
        "displayName": "SSID Isolation",
        "defaultValue": false,
        "requires": {
          "Enable": true,
          "WlanIndex": {
            "$in": ["2", "10"]
          }
        }
      }, {
        "name": "X_CALIX_Isolate_Gateway",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The gateway IP address of the secondary SSID subnet feature.",
        "displayName": "Gateway",
        "defaultValue": [{
          "value": "192.168.9.1",
          "condition": {
            "WlanIndex": "2"
          }
        }, {
          "value": "192.168.10.1",
          "condition": {
            "WlanIndex": "10"
          }
        }],
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "X_CALIX_Isolate_Start_IP",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The first LAN IP address in the DHCP pool to be assigned by the secondary SSID subnet feature.",
        "displayName": "Beginning IP Address",
        "defaultValue": [{
          "value": "192.168.9.2",
          "condition": {
            "WlanIndex": "2"
          }
        }, {
          "value": "192.168.10.2",
          "condition": {
            "WlanIndex": "10"
          }
        }],
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "X_CALIX_Isolate_End_IP",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The last LAN IP address in the DHCP pool to be assigned by the secondary SSID subnet feature.",
        "displayName": "Ending IP Address",
        "defaultValue": [{
          "value": "192.168.9.254",
          "condition": {
            "WlanIndex": "2"
          }
        }, {
          "value": "192.168.10.254",
          "condition": {
            "WlanIndex": "10"
          }
        }],
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "X_CALIX_Isolate_Mask",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The subnet mask IP address of the secondary SSID subnet feature.",
        "displayName": "Subnet Mask",
        "defaultValue": [{
          "value": "255.255.255.0",
          "condition": {
            "WlanIndex": "2"
          }
        }, {
          "value": "255.255.255.0",
          "condition": {
            "WlanIndex": "10"
          }
        }],
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "AnyPortAnyServiceEnabled",
        "type": "boolean",
        "description": "Any Port Any Service.",
        "displayName": "Any Port Any Service",
        "defaultValue": false,
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "X_000631_VlanMuxID",
        "type": "int",
        "maxValue": 4093,
        "minValue": 1,
        "mandatory": false,
        "hidden": true,
        "description": "The VLAN ID.",
        "displayName": "VLAN ID",
        "defaultValue": 7,
        "requires": {
          "X_CALIX_InterSSID_Isolate": true,
          "AnyPortAnyServiceEnabled": true
        }
      }, {
        "name": "X_000631_VlanMux8021p",
        "type": "int",
        "mandatory": true,
        "valueEnums": [{
          "value": 0,
          "displayName": "0"
        }, {
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }, {
          "value": 5,
          "displayName": "5"
        }, {
          "value": 6,
          "displayName": "6"
        }, {
          "value": 7,
          "displayName": "7"
        }],
        "description": "The priority of the VLAN.",
        "displayName": "Priority (P-Bits)",
        "defaultValue": 7,
        "requires": {
          "X_CALIX_InterSSID_Isolate": true,
          "AnyPortAnyServiceEnabled": true,
        }
      }, {
        "name": "VLAN_Enable",
        "type": "boolean",
        "hidden": true,
        "description": "Enable or Disable VLAN Virtual Interfaces",
        "defaultValue": true,
        "requires": {
          "X_CALIX_InterSSID_Isolate": true,
          "AnyPortAnyServiceEnabled": true
        }
      }]
    }, {
      "_id": "f90e5cc4-de58-4f28-b37c-5ec3e0dc8323",
      "name": "WiFi SSID for EXOS",
      "group": "Wi-Fi",
      "createTime": "2021-05-31T02:25:10.497Z",
      "description": "Configure Per Wi-Fi 802.11 Network Service Set (SSID) parameters.",
      "displayName": "Wi-Fi SSID For EXOS",
      "keyParameter": {
        "name": "WlanIndex"
      },
      "multiInstance": true,
      "tr098PathPrefix": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.${WlanIndex}.",
      "parameters": [{
        "name": "WlanIndex",
        "type": "string",
        "mandatory": true,
        "valueEnums": [{
          "value": "1",
          "displayName": "2.4 GHz Primary SSID"
        }, {
          "value": "2",
          "displayName": "2.4 GHz Guest SSID #1"
        }, {
          "value": "3",
          "displayName": "2.4 GHz Guest SSID #2"
        }, {
          "value": "4",
          "displayName": "2.4 GHz Guest SSID #3"
        }, {
          "value": "5",
          "displayName": "2.4 GHz Guest SSID #4"
        }, {
          "value": "6",
          "displayName": "2.4 GHz Operator SSID #1"
        }, {
          "value": "7",
          "displayName": "2.4 GHz Operator SSID #2"
        }, {
          "value": "8",
          "displayName": "2.4 GHz Operator SSID #3"
        }, {
          "value": "9",
          "displayName": "5 GHz Primary SSID"
        }, {
          "value": "10",
          "displayName": "5 GHz Guest SSID #1"
        }, {
          "value": "12",
          "displayName": "5 GHz Guest SSID #2"
        }, {
          "value": "13",
          "displayName": "5 GHz Guest SSID #3"
        }, {
          "value": "14",
          "displayName": "5 GHz Guest SSID #4"
        }, {
          "value": "11",
          "displayName": "5 GHz IPTV SSID"
        }, {
          "value": "15",
          "displayName": "5 GHz Operator SSID #1"
        }, {
          "value": "16",
          "displayName": "5 GHz Operator SSID #2"
        }],
        "description": "Select the Wi-Fi SSID to set parameters",
        "displayName": "Select SSID",
        "displayOnly": true
      }, {
        "name": "Enable",
        "type": "boolean",
        "description": "Enables or disables this Wi-Fi service set.",
        "displayName": "Service",
        "defaultValue": false
      }, {
        "name": "SSID",
        "type": "string",
        "description": "Wi-Fi Network Name, i.e. the Service Set Identifier (SSID) in use by the connection.",
        "displayName": "Name",
        "maxStringLength": 32,
        "allowDynamicValue": true,
        "requires": {
          "Enable": true
        }
      }, {
        "name": "SSIDAdvertisementEnabled",
        "type": "boolean",
        "description": "Indicates whether or not beacons include the SSID name.",
        "displayName": "Broadcasting",
        "defaultValue": true,
        "requires": {
          "Enable": true
        }
      }, {
        "name": "BeaconType",
        "type": "string",
        "valueEnums": [{
          "value": "WPA3",
          "displayName": "WPA3-Personal"
        }, {
          "value": "11iandWPA3",
          "displayName": "WPA2-WPA3-Personal"
        }, {
          "value": "WPAand11i",
          "displayName": "WPA-WPA2-Personal"
        }, {
          "value": "11i",
          "displayName": "WPA2-Personal"
        }, {
          "value": "WPA",
          "displayName": "WPA-Personal"
        }, {
          "value": "Basic",
          "displayName": "Security Off"
        }],
        "description": "WLAN Security Type.",
        "displayName": "Security",
        "defaultValue": "Basic",
        "requires": {
          "Enable": true
        }
      }, {
        "name": "BasicEncryptionModes",
        "type": "string",
        "hidden": true,
        "description": "Basic Encryption Mode in Tr098 Model"
      }, {
        "name": "BasicAuthenticationMode",
        "type": "string",
        "hidden": true,
        "description": "Basic Authentication Mode in Tr098 Model"
      }, {
        "name": "IEEE11iAuthenticationMode",
        "type": "string",
        "hidden": true,
        "description": "WPA2 Personal Authentication Mode in Tr098 Model"
      }, {
        "name": "WPAAuthenticationMode",
        "type": "string",
        "hidden": true,
        "description": "WPA WPA2 Personal Authentication Mode in Tr098 Model"
      }, {
        "name": "WPAEncryption",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "WPAEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "WPAEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "WPAEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPA",
          "WlanIndex": {
            "$in": ["1", "2", "3", "4", "5", "6", "7", "8"]
          }
        }
      }, {
        "name": "WPAEncryptionRadio5GHz",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "WPAEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "WPAEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "WPAEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPA",
          "WlanIndex": {
            "$in": ["9", "10", "11", "12", "13", "14", "15", "16"]
          }
        }
      }, {
        "name": "WPA2Encryption",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "IEEE11iEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "IEEE11iEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "IEEE11iEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA2",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "11i",
          "WlanIndex": {
            "$in": ["1", "2", "3", "4", "5", "6", "7", "8"]
          }
        }
      }, {
        "name": "WPA2EncryptionRadio5GHz",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "IEEE11iEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "IEEE11iEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "IEEE11iEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA2",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "11i",
          "WlanIndex": {
            "$in": ["9", "10", "11", "12", "13", "14", "15", "16"]
          }
        }
      }, {
        "name": "IEEE11iEncryptionModes",
        "type": "string",
        "hidden": true,
        "description": "WPA2 Encryption Mode in Tr098 Model"
      }, {
        "name": "WPAandWPA2Encryption",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "WPAEncryptionModes": "AESEncryption",
            "IEEE11iEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "WPAEncryptionModes": "TKIPEncryption",
            "IEEE11iEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "WPAEncryptionModes": "TKIPandAESEncryption",
            "IEEE11iEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA WPA2 Personal",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPAand11i",
          "WlanIndex": {
            "$in": ["1", "2", "3", "4", "5", "6", "7", "8"]
          }
        }
      }, {
        "name": "WPAandWPA2EncryptionRadio5GHz",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "WPAEncryptionModes": "AESEncryption",
            "IEEE11iEncryptionModes": "AESEncryption"
          },
          "TKIPEncryption": {
            "WPAEncryptionModes": "TKIPEncryption",
            "IEEE11iEncryptionModes": "TKIPEncryption"
          },
          "TKIPandAESEncryption": {
            "WPAEncryptionModes": "TKIPandAESEncryption",
            "IEEE11iEncryptionModes": "TKIPandAESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }, {
          "value": "TKIPEncryption",
          "displayName": "TKIP"
        }, {
          "value": "TKIPandAESEncryption",
          "displayName": "Both"
        }],
        "description": "Encryption mode for security - WPA WPA2 Personal",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPAand11i",
          "WlanIndex": {
            "$in": ["9", "10", "11", "12", "13", "14", "15", "16"]
          }
        }
      }, {
        "name": "WPA3Encryption",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "IEEE11iEncryptionModes": "AESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }],
        "description": "Encryption mode for security - WPA3",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPA3",
          "WlanIndex": {
            "$in": ["1", "2", "3", "4", "5", "6", "7", "8"]
          }
        }
      }, {
        "name": "WPA3EncryptionRadio5GHz",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "IEEE11iEncryptionModes": "AESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }],
        "description": "Encryption mode for security - WPA3",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "WPA3",
          "WlanIndex": {
            "$in": ["9", "10", "11", "12", "13", "14", "15", "16"]
          }
        }
      }, {
        "name": "WPA2andWPA3Encryption",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "IEEE11iEncryptionModes": "AESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }],
        "description": "Encryption mode for security - WPA2/WPA3",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "11iandWPA3",
          "WlanIndex": {
            "$in": ["1", "2", "3", "4", "5", "6", "7", "8"]
          }
        }
      }, {
        "name": "WPA2andWPA3EncryptionRadio5GHz",
        "type": "string",
        "implies": {
          "AESEncryption": {
            "IEEE11iEncryptionModes": "AESEncryption"
          }
        },
        "valueEnums": [{
          "value": "AESEncryption",
          "displayName": "AES"
        }],
        "description": "Encryption mode for security - WPA2/WPA3",
        "displayName": "Encryption",
        "displayOnly": true,
        "defaultValue": "AESEncryption",
        "requires": {
          "BeaconType": "11iandWPA3",
          "WlanIndex": {
            "$in": ["9", "10", "11", "12", "13", "14", "15", "16"]
          }
        }
      }, {
        "name": "WPAEncryptionModes",
        "type": "string",
        "hidden": true,
        "description": "WPA Encryption Mode in Tr098 Model"
      }, {
        "name": "PreSharedKey.1.KeyPassphrase",
        "type": "string",
        "description": "The password to access this Wi-Fi",
        "displayName": "Passphrase",
        "maxStringLength": 63,
        "minStringLength": 8,
        "requires": {
          "BeaconType": {
            "$in": ["11i", "WPA", "WPAand11i", "11iandWPA3", "WPA3"]
          }
        },
        "passwordIcon": true
      }, {
        "name": "X_CALIX_InterSSID_Isolate",
        "type": "boolean",
        "description": "This parameter enables or disabled the secondary SSID subnet feature.         Once enabled, the LAN clients connected to the secondary SSID would be assigned a DHCP IP address based on         the values set to X_000631_SubnetMinAddress, X_000631_SubnetMaxAddress, X_000631_SubnetMaskAddress         and X_000631_SubnetGatewayAddress",
        "displayName": "SSID Isolation",
        "defaultValue": false,
        "requires": {
          "Enable": true,
          "WlanIndex": {
            "$in": ["2", "10"]
          }
        }
      }, {
        "name": "X_CALIX_Isolate_Gateway",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The gateway IP address of the secondary SSID subnet feature.",
        "displayName": "Gateway",
        "defaultValue": [{
          "value": "192.168.9.1",
          "condition": {
            "WlanIndex": "2"
          }
        }, {
          "value": "192.168.10.1",
          "condition": {
            "WlanIndex": "10"
          }
        }],
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "X_CALIX_Isolate_Start_IP",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The first LAN IP address in the DHCP pool to be assigned by the secondary SSID subnet feature.",
        "displayName": "Beginning IP Address",
        "defaultValue": [{
          "value": "192.168.9.2",
          "condition": {
            "WlanIndex": "2"
          }
        }, {
          "value": "192.168.10.2",
          "condition": {
            "WlanIndex": "10"
          }
        }],
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "X_CALIX_Isolate_End_IP",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The last LAN IP address in the DHCP pool to be assigned by the secondary SSID subnet feature.",
        "displayName": "Ending IP Address",
        "defaultValue": [{
          "value": "192.168.9.254",
          "condition": {
            "WlanIndex": "2"
          }
        }, {
          "value": "192.168.10.254",
          "condition": {
            "WlanIndex": "10"
          }
        }],
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "X_CALIX_Isolate_Mask",
        "type": "IPAddress",
        "mandatory": true,
        "description": "The subnet mask IP address of the secondary SSID subnet feature.",
        "displayName": "Subnet Mask",
        "defaultValue": [{
          "value": "255.255.255.0",
          "condition": {
            "WlanIndex": "2"
          }
        }, {
          "value": "255.255.255.0",
          "condition": {
            "WlanIndex": "10"
          }
        }],
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "AnyPortAnyServiceEnabled",
        "type": "boolean",
        "description": "Any Port Any Service.",
        "displayName": "Any Port Any Service",
        "defaultValue": false,
        "requires": {
          "X_CALIX_InterSSID_Isolate": true
        }
      }, {
        "name": "X_000631_VlanMuxID",
        "type": "int",
        "maxValue": 4093,
        "minValue": 1,
        "mandatory": false,
        "hidden": true,
        "description": "The VLAN ID.",
        "displayName": "VLAN ID",
        "defaultValue": 7,
        "requires": {
          "X_CALIX_InterSSID_Isolate": true,
          "AnyPortAnyServiceEnabled": true
        }
      }, {
        "name": "X_000631_VlanMux8021p",
        "type": "int",
        "mandatory": true,
        "valueEnums": [{
          "value": 0,
          "displayName": "0"
        }, {
          "value": 1,
          "displayName": "1"
        }, {
          "value": 2,
          "displayName": "2"
        }, {
          "value": 3,
          "displayName": "3"
        }, {
          "value": 4,
          "displayName": "4"
        }, {
          "value": 5,
          "displayName": "5"
        }, {
          "value": 6,
          "displayName": "6"
        }, {
          "value": 7,
          "displayName": "7"
        }],
        "description": "The priority of the VLAN.",
        "displayName": "Priority (P-Bits)",
        "defaultValue": 7,
        "requires": {
          "X_CALIX_InterSSID_Isolate": true,
          "AnyPortAnyServiceEnabled": true,
        }
      }, {
        "name": "VLAN_Enable",
        "type": "boolean",
        "hidden": true,
        "description": "Enable or Disable VLAN Virtual Interfaces",
        "defaultValue": true,
        "requires": {
          "X_CALIX_InterSSID_Isolate": true,
          "AnyPortAnyServiceEnabled": true
        }
      }]
    }
    ];

    return of(object);
  }
  public innerProfileCategory(): Observable<{}> {
    const object = {
      "msg": "result",
      "id": "17",
      "result": [
        {
          "_id": "bdee6e2a-31fc-4f13-be9f-90369671fe9b",
          "name": "multicast vlan registration",
          "orgId": "152650",
          "description": "",
          "configurations": [
            {
              "category": "Video - Multicast VLAN Registration (MVR)",
              "parameterValues": {
                "Vlan1": 1,
                "NumberOfVLANs": 1,
                "Vlan1Range1End": "239.255.255.255",
                "Vlan1Range1Start": "239.255.255.255",
                "Vlan1NumberOfRanges": 1
              }
            }
          ],
          "innerProfileCategory": "Video - Multicast VLAN Registration (MVR)"
        },
        {
          "_id": "eb88cd17-6846-4e02-92c3-96d7e44543d5",
          "name": "multicast range filter",
          "orgId": "152650",
          "description": "Update Profile",
          "configurations": [
            {
              "category": "Video - Multicast Range Filters",
              "parameterValues": {
                "Range1End": "239.255.255.255",
                "Range1Start": "224.0.0.0",
                "NumberOfFilters": 1
              }
            }
          ],
          "innerProfileCategory": "Video - Multicast Range Filters"
        },
        {
          "_id": "eaf26f85-87db-4098-a681-f40b300d4973",
          "name": "DHCP82",
          "orgId": "152650",
          "description": "",
          "configurations": [
            {
              "category": "DHCP Option82",
              "parameterValues": {
                "RemoteIDFormat": "5%valan",
                "CircuitIDFormat": "5%valan"
              }
            }
          ],
          "innerProfileCategory": "DHCP Option82"
        },
        {
          "_id": "60cfc6de-0cf1-4a10-9dfd-2df8bb26a4c1",
          "name": "regre5",
          "orgId": "152650",
          "configurations": [
            {
              "category": "Video - Multicast Range Filters",
              "parameterValues": {
                "Range1End": "191.158.12.1",
                "Range1Start": "192.168.1.12",
                "NumberOfFilters": 1
              }
            }
          ],
          "innerProfileCategory": "Video - Multicast Range Filters"
        },
        {
          "_id": "8f9aa6a5-05c8-4985-8984-7672b86a8208",
          "name": "jizhu_mvr",
          "orgId": "152650",
          "description": "",
          "configurations": [
            {
              "category": "Video - Multicast VLAN Registration (MVR)",
              "parameterValues": {
                "Vlan1": 100,
                "NumberOfVLANs": 1,
                "Vlan1Range1End": "239.255.255.255",
                "Vlan1Range1Start": "239.255.255.0",
                "Vlan1NumberOfRanges": 1
              }
            }
          ],
          "innerProfileCategory": "Video - Multicast VLAN Registration (MVR)"
        },
        {
          "_id": "76ade1ac-90d1-4108-aaa6-09e5a410755a",
          "name": "jizhu_bandwidth",
          "orgId": "152650",
          "description": "",
          "configurations": [
            {
              "category": "Bandwidth",
              "parameterValues": {
                "UpstreamCIR": "512m",
                "DownstreamCIR": "128m"
              }
            }
          ],
          "innerProfileCategory": "Bandwidth"
        },
        {
          "_id": "85f0f791-c778-4e44-bf7b-490445685191",
          "name": "jizhu_mrf",
          "orgId": "152650",
          "description": "",
          "configurations": [
            {
              "category": "Video - Multicast Range Filters",
              "parameterValues": {
                "Range1End": "239.255.255.255",
                "Range1Start": "224.0.0.0",
                "NumberOfFilters": 1
              }
            }
          ],
          "innerProfileCategory": "Video - Multicast Range Filters"
        },
        {
          "_id": "351b4844-d712-4e40-89bf-63e115a85ff5",
          "name": "jizhu_option",
          "orgId": "152650",
          "description": "",
          "configurations": [
            {
              "category": "DHCP Option82",
              "parameterValues": {
                "RemoteIDFormat": "5%valan",
                "CircuitIDFormat": "5%valan"
              }
            }
          ],
          "innerProfileCategory": "DHCP Option82"
        },
        {
          "_id": "8c94d732-d9e6-4ee6-881b-1244ca65053a",
          "name": "autotest_Bandwidth",
          "orgId": "152650",
          "configurations": [
            {
              "category": "Bandwidth",
              "parameterValues": {
                "UpstreamCIR": "3m",
                "DownstreamCIR": "2m"
              }
            }
          ],
          "innerProfileCategory": "Bandwidth"
        },
        {
          "_id": "c72a6206-4d9e-466f-98f1-f075ca481d0f",
          "name": "nb",
          "orgId": "152650",
          "configurations": [
            {
              "category": "Bandwidth",
              "parameterValues": {
                "UpstreamCIR": "17k",
                "DownstreamCIR": "12k"
              }
            }
          ],
          "innerProfileCategory": "Bandwidth"
        },
        {
          "_id": "2431a54d-c818-469f-9481-1515af1c5805",
          "name": "regre8",
          "orgId": "152650",
          "configurations": [
            {
              "category": "DHCP Option82",
              "parameterValues": {
                "Description": "",
                "RemoteIDFormat": "ad",
                "CircuitIDFormat": "av"
              }
            }
          ],
          "innerProfileCategory": "DHCP Option82"
        },
        {
          "_id": "f5740643-6d63-4f6d-b4e6-3a3a76b69635",
          "name": "regre9",
          "orgId": "152650",
          "configurations": [
            {
              "category": "Bandwidth",
              "parameterValues": {
                "UpstreamCIR": "13k",
                "DownstreamCIR": "12k"
              }
            }
          ],
          "innerProfileCategory": "Bandwidth"
        }
      ]
    };
    return of(object);
  }
}
