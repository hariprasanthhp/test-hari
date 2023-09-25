//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var global = Package.meteor.global;
  var meteorEnv = Package.meteor.meteorEnv;
  var _ = Package.underscore._;
  var jstz = Package['em0ney:jstz'].jstz;
  var Router = Package['iron:router'].Router;
  var RouteController = Package['iron:router'].RouteController;
  var Promise = Package.promise.Promise;
  var Logger = Package.logger.Logger;
  var Iron = Package['iron:core'].Iron;

  /* Package-scope variables */
  var TR069DataModel, TR_098_DATA_MODEL_NAME, TR_098_DATA_MODEL_ROOT, tr098DataModel, TR_181_DATA_MODEL_NAME, TR_181_DATA_MODEL_ROOT, higherLayerRows, layerInfo, tr181DataModel, IS_TR181_MOCK, TR181_DATA, Utils, IpSubnetCalculator, key;

  (function () {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                     //
    // packages/utility/tr-069-data-model.js                                                                               //
    //                                                                                                                     //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    TR069DataModel = function (dataModelName) {
      this.dataModelName = dataModelName || '';
      this.root = TR_098_DATA_MODEL_ROOT;
      if (this.isTR181()) {
        this.root = TR_181_DATA_MODEL_ROOT;
      }



      /**
       * Fields shared between tr-069 data models
       */
      this.FIELD_NAME_ENABLE = 'Enable';
      this.FIELD_NAME_NAME = 'Name';
      this.FIELD_NAME_DESCRIPTION = 'Description';
      this.FIELD_NAME_DEVICE_INFO = 'DeviceInfo';
      this.FIELD_NAME_PROTOCOL = 'Protocol';
      this.FIELD_NAME_UPTIME = 'UpTime';

      this.FIELD_NAME_CONNECTION_STATUS = 'ConnectionStatus';
      this.FIELD_NAME_CONNECTION_TYPE = 'ConnectionType';
      this.FIELD_NAME_MAC_ADDRESS = 'MACAddress';

      // IP
      this.FIELD_NAME_ADDRESSING_TYPE = 'AddressingType';
      this.FIELD_NAME_SUBNET_MASK = 'SubnetMask';

      // PPP
      this.FIELD_NAME_USER_NAME = 'Username';
      this.FIELD_NAME_REMOTE_IP_ADDRESS = 'RemoteIPAddress';

      this.FIELD_NAME_DNS_SERVERS = 'DNSServers';
      // LAN
      this.FIELD_NAME_STATUS = 'Status';
      this.FIELD_NAME_MAX_BIT_RATE = 'MaxBitRate';
      this.FIELD_NAME_DUPLEX_MODE = 'DuplexMode';
      this.FIELD_NAME_HOSTS = 'Hosts';
      this.FIELD_NAME_HOST_NAME = 'HostName';
      this.FIELD_NAME_HOST = 'Host';
      this.FIELD_NAME_LEASE_TIME_REMAINING = 'LeaseTimeRemaining';
      this.FIELD_NAME_WAN_EXTERNAL_IP_ADDRESS = 'IPAddress';

      // DHCP
      this.FIELD_NAME_MIN_ADDRESS = 'MinAddress';
      this.FIELD_NAME_MAX_ADDRESS = 'MaxAddress';
      this.FIELD_NAME_DOMAIN_NAME = 'DomainName';

      // Port Mapping
      this.FIELD_NAME_PORT_MAPPING = 'PortMapping';
      this.FIELD_NAME_INTERNAL_CLIENT = 'InternalClient';
      this.FIELD_NAME_EXTERNAL_PORT = 'ExternalPort';
      this.FIELD_NAME_EXTERNAL_PORT_END_RANGE = 'ExternalPortEndRange';
      this.FIELD_NAME_INTERNAL_PORT = 'InternalPort';


      this.WAN_ADDRESS_PATH = 'WanAddressPath';
      this.HIGHEST_LAYER = 'HighestLayer';
      this.LOWEST_LAYER = 'LowestLayer';

      this.SXACC_DEFAULT_WAN_CONN_PATH = 'X_CALIX_SXACC_DefaultWanConnectionPath';
      this.SXACC_DEFAULT_WAN_INTERFACE_PATH = 'X_CALIX_SXACC_DefaultWanInterfacePath';

      // WiFi
      this.FIELD_NAME_WIFI = 'WiFi';
      this.FIELD_NAME_SSID = 'SSID';
      this.FIELD_NAME_RADIO = 'Radio';
      this.FIELD_NAME_STATS = 'Stats';
      this.FIELD_NAME_FREQUENCY_BAND = 'OperatingFrequencyBand';
      this.FIELD_NAME_CHANNEL = 'Channel';
      this.FIELD_NAME_AUTO_CHANNEL_ENABLE = 'AutoChannelEnable';
      this.FIELD_NAME_TRANSMIT_POWER = 'TransmitPower';
      this.FIELD_NAME_ADVERTISEMENT = 'SSIDAdvertisementEnabled';
      this.FIELD_NAME_KEYPASSPHRASE = 'KeyPassphrase';
      this.FIELD_NAME_ASSOCIATED_DEVICE = 'AssociatedDevice';
    };

    /**
     * Methods shared between tr-069 data models
     */
    TR069DataModel.prototype.appendDot = function (path) {
      if (path != null && path.lastIndexOf('.') !== path.length - 1) {
        path = path + '.';
      }
      return path;
    };

    TR069DataModel.prototype.removeDot = function (path) {
      if (path != null && path.lastIndexOf('.') === path.length - 1) {
        path = path.slice(0, -1);
      }
      return path;
    };

    TR069DataModel.prototype.getPath = function () {
      var path = this.root;
      _.each(arguments, function (arg) {
        path = path + '.' + arg;
      });

      return path;
    };

    TR069DataModel.prototype.getObjectPath = function () {
      return this.appendDot(this.getPath.apply(this, arguments));
    };

    TR069DataModel.prototype.getDataModelName = function () {
      return this.dataModelName;
    };


    TR069DataModel.prototype.isTR098 = function () {
      return TR_098_DATA_MODEL_NAME === this.dataModelName;
    };

    TR069DataModel.prototype.isTR181 = function () {
      return TR_181_DATA_MODEL_NAME === this.dataModelName;
    };

    TR069DataModel.prototype.getWanData = function (data, wanConnInfo) {
      var highestValue = {};
      if (_.has(wanConnInfo, this.HIGHEST_LAYER)) {
        highestValue = Utils.getValueByPath(data, wanConnInfo[this.HIGHEST_LAYER]);
      }
      console.log('highestValue are ' + JSON.stringify(highestValue));

      var lowestValue = {};
      if (_.has(wanConnInfo, this.LOWEST_LAYER)) {
        lowestValue = Utils.getValueByPath(data, wanConnInfo[this.LOWEST_LAYER]);
      }
      console.log('lowestValue are ' + JSON.stringify(lowestValue));

      var ipv4AddressValue = {};
      if (_.has(wanConnInfo, this.WAN_ADDRESS_PATH)) {
        ipv4AddressValue = Utils.getValueByPath(data, wanConnInfo[this.WAN_ADDRESS_PATH]);
      } else {
        var wanIpPath = this.getWanIpPath(wanConnInfo.HighestLayer);
        var ipv4Address = Utils.getValueByPath(data, wanIpPath);
        if (ipv4Address != null) {
          if (_.size(ipv4Address) === 1) {
            ipv4AddressValue = _.values(ipv4Address)[0];
            console.log('ipv4AddressValue are ' + JSON.stringify(ipv4AddressValue));
          } else {
            // TODO - choose the right ipv4Address
          }
        }
      }
      if (lowestValue == null) {
        lowestValue = {};
      }
      return _.extend(highestValue, _.extend(lowestValue, ipv4AddressValue));
    };

    TR069DataModel.prototype.getLanParams = function (path) {
      path = this.appendDot(path);
      return [
        path + this.FIELD_NAME_ENABLE,
        path + this.FIELD_NAME_STATUS,
        path + this.FIELD_NAME_MAC_ADDRESS,
        path + this.FIELD_NAME_MAX_BIT_RATE,
        path + this.FIELD_NAME_DUPLEX_MODE,
        path + this.FIELD_NAME_NAME
      ];
    };


    /**
     * return an auxiliary path for DHCP, such as InternetGatewayDevice.X_BROADCOM_COM_AppCfg.DnsProxyCfg.
     */
    TR069DataModel.prototype.getLanDHCPAuxiliaryObjectPath = function () {
      return null;
    };

    /**
     * Get auxiliary params for DHCP
     *
     * return an empty array by default
     */
    TR069DataModel.prototype.getLanDHCPAuxiliaryParams = function (path) {
      return [];
    };


    TR069DataModel.prototype.getDHCPSubnetMaskFieldNames = function () {
      return [this.FIELD_NAME_SUBNET_MASK];
    };

    TR069DataModel.prototype.getDefaultEthMap = function () {
      return {
        "eth0": 1,
        "eth1": 2,
        "eth2": 3,
        "eth3": 4
      };
    };

    TR069DataModel.prototype.getRealLanInterfaces = function (lanData) {
      return lanData;
    };

    TR069DataModel.prototype.isEnable = function (value) {
      return value != null && (value === 'true' || value === true || value === 'Up' || value === 'up');
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }).call(this);






  (function () {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                     //
    // packages/utility/tr-098-data-model.js                                                                               //
    //                                                                                                                     //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    TR_098_DATA_MODEL_NAME = 'tr098';
    TR_098_DATA_MODEL_ROOT = 'InternetGatewayDevice';

    var TR098DataModel = function (dataModelName) {
      TR069DataModel.call(this, dataModelName);


      // WAN
      this.FIELD_NAME_WAN_DEVICE = 'WANDevice';
      this.FIELD_NAME_WAN_CONN_DEVICE = 'WANConnectionDevice';
      this.FIELD_NAME_WAN_IP_CONN = 'WANIPConnection';
      this.FIELD_NAME_WAN_PPP_CONN = 'WANPPPConnection';
      this.FIELD_NAME_WAN_IP_V6_CONN = 'X_000631_WANIPv6Connection'; // GigaSpire
      this.FIELD_NAME_WAN_ETH_IF_CONF = 'WANEthernetInterfaceConfig';

      this.FIELD_NAME_WAN_IP_V4_ENABLE = 'IPv4Enabled';

      this.FIELD_NAME_WAN_UPTIME = 'Uptime';
      this.FIELD_NAME_WAN_EXTERNAL_IP_ADDRESS = 'ExternalIPAddress';
      this.FIELD_NAME_WAN_DEFAULT_GATEWAY = 'DefaultGateway';
      this.FIELD_NAME_DHCP_CLIENT = "DHCPClient";
      this.FIELD_NAME_SENT_DHCP_OPTION = "SentDHCPOption";

      // IPv6
      this.FIELD_NAME_WAN_IP_V6_ENABLE = 'IPv6Enabled';
      this.FIELD_NAME_WAN_IP_V6_CONN_STATUS = 'IPv6ConnStatus';
      this.FIELD_NAME_WAN_IP_V6_ADDRESSING_TYPE = 'IPv6AddressingType';
      this.FIELD_NAME_WAN_IP_V6_EXTERNAL_IP_ADDRESS = 'ExternalIPv6Address';
      this.FIELD_NAME_WAN_IP_V6_DEFAULT_GATEWAY = 'DefaultIPv6Gateway';

      this.FIELD_NAME_WAN_BYTES_RECEIVED = 'EthernetBytesReceived';
      this.FIELD_NAME_WAN_BYTES_SENT = 'EthernetBytesSent';
      this.FIELD_NAME_WAN_PACKETS_RECEIVED = 'EthernetPacketsReceived';
      this.FIELD_NAME_WAN_PACKETS_SENT = 'EthernetPacketsSent';
      this.FIELD_NAME_WAN_SHAPING_RATE = 'ShapingRate';
      this.FIELD_NAME_WAN_DS_SHAPING_RATE = 'DsShapingRate';

      this.FIELD_NAME_WAN_CONNECTION_TYPE = this.FIELD_NAME_CONNECTION_TYPE;
      this.FIELD_NAME_LAYER_2_BRIDGING = 'Layer2Bridging';
      this.FIELD_NAME_AVAILABLE_INTERFACE = 'AvailableInterface';

      // LAN
      this.FIELD_NAME_LAN_DEVICE = 'LANDevice';
      this.FIELD_NAME_LAN_ETH_IF_CONF = 'LANEthernetInterfaceConfig';
      this.FIELD_NAME_LAN_MAC_ADDRESS = this.FIELD_NAME_MAC_ADDRESS;
      this.FIELD_NAME_LAN_HOST_CONFIG_MANAGEMENT = 'LANHostConfigManagement';

      // DHCP
      this.FIELD_NAME_IP_INTERFACE = 'IPInterface';
      this.FIELD_NAME_IP_INTERFACE_IP_ADDR = 'IPInterfaceIPAddress';
      this.FIELD_NAME_IP_INTERFACE_SUBNET_MASK = 'IPInterfaceSubnetMask';
      this.FIELD_NAME_X_BROADCOM_COM_APP_CFG = 'X_BROADCOM_COM_AppCfg';
      this.FIELD_NAME_DNS_PROXY_CFG = 'DnsProxyCfg';
      this.FIELD_NAME_DEVICE_DOMAIN_NAME = 'DeviceDomainName';
      this.FIELD_NAME_DEVICE_HOST_NAME = 'DeviceHostName';

      // Hosts
      this.FIELD_NAME_INTERFACE_TYPE = 'InterfaceType';

      // WiFi
      this.FIELD_NAME_ASSOCIATED_DEVICE_MAC_ADDRESS = 'AssociatedDeviceMACAddress';

      // Diagnostics
      this.FIELD_NAME_IP_PING_DIAG = 'IPPingDiagnostics';
      this.FIELD_NAME_TRACE_ROUTE_DIAG = 'TraceRouteDiagnostics';

      // TraceRoute Result
      this.FIELD_NAME_TR_RESULT_HOST = 'HopHost';
      this.FIELD_NAME_TR_RESULT_HOST_ADDRESS = 'HopHostAddress';
      this.FIELD_NAME_TR_RESULT_RT_TIMES = 'HopRTTimes';

      // Port Mapping
      this.FIELD_NAME_PORT_MAPPING_ENABLE = 'PortMappingEnabled';
      this.FIELD_NAME_PORT_MAPPING_DESCRIPTION = 'PortMappingDescription';
      this.FIELD_NAME_PORT_MAPPING_PROTOCAL = 'PortMappingProtocol';
      this.FIELD_NAME_EXTERNAL_PORT_END = 'ExternalPortEnd';
      this.FIELD_NAME_INTERNAL_PORT_END = 'InternalPortEnd';


      this.FIELD_NAME_DHCP_SERVER_ENABLE = 'DHCPServerEnable';
      this.FIELD_NAME_DHCP_LEASE_TIME = 'DHCPLeaseTime';
      this.FIELD_NAME_DHCP_DEFAULT_GATEWAY = this.FIELD_NAME_IP_INTERFACE + '.1.' + this.FIELD_NAME_IP_INTERFACE_IP_ADDR;
      this.FIELD_NAME_DHCP_SUBNET_MASK = this.FIELD_NAME_IP_INTERFACE + '.1.' + this.FIELD_NAME_IP_INTERFACE_SUBNET_MASK;
    };


    TR098DataModel.prototype = new TR069DataModel();

    /**
     * return a path like InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.
     */
    TR098DataModel.prototype.createWanIPConnPath = function (index) {
      return this.getObjectPath(
        this.FIELD_NAME_WAN_DEVICE, index,
        this.FIELD_NAME_WAN_CONN_DEVICE, index,
        this.FIELD_NAME_WAN_IP_CONN, index);
    };



    /**
     * return a path like InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1.
     */
    TR098DataModel.prototype.createWanIPv6ConnPath = function (index) {
      return this.getObjectPath(
        this.FIELD_NAME_WAN_DEVICE, index,
        this.FIELD_NAME_WAN_CONN_DEVICE, index,
        this.FIELD_NAME_WAN_IP_V6_CONN, index);
    };

    /**
     * return a path like InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.
     */
    TR098DataModel.prototype.createLanDHCPPath = function (index, isDHCPv6) {
      return this.getObjectPath(
        this.FIELD_NAME_LAN_DEVICE,
        index,
        this.FIELD_NAME_LAN_HOST_CONFIG_MANAGEMENT);
    };

    /**
     * return a path like InternetGatewayDevice.LANDevice.1.Hosts.Host.1.
     */
    TR098DataModel.prototype.createLanHostPath = function (index) {
      return this.getObjectPath(
        this.FIELD_NAME_LAN_DEVICE,
        index,
        this.FIELD_NAME_HOSTS,
        this.FIELD_NAME_HOST,
        index);
    };

    TR098DataModel.prototype.getWanParams = function (wanPath) {
      wanPath = this.appendDot(wanPath);
      return [
        wanPath + this.FIELD_NAME_ENABLE,
        wanPath + this.FIELD_NAME_WAN_UPTIME,
        wanPath + this.FIELD_NAME_WAN_IP_V4_ENABLE,
        wanPath + this.FIELD_NAME_CONNECTION_STATUS,
        wanPath + this.FIELD_NAME_MAC_ADDRESS,
        wanPath + this.FIELD_NAME_WAN_CONNECTION_TYPE,
        wanPath + this.FIELD_NAME_DNS_SERVERS,
        wanPath + this.FIELD_NAME_WAN_EXTERNAL_IP_ADDRESS,
        wanPath + this.FIELD_NAME_STATS + '.' + this.FIELD_NAME_WAN_BYTES_RECEIVED,
        wanPath + this.FIELD_NAME_STATS + '.' + this.FIELD_NAME_WAN_BYTES_SENT,
        wanPath + this.FIELD_NAME_STATS + '.' + this.FIELD_NAME_WAN_PACKETS_RECEIVED,
        wanPath + this.FIELD_NAME_STATS + '.' + this.FIELD_NAME_WAN_PACKETS_SENT,
        wanPath + this.FIELD_NAME_WAN_SHAPING_RATE,
        wanPath + this.FIELD_NAME_WAN_DS_SHAPING_RATE,
        wanPath + this.FIELD_NAME_DHCP_CLIENT + '.'
      ];
    };


    TR098DataModel.prototype.getDefaultWanParams = function (wanPath) {
      wanPath = this.appendDot(wanPath);
      return [
        wanPath + this.FIELD_NAME_ENABLE,
        wanPath + this.FIELD_NAME_CONNECTION_STATUS,
        wanPath + this.FIELD_NAME_MAC_ADDRESS,
        wanPath + this.FIELD_NAME_WAN_UPTIME,
        wanPath + this.FIELD_NAME_ADDRESSING_TYPE,
        wanPath + this.FIELD_NAME_DNS_SERVERS,
        wanPath + this.FIELD_NAME_WAN_SHAPING_RATE,
        wanPath + this.FIELD_NAME_WAN_DS_SHAPING_RATE,
        wanPath + this.FIELD_NAME_WAN_IP_V6_ENABLE,
        wanPath + this.FIELD_NAME_WAN_IP_V6_CONN_STATUS,
        wanPath + this.FIELD_NAME_WAN_IP_V6_EXTERNAL_IP_ADDRESS,
        wanPath + this.FIELD_NAME_WAN_IP_V6_DEFAULT_GATEWAY,
        wanPath + this.FIELD_NAME_WAN_IP_V6_ADDRESSING_TYPE
      ];
    };


    TR098DataModel.prototype.getWanIpParams = function (wanPath) {
      wanPath = this.appendDot(wanPath);
      return [
        wanPath + this.FIELD_NAME_ADDRESSING_TYPE,
        wanPath + this.FIELD_NAME_SUBNET_MASK,
        wanPath + this.FIELD_NAME_WAN_DEFAULT_GATEWAY
      ];
    };

    TR098DataModel.prototype.isWanIPConnType = function (path) {
      return path.indexOf(this.FIELD_NAME_WAN_IP_CONN) >= 0;
    };

    TR098DataModel.prototype.isWanPPPConnType = function (path) {
      return path.indexOf(this.FIELD_NAME_WAN_PPP_CONN) >= 0;
    };

    /**
     * return  Lan Interface Object Path: InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.
     */
    TR098DataModel.prototype.getLanEthInterfaceObjectPath = function () {
      return this.getObjectPath(this.FIELD_NAME_LAN_DEVICE, '1', this.FIELD_NAME_LAN_ETH_IF_CONF);
    };

    /**jizhu
     * return  Wan Interface Object Path: InternetGatewayDevice.WANDevice.3.WANEthernetInterfaceConfig.
     */
    TR098DataModel.prototype.getWanEthInterfaceObjectPath = function () {
      return this.getObjectPath(this.FIELD_NAME_WAN_DEVICE, '3', this.FIELD_NAME_WAN_ETH_IF_CONF);
    }

    /**
     * return an array including paths like Lan Hosts Object Path: InternetGatewayDevice.LANDevice.i.Hosts.
     */
    TR098DataModel.prototype.getLanHostsObjectPaths = function (modelName) {
      var curObj = this;

      var lanDeviceIndexArray = Utils.getConfigurationValue_DataModel('lanDeviceIndexArrayForHost', modelName, this.dataModelName) || [1];
      var lanDevicePath = this.getObjectPath(this.FIELD_NAME_LAN_DEVICE);
      var paths = [];

      _.each(lanDeviceIndexArray, function (v, k) {
        paths.push(lanDevicePath + v + '.' + curObj.FIELD_NAME_HOSTS + '.');
      });

      return paths;
    };

    /**
     * return an array including paths Lan DHCP Object Path: InternetGatewayDevice.LANDevice.{i}.LANHostConfigManagement.
     */
    TR098DataModel.prototype.getLanDHCPObjectPaths = function (modelName, swVersion) {
      var curObj = this;
      var lanDeviceIndexArray = Utils.getConfigurationValue_DataModel('lanDeviceIndexArrayForDHCP', modelName, curObj.dataModelName, swVersion) || [1];
      var lanDevicePath = curObj.getObjectPath(curObj.FIELD_NAME_LAN_DEVICE);
      var paths = [];

      _.each(lanDeviceIndexArray, function (v, k) {
        paths.push(lanDevicePath + v + '.' + curObj.FIELD_NAME_LAN_HOST_CONFIG_MANAGEMENT + '.');
      });
      return paths;
    };

    /**
     * return InternetGatewayDevice.X_BROADCOM_COM_AppCfg.DnsProxyCfg.
     */
    TR098DataModel.prototype.getLanDHCPAuxiliaryObjectPath = function () {
      return this.getObjectPath(this.FIELD_NAME_X_BROADCOM_COM_APP_CFG, this.FIELD_NAME_DNS_PROXY_CFG);
    };

    TR098DataModel.prototype.getLanDHCPParams = function (path) {
      path = this.appendDot(path);
      return [
        path + this.FIELD_NAME_DHCP_SERVER_ENABLE,
        path + this.FIELD_NAME_MIN_ADDRESS,
        path + this.FIELD_NAME_MAX_ADDRESS,
        path + this.FIELD_NAME_DHCP_LEASE_TIME,
        path + this.FIELD_NAME_SUBNET_MASK,
        path + this.FIELD_NAME_DNS_SERVERS,
        path + this.FIELD_NAME_DOMAIN_NAME,
        path + this.FIELD_NAME_HOST_NAME,
        path + this.FIELD_NAME_DHCP_DEFAULT_GATEWAY,
        path + this.FIELD_NAME_IP_INTERFACE + '.1.' + this.FIELD_NAME_IP_INTERFACE_SUBNET_MASK
      ];
    };

    TR098DataModel.prototype.getDHCPSubnetMaskFieldNames = function () {
      return [this.FIELD_NAME_SUBNET_MASK, this.FIELD_NAME_DHCP_SUBNET_MASK];
    };

    TR098DataModel.prototype.getLanDHCPAuxiliaryParams = function (path) {
      var params = [];
      if (path == null) return params;
      path = this.appendDot(path);
      return [
        path + this.FIELD_NAME_DEVICE_DOMAIN_NAME,
        path + this.FIELD_NAME_DEVICE_HOST_NAME
      ];
    };

    TR098DataModel.prototype.getLanHostInterfaceType = function (data) {
      return data[this.FIELD_NAME_INTERFACE_TYPE];
    };

    TR098DataModel.prototype.getIPPingPath = function () {
      return this.getPath(this.FIELD_NAME_IP_PING_DIAG);
    };

    TR098DataModel.prototype.getTraceRoutePath = function () {
      return this.getPath(this.FIELD_NAME_TRACE_ROUTE_DIAG);
    };

    TR098DataModel.prototype.getSXACCWanInterfaceName = function () {
      return this.SXACC_DEFAULT_WAN_CONN_PATH;
    };

    tr098DataModel = new TR098DataModel(TR_098_DATA_MODEL_NAME);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }).call(this);






  (function () {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                     //
    // packages/utility/tr-181-data-model.js                                                                               //
    //                                                                                                                     //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    TR_181_DATA_MODEL_NAME = 'tr181';
    TR_181_DATA_MODEL_ROOT = 'Device';

    var TR181DataModel = function (dataModelName) {
      TR069DataModel.call(this, dataModelName);
      this.FIELD_NAME_INTERFACE_STACK = 'InterfaceStack';
      this.FIELD_NAME_HIGHER_LAYER = 'HigherLayer';
      this.FIELD_NAME_LOWER_LAYER = 'LowerLayer';


      this.FIELD_NAME_IP = 'IP';
      this.FIELD_NAME_PPP = 'PPP';
      this.FIELD_NAME_ETHERNET = 'Ethernet';
      this.FIELD_NAME_INTERFACE = 'Interface';
      this.FIELD_NAME_LINK = 'Link';
      this.FIELD_NAME_DSL = 'DSL';
      this.FIELD_NAME_LINE = 'Line';
      this.FIELD_NAME_UPSTREAM = 'Upstream';
      this.FIELD_NAME_WAN_IP_V4_ENABLE = 'IPv4Enable';

      this.FIELD_NAME_IP_V4_ADDRESS = 'IPv4Address';
      this.FIELD_NAME_SUBNET_MASK = 'SubnetMask';

      this.FIELD_NAME_WAN_BYTES_RECEIVED = 'BytesReceived';
      this.FIELD_NAME_WAN_BYTES_SENT = 'BytesSent';
      this.FIELD_NAME_WAN_PACKETS_RECEIVED = 'PacketsReceived';
      this.FIELD_NAME_WAN_PACKETS_SENT = 'PacketsSent';


      // DHCP
      this.FIELD_NAME_DHCP_V4 = 'DHCPv4';
      this.FIELD_NAME_DHCP_V6 = 'DHCPv6';
      this.FIELD_NAME_CLIENT = 'Client';
      this.FIELD_NAME_SERVER = 'Server';
      this.FIELD_NAME_POOL = 'Pool';
      this.FIELD_NAME_DHCP_LEASE_TIME = 'LeaseTime';
      this.FIELD_NAME_DHCP_SERVER_ENABLE = this.FIELD_NAME_ENABLE;
      this.FIELD_NAME_DHCP_DEFAULT_GATEWAY = 'IPRouters';
      this.FIELD_NAME_DOMAIN_NAME = 'DomainName';
      this.FIELD_NAME_HOST_NAME = 'HostName'
      // Host
      this.FIELD_NAME_LAN_MAC_ADDRESS = 'PhysAddress';
      this.FIELD_NAME_LAYER_1_INTERFACE = 'Layer1Interface';

      // WiFi
      this.FIELD_NAME_ACCESS_POINT = 'AccessPoint';
      this.FIELD_NAME_SECURITY = 'Security';
      this.FIELD_NAME_BEACON_TYPE = 'ModeEnabled';
      this.FIELD_NAME_ASSOCIATED_DEVICE_MAC_ADDRESS = 'MACAddress';


      // Diagnostics
      this.FIELD_NAME_DIAGNOSTICS = 'Diagnostics';
      this.FIELD_NAME_IP_PING = 'IPPing';
      this.FIELD_NAME_TRACE_ROUTE = 'TraceRoute';

      // TraceRoute Result
      this.FIELD_NAME_TR_RESULT_HOST = 'Host';
      this.FIELD_NAME_TR_RESULT_HOST_ADDRESS = 'HostAddress';
      this.FIELD_NAME_TR_RESULT_RT_TIMES = 'RTTimes';

      // Port Mapping
      this.FIELD_NAME_NAT = 'NAT';
      this.FIELD_NAME_PORT_MAPPING_ENABLE = this.FIELD_NAME_ENABLE;
      this.FIELD_NAME_PORT_MAPPING_DESCRIPTION = this.FIELD_NAME_DESCRIPTION;
      this.FIELD_NAME_PORT_MAPPING_PROTOCAL = this.FIELD_NAME_PROTOCOL;
      this.FIELD_NAME_EXTERNAL_PORT_END = this.FIELD_NAME_EXTERNAL_PORT_END_RANGE;

      this.PATH_ETHERNET_INTERFACE = this.getObjectPath(this.FIELD_NAME_ETHERNET, this.FIELD_NAME_INTERFACE);
      this.PATH_ETHERNET_LINK = this.getObjectPath(this.FIELD_NAME_ETHERNET, this.FIELD_NAME_LINK);
      this.PATH_DSL_LINE = this.getObjectPath(this.FIELD_NAME_DSL, this.FIELD_NAME_LINE);

      this.PATH_RADIO = this.getObjectPath(this.FIELD_NAME_WIFI, this.FIELD_NAME_RADIO);
      this.PATH_SSID = this.getObjectPath(this.FIELD_NAME_WIFI, this.FIELD_NAME_SSID);
      this.PATH_ACCESS_POINT = this.getObjectPath(this.FIELD_NAME_WIFI, this.FIELD_NAME_ACCESS_POINT);

    };



    TR181DataModel.prototype = new TR069DataModel();

    /**
     * return a path like Device.IP.Interface.6.
     *
     */
    TR181DataModel.prototype.createWanIPConnPath = function (index) {
      return this.getObjectPath(
        this.FIELD_NAME_IP,
        this.FIELD_NAME_INTERFACE,
        index);
    };

    TR181DataModel.prototype.getWanParams = function (highestLayer, lowestLayer) {
      highestLayer = this.appendDot(highestLayer);
      lowestLayer = this.appendDot(lowestLayer);
      return [
        highestLayer + this.FIELD_NAME_ENABLE,
        highestLayer + this.FIELD_NAME_WAN_IP_V4_ENABLE,
        highestLayer + this.FIELD_NAME_CONNECTION_STATUS,
        lowestLayer + this.FIELD_NAME_MAC_ADDRESS,
        highestLayer + this.FIELD_NAME_STATS + '.' + this.FIELD_NAME_WAN_BYTES_RECEIVED,
        highestLayer + this.FIELD_NAME_STATS + '.' + this.FIELD_NAME_WAN_BYTES_SENT,
        highestLayer + this.FIELD_NAME_STATS + '.' + this.FIELD_NAME_WAN_PACKETS_RECEIVED,
        highestLayer + this.FIELD_NAME_STATS + '.' + this.FIELD_NAME_WAN_PACKETS_SENT,
      ];
    };

    TR181DataModel.prototype.getDefaultWanParams = function (defaultWanPath, highestLayer, lowestLayer) {
      defaultWanPath = this.appendDot(defaultWanPath);
      highestLayer = this.appendDot(highestLayer);
      lowestLayer = this.appendDot(lowestLayer);
      return [
        defaultWanPath + this.FIELD_NAME_ADDRESSING_TYPE,
        highestLayer + this.FIELD_NAME_ENABLE,
        highestLayer + this.FIELD_NAME_CONNECTION_STATUS,
        lowestLayer + this.FIELD_NAME_MAC_ADDRESS
      ];
    };

    TR181DataModel.prototype.getWanIpPath = function (highestLayer) {
      highestLayer = this.appendDot(highestLayer);
      return highestLayer + this.FIELD_NAME_IP_V4_ADDRESS + '.';
    };

    TR181DataModel.prototype.getWanMACPath = function (highestLayer) {
      highestLayer = this.appendDot(highestLayer.replace(this.FIELD_NAME_IP, this.FIELD_NAME_ETHERNET));
      return highestLayer.replace(this.FIELD_NAME_INTERFACE, this.FIELD_NAME_LINK) + this.FIELD_NAME_MAC_ADDRESS;
    };

    TR181DataModel.prototype.getWanIpParams = function (highestLayer) {
      return [this.getWanIpPath(highestLayer)];
    };

    TR181DataModel.prototype.getInterfaceStackPath = function () {
      return this.getObjectPath(this.FIELD_NAME_INTERFACE_STACK);
    };


    TR181DataModel.prototype.getDHCPServerPath = function (isDHCPv6) {
      var dhcpFieldName = isDHCPv6 ? this.FIELD_NAME_DHCP_V6 : this.FIELD_NAME_DHCP_V4;
      return this.getObjectPath(dhcpFieldName, this.FIELD_NAME_SERVER);
    };

    TR181DataModel.prototype.getDHCPClientPath = function (isDHCPv6) {
      var dhcpFieldName = isDHCPv6 ? this.FIELD_NAME_DHCP_V6 : this.FIELD_NAME_DHCP_V4;
      return this.getObjectPath(dhcpFieldName, this.FIELD_NAME_CLIENT);
    };

    TR181DataModel.prototype.isWanPath = function (path) {
      return path.indexOf(this.PATH_ETHERNET_INTERFACE) === 0 ||
        path.indexOf(this.PATH_ETHERNET_LINK) === 0 ||
        path.indexOf(this.PATH_DSL_LINE) === 0;
    };

    TR181DataModel.prototype.getWanPossiblePaths_ZyXEL = function (interfaceStackTable) {
      if (interfaceStackTable == null || _.isEmpty(interfaceStackTable))
        return null;
      var curObj = this;
      var allRows = {};
      _.each(interfaceStackTable, function (row, index) {
        if (allRows.hasOwnProperty(row[curObj.FIELD_NAME_HIGHER_LAYER])) {
          var values_array = allRows[row[curObj.FIELD_NAME_HIGHER_LAYER]];
          values_array.push(row[curObj.FIELD_NAME_LOWER_LAYER]);
        } else {
          var values_array = [row[curObj.FIELD_NAME_LOWER_LAYER]];
        }
        allRows[row[curObj.FIELD_NAME_HIGHER_LAYER]] = values_array;
      });

      var wanLowestPaths = [];
      if (allRows == null || _.isEmpty(allRows)) {
        return wanLowestPaths;
      }
      for (var higerPath in allRows) {
        var lowPath_array = allRows[higerPath];
        for (var i = 0; i < lowPath_array.length; i++) {
          var lowPath = lowPath_array[i];
          if (allRows.hasOwnProperty(lowPath)) {
            continue;
          }
          if (wanLowestPaths.indexOf(lowPath) < 0 && curObj.isWanPath(lowPath)) {
            wanLowestPaths.push(lowPath);
          }
        }
      }

      return wanLowestPaths;
    }


    TR181DataModel.prototype.getWanPossiblePaths = function (interfaceStackTable) {
      if (interfaceStackTable == null || _.isEmpty(interfaceStackTable))
        return null;

      var curObj = this;
      var getLowerRows = function (table, higherLayer) {
        if (table == null || _.isEmpty(table)) return null;
        return _.filter(table, function (row) {
          return row[curObj.FIELD_NAME_HIGHER_LAYER] === higherLayer;
        });
      };

      var ipInterfacePath = curObj.getObjectPath(curObj.FIELD_NAME_IP, curObj.FIELD_NAME_INTERFACE);
      var ipInterfaceRows = {};
      var otherRows = {};
      _.each(interfaceStackTable, function (row, index) {
        if (row[curObj.FIELD_NAME_HIGHER_LAYER].indexOf(ipInterfacePath) === 0) {
          ipInterfaceRows[index] = row;
        } else {
          otherRows[index] = row;
        }
      });

      var wanLowestPaths = [];
      higherLayerRows = ipInterfaceRows;
      while (higherLayerRows != null && !_.isEmpty(higherLayerRows)) {
        var newHigherLayerRows = {};
        _.each(higherLayerRows, function (row) {
          var lowerLayer = row[curObj.FIELD_NAME_LOWER_LAYER];
          var lowerRows = getLowerRows(otherRows, lowerLayer);

          if (lowerRows == null || _.isEmpty(lowerRows)) { // This is a leaf
            if (curObj.isWanPath(lowerLayer)) {
              wanLowestPaths.push(lowerLayer);
            }
          } else {
            _.each(lowerRows, function (row, index) {
              delete otherRows[index];
              var newLowerLayer = row[curObj.FIELD_NAME_LOWER_LAYER];
              if (newLowerLayer.indexOf(this.FIELD_NAME_WIFI) < 0) {
                newHigherLayerRows[index] = row;
              }
            });
          }
          higherLayerRows = newHigherLayerRows;
        });
      }
      return wanLowestPaths;
    };

    TR181DataModel.prototype.getEthIfUpstreamPaths = function (wanPossiblePaths) {
      var curObj = this;
      var paths = [];
      _.each(wanPossiblePaths, function (path) {
        if (path.indexOf(curObj.PATH_ETHERNET_INTERFACE) === 0) {
          var curPath = curObj.appendDot(path);
          paths.push(curPath + curObj.FIELD_NAME_UPSTREAM);
        }
      });
      return paths;
    };

    TR181DataModel.prototype.getDslStatusPaths = function (wanPossiblePaths) {
      var curObj = this;
      var paths = [];
      _.each(wanPossiblePaths, function (path) {
        if (path.indexOf(curObj.PATH_DSL_LINE) === 0 || path.indexOf(curObj.PATH_ETHERNET_INTERFACE) === 0) {
          var curPath = curObj.appendDot(path);
          paths.push(curPath + curObj.FIELD_NAME_STATUS);
        }
      });
      return paths;
    };

    /**
     * For an Internet Gateway Device,
     * Upstream will be true for all WAN interfaces and false for all LAN interfaces.
     *
     */
    TR181DataModel.prototype.getWanPaths = function (upstreamData, ethIfUpstreamPaths, wanPossiblePaths) {
      var curObj = this;
      var lanPaths = [];
      _.each(ethIfUpstreamPaths, function (path) {
        var upstreamValue = Utils.getValueByPath(upstreamData, path);
        if (!curObj.isEnable(upstreamValue)) { // LAN
          lanPaths.push(path);
        }
      });

      return _.filter(wanPossiblePaths, function (path) {
        return lanPaths.indexOf(path) < 0;
      });
    };

    TR181DataModel.prototype.getWanPaths_ZyXEL = function (upstreamData, ethIfUpstreamPaths, wanPossiblePaths) {
      var curObj = this;
      var lanPaths = [];
      _.each(ethIfUpstreamPaths, function (path) {
        var upstreamValue = Utils.getValueByPath(upstreamData, path);
        if (!curObj.isEnable(upstreamValue)) { // LAN
          lanPaths.push(path);
        }
      });

      var lanPathString = lanPaths.toString();
      return _.filter(wanPossiblePaths, function (path) {
        return lanPathString.indexOf(path) < 0;
      });
    };

    /**
     * Get Wan Connection Information from Interface Stack Table
     * Such as Wan Paths and Wan Connection Type
     *
     * Wan Paths - including the highest layer and the lowest layer
     * Wan Connection Type can be found from the table but
     * we can't know connection type from the values under Wan Paths
     *
     * return an object
     * {
     *  HighestLayer: ...,
     *  LowestLayer: ...,
     *  ConnType: ...,
     *  DNSServers: ...
     * }
     *
     */
    TR181DataModel.prototype.getWanConnInfo = function (interfaceStackTable, wanLowestPaths, dhcpClient) {
      if (interfaceStackTable == null || _.isEmpty(interfaceStackTable) ||
        wanLowestPaths == null || wanLowestPaths.length === 0)
        return null;

      var curObj = this;

      var getHighestLayerAndConnType = function (table, lowerLayer) {
        if (table == null || _.isEmpty(table)) return null;
        var connectionType = curObj.FIELD_NAME_IP;

        var getOneHigherRow = function (lowerLayer) {
          return _.find(table, function (row) {
            return row[curObj.FIELD_NAME_LOWER_LAYER] === lowerLayer;
          });
        };

        var higherRow = getOneHigherRow(lowerLayer);
        while (higherRow != null) {
          lowerLayer = higherRow[curObj.FIELD_NAME_HIGHER_LAYER];
          if (lowerLayer.indexOf(curObj.FIELD_NAME_PPP) >= 0) {
            connectionType = curObj.FIELD_NAME_PPP;
          }
          higherRow = getOneHigherRow(lowerLayer);
        }

        return {
          HighestLayer: lowerLayer,
          ConnType: connectionType
        };
      };

      var result = [];
      _.each(wanLowestPaths, function (path) {
        var layerInfo = getHighestLayerAndConnType(interfaceStackTable, path);
        if (layerInfo != null) {
          layerInfo.LowestLayer = path;
          var client = _.find(dhcpClient, function (curClient) {
            return curClient[curObj.FIELD_NAME_INTERFACE] === layerInfo.HighestLayer;
          });
          if (client != null) {
            layerInfo[curObj.FIELD_NAME_DNS_SERVERS] = client[curObj.FIELD_NAME_DNS_SERVERS];
          }
          result.push(layerInfo);
        }
      });
      return result;
    };

    TR181DataModel.prototype.getWanConnInfo_ZyXEL = function (interfaceStackTable, wanLowestPaths, dhcpClient) {
      if (interfaceStackTable == null || _.isEmpty(interfaceStackTable) ||
        wanLowestPaths == null || wanLowestPaths.length === 0)
        return null;

      var curObj = this;
      var ipInterfacePath = curObj.getObjectPath(curObj.FIELD_NAME_IP, curObj.FIELD_NAME_INTERFACE);
      var pppInterfacePath = curObj.getObjectPath(curObj.FIELD_NAME_PPP, curObj.FIELD_NAME_INTERFACE);
      var allRows = {};

      _.each(interfaceStackTable, function (row, index) {
        if (allRows.hasOwnProperty(row[curObj.FIELD_NAME_LOWER_LAYER])) {
          var values_array = allRows[row[curObj.FIELD_NAME_LOWER_LAYER]];
          values_array.push(row[curObj.FIELD_NAME_HIGHER_LAYER]);
        } else {
          var values_array = [row[curObj.FIELD_NAME_HIGHER_LAYER]];
        }
        allRows[row[curObj.FIELD_NAME_LOWER_LAYER]] = values_array;
      });

      var getHighestLayer = function (lowerLayer) {
        var h_array = [];
        if (allRows.hasOwnProperty(lowerLayer)) {
          h_array = allRows[lowerLayer];
        } else {
          if (lowerLayer.indexOf(ipInterfacePath) === 0 || lowerLayer.indexOf(pppInterfacePath) === 0) {
            return [lowerLayer];
          } else {
            return [];
          }
        }
        if (h_array != null && h_array.length > 0) {
          var r_array = [];
          for (var i = 0; i < h_array.length; i++) {
            r_array.push.apply(r_array, getHighestLayer(h_array[i]));
          }
          return r_array;
        } else {
          return [];
        }
      }

      var getHighestLayerAndConnType = function (lowerLayer) {
        var h_array = getHighestLayer(lowerLayer);
        if (h_array != null && h_array.length > 0) {
          var LayerAndConnTypeArray = [];
          for (var i = 0; i < h_array.length; i++) {
            var hLayer = h_array[i];
            var connectionType = curObj.FIELD_NAME_IP;
            if (hLayer.indexOf(curObj.FIELD_NAME_PPP) >= 0) {
              connectionType = curObj.FIELD_NAME_PPP;
            }
            LayerAndConnTypeArray.push({
              HighestLayer: hLayer,
              ConnType: connectionType
            });
          }
          return LayerAndConnTypeArray;
        } else {
          return null;
        }
      }

      var result = [];
      _.each(wanLowestPaths, function (path) {
        var layerInfoArray = getHighestLayerAndConnType(path);
        if (layerInfoArray != null && layerInfoArray.length > 0) {
          for (var i = 0; i < layerInfoArray.length; i++) {
            layerInfo = layerInfoArray[i];
            layerInfo.LowestLayer = path;
            var client = _.find(dhcpClient, function (curClient) {
              return curClient[curObj.FIELD_NAME_INTERFACE] === layerInfo.HighestLayer;
            });
            if (client != null) {
              layerInfo[curObj.FIELD_NAME_DNS_SERVERS] = client[curObj.FIELD_NAME_DNS_SERVERS];
            }
            result.push(layerInfo);
          }
        }
      });

      return result;
    }

    TR181DataModel.prototype.isWanIPConnType = function (connType) {
      return this.FIELD_NAME_IP === connType;
    };

    TR181DataModel.prototype.isWanPPPConnType = function (connType) {
      return this.FIELD_NAME_PPP === connType;
    };

    /**
     * Get WAN Interface path from the absolute path, such as Device.IP.Interface.6.IPv4Address.1
     * return a path like Device.IP.Interface.6.
     *
     */
    TR181DataModel.prototype.getWanInterfaceObjectPath = function (path) {
      if (path == null) return;
      var matches = path.match(/^(Device\.IP\.Interface\.\d+\.).*$/);
      return matches.length > 1 ? matches[1] : null;
    };

    /**
     * return  Lan Interface Object Path: Device.Ethernet.Interface.
     */
    TR181DataModel.prototype.getLanEthInterfaceObjectPath = function () {
      return this.getObjectPath(this.FIELD_NAME_ETHERNET, this.FIELD_NAME_INTERFACE);
    };

    /**
     * return an array including paths Lan Hosts Object Path: Device.Hosts.
     */
    TR181DataModel.prototype.getLanHostsObjectPaths = function (modelName) {
      return [this.getObjectPath(this.FIELD_NAME_HOSTS)];
    };


    /**
     * return an array including paths Lan DHCP Object Path: Device.DHCPv4|DHCPv6.Server.Pool.i.
     */
    TR181DataModel.prototype.getLanDHCPObjectPaths = function (modelName, swVersion, isDHCPv6) {
      var curObj = this;
      var dhcpServerPath = curObj.getDHCPServerPath(isDHCPv6);
      var dhcpPoolPath = dhcpServerPath + curObj.FIELD_NAME_POOL + '.';
      var lanDeviceIndexArray = Utils.getConfigurationValue_DataModel('lanDeviceIndexArrayForDHCP', modelName, curObj.dataModelName, swVersion) || [1];
      var paths = [];

      _.each(lanDeviceIndexArray, function (v, k) {
        paths.push(dhcpPoolPath + v + '.');
      });
      if (modelName == 'VMG4825-B10A' || modelName == 'VMG4927-B50A' || modelName == "VMG3927-B50B") {
        paths.push('Device.IP.Interface.1.IPv4Address.1.');
      }
      if (modelName == 'EX5510-B0') {
        paths.push('Device.X_ZYXEL_System_Info.');
      }
      return paths;
    };

    TR181DataModel.prototype.getLanDHCPParams = function (path) {
      path = this.appendDot(path);
      return [
        path + this.FIELD_NAME_DHCP_SERVER_ENABLE,
        path + this.FIELD_NAME_MIN_ADDRESS,
        path + this.FIELD_NAME_MAX_ADDRESS,
        path + this.FIELD_NAME_DHCP_LEASE_TIME,
        path + this.FIELD_NAME_SUBNET_MASK,
        path + this.FIELD_NAME_DNS_SERVERS,
        path + this.FIELD_NAME_IPRUTERS,
        path + this.FIELD_NAME_HOST_NAME,
        path + this.FIELD_NAME_DOMAIN_NAME,
        path + this.FIELD_NAME_DHCP_DEFAULT_GATEWAY
      ];

    };

    /**
     * return a path like Device.DHCPv4|DHCPv6.Server.Pool.1.
     */
    TR181DataModel.prototype.createLanDHCPPath = function (index, isDHCPv6) {
      var dhcpServerPath = this.getDHCPServerPath(isDHCPv6);
      var dhcpPoolPath = dhcpServerPath + this.FIELD_NAME_POOL + '.';
      return dhcpPoolPath + index + '.';
    };

    /**
     * return a path like Device.Hosts.Host.1.
     */
    TR181DataModel.prototype.createLanHostPath = function (index) {
      return this.getObjectPath(
        this.FIELD_NAME_HOSTS,
        this.FIELD_NAME_HOST,
        index);
    };

    /**
     * For an Internet Gateway Device,
     * Upstream will be true for all WAN interfaces and false for all LAN interfaces.
     *
     */
    TR181DataModel.prototype.getRealLanInterfaces = function (lanData) {
      var curObj = this;
      var lanResult = {};
      _.each(lanData, function (v, k) {
        var upstream = v[curObj.FIELD_NAME_UPSTREAM];
        if (!(curObj.isEnable(upstream))) {
          lanResult[k] = v;
        }
      });

      return lanResult;
    };

    TR181DataModel.prototype.getLanHostInterfaceType = function (data) {
      var layer1Interface = data[this.FIELD_NAME_LAYER_1_INTERFACE];
      var result = null;
      if (layer1Interface != null) {
        var parts = layer1Interface.split('.');
        if (parts.length > 1) {
          result = parts[1];
          if (result === this.FIELD_NAME_WIFI) {
            result = '802.11';
          }
        }
      }
      return result;
    };


    TR181DataModel.prototype.getIPPingPath = function () {
      return this.getPath(this.FIELD_NAME_IP, this.FIELD_NAME_DIAGNOSTICS, this.FIELD_NAME_IP_PING);
    };

    TR181DataModel.prototype.getTraceRoutePath = function () {
      return this.getPath(this.FIELD_NAME_IP, this.FIELD_NAME_DIAGNOSTICS, this.FIELD_NAME_TRACE_ROUTE);
    };

    TR181DataModel.prototype.getSXACCWanInterfaceName = function () {
      return this.SXACC_DEFAULT_WAN_INTERFACE_PATH;
    };

    tr181DataModel = new TR181DataModel(TR_181_DATA_MODEL_NAME);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }).call(this);






  (function () {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                     //
    // packages/utility/arris.js                                                                                           //
    //                                                                                                                     //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    IS_TR181_MOCK = false;
    TR181_DATA = {
      "Device": {
        "RootDataModelVersion": "2.4",
        "InterfaceStackNumberOfEntries": "68",
        "DeviceInfo": {
          "Manufacturer": "ARRIS Group, Inc.",
          "ManufacturerOUI": "0000CA",
          "ModelName": "DG2470A",
          "Description": "ARRIS DOCSIS 3.0 Touchstone Residential Gateway",
          "ProductClass": "DG2470A",
          "SerialNumber": "G3XBSY89A602489",
          "HardwareVersion": "6",
          "SoftwareVersion": "9.1.93",
          "ProvisioningCode": "",
          "UpTime": "62542",
          "FirstUseDate": "2017-07-31T19:36:59+00:00",
          "SupportedDataModelNumberOfEntries": "1"
        },
        "ManagementServer": {
          "EnableCWMP": "true",
          "URL": "http://cdcdev-gcs.calix.com:8080/395050/2p0L6pCVBy",
          "Username": "tr069",
          "Password": "",
          "PeriodicInformEnable": "true",
          "PeriodicInformInterval": "86400",
          "PeriodicInformTime": "2017-08-23T01:18:39+00:00",
          "ParameterKey": "599b866fe4b0c94f4aacbab5",
          "ConnectionRequestURL": "http://10.57.79.165:15627/acscall",
          "ConnectionRequestUsername": "admin",
          "ConnectionRequestPassword": "",
          "UpgradesManaged": "false",
          "DefaultActiveNotificationThrottle": "60",
          "CWMPRetryMinimumWaitInterval": "5",
          "CWMPRetryIntervalMultiplier": "2000",
          "ManageableDeviceNumberOfEntries": "0",
          "AliasBasedAddressing": "false"
        },
        "LANConfigSecurity": {
          "ConfigPassword": ""
        },
        "WiFi": {
          "RadioNumberOfEntries": "2",
          "SSIDNumberOfEntries": "16",
          "AccessPointNumberOfEntries": "16",
          "Radio": {
            "10000": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "wifi24",
              "Upstream": "false",
              "MaxBitRate": "450",
              "SupportedFrequencyBands": "2.4GHz",
              "OperatingFrequencyBand": "2.4GHz",
              "SupportedStandards": "b,g,n",
              "OperatingStandards": "g,n",
              "PossibleChannels": "1,2,3,4,5,6,7,8,9,10,11",
              "Channel": "6",
              "AutoChannelSupported": "true",
              "AutoChannelEnable": "true",
              "ExtensionChannel": "Auto",
              "GuardInterval": "Auto",
              "MCS": "-1",
              "TransmitPowerSupported": "25,50,100",
              "TransmitPower": "100",
              "IEEE80211hSupported": "false",
              "IEEE80211hEnabled": "false",
              "RegulatoryDomain": "DFI",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0"
              }
            },
            "10100": {
              "Enable": "false",
              "Status": "Up",
              "Alias": "",
              "Name": "wifi50",
              "Upstream": "false",
              "MaxBitRate": "1300",
              "SupportedFrequencyBands": "5GHz",
              "OperatingFrequencyBand": "5GHz",
              "SupportedStandards": "a,n",
              "OperatingStandards": "a,n,ac",
              "PossibleChannels": "36,40,44,48,149,153,157,161,165",
              "Channel": "48",
              "AutoChannelSupported": "true",
              "AutoChannelEnable": "true",
              "ExtensionChannel": "",
              "GuardInterval": "Auto",
              "MCS": "-1",
              "TransmitPowerSupported": "25,50,100",
              "TransmitPower": "100",
              "IEEE80211hSupported": "false",
              "IEEE80211hEnabled": "false",
              "RegulatoryDomain": "DFI",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0"
              }
            }
          },
          "SSID": {
            "10001": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "wifi24_1",
              "LowerLayers": "Device.WiFi.Radio.10000",
              "BSSID": "3C:7A:8A:7F:78:70",
              "MACAddress": "3C:7A:8A:7F:78:70",
              "SSID": "ARRIS-7872",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10002": {
              "Enable": "true",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi24_2",
              "LowerLayers": "Device.WiFi.Radio.10000",
              "BSSID": "3E:7A:8A:7F:78:70",
              "MACAddress": "3E:7A:8A:7F:78:70",
              "SSID": "ARRIS-7872-2",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10003": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi24_3",
              "LowerLayers": "Device.WiFi.Radio.10000",
              "BSSID": "4E:7A:8A:7F:78:70",
              "MACAddress": "4E:7A:8A:7F:78:70",
              "SSID": "ARRIS-7872-3",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10004": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi24_4",
              "LowerLayers": "Device.WiFi.Radio.10000",
              "BSSID": "5E:7A:8A:7F:78:70",
              "MACAddress": "5E:7A:8A:7F:78:70",
              "SSID": "ARRIS-7872-4",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10005": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi24_5",
              "LowerLayers": "Device.WiFi.Radio.10000",
              "BSSID": "6E:7A:8A:7F:78:70",
              "MACAddress": "6E:7A:8A:7F:78:70",
              "SSID": "ARRIS-7872-5",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10006": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi24_6",
              "LowerLayers": "Device.WiFi.Radio.10000",
              "BSSID": "7E:7A:8A:7F:78:70",
              "MACAddress": "7E:7A:8A:7F:78:70",
              "SSID": "ARRIS-7872-6",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10007": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi24_7",
              "LowerLayers": "Device.WiFi.Radio.10000",
              "BSSID": "8E:7A:8A:7F:78:70",
              "MACAddress": "8E:7A:8A:7F:78:70",
              "SSID": "ARRIS-7872-7",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10008": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi24_8",
              "LowerLayers": "Device.WiFi.Radio.10000",
              "BSSID": "9E:7A:8A:7F:78:70",
              "MACAddress": "9E:7A:8A:7F:78:70",
              "SSID": "ARRIS-7872-8",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10101": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "wifi50_1",
              "LowerLayers": "Device.WiFi.Radio.10100",
              "BSSID": "3C:7A:8A:7F:78:75",
              "MACAddress": "3C:7A:8A:7F:78:75",
              "SSID": "ARRIS-7872-5G",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10102": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi50_2",
              "LowerLayers": "Device.WiFi.Radio.10100",
              "BSSID": "3E:7A:8A:7F:78:75",
              "MACAddress": "3E:7A:8A:7F:78:75",
              "SSID": "ARRIS-7872-52",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10103": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi50_3",
              "LowerLayers": "Device.WiFi.Radio.10100",
              "BSSID": "4E:7A:8A:7F:78:75",
              "MACAddress": "4E:7A:8A:7F:78:75",
              "SSID": "ARRIS-7872-53",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10104": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi50_4",
              "LowerLayers": "Device.WiFi.Radio.10100",
              "BSSID": "5E:7A:8A:7F:78:75",
              "MACAddress": "5E:7A:8A:7F:78:75",
              "SSID": "ARRIS-7872-54",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10105": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi50_5",
              "LowerLayers": "Device.WiFi.Radio.10100",
              "BSSID": "6E:7A:8A:7F:78:75",
              "MACAddress": "6E:7A:8A:7F:78:75",
              "SSID": "ARRIS-7872-55",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10106": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi50_6",
              "LowerLayers": "Device.WiFi.Radio.10100",
              "BSSID": "7E:7A:8A:7F:78:75",
              "MACAddress": "7E:7A:8A:7F:78:75",
              "SSID": "ARRIS-7872-56",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10107": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi50_7",
              "LowerLayers": "Device.WiFi.Radio.10100",
              "BSSID": "8E:7A:8A:7F:78:75",
              "MACAddress": "8E:7A:8A:7F:78:75",
              "SSID": "ARRIS-7872-57",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "10108": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "wifi50_8",
              "LowerLayers": "Device.WiFi.Radio.10100",
              "BSSID": "9E:7A:8A:7F:78:75",
              "MACAddress": "9E:7A:8A:7F:78:75",
              "SSID": "ARRIS-7872-58",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            }
          },
          "AccessPoint": {
            "10001": {
              "Enable": "true",
              "Status": "Enabled",
              "SSIDReference": "Device.WiFi.SSID.10001",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "false",
              "AssociatedDeviceNumberOfEntries": "1",
              "MaxAssociatedDevices": "127",
              "AssociatedDevice": {
                "1": {
                  "MACAddress": "9C:20:7B:9D:C4:50",
                  "AuthenticationState": "true",
                  "LastDataDownlinkRate": "56136",
                  "LastDataUplinkRate": "0",
                  "SignalStrength": "-47",
                  "Active": "true"
                }
              },
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "WPA2-Personal",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10002": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10002",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10003": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10003",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10004": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10004",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10005": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10005",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10006": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10006",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10007": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10007",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10008": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10008",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10101": {
              "Enable": "true",
              "Status": "Enabled",
              "SSIDReference": "Device.WiFi.SSID.10101",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "WPA2-Personal",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10102": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10102",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10103": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10103",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10104": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10104",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10105": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10105",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10106": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10106",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10107": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10107",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            },
            "10108": {
              "Enable": "false",
              "Status": "Disabled",
              "SSIDReference": "Device.WiFi.SSID.10108",
              "SSIDAdvertisementEnabled": "true",
              "WMMCapability": "true",
              "UAPSDCapability": "true",
              "WMMEnable": "true",
              "UAPSDEnable": "true",
              "AssociatedDeviceNumberOfEntries": "0",
              "MaxAssociatedDevices": "127",
              "Security": {
                "ModesSupported": "None,WEP-64,WEP-128,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise",
                "ModeEnabled": "None",
                "WEPKey": "",
                "PreSharedKey": "",
                "KeyPassphrase": "",
                "RekeyingInterval": "0",
                "RadiusServerIPAddr": "",
                "RadiusServerPort": "1812",
                "RadiusSecret": ""
              },
              "WPS": {
                "Enable": "true",
                "ConfigMethodsSupported": "PushButton,PIN",
                "ConfigMethodsEnabled": "PushButton,PIN"
              }
            }
          },
          "NeighboringWiFiDiagnostic": {
            "DiagnosticsState": "None",
            "ResultNumberOfEntries": "0",
            "Result": {
              "1": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "2": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "3": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "4": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "5": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "6": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "7": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "8": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "9": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "10": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "11": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "12": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "13": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "14": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "15": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "16": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "17": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "18": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "19": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "20": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "21": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "22": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "23": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "24": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "25": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "26": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "27": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "28": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "29": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              },
              "30": {
                "Radio": "",
                "SSID": "",
                "BSSID": "",
                "Channel": "0",
                "SignalStrength": "0",
                "OperatingFrequencyBand": "",
                "SupportedStandards": "",
                "Noise": "0",
                "SupportedDataTransferRates": "",
                "OperatingStandards": "",
                "SecurityModeEnabled": "",
                "OperatingChannelBandwidth": ""
              }
            }
          }
        },
        "Time": {
          "Enable": "false",
          "Status": "Disabled",
          "NTPServer1": "clock.via.net",
          "NTPServer2": "ntp.nasa.gov",
          "CurrentLocalTime": "2017-08-21T21:59:51+00:00",
          "LocalTimeZone": ""
        },
        "InterfaceStack": {
          "1": {
            "HigherLayer": "Device.IP.Interface.200",
            "LowerLayer": "Device.Ethernet.Link.200"
          },
          "2": {
            "HigherLayer": "Device.IP.Interface.201",
            "LowerLayer": "Device.Ethernet.Link.201"
          },
          "3": {
            "HigherLayer": "Device.IP.Interface.202",
            "LowerLayer": "Device.Ethernet.Link.202"
          },
          "4": {
            "HigherLayer": "Device.IP.Interface.203",
            "LowerLayer": "Device.Ethernet.Link.203"
          },
          "5": {
            "HigherLayer": "Device.IP.Interface.204",
            "LowerLayer": "Device.Ethernet.Link.204"
          },
          "6": {
            "HigherLayer": "Device.IP.Interface.205",
            "LowerLayer": "Device.Ethernet.Link.205"
          },
          "7": {
            "HigherLayer": "Device.IP.Interface.206",
            "LowerLayer": "Device.Ethernet.Link.206"
          },
          "8": {
            "HigherLayer": "Device.IP.Interface.207",
            "LowerLayer": "Device.Ethernet.Link.207"
          },
          "9": {
            "HigherLayer": "Device.IP.Interface.300",
            "LowerLayer": "Device.Ethernet.Link.300"
          },
          "10": {
            "HigherLayer": "Device.IP.Interface.301",
            "LowerLayer": "Device.Ethernet.Link.301"
          },
          "11": {
            "HigherLayer": "Device.Ethernet.Link.200",
            "LowerLayer": "Device.Bridging.Bridge.200.Port.1"
          },
          "12": {
            "HigherLayer": "Device.Ethernet.Link.201",
            "LowerLayer": "Device.Bridging.Bridge.201.Port.1"
          },
          "13": {
            "HigherLayer": "Device.Ethernet.Link.202",
            "LowerLayer": "Device.Bridging.Bridge.202.Port.1"
          },
          "14": {
            "HigherLayer": "Device.Ethernet.Link.203",
            "LowerLayer": "Device.Bridging.Bridge.203.Port.1"
          },
          "15": {
            "HigherLayer": "Device.Ethernet.Link.204",
            "LowerLayer": "Device.Bridging.Bridge.204.Port.1"
          },
          "16": {
            "HigherLayer": "Device.Ethernet.Link.205",
            "LowerLayer": "Device.Bridging.Bridge.205.Port.1"
          },
          "17": {
            "HigherLayer": "Device.Ethernet.Link.206",
            "LowerLayer": "Device.Bridging.Bridge.206.Port.1"
          },
          "18": {
            "HigherLayer": "Device.Ethernet.Link.207",
            "LowerLayer": "Device.Bridging.Bridge.207.Port.1"
          },
          "19": {
            "HigherLayer": "Device.WiFi.SSID.10001",
            "LowerLayer": "Device.WiFi.Radio.10000"
          },
          "20": {
            "HigherLayer": "Device.WiFi.SSID.10002",
            "LowerLayer": "Device.WiFi.Radio.10000"
          },
          "21": {
            "HigherLayer": "Device.WiFi.SSID.10003",
            "LowerLayer": "Device.WiFi.Radio.10000"
          },
          "22": {
            "HigherLayer": "Device.WiFi.SSID.10004",
            "LowerLayer": "Device.WiFi.Radio.10000"
          },
          "23": {
            "HigherLayer": "Device.WiFi.SSID.10005",
            "LowerLayer": "Device.WiFi.Radio.10000"
          },
          "24": {
            "HigherLayer": "Device.WiFi.SSID.10006",
            "LowerLayer": "Device.WiFi.Radio.10000"
          },
          "25": {
            "HigherLayer": "Device.WiFi.SSID.10007",
            "LowerLayer": "Device.WiFi.Radio.10000"
          },
          "26": {
            "HigherLayer": "Device.WiFi.SSID.10008",
            "LowerLayer": "Device.WiFi.Radio.10000"
          },
          "27": {
            "HigherLayer": "Device.WiFi.SSID.10101",
            "LowerLayer": "Device.WiFi.Radio.10100"
          },
          "28": {
            "HigherLayer": "Device.WiFi.SSID.10102",
            "LowerLayer": "Device.WiFi.Radio.10100"
          },
          "29": {
            "HigherLayer": "Device.WiFi.SSID.10103",
            "LowerLayer": "Device.WiFi.Radio.10100"
          },
          "30": {
            "HigherLayer": "Device.WiFi.SSID.10104",
            "LowerLayer": "Device.WiFi.Radio.10100"
          },
          "31": {
            "HigherLayer": "Device.WiFi.SSID.10105",
            "LowerLayer": "Device.WiFi.Radio.10100"
          },
          "32": {
            "HigherLayer": "Device.WiFi.SSID.10106",
            "LowerLayer": "Device.WiFi.Radio.10100"
          },
          "33": {
            "HigherLayer": "Device.WiFi.SSID.10107",
            "LowerLayer": "Device.WiFi.Radio.10100"
          },
          "34": {
            "HigherLayer": "Device.WiFi.SSID.10108",
            "LowerLayer": "Device.WiFi.Radio.10100"
          },
          "35": {
            "HigherLayer": "Device.L2oGRE.Interface.1",
            "LowerLayer": "Device.WIFI.SSID.10003"
          },
          "36": {
            "HigherLayer": "Device.GRE.Tunnel.1.Interface.1",
            "LowerLayer": "Device.WIFI.SSID.10003"
          },
          "37": {
            "HigherLayer": "Device.GRE.Tunnel.1.Interface.1",
            "LowerLayer": "Device.WIFI.SSID.10103"
          },
          "38": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.2",
            "LowerLayer": "Device.Ethernet.Interface.6"
          },
          "39": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.2",
            "LowerLayer": "Device.Ethernet.Interface.7"
          },
          "40": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.2",
            "LowerLayer": "Device.Ethernet.Interface.8"
          },
          "41": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.2",
            "LowerLayer": "Device.Ethernet.Interface.9"
          },
          "42": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.3",
            "LowerLayer": "Device.MOCA.Interface.40"
          },
          "43": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.4",
            "LowerLayer": "Device.WiFi.SSID.10001"
          },
          "44": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.4",
            "LowerLayer": "Device.WiFi.SSID.10101"
          },
          "45": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.200.Port.2"
          },
          "46": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.200.Port.3"
          },
          "47": {
            "HigherLayer": "Device.Bridging.Bridge.200.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.200.Port.4"
          },
          "48": {
            "HigherLayer": "Device.Bridging.Bridge.201.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10002"
          },
          "49": {
            "HigherLayer": "Device.Bridging.Bridge.201.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10102"
          },
          "50": {
            "HigherLayer": "Device.Bridging.Bridge.201.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.201.Port.2"
          },
          "51": {
            "HigherLayer": "Device.Bridging.Bridge.202.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10003"
          },
          "52": {
            "HigherLayer": "Device.Bridging.Bridge.202.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10103"
          },
          "53": {
            "HigherLayer": "Device.Bridging.Bridge.202.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.202.Port.2"
          },
          "54": {
            "HigherLayer": "Device.Bridging.Bridge.203.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10004"
          },
          "55": {
            "HigherLayer": "Device.Bridging.Bridge.203.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10104"
          },
          "56": {
            "HigherLayer": "Device.Bridging.Bridge.203.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.203.Port.2"
          },
          "57": {
            "HigherLayer": "Device.Bridging.Bridge.204.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10005"
          },
          "58": {
            "HigherLayer": "Device.Bridging.Bridge.204.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10105"
          },
          "59": {
            "HigherLayer": "Device.Bridging.Bridge.204.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.204.Port.2"
          },
          "60": {
            "HigherLayer": "Device.Bridging.Bridge.205.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10006"
          },
          "61": {
            "HigherLayer": "Device.Bridging.Bridge.205.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10106"
          },
          "62": {
            "HigherLayer": "Device.Bridging.Bridge.205.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.205.Port.2"
          },
          "63": {
            "HigherLayer": "Device.Bridging.Bridge.206.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10007"
          },
          "64": {
            "HigherLayer": "Device.Bridging.Bridge.206.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10107"
          },
          "65": {
            "HigherLayer": "Device.Bridging.Bridge.206.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.206.Port.2"
          },
          "66": {
            "HigherLayer": "Device.Bridging.Bridge.207.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10008"
          },
          "67": {
            "HigherLayer": "Device.Bridging.Bridge.207.Port.2",
            "LowerLayer": "Device.WiFi.SSID.10108"
          },
          "68": {
            "HigherLayer": "Device.Bridging.Bridge.207.Port.1",
            "LowerLayer": "Device.Bridging.Bridge.207.Port.2"
          }
        },
        "Ethernet": {
          "LinkNumberOfEntries": "10",
          "InterfaceNumberOfEntries": "4",
          "Interface": {
            "6": {
              "Enable": "true",
              "Status": "down",
              "Alias": "",
              "Name": "ext1",
              "LastChange": "62554",
              "Upstream": "false",
              "MACAddress": "00:00:00:00:00:00",
              "MaxBitRate": "-1",
              "DuplexMode": "Auto",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "7": {
              "Enable": "true",
              "Status": "down",
              "Alias": "",
              "Name": "ext2",
              "LastChange": "62554",
              "Upstream": "false",
              "MACAddress": "00:00:00:00:00:00",
              "MaxBitRate": "-1",
              "DuplexMode": "Auto",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "8": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "ext3",
              "LastChange": "62554",
              "Upstream": "false",
              "MACAddress": "00:00:00:00:00:00",
              "MaxBitRate": "-1",
              "DuplexMode": "Auto",
              "Stats": {
                "BytesSent": "2969426",
                "BytesReceived": "3125835",
                "PacketsSent": "23397",
                "PacketsReceived": "41330",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "322",
                "UnicastPacketsReceived": "8154",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "22803",
                "MulticastPacketsReceived": "32693",
                "BroadcastPacketsSent": "272",
                "BroadcastPacketsReceived": "483",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "9": {
              "Enable": "true",
              "Status": "down",
              "Alias": "",
              "Name": "ext4",
              "LastChange": "62555",
              "Upstream": "false",
              "MACAddress": "00:00:00:00:00:00",
              "MaxBitRate": "-1",
              "DuplexMode": "Auto",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            }
          },
          "Link": {
            "300": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "wan0",
              "LastChange": "62470",
              "LowerLayers": "",
              "MACAddress": "3C:7A:8A:7F:78:72",
              "Stats": {
                "BytesSent": "8396",
                "BytesReceived": "3827",
                "PacketsSent": "23",
                "PacketsReceived": "25",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "23",
                "UnicastPacketsReceived": "25",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "301": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "esafe0",
              "LastChange": "62446",
              "LowerLayers": "",
              "MACAddress": "3C:7A:8A:7F:78:73",
              "Stats": {
                "BytesSent": "633158",
                "BytesReceived": "1582782",
                "PacketsSent": "1761",
                "PacketsReceived": "4792",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "1761",
                "UnicastPacketsReceived": "4251",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "541",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "200": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "l2sd0.2",
              "LastChange": "62487",
              "LowerLayers": "Device.Bridging.Bridge.200.Port.200",
              "MACAddress": "3C:7A:8A:7F:78:77",
              "Stats": {
                "BytesSent": "3225812",
                "BytesReceived": "1266297",
                "PacketsSent": "24469",
                "PacketsReceived": "4142",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "24469",
                "UnicastPacketsReceived": "4142",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "201": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "l2sd0.3",
              "LastChange": "62487",
              "LowerLayers": "Device.Bridging.Bridge.201.Port.201",
              "MACAddress": "3C:7A:8A:7F:78:77",
              "Stats": {
                "BytesSent": "2582976",
                "BytesReceived": "0",
                "PacketsSent": "22641",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22641",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "202": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "l2sd0.4",
              "LastChange": "62487",
              "LowerLayers": "Device.Bridging.Bridge.202.Port.202",
              "MACAddress": "3C:7A:8A:7F:78:77",
              "Stats": {
                "BytesSent": "2583496",
                "BytesReceived": "0",
                "PacketsSent": "22645",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22645",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "203": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "l2sd0.5",
              "LastChange": "62487",
              "LowerLayers": "Device.Bridging.Bridge.203.Port.203",
              "MACAddress": "3C:7A:8A:7F:78:77",
              "Stats": {
                "BytesSent": "2583646",
                "BytesReceived": "0",
                "PacketsSent": "22646",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22646",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "204": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "l2sd0.6",
              "LastChange": "62444",
              "LowerLayers": "Device.Bridging.Bridge.204.Port.204",
              "MACAddress": "3C:7A:8A:7F:78:77",
              "Stats": {
                "BytesSent": "2583496",
                "BytesReceived": "0",
                "PacketsSent": "22645",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22645",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "205": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "l2sd0.7",
              "LastChange": "62488",
              "LowerLayers": "Device.Bridging.Bridge.205.Port.205",
              "MACAddress": "3C:7A:8A:7F:78:77",
              "Stats": {
                "BytesSent": "2583366",
                "BytesReceived": "0",
                "PacketsSent": "22644",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22644",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "206": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "l2sd0.8",
              "LastChange": "62488",
              "LowerLayers": "Device.Bridging.Bridge.206.Port.206",
              "MACAddress": "3C:7A:8A:7F:78:77",
              "Stats": {
                "BytesSent": "2583606",
                "BytesReceived": "0",
                "PacketsSent": "22646",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22646",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "207": {
              "Enable": "true",
              "Status": "up",
              "Alias": "",
              "Name": "l2sd0.9",
              "LastChange": "62488",
              "LowerLayers": "Device.Bridging.Bridge.207.Port.207",
              "MACAddress": "3C:7A:8A:7F:78:77",
              "Stats": {
                "BytesSent": "2583266",
                "BytesReceived": "0",
                "PacketsSent": "22644",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22644",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            }
          }
        },
        "Bridging": {
          "MaxBridgeEntries": "16",
          "MaxDBridgeEntries": "16",
          "BridgeNumberOfEntries": "8",
          "Bridge": {
            "200": {
              "Enable": "true",
              "Status": "Enabled",
              "PortNumberOfEntries": "4",
              "Port": {
                "1": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "l2sd0.2",
                  "LastChange": "62488",
                  "LowerLayers": "Device.Bridging.Bridge.200.Port.2,Device.Bridging.Bridge.200.Port.3,Device.Bridging.Bridge.200.Port.4",
                  "ManagementPort": "true",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "3225922",
                    "BytesReceived": "1266297",
                    "PacketsSent": "24470",
                    "PacketsReceived": "4142",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "24470",
                    "UnicastPacketsReceived": "4142",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "2": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "ext1",
                  "LastChange": "62557",
                  "LowerLayers": "Device.Ethernet.Interface.6,Device.Ethernet.Interface.7,Device.Ethernet.Interface.8,Device.Ethernet.Interface.9",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "2969426",
                    "BytesReceived": "3125835",
                    "PacketsSent": "23397",
                    "PacketsReceived": "41330",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "322",
                    "UnicastPacketsReceived": "8154",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "22803",
                    "MulticastPacketsReceived": "32693",
                    "BroadcastPacketsSent": "272",
                    "BroadcastPacketsReceived": "483",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "3": {
                  "Enable": "false",
                  "Status": "down",
                  "Alias": "",
                  "Name": "moca",
                  "LastChange": "62557",
                  "LowerLayers": "Device.MOCA.Interface.40",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "3400177",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "4": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "wifi24_1",
                  "LastChange": "62558",
                  "LowerLayers": "Device.WiFi.SSID.10001,Device.WiFi.SSID.10101",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                }
              }
            },
            "201": {
              "Enable": "true",
              "Status": "Enabled",
              "PortNumberOfEntries": "2",
              "Port": {
                "1": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "l2sd0.3",
                  "LastChange": "62489",
                  "LowerLayers": "Device.Bridging.Bridge.201.Port.2",
                  "ManagementPort": "true",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "2583086",
                    "BytesReceived": "0",
                    "PacketsSent": "22642",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "22642",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "2": {
                  "Enable": "false",
                  "Status": "down",
                  "Alias": "",
                  "Name": "wifi24_2",
                  "LastChange": "62558",
                  "LowerLayers": "Device.WiFi.SSID.10002,Device.WiFi.SSID.10102",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                }
              }
            },
            "202": {
              "Enable": "true",
              "Status": "Enabled",
              "PortNumberOfEntries": "2",
              "Port": {
                "1": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "l2sd0.4",
                  "LastChange": "62490",
                  "LowerLayers": "Device.Bridging.Bridge.202.Port.2",
                  "ManagementPort": "true",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "2583606",
                    "BytesReceived": "0",
                    "PacketsSent": "22646",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "22646",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "2": {
                  "Enable": "false",
                  "Status": "down",
                  "Alias": "",
                  "Name": "wifi24_3",
                  "LastChange": "62559",
                  "LowerLayers": "Device.WiFi.SSID.10003,Device.WiFi.SSID.10103",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                }
              }
            },
            "203": {
              "Enable": "true",
              "Status": "Enabled",
              "PortNumberOfEntries": "2",
              "Port": {
                "1": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "l2sd0.5",
                  "LastChange": "62491",
                  "LowerLayers": "Device.Bridging.Bridge.203.Port.2",
                  "ManagementPort": "true",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "2583646",
                    "BytesReceived": "0",
                    "PacketsSent": "22646",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "22646",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "2": {
                  "Enable": "false",
                  "Status": "down",
                  "Alias": "",
                  "Name": "wifi24_4",
                  "LastChange": "62559",
                  "LowerLayers": "Device.WiFi.SSID.10004,Device.WiFi.SSID.10104",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                }
              }
            },
            "204": {
              "Enable": "true",
              "Status": "Enabled",
              "PortNumberOfEntries": "2",
              "Port": {
                "1": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "l2sd0.6",
                  "LastChange": "62448",
                  "LowerLayers": "Device.Bridging.Bridge.204.Port.2",
                  "ManagementPort": "true",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "2583496",
                    "BytesReceived": "0",
                    "PacketsSent": "22645",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "22646",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "2": {
                  "Enable": "false",
                  "Status": "down",
                  "Alias": "",
                  "Name": "wifi24_5",
                  "LastChange": "62560",
                  "LowerLayers": "Device.WiFi.SSID.10005,Device.WiFi.SSID.10105",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                }
              }
            },
            "205": {
              "Enable": "true",
              "Status": "Enabled",
              "PortNumberOfEntries": "2",
              "Port": {
                "1": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "l2sd0.7",
                  "LastChange": "62492",
                  "LowerLayers": "Device.Bridging.Bridge.205.Port.2",
                  "ManagementPort": "true",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "2583476",
                    "BytesReceived": "0",
                    "PacketsSent": "22645",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "22645",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "2": {
                  "Enable": "false",
                  "Status": "down",
                  "Alias": "",
                  "Name": "wifi24_6",
                  "LastChange": "62560",
                  "LowerLayers": "Device.WiFi.SSID.10006,Device.WiFi.SSID.10106",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                }
              }
            },
            "206": {
              "Enable": "true",
              "Status": "Enabled",
              "PortNumberOfEntries": "2",
              "Port": {
                "1": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "l2sd0.8",
                  "LastChange": "62492",
                  "LowerLayers": "Device.Bridging.Bridge.206.Port.2",
                  "ManagementPort": "true",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "2583716",
                    "BytesReceived": "0",
                    "PacketsSent": "22647",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "22647",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "2": {
                  "Enable": "false",
                  "Status": "down",
                  "Alias": "",
                  "Name": "wifi24_7",
                  "LastChange": "62561",
                  "LowerLayers": "Device.WiFi.SSID.10007,Device.WiFi.SSID.10107",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                }
              }
            },
            "207": {
              "Enable": "true",
              "Status": "Enabled",
              "PortNumberOfEntries": "2",
              "Port": {
                "1": {
                  "Enable": "true",
                  "Status": "up",
                  "Alias": "",
                  "Name": "l2sd0.9",
                  "LastChange": "62493",
                  "LowerLayers": "Device.Bridging.Bridge.207.Port.2",
                  "ManagementPort": "true",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "2583376",
                    "BytesReceived": "0",
                    "PacketsSent": "22645",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "22645",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                },
                "2": {
                  "Enable": "false",
                  "Status": "down",
                  "Alias": "",
                  "Name": "wifi24_8",
                  "LastChange": "62562",
                  "LowerLayers": "Device.WiFi.SSID.10008,Device.WiFi.SSID.10108",
                  "ManagementPort": "false",
                  "PortState": "Forwarding",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0",
                    "UnicastPacketsSent": "0",
                    "UnicastPacketsReceived": "0",
                    "DiscardPacketsSent": "0",
                    "DiscardPacketsReceived": "0",
                    "MulticastPacketsSent": "0",
                    "MulticastPacketsReceived": "0",
                    "BroadcastPacketsSent": "0",
                    "BroadcastPacketsReceived": "0",
                    "UnknownProtoPacketsReceived": "0"
                  }
                }
              }
            }
          }
        },
        "DNS": {
          "SupportedRecordTypes": "A,AAAA",
          "Client": {
            "Enable": "true",
            "Status": "Enabled",
            "ServerNumberOfEntries": "1",
            "Server": {
              "1": {
                "Enable": "true",
                "Status": "Enabled",
                "Alias": "",
                "DNSServer": "10.57.78.6",
                "Interface": "Device.IP.Interface.301",
                "Type": "DHCPv4"
              }
            }
          },
          "Relay": {
            "Enable": "false",
            "Status": "Disabled",
            "ForwardNumberOfEntries": "0"
          }
        },
        "NAT": {
          "InterfaceSettingNumberOfEntries": "1",
          "PortMappingNumberOfEntries": "0",
          "InterfaceSetting": {
            "301": {
              "Enable": "true",
              "Status": "Enabled",
              "Interface": "Device.IP.Interface.301"
            }
          }
        },
        "DHCPv4": {
          "ClientNumberOfEntries": "2",
          "Client": {
            "300": {
              "Enable": "true",
              "Interface": "Device.IP.Interface.300",
              "Status": "Enabled",
              "Renew": "false",
              "IPAddress": "10.57.79.26",
              "SubnetMask": "255.255.255.128",
              "IPRouters": "10.57.79.1",
              "DNSServers": "10.57.78.6",
              "LeaseTimeRemaining": "542323",
              "DHCPServer": "10.57.78.6"
            },
            "301": {
              "Enable": "true",
              "Interface": "Device.IP.Interface.301",
              "Status": "Enabled",
              "Renew": "false",
              "IPAddress": "10.57.79.165",
              "SubnetMask": "255.255.255.128",
              "IPRouters": "10.57.79.129",
              "DNSServers": "10.57.78.6",
              "LeaseTimeRemaining": "67168",
              "DHCPServer": "10.57.78.6"
            }
          },
          "Server": {
            "Enable": "true",
            "PoolNumberOfEntries": "8",
            "Pool": {
              "200": {
                "Enable": "true",
                "Order": "1",
                "Interface": "Device.IP.Interface.200",
                "MinAddress": "192.168.0.2",
                "MaxAddress": "192.168.0.254",
                "ReservedAddresses": "",
                "SubnetMask": "255.255.255.0",
                "DNSServers": "",
                "DomainName": "Test",
                "IPRouters": "192.168.0.1",
                "LeaseTime": "3600",
                "OptionNumberOfEntries": "7",
                "StaticAddressNumberOfEntries": "0",
                "ClientNumberOfEntries": "0",
                "Option": {
                  "1": {
                    "Enable": "true",
                    "Tag": "54",
                    "Value": "C0A80001"
                  },
                  "2": {
                    "Enable": "true",
                    "Tag": "125",
                    "Value": "0406303030304341050C3343374138413746373837330607444732343730410B32687474703A2F2F6364636465762D6763732E63616C69782E636F6D3A383038302F3339353035302F3270304C3670435642790C000D01350E0432303030"
                  },
                  "3": {
                    "Enable": "true",
                    "Tag": "1",
                    "Value": "FFFFFF00"
                  },
                  "4": {
                    "Enable": "true",
                    "Tag": "15",
                    "Value": "54657374"
                  },
                  "5": {
                    "Enable": "true",
                    "Tag": "3",
                    "Value": "C0A80001"
                  },
                  "6": {
                    "Enable": "true",
                    "Tag": "6",
                    "Value": "0A394E06"
                  },
                  "7": {
                    "Enable": "true",
                    "Tag": "51",
                    "Value": "00000E10"
                  }
                }
              },
              "201": {
                "Enable": "true",
                "Order": "1",
                "Interface": "Device.IP.Interface.201",
                "MinAddress": "192.168.26.2",
                "MaxAddress": "192.168.26.254",
                "ReservedAddresses": "",
                "SubnetMask": "255.255.255.0",
                "DNSServers": "",
                "DomainName": "",
                "IPRouters": "192.168.26.1",
                "LeaseTime": "3600",
                "OptionNumberOfEntries": "6",
                "StaticAddressNumberOfEntries": "0",
                "ClientNumberOfEntries": "0",
                "Option": {
                  "1": {
                    "Enable": "true",
                    "Tag": "54",
                    "Value": "C0A81A01"
                  },
                  "2": {
                    "Enable": "true",
                    "Tag": "125",
                    "Value": "0406303030304341050C3343374138413746373837330607444732343730410B32687474703A2F2F6364636465762D6763732E63616C69782E636F6D3A383038302F3339353035302F3270304C3670435642790C000D01350E0432303030"
                  },
                  "3": {
                    "Enable": "true",
                    "Tag": "1",
                    "Value": "FFFFFF00"
                  },
                  "4": {
                    "Enable": "true",
                    "Tag": "3",
                    "Value": "C0A81A01"
                  },
                  "5": {
                    "Enable": "true",
                    "Tag": "6",
                    "Value": "0A394E06"
                  },
                  "6": {
                    "Enable": "true",
                    "Tag": "51",
                    "Value": "00000E10"
                  }
                }
              },
              "202": {
                "Enable": "true",
                "Order": "1",
                "Interface": "Device.IP.Interface.202",
                "MinAddress": "192.168.27.2",
                "MaxAddress": "192.168.27.254",
                "ReservedAddresses": "",
                "SubnetMask": "255.255.255.0",
                "DNSServers": "",
                "DomainName": "",
                "IPRouters": "192.168.27.1",
                "LeaseTime": "3600",
                "OptionNumberOfEntries": "6",
                "StaticAddressNumberOfEntries": "0",
                "ClientNumberOfEntries": "0",
                "Option": {
                  "1": {
                    "Enable": "true",
                    "Tag": "54",
                    "Value": "C0A81B01"
                  },
                  "2": {
                    "Enable": "true",
                    "Tag": "125",
                    "Value": "0406303030304341050C3343374138413746373837330607444732343730410B32687474703A2F2F6364636465762D6763732E63616C69782E636F6D3A383038302F3339353035302F3270304C3670435642790C000D01350E0432303030"
                  },
                  "3": {
                    "Enable": "true",
                    "Tag": "1",
                    "Value": "FFFFFF00"
                  },
                  "4": {
                    "Enable": "true",
                    "Tag": "3",
                    "Value": "C0A81B01"
                  },
                  "5": {
                    "Enable": "true",
                    "Tag": "6",
                    "Value": "0A394E06"
                  },
                  "6": {
                    "Enable": "true",
                    "Tag": "51",
                    "Value": "00000E10"
                  }
                }
              },
              "203": {
                "Enable": "true",
                "Order": "1",
                "Interface": "Device.IP.Interface.203",
                "MinAddress": "192.168.28.2",
                "MaxAddress": "192.168.28.254",
                "ReservedAddresses": "",
                "SubnetMask": "255.255.255.0",
                "DNSServers": "",
                "DomainName": "",
                "IPRouters": "192.168.28.1",
                "LeaseTime": "3600",
                "OptionNumberOfEntries": "6",
                "StaticAddressNumberOfEntries": "0",
                "ClientNumberOfEntries": "0",
                "Option": {
                  "1": {
                    "Enable": "true",
                    "Tag": "54",
                    "Value": "C0A81C01"
                  },
                  "2": {
                    "Enable": "true",
                    "Tag": "125",
                    "Value": "0406303030304341050C3343374138413746373837330607444732343730410B32687474703A2F2F6364636465762D6763732E63616C69782E636F6D3A383038302F3339353035302F3270304C3670435642790C000D01350E0432303030"
                  },
                  "3": {
                    "Enable": "true",
                    "Tag": "1",
                    "Value": "FFFFFF00"
                  },
                  "4": {
                    "Enable": "true",
                    "Tag": "3",
                    "Value": "C0A81C01"
                  },
                  "5": {
                    "Enable": "true",
                    "Tag": "6",
                    "Value": "0A394E06"
                  },
                  "6": {
                    "Enable": "true",
                    "Tag": "51",
                    "Value": "00000E10"
                  }
                }
              },
              "204": {
                "Enable": "true",
                "Order": "1",
                "Interface": "Device.IP.Interface.204",
                "MinAddress": "192.168.29.2",
                "MaxAddress": "192.168.29.254",
                "ReservedAddresses": "",
                "SubnetMask": "255.255.255.0",
                "DNSServers": "",
                "DomainName": "",
                "IPRouters": "192.168.29.1",
                "LeaseTime": "3600",
                "OptionNumberOfEntries": "6",
                "StaticAddressNumberOfEntries": "0",
                "ClientNumberOfEntries": "0",
                "Option": {
                  "1": {
                    "Enable": "true",
                    "Tag": "54",
                    "Value": "C0A81D01"
                  },
                  "2": {
                    "Enable": "true",
                    "Tag": "125",
                    "Value": "0406303030304341050C3343374138413746373837330607444732343730410B32687474703A2F2F6364636465762D6763732E63616C69782E636F6D3A383038302F3339353035302F3270304C3670435642790C000D01350E0432303030"
                  },
                  "3": {
                    "Enable": "true",
                    "Tag": "1",
                    "Value": "FFFFFF00"
                  },
                  "4": {
                    "Enable": "true",
                    "Tag": "3",
                    "Value": "C0A81D01"
                  },
                  "5": {
                    "Enable": "true",
                    "Tag": "6",
                    "Value": "0A394E06"
                  },
                  "6": {
                    "Enable": "true",
                    "Tag": "51",
                    "Value": "00000E10"
                  }
                }
              },
              "205": {
                "Enable": "true",
                "Order": "1",
                "Interface": "Device.IP.Interface.205",
                "MinAddress": "192.168.30.2",
                "MaxAddress": "192.168.30.254",
                "ReservedAddresses": "",
                "SubnetMask": "255.255.255.0",
                "DNSServers": "",
                "DomainName": "",
                "IPRouters": "192.168.30.1",
                "LeaseTime": "3600",
                "OptionNumberOfEntries": "6",
                "StaticAddressNumberOfEntries": "0",
                "ClientNumberOfEntries": "0",
                "Option": {
                  "1": {
                    "Enable": "true",
                    "Tag": "54",
                    "Value": "C0A81E01"
                  },
                  "2": {
                    "Enable": "true",
                    "Tag": "125",
                    "Value": "0406303030304341050C3343374138413746373837330607444732343730410B32687474703A2F2F6364636465762D6763732E63616C69782E636F6D3A383038302F3339353035302F3270304C3670435642790C000D01350E0432303030"
                  },
                  "3": {
                    "Enable": "true",
                    "Tag": "1",
                    "Value": "FFFFFF00"
                  },
                  "4": {
                    "Enable": "true",
                    "Tag": "3",
                    "Value": "C0A81E01"
                  },
                  "5": {
                    "Enable": "true",
                    "Tag": "6",
                    "Value": "0A394E06"
                  },
                  "6": {
                    "Enable": "true",
                    "Tag": "51",
                    "Value": "00000E10"
                  }
                }
              },
              "206": {
                "Enable": "true",
                "Order": "1",
                "Interface": "Device.IP.Interface.206",
                "MinAddress": "192.168.31.2",
                "MaxAddress": "192.168.31.254",
                "ReservedAddresses": "",
                "SubnetMask": "255.255.255.0",
                "DNSServers": "",
                "DomainName": "",
                "IPRouters": "192.168.31.1",
                "LeaseTime": "3600",
                "OptionNumberOfEntries": "6",
                "StaticAddressNumberOfEntries": "0",
                "ClientNumberOfEntries": "0",
                "Option": {
                  "1": {
                    "Enable": "true",
                    "Tag": "54",
                    "Value": "C0A81F01"
                  },
                  "2": {
                    "Enable": "true",
                    "Tag": "125",
                    "Value": "0406303030304341050C3343374138413746373837330607444732343730410B32687474703A2F2F6364636465762D6763732E63616C69782E636F6D3A383038302F3339353035302F3270304C3670435642790C000D01350E0432303030"
                  },
                  "3": {
                    "Enable": "true",
                    "Tag": "1",
                    "Value": "FFFFFF00"
                  },
                  "4": {
                    "Enable": "true",
                    "Tag": "3",
                    "Value": "C0A81F01"
                  },
                  "5": {
                    "Enable": "true",
                    "Tag": "6",
                    "Value": "0A394E06"
                  },
                  "6": {
                    "Enable": "true",
                    "Tag": "51",
                    "Value": "00000E10"
                  }
                }
              },
              "207": {
                "Enable": "true",
                "Order": "1",
                "Interface": "Device.IP.Interface.207",
                "MinAddress": "192.168.32.2",
                "MaxAddress": "192.168.32.254",
                "ReservedAddresses": "",
                "SubnetMask": "255.255.255.0",
                "DNSServers": "",
                "DomainName": "",
                "IPRouters": "192.168.32.1",
                "LeaseTime": "3600",
                "OptionNumberOfEntries": "6",
                "StaticAddressNumberOfEntries": "0",
                "ClientNumberOfEntries": "0",
                "Option": {
                  "1": {
                    "Enable": "true",
                    "Tag": "54",
                    "Value": "C0A82001"
                  },
                  "2": {
                    "Enable": "true",
                    "Tag": "125",
                    "Value": "0406303030304341050C3343374138413746373837330607444732343730410B32687474703A2F2F6364636465762D6763732E63616C69782E636F6D3A383038302F3339353035302F3270304C3670435642790C000D01350E0432303030"
                  },
                  "3": {
                    "Enable": "true",
                    "Tag": "1",
                    "Value": "FFFFFF00"
                  },
                  "4": {
                    "Enable": "true",
                    "Tag": "3",
                    "Value": "C0A82001"
                  },
                  "5": {
                    "Enable": "true",
                    "Tag": "6",
                    "Value": "0A394E06"
                  },
                  "6": {
                    "Enable": "true",
                    "Tag": "51",
                    "Value": "00000E10"
                  }
                }
              }
            }
          }
        },
        "DHCPv6": {
          "ClientNumberOfEntries": "1",
          "Client": {
            "300": {
              "Enable": "false",
              "Interface": "Device.IP.Interface.300",
              "Status": "Disabled",
              "DUID": "",
              "RequestAddresses": "true",
              "RequestPrefixes": "true",
              "RapidCommit": "true",
              "Renew": "false",
              "SuggestedT1": "-1",
              "SuggestedT2": "-1",
              "SupportedOptions": "1,2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,19,20,23,39",
              "RequestedOptions": "",
              "ServerNumberOfEntries": "1",
              "Server": {
                "1": {
                  "SourceAddress": "",
                  "DUID": "",
                  "InformationRefreshTime": "0001-01-01T00:00:00Z"
                }
              }
            }
          }
        },
        "Users": {
          "UserNumberOfEntries": "2",
          "User": {
            "1": {
              "Enable": "true",
              "RemoteAccessCapable": "false",
              "Username": "admin",
              "Password": "",
              "Language": "en-US"
            },
            "2": {
              "Enable": "true",
              "RemoteAccessCapable": "false",
              "Username": "technician",
              "Password": "",
              "Language": "en-US"
            }
          }
        },
        "UPnP": {
          "Device": {
            "Enable": "true",
            "UPnPMediaServer": "false",
            "UPnPMediaRenderer": "false",
            "UPnPWLANAccessPoint": "false",
            "UPnPQoSDevice": "false",
            "UPnPQoSPolicyHolder": "false",
            "UPnPIGD": "true",
            "Capabilities": {
              "UPnPArchitecture": "1",
              "UPnPMediaServer": "0",
              "UPnPMediaRenderer": "0",
              "UPnPWLANAccessPoint": "0",
              "UPnPBasicDevice": "0",
              "UPnPQoSDevice": "0",
              "UPnPQoSPolicyHolder": "0",
              "UPnPIGD": "1"
            }
          }
        },
        "Firewall": {
          "Enable": "true"
        },
        "IP": {
          "IPv4Enable": "true",
          "IPv4Status": "Enabled",
          "IPv6Capable": "true",
          "IPv6Enable": "true",
          "IPv6Status": "Enabled",
          "ULAPrefix": "",
          "InterfaceNumberOfEntries": "10",
          "Interface": {
            "300": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "wan0",
              "LastChange": "62481",
              "LowerLayers": "Device.Ethernet.Link.300",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "false",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "10.57.79.26",
                  "SubnetMask": "255.255.255.128",
                  "AddressingType": "DHCP"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7872",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "DHCPv6",
                  "Prefix": "",
                  "PreferredLifetime": "0001-01-01T00:00:00Z",
                  "ValidLifetime": "2017-08-21T22:00:03+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "0001-01-01T00:00:00Z",
                  "ValidLifetime": "2017-08-21T22:00:03+00:00",
                  "StaticType": "Static"
                }
              },
              "Stats": {
                "BytesSent": "8396",
                "BytesReceived": "3827",
                "PacketsSent": "23",
                "PacketsReceived": "25",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "23",
                "UnicastPacketsReceived": "25",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "301": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "esafe0",
              "LastChange": "62457",
              "LowerLayers": "Device.Ethernet.Link.301",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "10.57.79.165",
                  "SubnetMask": "255.255.255.128",
                  "AddressingType": "DHCP"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7873",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "DHCPV6",
                  "Prefix": "",
                  "PreferredLifetime": "2017-08-21T22:00:04+00:00",
                  "ValidLifetime": "2017-08-21T22:00:04+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/0",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:04+00:00",
                  "ValidLifetime": "2017-08-21T22:00:04+00:00",
                  "StaticType": "PrefixDelegation"
                }
              },
              "Stats": {
                "BytesSent": "633158",
                "BytesReceived": "1582782",
                "PacketsSent": "1761",
                "PacketsReceived": "4792",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "1761",
                "UnicastPacketsReceived": "4251",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "541",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "200": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "l2sd0.2",
              "LastChange": "62498",
              "LowerLayers": "Device.Ethernet.Link.200",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "192.168.0.1",
                  "SubnetMask": "255.255.255.0",
                  "AddressingType": "Static"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7877",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "Autoconfigured",
                  "Prefix": "Device.IP.Interface.200.IPv6Prefix.1",
                  "PreferredLifetime": "2017-08-21T22:00:05+00:00",
                  "ValidLifetime": "2017-08-21T22:00:05+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/64",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:05+00:00",
                  "ValidLifetime": "2017-08-21T22:00:05+00:00",
                  "StaticType": "Child"
                }
              },
              "Stats": {
                "BytesSent": "3226142",
                "BytesReceived": "1266297",
                "PacketsSent": "24472",
                "PacketsReceived": "4142",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "24472",
                "UnicastPacketsReceived": "4142",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "201": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "l2sd0.3",
              "LastChange": "62499",
              "LowerLayers": "Device.Ethernet.Link.201",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "192.168.26.1",
                  "SubnetMask": "255.255.255.0",
                  "AddressingType": "Static"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7877",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "Autoconfigured",
                  "Prefix": "Device.IP.Interface.201.IPv6Prefix.1",
                  "PreferredLifetime": "2017-08-21T22:00:05+00:00",
                  "ValidLifetime": "2017-08-21T22:00:05+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/64",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:05+00:00",
                  "ValidLifetime": "2017-08-21T22:00:05+00:00",
                  "StaticType": "Child"
                }
              },
              "Stats": {
                "BytesSent": "2583306",
                "BytesReceived": "0",
                "PacketsSent": "22644",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22644",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "202": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "l2sd0.4",
              "LastChange": "62499",
              "LowerLayers": "Device.Ethernet.Link.202",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "192.168.27.1",
                  "SubnetMask": "255.255.255.0",
                  "AddressingType": "Static"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7877",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "Autoconfigured",
                  "Prefix": "Device.IP.Interface.202.IPv6Prefix.1",
                  "PreferredLifetime": "2017-08-21T22:00:06+00:00",
                  "ValidLifetime": "2017-08-21T22:00:06+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/64",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:06+00:00",
                  "ValidLifetime": "2017-08-21T22:00:06+00:00",
                  "StaticType": "Child"
                }
              },
              "Stats": {
                "BytesSent": "2584046",
                "BytesReceived": "0",
                "PacketsSent": "22650",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22650",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "203": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "l2sd0.5",
              "LastChange": "62500",
              "LowerLayers": "Device.Ethernet.Link.203",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "192.168.28.1",
                  "SubnetMask": "255.255.255.0",
                  "AddressingType": "Static"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7877",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "Autoconfigured",
                  "Prefix": "Device.IP.Interface.203.IPv6Prefix.1",
                  "PreferredLifetime": "2017-08-21T22:00:07+00:00",
                  "ValidLifetime": "2017-08-21T22:00:07+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/64",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:07+00:00",
                  "ValidLifetime": "2017-08-21T22:00:07+00:00",
                  "StaticType": "Child"
                }
              },
              "Stats": {
                "BytesSent": "2584086",
                "BytesReceived": "0",
                "PacketsSent": "22650",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22650",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "204": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "l2sd0.6",
              "LastChange": "62457",
              "LowerLayers": "Device.Ethernet.Link.204",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "192.168.29.1",
                  "SubnetMask": "255.255.255.0",
                  "AddressingType": "Static"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7877",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "Autoconfigured",
                  "Prefix": "Device.IP.Interface.204.IPv6Prefix.1",
                  "PreferredLifetime": "2017-08-21T22:00:07+00:00",
                  "ValidLifetime": "2017-08-21T22:00:07+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/64",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:08+00:00",
                  "ValidLifetime": "2017-08-21T22:00:08+00:00",
                  "StaticType": "Child"
                }
              },
              "Stats": {
                "BytesSent": "2583936",
                "BytesReceived": "0",
                "PacketsSent": "22649",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22649",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "205": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "l2sd0.7",
              "LastChange": "62501",
              "LowerLayers": "Device.Ethernet.Link.205",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "192.168.30.1",
                  "SubnetMask": "255.255.255.0",
                  "AddressingType": "Static"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7877",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "Autoconfigured",
                  "Prefix": "Device.IP.Interface.205.IPv6Prefix.1",
                  "PreferredLifetime": "2017-08-21T22:00:08+00:00",
                  "ValidLifetime": "2017-08-21T22:00:08+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/64",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:08+00:00",
                  "ValidLifetime": "2017-08-21T22:00:08+00:00",
                  "StaticType": "Child"
                }
              },
              "Stats": {
                "BytesSent": "2583806",
                "BytesReceived": "0",
                "PacketsSent": "22648",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22648",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "206": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "l2sd0.8",
              "LastChange": "62502",
              "LowerLayers": "Device.Ethernet.Link.206",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "192.168.31.1",
                  "SubnetMask": "255.255.255.0",
                  "AddressingType": "Static"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7877",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "Autoconfigured",
                  "Prefix": "Device.IP.Interface.206.IPv6Prefix.1",
                  "PreferredLifetime": "2017-08-21T22:00:09+00:00",
                  "ValidLifetime": "2017-08-21T22:00:09+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/64",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:09+00:00",
                  "ValidLifetime": "2017-08-21T22:00:09+00:00",
                  "StaticType": "Child"
                }
              },
              "Stats": {
                "BytesSent": "2584046",
                "BytesReceived": "0",
                "PacketsSent": "22650",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22650",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            },
            "207": {
              "Enable": "true",
              "Status": "Up",
              "Alias": "",
              "Name": "l2sd0.9",
              "LastChange": "62503",
              "LowerLayers": "Device.Ethernet.Link.207",
              "Type": "Normal",
              "Reset": "false",
              "IPv4AddressNumberOfEntries": "1",
              "IPv4Enable": "true",
              "IPv6Enable": "true",
              "ULAEnable": "false",
              "IPv6AddressNumberOfEntries": "2",
              "IPv6PrefixNumberOfEntries": "1",
              "IPv4Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddress": "192.168.32.1",
                  "SubnetMask": "255.255.255.0",
                  "AddressingType": "Static"
                }
              },
              "IPv6Address": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Preferred",
                  "IPAddress": "fe80::3e7a:8aff:fe7f:7877",
                  "Origin": "Autoconfigured",
                  "Prefix": "",
                  "PreferredLifetime": "9999-12-31T23:59:59Z",
                  "ValidLifetime": "9999-12-31T23:59:59Z"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "IPAddressStatus": "Invalid",
                  "IPAddress": "",
                  "Origin": "Autoconfigured",
                  "Prefix": "Device.IP.Interface.207.IPv6Prefix.1",
                  "PreferredLifetime": "2017-08-21T22:00:09+00:00",
                  "ValidLifetime": "2017-08-21T22:00:10+00:00"
                }
              },
              "IPv6Prefix": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "PrefixStatus": "Invalid",
                  "Prefix": "::/64",
                  "Origin": "Static",
                  "OnLink": "false",
                  "Autonomous": "false",
                  "PreferredLifetime": "2017-08-21T22:00:10+00:00",
                  "ValidLifetime": "2017-08-21T22:00:10+00:00",
                  "StaticType": "Child"
                }
              },
              "Stats": {
                "BytesSent": "2583816",
                "BytesReceived": "0",
                "PacketsSent": "22649",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "22649",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0"
              }
            }
          },
          "Diagnostics": {
            "IPPing": {
              "DiagnosticsState": "None",
              "Interface": "Device.IP.Interface.300",
              "Host": "",
              "NumberOfRepetitions": "3",
              "Timeout": "5000",
              "DataBlockSize": "64",
              "DSCP": "0",
              "SuccessCount": "0",
              "FailureCount": "0",
              "AverageResponseTime": "0",
              "MinimumResponseTime": "0",
              "MaximumResponseTime": "0"
            },
            "TraceRoute": {
              "DiagnosticsState": "None",
              "Interface": "Device.IP.Interface.300",
              "Host": "",
              "Timeout": "5000",
              "DataBlockSize": "0",
              "MaxHopCount": "0",
              "DSCP": "0",
              "ResponseTime": "0",
              "RouteHopsNumberOfEntries": "0"
            },
            "DownloadDiagnostics": {
              "DiagnosticsState": "None",
              "Interface": "300",
              "DownloadURL": "",
              "DownloadTransports": "HTTP,FTP(OPTIONAL)",
              "DSCP": "0",
              "EthernetPriority": "0",
              "ROMTime": "0001-01-01T00:00:00Z",
              "BOMTime": "0001-01-01T00:00:00Z",
              "EOMTime": "0001-01-01T00:00:00Z",
              "TestBytesReceived": "0",
              "TotalBytesReceived": "0",
              "TCPOpenRequestTime": "0001-01-01T00:00:00Z",
              "TCPOpenResponseTime": "0001-01-01T00:00:00Z"
            },
            "UploadDiagnostics": {
              "DiagnosticsState": "None",
              "Interface": "300",
              "UploadURL": "",
              "UploadTransports": "HTTP,FTP(OPTIONAL)",
              "DSCP": "0",
              "EthernetPriority": "0",
              "ROMTime": "0001-01-01T00:00:00Z",
              "BOMTime": "0001-01-01T00:00:00Z",
              "EOMTime": "0001-01-01T00:00:00Z",
              "TestFileLength": "0",
              "TotalBytesSent": "0",
              "TCPOpenRequestTime": "0001-01-01T00:00:00Z",
              "TCPOpenResponseTime": "0001-01-01T00:00:00Z"
            }
          }
        },
        "Hosts": {
          "HostNumberOfEntries": "1",
          "Host": {
            "1": {
              "PhysAddress": "9C:20:7B:9D:C4:50",
              "IPAddress": "192.168.0.3",
              "AddressSource": "DHCP",
              "LeaseTimeRemaining": "3224",
              "Layer1Interface": "Device.WiFi.Radio.10000",
              "Layer3Interface": "Device.IP.Interface.200",
              "HostName": "Apple-TV2",
              "Active": "true",
              "AssociatedDevice": "Device.WiFi.AccessPoint.10001.AssociatedDevice.1",
              "IPv4AddressNumberOfEntries": "1",
              "IPv6AddressNumberOfEntries": "1",
              "DHCPClient": "",
              "IPv4Address": {
                "1": {
                  "IPAddress": "192.168.0.3"
                }
              },
              "IPv6Address": {
                "1": {
                  "IPAddress": "fe80::1807:19c5:bf22:c83d"
                }
              }
            }
          }
        },
        "Routing": {
          "RouterNumberOfEntries": "1",
          "RIP": {
            "Enable": "false",
            "SupportedModes": "Send",
            "InterfaceSettingNumberOfEntries": "1",
            "InterfaceSetting": {
              "301": {
                "Enable": "false",
                "Status": "Disabled",
                "Interface": "Device.IP.Interface.301",
                "AcceptRA": "false",
                "SendRA": "true"
              }
            }
          },
          "Router": {
            "301": {
              "Enable": "false",
              "Status": "Disabled",
              "IPv4ForwardingNumberOfEntries": "11",
              "IPv6ForwardingNumberOfEntries": "0",
              "IPv4Forwarding": {
                "1": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "0.0.0.0",
                  "DestSubnetMask": "0.0.0.0",
                  "GatewayIPAddress": "10.57.79.129",
                  "Interface": "10.57.79.129",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "2": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "10.57.79.128",
                  "DestSubnetMask": "255.255.255.128",
                  "GatewayIPAddress": "10.57.79.165",
                  "Interface": "10.57.79.165",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "3": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.0.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.0.1",
                  "Interface": "192.168.0.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "4": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.26.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.26.1",
                  "Interface": "192.168.26.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "5": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.27.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.27.1",
                  "Interface": "192.168.27.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "6": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.28.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.28.1",
                  "Interface": "192.168.28.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "7": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.29.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.29.1",
                  "Interface": "192.168.29.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "8": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.30.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.30.1",
                  "Interface": "192.168.30.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "9": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.31.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.31.1",
                  "Interface": "192.168.31.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "10": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.32.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.32.1",
                  "Interface": "192.168.32.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                },
                "11": {
                  "Enable": "true",
                  "Status": "Enabled",
                  "DestIPAddress": "192.168.251.0",
                  "DestSubnetMask": "255.255.255.0",
                  "GatewayIPAddress": "192.168.251.1",
                  "Interface": "192.168.251.1",
                  "ForwardingMetric": "0",
                  "StaticRoute": "true",
                  "Origin": "Static"
                }
              }
            }
          }
        },
        "L2oGRE": {
          "InterfaceNumberOfEntries": "1",
          "Interface": {
            "1": {
              "Enable": "false",
              "LocalAddress": "10.57.79.165",
              "RemoteAddress": "0.0.0.0",
              "Alias": "",
              "Name": "gre0",
              "LastChange": "62580",
              "LowerLayers": "Device.WIFI.SSID.10003",
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0",
                "UnicastPacketsSent": "0",
                "UnicastPacketsReceived": "0",
                "DiscardPacketsSent": "0",
                "DiscardPacketsReceived": "0",
                "MulticastPacketsSent": "0",
                "MulticastPacketsReceived": "0",
                "BroadcastPacketsSent": "0",
                "BroadcastPacketsReceived": "0",
                "UnknownProtoPacketsReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0"
              }
            }
          }
        },
        "GRE": {
          "TunnelNumberOfEntries": "4",
          "Tunnel": {
            "1": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "gre0",
              "RemoteEndpoints": "0.0.0.0",
              "KeepAlivePolicy": "ICMP",
              "KeepAliveTimeout": "60",
              "KeepAliveThreshold": "3",
              "DeliveryHeaderProtocol": "IPv4",
              "DefaultDSCPMark": "0",
              "ConnectedRemoteEndpoint": "",
              "InterfaceNumberOfEntries": "1",
              "Interface": {
                "1": {
                  "LowerLayers": "Device.WIFI.SSID.10003,Device.WIFI.SSID.10103",
                  "X_ARRIS_COM_VLANID": "102,102",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0"
                  }
                }
              },
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0"
              }
            },
            "2": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "gre1",
              "RemoteEndpoints": "0.0.0.0",
              "KeepAlivePolicy": "ICMP",
              "KeepAliveTimeout": "60",
              "KeepAliveThreshold": "3",
              "DeliveryHeaderProtocol": "IPv4",
              "DefaultDSCPMark": "0",
              "ConnectedRemoteEndpoint": "",
              "InterfaceNumberOfEntries": "1",
              "Interface": {
                "1": {
                  "LowerLayers": "",
                  "X_ARRIS_COM_VLANID": "",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0"
                  }
                }
              },
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0"
              }
            },
            "3": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "gre2",
              "RemoteEndpoints": "0.0.0.0",
              "KeepAlivePolicy": "ICMP",
              "KeepAliveTimeout": "60",
              "KeepAliveThreshold": "3",
              "DeliveryHeaderProtocol": "IPv4",
              "DefaultDSCPMark": "0",
              "ConnectedRemoteEndpoint": "",
              "InterfaceNumberOfEntries": "1",
              "Interface": {
                "1": {
                  "LowerLayers": "",
                  "X_ARRIS_COM_VLANID": "",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0"
                  }
                }
              },
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0"
              }
            },
            "4": {
              "Enable": "false",
              "Status": "Down",
              "Alias": "",
              "Name": "gre3",
              "RemoteEndpoints": "0.0.0.0",
              "KeepAlivePolicy": "ICMP",
              "KeepAliveTimeout": "60",
              "KeepAliveThreshold": "3",
              "DeliveryHeaderProtocol": "IPv4",
              "DefaultDSCPMark": "0",
              "ConnectedRemoteEndpoint": "",
              "InterfaceNumberOfEntries": "1",
              "Interface": {
                "1": {
                  "LowerLayers": "",
                  "X_ARRIS_COM_VLANID": "",
                  "Stats": {
                    "BytesSent": "0",
                    "BytesReceived": "0",
                    "PacketsSent": "0",
                    "PacketsReceived": "0",
                    "ErrorsSent": "0",
                    "ErrorsReceived": "0"
                  }
                }
              },
              "Stats": {
                "BytesSent": "0",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0",
                "ErrorsSent": "0",
                "ErrorsReceived": "0"
              }
            }
          }
        },
        "DSLite": {
          "InterfaceSettingNumberOfEntries": "1",
          "InterfaceSetting": {
            "1": {
              "Enable": "false",
              "Status": "Disabled",
              "EndpointAssignmentPrecedence": "DHCPv6",
              "EndpointAddressTypePrecedence": "IPv6Address",
              "EndpointAddressInUse": "",
              "EndpointName": "",
              "EndpointAddress": "",
              "Origin": "DHCPv6"
            }
          }
        },
        "MoCA": {
          "InterfaceNumberOfEntries": "1",
          "Interface": {
            "1": {
              "Enable": "false",
              "Status": "NotPresent",
              "Alias": "",
              "Name": "en3",
              "LastChange": "0",
              "Upstream": "false",
              "MACAddress": "2B:05:37:04:2B:05",
              "FirmwareVersion": "1.01.05.86",
              "MaxBitRate": "0",
              "HighestVersion": "2.0",
              "CurrentVersion": "2.0",
              "NetworkCoordinator": "0",
              "NodeID": "0",
              "PrivacyEnabledSetting": "false",
              "PrivacyEnabled": "false",
              "FreqCapabilityMask": "00000001",
              "FreqCurrentMaskSetting": "55554000",
              "FreqCurrentMask": "55554000",
              "CurrentOperFreq": "0",
              "KeyPassphrase": "",
              "AssociatedDeviceNumberOfEntries": "0",
              "Stats": {
                "BytesSent": "3401203",
                "BytesReceived": "0",
                "PacketsSent": "0",
                "PacketsReceived": "0"
              }
            }
          }
        }
      }
    };

    if (!IS_TR181_MOCK) {
      TR181_DATA = null;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }).call(this);






  (function () {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                     //
    // packages/utility/utils.js                                                                                           //
    //                                                                                                                     //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    Utils = Utils || {};


    var wanPath = 'X_CALIX_SXACC_DefaultWanConnectionPath';
    var gigaCenterModelPattern = new RegExp("^844G|^844E|^854G|^844F");
    var gigaHubModelPattern = new RegExp("^812G|^813G|^818G|^823G");
    var knownModelPattern = new RegExp("^(844G|844E|854G|T071|T072|T073|T076|T077|812G|813G|836GE|716GE|SR|Pre801F|GC4046E|GS2026E|MGS4227E|MGS4220E|GS4227E-2|GS4220E-2|GS4227E|GS4227|GS4220E)");
    var tSeriesModelPattern = new RegExp("^T07(1|2|3|6|7)G");


    // If you'd use regular expression in path, make sure you don't contain any dot (.)
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

    Utils.setValueByPath = function (obj, path, value) {
      var pathArray, i, result = false;

      if (obj != null && _.isString(path)) {
        pathArray = path.split('.');
        for (i = 0; i < pathArray.length - 1; i++) {
          if (pathArray[i].length == 0)
            break;
          if (obj[pathArray[i]] == null) {
            obj[pathArray[i]] = {};
          }
          obj = obj[pathArray[i]];
          if (obj == null)
            break;
        }
        if (i == (pathArray.length - 1)) {
          obj[pathArray[i]] = value;
          result = true;
        }
      }

      return result;
    };

    Utils.buildCpeId = function (serial, oui) {
      var cpeId = {
        'serialNumber': serial
      };

      if (oui != null) {
        cpeId.manufacturerOUI = oui;
      }

      return cpeId;
    };

    Utils.getWanPathAlias = function () {
      return wanPath;
    };

    Utils.timeFormat = "MM/DD/YYYY hh:mm:ss A";

    // ----------------------------------------------------------------------------
    // Models & Parameters
    Utils.is801F = function (modelName) {
      if (modelName) {
        if (modelName.toUpperCase().indexOf('801F') >= 0) {
          return true;
        }
      }
      return false;
    };
    Utils.is801FB = function (modelName) {
      if (modelName) {
        if (modelName.toUpperCase().indexOf('801FB') >= 0) {
          return true;
        }
      }
      return false;
    };
    Utils.is844F = function (modelName) {
      if (modelName) {
        if (modelName.toUpperCase().indexOf('844F') >= 0 && modelName.toUpperCase().indexOf('844FB') < 0) {
          return true;
        }
      }
      return false;
    };
    Utils.is844FB = function (modelName) {
      if (modelName) {
        if (modelName.toUpperCase().indexOf('844FB') >= 0) {
          return true;
        }
      }
      return false;
    };
    Utils.isTSeries = function (modelName) {
      if (modelName) {
        return tSeriesModelPattern.test(modelName.toUpperCase());
      }
      return false;
    };

    Utils.isGigaCenter = function (model) {
      return gigaCenterModelPattern.test(model.toUpperCase());
    };

    Utils.isGigaHub = function (model) {
      return gigaHubModelPattern.test(model.toUpperCase());
    };

    Utils.isEXOS = function (model) {
      return /GC4026E|GS2026E|GS2020E|GM1020|MGM1028|MGS4227E|MGS4220E|MGS2028E|GM1028-2|GS4227E-2|GS4220E-2|GS2028E-2|GM1028|GS4227E|GS4227|GS4220E|GS2028E/i.test(model)
    };

    Utils.isGS4227E = function (model) {
      return model === "GS4227E" || model === "MGS4227E" || model === "GS4227E-2" || model === "GS4227";
    };

    Utils.isGS4220E = function (model) {
      return model === "GS4220E" || model === "MGS4220E" || model === "GS4220E-2";
    };

    Utils.isMapSupported = function (model, softwareVersion) {
      return Utils.isEXOS(model);
      // return Utils.isEXOS(model) ||
      //     (Utils.isGigaCenter(model) && softwareVersion != null && Utils.compareVersion(softwareVersion, "12.2.10") >= 0);
    };
    /** Similar concept borrowed from InternetGatewayDevice.DeviceSummary
     */

    /* ****************************************
     * Device version comparison:
     * @returns 1 if versionA > versionB
     * @returns 0 if versionA = versionB
     * @returns -1 if versionA < versionB
     * @returns 2 if version pattern unknown
     *
     * See also AcsMiscUtils.compareSwVersions
     * in the ccng-acs repo.
     * ****************************************/

    Utils.compareVersion = function (versionA, versionB) {
      // First check for special loads, as
      // PREM versions may contain special prefixes:
      // "M" (Manufacturing) or "CCO001-"(CLink)
      var prefixM = "M";
      var prefixCLink = "CCO001-";

      // If one is a CLink version, then that version is
      // considered newer, regardless of value.
      if (versionA && versionB) {
        if (versionA.startsWith(prefixCLink) && !versionB.startsWith(prefixCLink)) {
          return 1;
        } else if (!versionA.startsWith(prefixCLink) && versionB.startsWith(prefixCLink)) {
          return -1;
        } else {
          //remove prefix if applicable and continue the comparison
          if (versionA.startsWith(prefixCLink)) {
            versionA = versionA.replace(prefixCLink, "");
          } else if (versionA.startsWith(prefixM)) {
            versionA = versionA.replace(prefixM, "");
          }

          if (versionB.startsWith(prefixCLink)) {
            versionB = versionB.replace(prefixCLink, "");
          } else if (versionB.startsWith(prefixM)) {
            versionB = versionB.replace(prefixM, "");
          }
        }
      }

      var result = 0;

      //Check if one or both are empty
      if (!versionA && versionB) {
        return -1; //A empty, B not means B > A
      } else if (versionA && !versionB) {
        return 1; //A not empty, B empty means A > B
      } else if (!versionA && !versionB) {
        return 0;
      }

      //Simple equality check is a no brainer
      if (versionA === versionB) {
        return 0;
      }

      //Calix device version pattern (same as in sw-image-new.js)
      var versionPattern = /^\d[\d\.]+\d$/;


      if (!versionPattern.test(versionA) || !versionPattern.test(versionB)) {
        var thridPartyVersionPattern = /^\d[\d\.]+.*$/;
        // As for third party devices, we can compare versions which start with numbers
        if (thridPartyVersionPattern.test(versionA) && thridPartyVersionPattern.test(versionB)) {
          var componentsA = versionA.split(".");
          var componentsB = versionB.split(".");
          var len = Math.min(componentsA.length, componentsB.length);
          var digitPattern = /^\d+$/;
          for (var i = 0; i < len; i++) {
            var curElemA = componentsA[i];
            var curElemB = componentsB[i];
            if (digitPattern.test(curElemA) && digitPattern.test(curElemB)) {
              curElemA = parseInt(curElemA);
              curElemB = parseInt(curElemB);
              if (curElemA > curElemB) {
                return 1;
              } else if (curElemB > curElemA) {
                return -1;
              }
            } else {
              break;
            }
          }
        }

        Logger.info("Device versions " + versionA + " and " + versionB + " cannot be compared because their format is unknown.");
        return 2; //we want the param filter to appear newer than the device version here, so that functionality won't be shown
      }


      /* ****************************************************
         @return 0 if all remaning components are zero,
                 1 otherwise
      *  ****************************************************/
      var isZero = function (remainders) {
        var allZero = 0;
        for (var i = 0; i < remainders; i++) {
          if (parseInt(remainders[i]) !== 0) {
            allZero = 1;
            break;
          }
        }
        return allZero;
      };

      var componentsA = versionA.split(".");
      var componentsB = versionB.split(".");

      var lenA = componentsA.length;
      var lenB = componentsB.length;

      if ((lenA > 0) && (lenB > 0)) {
        /* ***********************************************************
         * Old format.
         * Calix ONT version before release 11.2 had max 4 components.
         * Compare the common components; if they are all
         * equal, then version with more components is the newest.
         * ***********************************************************/
        if ((lenA <= 4) && (lenB <= 4)) {
          var componentComparison = Utils.compareVersionComponents(componentsA, componentsB, 0, 4);
          if ((componentComparison === -1) || (componentComparison === 1)) {
            return componentComparison;
          }

          /* All common components have been found equal;
             now check if the longer version has anything other
             than zeroes for the difference in length */
          if (lenA > lenB) {
            result = isZero(versionA.slice(lenB));
          } else if (lenA < lenB) {
            result = isZero(versionB.slice(lenA));
          } else {
            result = 0;
          }
        } else {
          //at least one version has 5 components
          /*
           * The new format for Calix ONT version has up to 5 components.
           * If the first 3 components are equal, then the version
           * with 5 components is newer than the one with 4,
           * regardless of values.
           */
          var componentComparison2 = Utils.compareVersionComponents(componentsA, componentsB, 0, 3);
          if ((componentComparison2 === -1) || (componentComparison2 === 1)) {
            result = componentComparison2;
          } else if (componentComparison2 > 0) {
            //The first 3 components are equal, so check the rest
            if (lenA > lenB) {
              result = 1;
            } else if (lenA < lenB) {
              result = -1;
            } else {
              //lenA === lenB, compare the remaining components
              result = Utils.compareVersionComponents(componentsA, componentsB, 3, lenA);
            }
          }
        }
      } //end both versions length > 0
      else {
        //one or both versions have zero length
        result = (lenA == lenB);
      }

      return result;
    };

    Utils.compareVersionComponents = function (componentsA, componentsB, from, maxLength) {
      var iter = from;

      // find the maximum common length as the minimum
      // between the version lengths and "maxLength"
      var commonLength = Math.min(componentsA.length, componentsB.length, maxLength);
      while (iter < commonLength) {
        var compA = parseInt(componentsA[iter]);
        var compB = parseInt(componentsB[iter]);

        if (compA > compB) {
          return 1; //early return as soon as one component is bigger
        } else if (compA < compB) {
          return -1; //early return as soon as one component is smaller
        } else {
          //component is same in A and B, move on to the next
          iter++;
        }
      }
      return iter;
    };

    Utils.isTrue = function (value) {
      if (value) {
        return value == true || value == 'true' || value == 'True' || value == '1';
      } else {
        return false;
      }
    };

    // ----------------------------------------------------------------------------
    //

    Utils.unpaddingIp = function (ip) {
      return ip.split('.').map(Number).join('.');
    };

    Utils.paddingIp = function (ip) {
      var bitArray = ip.split('.');
      var padded = _.map(bitArray, function (bit) {
        if (bit.length === 1) {
          bit = "00" + bit;
        } else if (bit.length === 2) {
          bit = "0" + bit;
        }
        return bit;
      });
      return padded.join('.');
    };

    Utils.IPv6Address = {
      /*
       * is a valid IPv6 CIDR, e.g., "2017::1/64"
       */
      isIpv6CIDR: function (subnet) {
        // is standard CIDR or compressed CIDR
        return /^([0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){7}\/([1-9]|[1-9][0-9]|[1][0-1][0-9]|[1][2][0-8])\,*)+$/.test(subnet) ||
          /^((([0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4}){0,5})?)::(([0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4}){0,5})?)\/([1-9]|[1-9][0-9]|[1][0-1][0-9]|[1][2][0-8])\,*)+$/
            .test(subnet);
      },

      /*
       * is a valid IPv6 address, e.g., "2017::1"
       */
      isIpv6Address: function (ipAddress) {
        // is standard address or compressed address
        return /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){7}$/.test(ipAddress) ||
          /^(([0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4}){0,5})?)::(([0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4}){0,5})?)$/.test(ipAddress);
      },

      /*
       * padding a section of IPv6 address, which is seperated by ":"
       */
      padSection: function (section, len) {
        var padding = "0".repeat(len);
        if (section.length < padding.length) {
          section = padding.substring(0, padding.length - section.length) + section;
        }
        return section;
      },

      bin2HexOfSection: function (binStr) {
        return parseInt(binStr, 2).toString(16)
      },

      hex2BinOfSection: function (hexStr) {
        return parseInt(hexStr, 16).toString(2)
      },

      bin2HexOfAddress: function (binStr) {
        var addr = [];
        for (var i = 0; i < 128; i += 16) {
          var binPart = binStr.substring(i, i + 16);
          var hexSection = Utils.IPv6Address.padSection(Utils.IPv6Address.bin2HexOfSection(binPart), 4);
          addr.push(hexSection);
        }
        return addr.join(':');
      },

      hex2BinOfAddress: function (hexStr) {
        var nAddr = Utils.IPv6Address.normalize(hexStr);
        var sections = nAddr.split(":");
        var binAddr = '';
        for (var i = 0; i < sections.length; i++) {
          binAddr += Utils.IPv6Address.padSection(Utils.IPv6Address.hex2BinOfSection(sections[i]), 16);
        }
        return binAddr;
      },

      /**
       * compress the given ip address to shortest form
       * @param ip
       * @returns {string}
       */
      abbreviate: function (ip) {
        if (!Utils.IPv6Address.isIpv6Address(ip)) {
          throw new Error('Invalid address: ' + a);
        }

        // convert std format, e.g., 1:2:3:4:5:0:0:8
        var stdAddr = "";
        var nAddr = Utils.IPv6Address.normalize(ip);
        var sections = nAddr.split(":");
        for (var i = 0; i < sections.length; i++) {
          stdAddr += Utils.IPv6Address.bin2HexOfSection(Utils.IPv6Address.hex2BinOfSection(sections[i]));
          if (i < sections.length - 1) {
            stdAddr += ":";
          }
        }

        // to compress
        var p = new RegExp("(:0){2,7}", "g");
        var oneMatch = p.exec(stdAddr);

        var longestIndex = -1;
        var len = -1;
        if (oneMatch != null) {
          longestIndex = oneMatch["index"];
          len = oneMatch["0"].length;
        }

        while (oneMatch != null) {
          oneMatch = p.exec(stdAddr);
          if (oneMatch != null) {
            if (oneMatch["0"].length >= longestIndex) {
              longestIndex = oneMatch["index"];
              len = oneMatch["0"].length;
            }
          }
        }

        if (len > 2) {
          if (longestIndex == 0) {
            stdAddr = "::" + stdAddr.substring(len);
          } else if (longestIndex + len >= stdAddr.length) {
            stdAddr = stdAddr.substring(0, longestIndex) + "::";
          } else {
            stdAddr = stdAddr.substring(0, longestIndex) + "::" + stdAddr.substring(longestIndex + len + 1);
            if (stdAddr.indexOf("0::") == 0) {
              stdAddr = stdAddr.substring(1);
            }
          }
        }

        return stdAddr;
      },

      /*
       * normalize an IPv6 address, e.g., give "cdc::123", return "0cdc:0000:0000:0000:0000:0000:0000:0123"
       */
      normalize: function (a) {
        if (!Utils.IPv6Address.isIpv6Address(a)) {
          throw new Error('Invalid address: ' + a);
        }
        var nh = a.split(/\:\:/g);
        // if (nh.length > 2) {
        //     throw new Error('Invalid address: ' + a);
        // }

        var sections = [];
        if (nh.length == 1) {
          // full mode
          sections = a.split(/\:/g);
          if (sections.length !== 8) {
            throw new Error('Invalid address: ' + a);
          }
        } else if (nh.length == 2) {
          // compact mode
          var n = nh[0];
          var h = nh[1];
          var ns = n.split(/\:/g);
          var hs = h.split(/\:/g);
          for (var i in ns) {
            sections[i] = ns[i];
          }
          for (var i = hs.length; i > 0; --i) {
            sections[7 - (hs.length - i)] = hs[i - 1];
          }
        }
        for (var i = 0; i < 8; ++i) {
          if (sections[i] === undefined) {
            sections[i] = '0000';
          }
          sections[i] = Utils.IPv6Address.padSection(sections[i], 4);
        }
        return sections.join(':');
      },

      /*
       * Given an IPv6 address and its prefixe, return the range of this CIDR. e.g.,
       * Given: ip=cdc::123, prefixe=64
       * Return:
       *  {
       *    "ipLowStr":"0cdc:0000:0000:0000:0000:0000:0000:0000","ipHighStr":"0cdc:0000:0000:0000:ffff:ffff:ffff:ffff"
       *  }
       */
      range: function (ip, prefix) {
        if (!Utils.IPv6Address.isIpv6Address(ip)) {
          throw new Error('Invalid address: ' + ip);
        }

        // parse HEX address to bin
        var normalizedIp = Utils.IPv6Address.normalize(ip);
        var sections = normalizedIp.split(":");
        var binAddr = "";
        for (var i = 0; i < sections.length; i++) {
          // parse HEX section[i] to binary and then left padding with "0"
          binAddr += Utils.IPv6Address.padSection(Utils.IPv6Address.hex2BinOfSection(sections[i]), 16);
        }

        var mask1 = 128;
        var binNet = binAddr.substring(0, prefix);
        var binStart = binNet + "0".repeat(mask1 - prefix);
        var binEnd = binNet + "1".repeat(mask1 - prefix);

        return {
          ipLowStr: Utils.IPv6Address.bin2HexOfAddress(binStart),
          ipHighStr: Utils.IPv6Address.bin2HexOfAddress(binEnd)
        };
      },

      /*
       * Given an IPv6 address range, return the CIDR. e.g.,
       * Given: "ipLowStr":"0cdc:0000:0000:0000:0000:0000:0000:0000","ipHighStr":"0cdc:0000:0000:0000:ffff:ffff:ffff:ffff"
       * Return:
       *  {
       *    {"ipLowStr":"0cdc::","prefixSize":64}
       *  }
       */
      cidr: function (ipLowStr, ipHighStr) {
        if (!Utils.IPv6Address.isIpv6Address(ipLowStr) || !Utils.IPv6Address.isIpv6Address(ipHighStr)) {
          throw new Error('Invalid address: ' + ipLowStr + ", " + ipHighStr);
        }

        // to determine the prefix
        var binLow = Utils.IPv6Address.hex2BinOfAddress(ipLowStr);
        var binHigh = Utils.IPv6Address.hex2BinOfAddress(ipHighStr);
        var prefix = 0;
        for (var i = 0; i < binLow.length; i++) {
          if (binLow[i] == binHigh[i]) {
            prefix = (i + 1);
            continue;
          }

          break;
        }

        return {
          ipLowStr: Utils.IPv6Address.abbreviate(ipLowStr),
          prefixSize: prefix
        };
      }

    };

    /*
     * ========================================================
     * Thirdparty framework support common function(start)
     * Jira : SXACC-4111
     * ========================================================
     */
    function dd(msg, obj) {
      if (msg) {
        Logger.debug(" ===>>  " + msg);
      }
      /*
      if (obj) {
         console.dir(obj);
      }
      console.info();
      */
    }

    Utils.FEATURES = [];

    /**
     * The meta file parameter "name" uses the standard name.
     * And "alias" defines the real attribute name used in this model.
     * This function returns the alias attribute if it is defined.
     * Otherwise returns the original attribute.
     * @param path
     * @param model
     * @param cfg
     * @returns string attribute
     */
    Utils.getParameterRealAttributeInner = function (path, model, cfg) {
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
          dd("Missing feature configuration for model [ " + model + " ]");
        }
      }
      return attribute;
    };

    /**
     *
     * @param path
     * @param model
     * @param cfg
     * @returns a full path
     */
    Utils.getParameterRealPathInner = function (path, model, cfg) {
      var realPath = path;
      if (cfg && cfg.parameterSupported) {
        for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
          var paramFilter = cfg.parameterSupported[idx];
          if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
            if (paramFilter.realPath && paramFilter.realPath.length > 0) {
              realPath = paramFilter.realPath;
            } else
              if (paramFilter.alias && paramFilter.alias.length > 0) {
                var prefix = path.substring(0, path.lastIndexOf(".") + 1);
                if (prefix.length != path.length) {
                  //only full path supports alias
                  realPath = prefix + paramFilter.alias;
                }
              }
            break;
          }
        }
      } else {
        dd("Missiong feature configuration for model [ " + model + " ]");
      }
      return realPath;
    };

    Utils.getParameterAttributeInner = function (path, attrName, model, cfg) {
      var realPath = path;
      if (cfg && cfg.parameterSupported) {
        for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
          var paramFilter = cfg.parameterSupported[idx];
          if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
            return paramFilter[attrName];
          }
        }
      } else {
        dd("Missiong feature configuration for model [ " + model + " ]");
      }
    };


    Utils.getValueByRealPathInner = function (object, path, model, cfg) {
      return Utils.getValueByPath(object, Utils.getParameterRealPathInner(path, model, cfg));
    };

    Utils.isParameterInversedInner = function (path, model, version, configuration) {
      if (configuration && configuration.parameterSupported) {
        for (var idx = 0; idx < configuration.parameterSupported.length; idx++) {
          var paramFilter = configuration.parameterSupported[idx];
          if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
            if (version && paramFilter.minSwVersion) {
              if (Utils.compareVersion(version, paramFilter.minSwVersion) < 0) {
                return false;
              }
            }
            if (paramFilter.valueInversed) {
              return true;
            }
          }
        }
      }
      return false;
    };

    Utils.isParameterWritableInner = function (path, model, version, cfg, obj) {
      if (cfg && cfg.parameterSupported) {
        for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
          var paramFilter = cfg.parameterSupported[idx];
          if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
            if (version && paramFilter.minSwVersion) {
              if (Utils.compareVersion(version, paramFilter.minSwVersion) < 0) {
                return false;
              }
            }
            if (typeof paramFilter.writable === "boolean") {
              if (false === paramFilter.writable) {
                return false;
              } else {
                return true;
              }
            } else if (typeof paramFilter.writable === "object" && obj != null) {
              var required = paramFilter.writable;
              for (var name in required) {
                var value = Utils.getValueByPath(obj, name);
                if (value !== required[name]) {
                  return false;
                }
              }
              return true;
            }

            return true;
          }
        }
        return false;
      }
      dd("Missiong feature configuration for model [ " + model + " ]");
      return true;
    };

    Utils.getParameterUnitInner = function (path, model, version, cfg) {
      if (cfg && cfg.parameterSupported) {
        for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
          var paramFilter = cfg.parameterSupported[idx];
          if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
            if (version && paramFilter.minSwVersion) {
              if (Utils.compareVersion(version, paramFilter.minSwVersion) < 0) {
                return null;
              }
            }
            return paramFilter.unit;
          }
        }
        return null;
      }
      dd("Missiong feature configuration for model [ " + model + " ]");
      return null;
    };

    Utils.getParameterFactorInner = function (path, model, version, cfg) {
      if (cfg && cfg.parameterSupported) {
        for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
          var paramFilter = cfg.parameterSupported[idx];
          if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
            if (version && paramFilter.minSwVersion) {
              if (Utils.compareVersion(version, paramFilter.minSwVersion) < 0) {
                return null;
              }
            }
            return paramFilter.factor;
          }
        }
        return null;
      }
      dd("Missiong feature configuration for model [ " + model + " ]");
      return null;
    };

    Utils.getParameterValueMapInner = function (path, model, version, cfg) {
      if (cfg && cfg.parameterSupported) {
        for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
          var paramFilter = cfg.parameterSupported[idx];
          if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
            if (version && paramFilter.minSwVersion) {
              if (Utils.compareVersion(version, paramFilter.minSwVersion) < 0) {
                return null;
              }
            }
            return paramFilter.valueMap;
          }
        }
        return null;
      }
      dd("Missiong feature configuration for model [ " + model + " ]");
      return null;
    };

    Utils.getParameterValueListInner = function (path, model, version, cfg) {
      if (cfg && cfg.parameterSupported) {
        for (var idx = 0; idx < cfg.parameterSupported.length; idx++) {
          var paramFilter = cfg.parameterSupported[idx];
          if (paramFilter && paramFilter.name && new RegExp(paramFilter.name).test(path)) {
            if (version && paramFilter.minSwVersion) {
              if (Utils.compareVersion(version, paramFilter.minSwVersion) < 0) {
                return null;
              }
            }
            return paramFilter.valueList;
          }
        }
        return null;
      }
      dd("Missiong feature configuration for model [ " + model + " ]");
      return null;
    };

    Utils.filterParamsByModel = function (params, model, dataModelName, version) {
      var configuration = Utils.getFeatureConfiguration(model, dataModelName, version);
      //dd("filterParamsByModel ==> Current cfg file is for following model(s)", configuration.models);
      var rv = [];
      if (configuration && configuration.parameterSupported) {
        var paramFilterArray = configuration.parameterSupported;
        paramLoop: for (var idx = 0; idx < params.length; idx++) {
          var param = params[idx];
          //dd("PARAM [ " + param + " ]");
          if (param.indexOf('X_CALIX_SXACC_') == 0) {
            rv.push(param);
          } else {
            var matched = false;
            filterLoop: for (var key in paramFilterArray) {
              var paramFilter = paramFilterArray[key];
              if (paramFilter) {
                if (paramFilter.name && new RegExp(paramFilter.name).test(param)) {
                  if (paramFilter.minSwVersion && version && Utils.compareVersion(version, paramFilter.minSwVersion) < 0) {
                    continue paramLoop;
                  } else {
                    if (paramFilter.realPath && paramFilter.realPath.length > 0) {
                      matched = true;
                      rv.push(paramFilter.realPath);
                    } else if (paramFilter.alias && paramFilter.alias.length > 0) {
                      var prefix = param.substring(0, param.lastIndexOf(".") + 1);
                      if (prefix.length != param.length) {
                        //only full path supports alias
                        matched = true;
                        rv.push(prefix + paramFilter.alias);
                      } else {
                        matched = true;
                        rv.push(param);
                      }
                    } else {
                      matched = true;
                      rv.push(param);
                    }
                    continue paramLoop;
                  }
                }
              }
            }
            if (!matched) {
              //dd("filterParamsByModel ...  Parameter [ "+param+" ] is not supported for model [ " + model + " ]");
            }
          }
        }
      } else {
        dd("filterParamsByModel ... Cannot find feature configuration for " + model);
      }
      return rv;
    };

    Utils.isParameterSupportedInner = function (param, model, version, configuration) {
      if (configuration && configuration.parameterSupported) {
        for (var idx = 0; idx < configuration.parameterSupported.length; idx++) {
          var parameterObj = configuration.parameterSupported[idx];
          var parameterPattern = parameterObj.name;
          if (parameterPattern) {
            if (new RegExp(parameterPattern).test(param)) {
              if (parameterObj.minSwVersion && version) {
                return (Utils.compareVersion(version, parameterObj.minSwVersion) >= 0);
              } else {
                return true;
              }
            }
          }
        }
      } else {
        dd("isParameterSupported ... Cannot find feature configuration for " + model);
      }
      return false;
    };

    Utils.getConfigurationValue_DataModel = function (path, modelName, dataModelName, swVersion) {
      return Meteor.isServer ? Utils.getConfigurationValue(path, modelName, dataModelName, swVersion) : Utils.getConfigurationValueBS(path, modelName, dataModelName, swVersion);
    };

    Utils.getConfigurationValueInner = function (path, configuration) {
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

    Utils.isFeatureSupportedInner = function (feature, modelName, softwareVersion, configuration) {
      var result = false;
      if (feature) {
        var keys = feature.split(".");
        var iteratedConfig = Utils.getConfigurationValueInner(feature, configuration);
        if (iteratedConfig) {
          //TODO clean up condition below: === true doesn't need check for undefined!
          if (iteratedConfig.supported != undefined && iteratedConfig.supported === true) {
            if (iteratedConfig.minSwVersion) {
              result = Utils.compareVersion(softwareVersion, iteratedConfig.minSwVersion) >= 0;
            } else {
              result = true;
            }
          }
        }
      }
      return result;
    };

    /*
     * target: object
     * ctx: an string array. Generally generated via stringPath.split('.')
     * */
    Utils.deepAdd = function (target, ctx, value) {
      if (ctx && ctx.length > 1) {
        var first = ctx.shift();
        if (target && target[first]) {
          Utils.deepAdd(target[first], ctx, value)
        } else {
          target[first] = {};
          Utils.deepAdd(target[first], ctx, value)
        }
      } else {
        target[ctx.shift()] = value
      }
    };
    /*
     * ========================================================
     * Thirdparty framework support common function(end)
     * ========================================================
     */

    /*
     * ========================================================
     * Cloud support util function(begin)
     * ========================================================
     */
    Utils.isInSXA = function () {
      return (typeof ccl === "undefined");
    };

    Utils.isInCCL = function () {
      return (typeof ccl !== "undefined");
    };

    /*
     * ========================================================
     * Cloud support util function(end)
     * ========================================================
     */

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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }).call(this);






  (function () {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                     //
    // packages/utility/IpSubnetCalculator.js                                                                              //
    //                                                                                                                     //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    /*jshint strict: false, bitwise: false */
    /* global define,module */

    /**
     * @namespace
     * @author Aleksi Asikainen
     *
     * IpSubnetCalculator 0.1.0
     *
     * Copyright (c) 2013, Aleksi Asikainen
     * All rights reserved.
     *
     * Released under Apache 2.0 License
     * http://www.apache.org/licenses/LICENSE-2.0.html
     *
     *
     * Designed for:
     *
     *    1) Calculating optimal and exact subnet masks for an
     *       unrestricted range of IP addresses.
     *
     *       E.g. range 10.0.1.255 - 10.0.3.255 should result in:
     *
     *           10.0.1.255/32
     *           10.0.2.0/24
     *           10.0.3.0/24
     *
     *    2) Calculating subnets from an IP and bitmask size
     *
     *    3) Calculating subnets and bitmask sizes from an IP and subnet mask
     *
     *
     * Use `calculate()`, `calculateSubnetMask()`, and `calculateCIDRPrefix()` for easy access.
     *
     */
    IpSubnetCalculator = {

      /**
       * Calculates an optimal set of IP masks for the given IP address range
       *
       * @param {string} ipStart Lowest IP in the range to be calculated in string format ("123.123.123.123")
       * @param {string} ipEnd Highest IP (inclusive) in the range to be calculated in string format ("123.123.123.123")
       *
       * @return The function returns null in case of an error. Otherwise, an array containing one or more subnet
       *         masks is returned:
       *
       * <code>var result = [
       *      {
       *          ipLow              : 2071689984,
       *          ipLowStr           : "123.123.123.0",
       *          ipHigh             : 2071690239,
       *          ipHighStr          : "123.123.123.255",
       *          prefixMask         : 4294967040,
       *          prefixMaskStr      : "255.255.255.0",
       *          prefixSize         : 24,
       *          invertedMask       : 255,
       *          invertedMaskStr    : "0.0.0.255",
       *          invertedMaskSize   : 8
       *      },
       *
       *      ...
       *  ];
       * </code>
       * @public
       */
      calculate: function (ipStart, ipEnd) {
        var ipStartNum, ipEndNum, ipCurNum;
        var rangeCollection = [];

        if (
          (ipStart === '') || (ipStart === null) || (ipStart === false) ||
          (ipEnd === '') || (ipEnd === null) || (ipEnd === false)
        ) {
          return null;
        }


        ipStartNum = IpSubnetCalculator.toDecimal(ipStart);
        ipEndNum = IpSubnetCalculator.toDecimal(ipEnd);

        if (ipEndNum < ipStartNum) {
          return null;
        }

        ipCurNum = ipStartNum;

        while (ipCurNum <= ipEndNum) {
          var optimalRange = IpSubnetCalculator.getOptimalRange(ipCurNum, ipEndNum);

          if (optimalRange === null) {
            return null;
          }

          rangeCollection.push(optimalRange);

          ipCurNum = optimalRange.ipHigh + 1;
        }

        return rangeCollection;
      },


      /**
       * Calculates a subnet mask from CIDR prefix.
       *
       * @param {string} ip IP address in string format
       * @param {int} prefixSize Number of relevant bits in the subnet mask
       * @return {object|null} Returns null in case of an error, and a subnet data object otherwise.
       *         For details about the subnet data object, see documentation of
       *         getMaskRange()
       * @public
       */
      calculateSubnetMask: function (ip, prefixSize) {
        if (
          (ip === '') || (ip === null) || (ip === false) ||
          (prefixSize === '') || (prefixSize === null) || (prefixSize === false)
        ) {
          return null;
        }


        var ipNum = IpSubnetCalculator.toDecimal(ip);

        return IpSubnetCalculator.getMaskRange(ipNum, prefixSize);
      },


      /**
       * Calculates a CIDR prefix from subnet mask.
       *
       * @param {string} ip IP address in string format
       * @param {string} subnetMask IP subnet mask in string format ("255.255.255.0")
       * @return {object|null} Returns null in case of an error, and a subnet data object otherwise.
       *         For details about the subnet data object, see documentation of
       *         getMaskRange()
       * @public
       */
      calculateCIDRPrefix: function (ip, subnetMask) {
        if (
          (ip === '') || (ip === null) || (ip === false) ||
          (subnetMask === '') || (subnetMask === null) || (subnetMask === false)
        ) {
          return null;
        }


        var ipNum = IpSubnetCalculator.toDecimal(ip);
        var subnetMaskNum = IpSubnetCalculator.toDecimal(subnetMask);

        var prefix = 0;
        var newPrefix = 0;
        var prefixSize;

        for (prefixSize = 0; prefixSize < 32; prefixSize++) {
          newPrefix = (prefix + (1 << (32 - (prefixSize + 1)))) >>> 0;

          if (((subnetMaskNum & newPrefix) >>> 0) !== newPrefix) {
            break;
          }

          prefix = newPrefix;
        }

        return IpSubnetCalculator.getMaskRange(ipNum, prefixSize);
      },


      /**
       * Finds the largest subnet mask that begins from ipNum and does not
       * exceed ipEndNum.
       *
       * @param {int} ipNum IP start point
       * @param {int} ipEndNum IP end point
       * @return {object|null} Returns null on failure, otherwise an object with the following fields:
       *
       * ipLow - Decimal representation of the lowest IP address in the subnet
       * ipLowStr - String representation of the lowest IP address in the subnet
       * ipHigh - Decimal representation of the highest IP address in the subnet
       * ipHighStr - String representation of the highest IP address in the subnet
       * prefixMask - Bitmask matching prefixSize
       * prefixMaskStr - String / IP representation of the bitmask
       * prefixSize - Size of the prefix
       * invertedMask - Bitmask matching the inverted subnet mask
       * invertedMaskStr - String / IP representation of the inverted mask
       * invertedSize - Number of relevant bits in the inverted mask
       * @private
       */
      getOptimalRange: function (ipNum, ipEndNum) {
        var prefixSize;
        var optimalRange = null;

        for (prefixSize = 32; prefixSize >= 0; prefixSize--) {
          var maskRange = IpSubnetCalculator.getMaskRange(ipNum, prefixSize);

          if ((maskRange.ipLow === ipNum) && (maskRange.ipHigh <= ipEndNum)) {
            optimalRange = maskRange;
          }
          else {
            break;
          }
        }

        return optimalRange;
      },


      /**
       * Calculates details of a CIDR subnet
       *
       * @param {int} ipNum Decimal IP address
       * @param {int} prefixSize Subnet mask size in bits
       * @return {object} Returns an object with the following fields:
       *
       * ipLow - Decimal representation of the lowest IP address in the subnet
       * ipLowStr - String representation of the lowest IP address in the subnet
       * ipHigh - Decimal representation of the highest IP address in the subnet
       * ipHighStr - String representation of the highest IP address in the subnet
       * prefixMask - Bitmask matching prefixSize
       * prefixMaskStr - String / IP representation of the bitmask
       * prefixSize - Size of the prefix
       * invertedMask - Bitmask matching the inverted subnet mask
       * invertedMaskStr - String / IP representation of the inverted mask
       * invertedSize - Number of relevant bits in the inverted mask
       * @private
       */
      getMaskRange: function (ipNum, prefixSize) {
        var prefixMask = IpSubnetCalculator.getPrefixMask(prefixSize);
        var lowMask = IpSubnetCalculator.getMask(32 - prefixSize);

        var ipLow = (ipNum & prefixMask) >>> 0;
        var ipHigh = (((ipNum & prefixMask) >>> 0) + lowMask) >>> 0;

        return {
          'ipLow': ipLow,
          'ipLowStr': IpSubnetCalculator.toString(ipLow),

          'ipHigh': ipHigh,
          'ipHighStr': IpSubnetCalculator.toString(ipHigh),

          'prefixMask': prefixMask,
          'prefixMaskStr': IpSubnetCalculator.toString(prefixMask),
          'prefixSize': prefixSize,

          'invertedMask': lowMask,
          'invertedMaskStr': IpSubnetCalculator.toString(lowMask),
          'invertedSize': 32 - prefixSize
        };
      },


      /**
       * Creates a bitmask with maskSize leftmost bits set to one
       *
       * @param {int} prefixSize Number of bits to be set
       * @return {int} Returns the bitmask
       * @private
       */
      getPrefixMask: function (prefixSize) {
        var mask = 0;
        var i;

        for (i = 0; i < prefixSize; i++) {
          mask += (1 << (32 - (i + 1))) >>> 0;
        }

        return mask;
      },


      /**
       * Creates a bitmask with maskSize rightmost bits set to one
       *
       * @param {int} maskSize Number of bits to be set
       * @return {int} Returns the bitmask
       * @private
       */
      getMask: function (maskSize) {
        var mask = 0;
        var i;

        for (i = 0; i < maskSize; i++) {
          mask += (1 << i) >>> 0;
        }

        return mask;
      },


      /**
       * Converts string formatted IPs to decimal representation
       *
       * @link http://javascript.about.com/library/blipconvert.htm
       * @param {string} ipString IP address in string format
       * @return {int} Returns the IP address in decimal format
       * @private
       */
      toDecimal: function (ipString) {
        var d = ipString.split('.');
        return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
      },


      /**
       * Converts decimal IPs to string representation
       *
       * @link http://javascript.about.com/library/blipconvert.htm
       * @param {int} ipNum IP address in decimal format
       * @return {string} Returns the IP address in string format
       * @private
       */
      toString: function (ipNum) {
        var d = ipNum % 256;

        for (var i = 3; i > 0; i--) {
          ipNum = Math.floor(ipNum / 256);
          d = ipNum % 256 + '.' + d;
        }

        return d;
      }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }).call(this);






  (function () {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                     //
    // packages/utility/utils-client.js                                                                                    //
    //                                                                                                                     //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    Utils = Utils || {};

    // Namespace for SXACC's session key.
    var keyNs = 'sxacc.';
    var DEFAULT_PAGE_SIZE = 10;

    //SXACC-3754 Default page size = 10 everywhere
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
      var userSession = ccl.userSession.get();
      if (Utils.isInSXA()) {
        if (userSession != null) return userSession.organization.id.toString();
        else return getUrlParamAll()['orgId'];
      } else if (Utils.isInCCL()) {
        if (userSession != null) return userSession.orgId.toString();
        else {
          var subscriber = Session.get(Support.Const.KEY_SUBSCRIBER);
          if (subscriber != null) return subscriber.orgId.toString();
          else return getUrlParamAll()['orgId'];
        }
      }
    };

    var getSerialNumber = Utils.getSerialNumber = function () {
      if (Utils.isInSXA()) {
        var query = getParamQuery() || getUrlParamAll();
        return (query && query['serialNumber']) || '';
      } else if (Utils.isInCCL()) {
        var currentCpe = Session.get(Support.Const.KEY_SUBSCRIBER_CURRENT_CPE);
        if (currentCpe != null && currentCpe.serialNumber) {
          return currentCpe.serialNumber;
        }
      }
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
      var di = Session.get(key);
      if (!di) {
        var orgId = Utils.getOrgId();
        var serialNumber = Utils.getSerialNumber();
        Meteor.call("getDeviceInfo", orgId, serialNumber, function (error, result) {
          var currentSerialNumber = Utils.getSerialNumber();
          if (serialNumber !== currentSerialNumber) {
            // early return
            return;
          }

          if (error) {
            Session.set(key, null);
            Logger.error('Cannot get device-info for FSAN ' + serialNumber + ', error: ' + error);
            return;
          }
          Session.set(key, result);
        });
      } else {
        return di;
      }
    };

    // ----------------------------------------------------------------------------
    // Notification using PNotify (http://sciactive.com/pnotify/)

    var pnotify = Utils.notify = function (title, text, type, iconClass) {
      var icon = (iconClass == null) ? false : iconClass;

      new PNotify({
        title: title,
        text: text,
        type: type,
        icon: icon
      });
    };

    Utils.notifyError = function (text) {
      pnotify(i18n('error'), text, 'error');
    };

    Utils.notifySuccess = function (text) {
      pnotify(i18n('success'), text, 'success');
    };

    // ----------------------------------------------------------------------------
    // Breadcrumb manipulation

    var upperLink = Utils.getUpperLink = function (searchKey) {
      var crumbs = Session.get('bread_crumb_dashboards_visited_array');
      var upperLink = null;
      for (var i = 0; i < crumbs.length; i++) {
        if (crumbs[i].displayText.indexOf(searchKey) > 0) {
          break;
        }
        upperLink = crumbs[i].link;
      }

      if (upperLink == null) upperLink = Router.routes['cc'].path();
      return upperLink;
    };

    Utils.goUpperCrumb = function (serialNumber) {
      var parentLink = upperLink(serialNumber);
      Router.go(parentLink);
    };

    // ----------------------------------------------------------------------------
    // XML related

    var getPrefix = function (prefixIndex) {
      var span = '  ';
      var output = [];
      for (var i = 0; i < prefixIndex; ++i) {
        output.push(span);
      }

      return output.join('');
    };

    Utils.formatXml = function (text) {
      if (text == undefined) {
        return '';
      }

      //remove abundant spaces
      text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function ($0, name, props) {
        return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
      }).replace(/>\s*?</g, ">\n<");

      //encode comments
      text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g, function ($0, text) {
        var ret = '<!--' + escape(text) + '-->';
        //alert(ret);
        return ret;
      }).replace(/\r/g, '\n');

      //adjust format
      var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
      var nodeStack = [];
      var output = text.replace(rgx, function ($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
        var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/') || (isFull1 == '/') || (isFull2 == '/');
        //alert([all,isClosed].join('='));
        var prefix = '';
        if (isBegin == '!') {
          prefix = getPrefix(nodeStack.length);
        } else {
          if (isBegin != '/') {
            prefix = getPrefix(nodeStack.length);
            if (!isClosed) {
              nodeStack.push(name);
            }
          } else {
            nodeStack.pop();
            prefix = getPrefix(nodeStack.length);
          }

        }
        var ret = '\n' + prefix + all;
        return ret;
      });

      var prefixSpace = -1;
      var outputText = output.substring(1);
      //alert(outputText);

      //decode comments
      outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
        //alert(['[',prefix,']=',prefix.length].join(''));
        if (prefix.charAt(0) == '\r')
          prefix = prefix.substring(1);
        text = unescape(text).replace(/\r/g, '\n');
        var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
        //alert(ret);
        return ret;
      });

      return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
    };

    Utils.format = function (format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ?
          args[number] :
          match;
      });
    };
    /*
     * ========================================================
     * Thirdparty framework support common function(start)
     * Jira : SXACC-4111
     * ========================================================
     */
    function dd(msg, obj) {
      if (msg) {
        console.info(" ===>>  " + msg);
      }
      if (obj) {
        console.dir(obj);
      }
      console.info();
    }

    var featureConfigurationsSessionKey = "FeatureConfigurationsInSession";

    Utils.loadFeatureConfigurations = function () {
      var configurations = Session.get(featureConfigurationsSessionKey);
      if (!configurations) {
        Meteor.call("loadFeatureConfigurations", function (err, result) {
          if (err) {
            Session.set(featureConfigurationsSessionKey, null);
            Logger.error('Cannot get feature configurations. error: ' + err);
            return;
          }
          Session.set(featureConfigurationsSessionKey, result);
        });
      } else {
        return configurations;
      }
    };



    Utils.getTimezone = function () {
      // use meteor package instead of npm package
      var tz = jstz.determine();
      return tz.name()
    };

    Utils.getFeatureConfigurationBS = function (pModel, dataModelName, swVersion) {
      var configArr = Session.get(featureConfigurationsSessionKey);
      if (pModel == null) {
        Logger.error("model name cannot be null!");
        return;
      }

      var defaultFeatureConfig, dftTR181Cfg;
      var isTR181 = Utils.isTR181(dataModelName);
      var firstModelMatchedCfg = null;

      if (configArr && configArr.length && configArr.length > 0) {
        for (var idx = 0; idx < configArr.length; idx++) {
          var featureConfig = configArr[idx];

          if (featureConfig.models == null) {
            continue;
          }

          if (featureConfig.models == "default") {
            if (Utils.isTR181(featureConfig.dataModelName)) {
              dftTR181Cfg = featureConfig;
            } else {
              defaultFeatureConfig = featureConfig;
            }
            continue;
          }

          for (var ii = 0; ii < featureConfig.models.length; ii++) {
            var modelNameObj = featureConfig.models[ii];
            var swVersions = featureConfig.swVersions;
            var isCurTR181 = Utils.isTR181(featureConfig.dataModelName);

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
                    if (swVersion != null && swVersion.indexOf(version) >= 0) {
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
      if (Utils.isTR181(dataModelName)) {
        return dftTR181Cfg;
      }
      return defaultFeatureConfig;
    };

    /**
     *
     * @param path Mandatory
     * @param modelName Not mandatory
     * @param dataModelName Not mandatory
     * @returns {*}
     */
    Utils.getConfigurationValueBS = function (path, modelName, dataModelName, swversion) {
      if (modelName == null) {
        var di = Utils.getDeviceInfo();
        if (!di) return false;
        modelName = di.modelName;
        dataModelName = di.dataModelName;
      }
      return Utils.getConfigurationValueInner(path, Utils.getFeatureConfigurationBS(modelName, dataModelName, swversion));
    };

    /**
     *
     * @param feature Mandatory
     * @param modelName Not mandatory
     * @param swversion Not mandatory
     * @param dataModelName Not mandatory
     * @returns {*}
     */
    Utils.isFeatureSupportedBS = function (feature, modelName, dataModelName, swversion) {
      if (modelName == null) {
        var di = Utils.getDeviceInfo();
        if (!di) return false;
        modelName = di.modelName;

        swversion = di.softwareVersion;
        dataModelName = di.dataModelName;
      }
      // console.trace();

      return Utils.isFeatureSupportedInner(feature, modelName, swversion, Utils.getFeatureConfigurationBS(modelName, dataModelName, swversion));
    };

    Utils.isParameterSupportedBS = function (path, modelName, dataModelName, swversion) {
      if (modelName == null) {
        var di = Utils.getDeviceInfo();
        if (!di) return false;
        modelName = di.modelName;
        swversion = di.softwareVersion;
        dataModelName = di.dataModelName;
      }
      return Utils.isParameterSupportedInner(path, modelName, swversion, Utils.getFeatureConfigurationBS(modelName, dataModelName, swversion));
    };

    Utils.isParameterInversedBS = function (path) {
      var di = Utils.getDeviceInfo();
      if (!di) return false;
      return Utils.isParameterInversedInner(path, di.modelName, di.softwareVersion, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };

    Utils.isParameterWritableBS = function (path, obj) {
      var di = Utils.getDeviceInfo();
      if (!di) return true;
      return Utils.isParameterWritableInner(path, di.modelName, di.softwareVersion, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion),
        obj);
    };

    Utils.getValueByRealPathBS = function (object, path) {
      var di = Utils.getDeviceInfo();
      if (!di) return false;
      return Utils.getValueByRealPathInner(object, path, di.modelName, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };

    /**
     * Gives the parameter full path and get the alias full path
     * @param path
     * @returns {*}
     */
    Utils.getParameterRealPathBS = function (path) {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      return Utils.getParameterRealPathInner(path, di.modelName, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };

    /**
     * Give the parameter full path and get the alias attribute
     * @param path
     * @returns {*}
     */
    Utils.getParameterRealAttributeBS = function (path) {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      return Utils.getParameterRealAttributeInner(path, di.modelName, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));

    };
    Utils.getParameterAttributeBS = function (path, attrName) {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      return Utils.getParameterAttributeInner(path, attrName, di.modelName, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };
    /**
     This function gives multiple parameters and get the supported one.
     For some specific parameters, different products use different name.
     Use this function to get the real supported parameter this product.
     */
    Utils.getSupportedParameter = function () {
      _.each(arguments, function (parameter) {
        if (Utils.isParameterSupportedBS(parameter)) {
          return parameter;
        }
      });
    };

    Utils.getParameterUnitBS = function (path) {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      return Utils.getParameterUnitInner(path, di.modelName, di.softwareVersion, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };

    Utils.getParameterFactorBS = function (path) {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      return Utils.getParameterFactorInner(path, di.modelName, di.softwareVersion, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };

    Utils.getParameterValueListBS = function (path) {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      return Utils.getParameterValueListInner(path, di.modelName, di.softwareVersion, Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };

    Utils.isRadioEnabledSupported = function () {
      var radioPath = Utils.get24gRadioPath();
      if (Utils.isParameterSupportedBS(radioPath + 'RadioEnabled')) {
        return true;
      } else {
        return false;
      }
    };

    Utils.isFlexBand = function (modelName, dataModelName, softwareVersion) {
      if (Utils.isParameterSupportedBS(
        'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_BROADCOM_COM_WlanAdapter.WlBaseCfg.WlBand',
        modelName,
        dataModelName,
        softwareVersion)) {
        return true;
      } else {
        return false;
      }
    };

    Utils.isAdaptWlan = function (radioPath) {
      if (Utils.isParameterSupportedBS(radioPath + 'X_BROADCOM_COM_WlanAdapter.')) {
        return true;
      } else {
        return false;
      }
    };


    Utils.getSecurityOptions = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      return Utils.getConfigurationValueInner("securityOptions", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
    };

    Utils.getMatchedSecurityName = function (obj, securityOptions) {
      var matchedSecurity;
      _.find(securityOptions, function (option, securityName) {
        var isMatch = true;
        _.each(option, function (paramValue, paramName) {
          if (isMatch && _.isString(paramValue)) {
            if (paramValue != obj[paramName]) {
              isMatch = false;
            }
          }
        });
        if (isMatch) {
          matchedSecurity = securityName;
          return true;
        }
      });
      return matchedSecurity;
    };

    Utils.is24GWirelessSupported = function () {
      return Utils.isFeatureSupportedBS("featureSupported.wlan24G");
    };

    Utils.is5GWirelessSupported = function () {
      return Utils.isFeatureSupportedBS("featureSupported.wlan5G");
    };

    Utils.isWirelessSupported = function () {
      return Utils.is24GWirelessSupported() || Utils.is5GWirelessSupported();
    };

    Utils.get24gWlanPath = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      if (Utils.is24GWirelessSupported()) {
        return Utils.getConfigurationValueInner("featureSupported.wlan24G.path", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion)) ||
          Ssid.def24gWlanPath;
      }
    };

    Utils.get5gWlanPath = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      if (Utils.is5GWirelessSupported()) {
        return Utils.getConfigurationValueInner("featureSupported.wlan5G.path", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion)) ||
          Ssid.def5gWlanPath;
      }
    };

    Utils.getAllWlanPath = function () {
      var wlanPath24g = Utils.get24gWlanPath();
      var wlanPath5g = Utils.get5gWlanPath();

      if (wlanPath24g != null && wlanPath5g != null) {
        return _.union(wlanPath24g, wlanPath5g);
      } else if (wlanPath24g != null) {
        return wlanPath24g;
      } else {
        return wlanPath5g;
      }
    };

    Utils.get24gPrimaryWlanPath = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      var path = Utils.getConfigurationValueInner("featureSupported.wlan24G.PrimarySSIDPath", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
      if (path) {
        return path;
      }
      var wlanPath = Utils.get24gWlanPath();
      if (wlanPath == null || wlanPath.length == 0) {
        return null;
      }
      return wlanPath[0];
    };

    Utils.get5gPrimaryWlanPath = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      var path = Utils.getConfigurationValueInner(
        "featureSupported.wlan5G.PrimarySSIDPath",
        Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
      if (path) {
        return path;
      }
      var wlanPath = Utils.get5gWlanPath();
      if (wlanPath == null || wlanPath.length == 0) {
        return null;
      }
      return wlanPath[0];
    };

    Utils.get24gRadioPath = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      var radioPath;
      if (Utils.is24GWirelessSupported()) {
        radioPath = Utils.getConfigurationValueInner("featureSupported.wlan24G.radioPath", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
        if (radioPath == null) {
          radioPath = Utils.get24gPrimaryWlanPath();
        }
      }
      return radioPath;
    };

    Utils.get5gRadioPath = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return null;
      var radioPath;
      if (Utils.is5GWirelessSupported()) {
        radioPath = Utils.getConfigurationValueInner("featureSupported.wlan5G.radioPath", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
        if (radioPath == null) {
          radioPath = Utils.get5gPrimaryWlanPath();
        }
      }
      return radioPath;
    };

    Utils.get24gRadioPathCalix = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";
      return Utils.getConfigurationValueInner("featureSupported.wlan24G.radioPathCalix", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
        || "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.";
    };

    Utils.get5gRadioPathCalix = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.";
      return Utils.getConfigurationValueInner("featureSupported.wlan5G.radioPathCalix", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion))
        || "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.";
    };

    Utils.support24gWlanAutoChannel = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return false;
      if (Utils.is24GWirelessSupported()) {
        var supported = Utils.getConfigurationValueInner(
          "featureSupported.wlan24G.supportAutoChannel",
          Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion));
        return supported == undefined ? true : supported;
      } else {
        return false;
      }
    };

    Utils.support5gWlanAutoChannel = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return false;
      if (Utils.is5GWirelessSupported()) {
        var supported = Utils.getConfigurationValueInner("featureSupported.wlan5G.supportAutoChannel", Utils.getFeatureConfigurationBS(di.modelName, di
          .dataModelName, di.softwareVersion));
        return supported == undefined ? true : supported;
      } else {
        return false;
      }
    };

    Utils.i18n_format = function (label, args) {
      var result = sxa.systemUtil.getLabel(label);
      return Utils.sprintf(result, args);
    };

    Utils.getConfigurationValueWithDefaultValueBS = function (path, modelName, dataModelName, swversion, defaultValue) {
      if (!path) {
        Logger.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        Logger.error('parameter:key is undefined');
        Logger.error('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
      }
      if (!modelName) {
        Logger.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        Logger.error('parameter:modelName is undefined');
        Logger.error('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
      }

      if (dataModelName == null) {
        dataModelName = Utils.getTR098DataModelName();
      }

      var configurationValue = Utils.getConfigurationValueBS(path, modelName, dataModelName, swversion);
      Logger.debug(">>>>>>>>>>>>>>>>>>>>>>> " + path + ":" + configurationValue);
      return configurationValue || defaultValue;
    };

    Utils.getPortMappingRefreshAfterDel = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return false;
      if (Utils.isFeatureSupportedBS("featureSupported.portMapping")) {
        return Utils.getConfigurationValueInner("featureSupported.portMapping.refreshAfterDel", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion)) ||
          false;
      } else {
        return false;
      }
    };

    Utils.getPortMappingRefreshAfterAdd = function () {
      var di = Utils.getDeviceInfo();
      if (!di) return false;
      if (Utils.isFeatureSupportedBS("featureSupported.portMapping")) {
        return Utils.getConfigurationValueInner("featureSupported.portMapping.refreshAfterAdd", Utils.getFeatureConfigurationBS(di.modelName, di.dataModelName, di.softwareVersion)) ||
          false;
      } else {
        return false;
      }
    };

    Utils.getLabel = function (key) {
      if (Utils.isInSXA()) {
        return sxa.systemUtil.getLabel(key);
      } else if (Utils.isInCCL()) {
        return i18n("sxacc." + key);
      }
    };

    Utils.getProjectSpecificLabel = function (key) {
      if (Utils.isInSXA()) {
        return sxa.systemUtil.getLabel(key + ".sxa");
      } else if (Utils.isInCCL()) {
        return i18n("sxacc." + key + ".ccl");
      }
    };

    Utils.getLabelFormat = function (key, args) {
      var result = Utils.getLabel(key);
      return Utils.sprintf(result, args);
    };

    Utils.isSerialNumberHrefSupported = function () {
      return Utils.isInSXA();
    };

    Utils.isNonEmptyString = function (value) {
      return value != null && value.trim().length > 0;
    };

    //Build CC+ subscriber address into one line address
    Utils.buildAddress = function (address) {
      if (!address) {
        return null;
      }

      // Assemble all address parts
      var streetLine1 = address.streetLine1;
      var city = address.city;
      var state = address.state;
      var zip = address.zip;
      var country = address.country;
      var parts = [streetLine1, city, state, zip, country];
      parts = _.filter(parts, Utils.isNonEmptyString);
      address = parts.length > 0 ? parts.join(', ') : null;
      return address;
    };

    //Build Service Cloud subscriber
    Utils.buildSubscriber = function (ssub, deviceData) {
      var devices = _.filter(deviceData, function (d) {
        if (!_.has(d, 'bDecommissioned') || d.bDecommissioned == false || d.bDecommissioned == null) {
          return d;
        }
      });

      //Put RG first
      var tmp = [];
      _.each(devices, function (r) {
        if (r.opMode === 'RG') {
          tmp.unshift(r);
        } else {
          tmp.push(r);
        }
      });

      devices = tmp;
      var ret = _.clone(ssub);

      let data = _.filter(ret.services, (s) => {
        return s.type === 'data';
      });
      if (data && data.length > 0) {
        ret.downspeed = data[0].downSpeed;
        ret.upspeed = data[0].upSpeed;
      }
      ret.deviceData = devices;
      ret.devices = devices;
      ret.devicesIncludeDecommissioned = deviceData;

      return ret;
    };


    Utils.getLocation = function (subscriber) {
      if (subscriber != null && _.isArray(subscriber.locations) && subscriber.locations.length > 0) {
        return subscriber.locations[0];
      }
      return null;
    };

    Utils.getContact = function (location) {
      var contacts = location && location.contacts;
      if (contacts != null && _.isArray(contacts) && contacts.length > 0) {
        return contacts[0];
      }
      return null;
    };


    Utils.callWithPromise = (method, ...args) => {
      return new Promise((resolve, reject) => {
        Meteor.call(method, ...args, (error, result) => {
          if (error) reject(error);
          resolve(result);
        });
      });
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }).call(this);






  (function () {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                                     //
    // packages/utility/sprintf.js                                                                                         //
    //                                                                                                                     //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    (function (Utils) {
      'use strict'

      var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /bcdiefguxX/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
      }

      function sprintf() {
        var key = arguments[0], cache = sprintf.cache
        if (!(cache[key] && cache.hasOwnProperty(key))) {
          cache[key] = sprintf.parse(key)
        }
        return sprintf.format.call(null, cache[key], arguments)
      }

      sprintf.format = function (parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = ''
        for (i = 0; i < tree_length; i++) {
          node_type = get_type(parse_tree[i])
          if (node_type === 'string') {
            output[output.length] = parse_tree[i]
          }
          else if (node_type === 'array') {
            match = parse_tree[i] // convenience purposes only
            if (match[2]) { // keyword argument
              arg = argv[cursor]
              for (k = 0; k < match[2].length; k++) {
                if (!arg.hasOwnProperty(match[2][k])) {
                  throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]))
                }
                arg = arg[match[2][k]]
              }
            }
            else if (match[1]) { // positional argument (explicit)
              arg = argv[match[1]]
            }
            else { // positional argument (implicit)
              arg = argv[cursor++]
            }

            if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && get_type(arg) == 'function') {
              arg = arg()
            }

            if (re.numeric_arg.test(match[8]) && (get_type(arg) != 'number' && isNaN(arg))) {
              throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)))
            }

            if (re.number.test(match[8])) {
              is_positive = arg >= 0
            }

            switch (match[8]) {
              case 'b':
                arg = parseInt(arg, 10).toString(2)
                break
              case 'c':
                arg = String.fromCharCode(parseInt(arg, 10))
                break
              case 'd':
              case 'i':
                arg = parseInt(arg, 10)
                break
              case 'j':
                arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                break
              case 'e':
                arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()
                break
              case 'f':
                arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                break
              case 'g':
                arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg)
                break
              case 'o':
                arg = arg.toString(8)
                break
              case 's':
                arg = String(arg)
                arg = (match[7] ? arg.substring(0, match[7]) : arg)
                break
              case 't':
                arg = String(!!arg)
                arg = (match[7] ? arg.substring(0, match[7]) : arg)
                break
              case 'T':
                arg = get_type(arg)
                arg = (match[7] ? arg.substring(0, match[7]) : arg)
                break
              case 'u':
                arg = parseInt(arg, 10) >>> 0
                break
              case 'v':
                arg = arg.valueOf()
                arg = (match[7] ? arg.substring(0, match[7]) : arg)
                break
              case 'x':
                arg = parseInt(arg, 10).toString(16)
                break
              case 'X':
                arg = parseInt(arg, 10).toString(16).toUpperCase()
                break
            }
            if (re.json.test(match[8])) {
              output[output.length] = arg
            }
            else {
              if (re.number.test(match[8]) && (!is_positive || match[3])) {
                sign = is_positive ? '+' : '-'
                arg = arg.toString().replace(re.sign, '')
              }
              else {
                sign = ''
              }
              pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '
              pad_length = match[6] - (sign + arg).length
              pad = match[6] ? (pad_length > 0 ? str_repeat(pad_character, pad_length) : '') : ''
              output[output.length] = match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
            }
          }
        }
        return output.join('')
      };

      sprintf.cache = {}

      sprintf.parse = function (fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0
        while (_fmt) {
          if ((match = re.text.exec(_fmt)) !== null) {
            parse_tree[parse_tree.length] = match[0]
          }
          else if ((match = re.modulo.exec(_fmt)) !== null) {
            parse_tree[parse_tree.length] = '%'
          }
          else if ((match = re.placeholder.exec(_fmt)) !== null) {
            if (match[2]) {
              arg_names |= 1
              var field_list = [], replacement_field = match[2], field_match = []
              if ((field_match = re.key.exec(replacement_field)) !== null) {
                field_list[field_list.length] = field_match[1]
                while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                  if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                    field_list[field_list.length] = field_match[1]
                  }
                  else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                    field_list[field_list.length] = field_match[1]
                  }
                  else {
                    throw new SyntaxError("[sprintf] failed to parse named argument key")
                  }
                }
              }
              else {
                throw new SyntaxError("[sprintf] failed to parse named argument key")
              }
              match[2] = field_list
            }
            else {
              arg_names |= 2
            }
            if (arg_names === 3) {
              throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")
            }
            parse_tree[parse_tree.length] = match
          }
          else {
            throw new SyntaxError("[sprintf] unexpected placeholder")
          }
          _fmt = _fmt.substring(match[0].length)
        }
        return parse_tree
      }

      var vsprintf = function (fmt, argv, _argv) {
        _argv = (argv || []).slice(0)
        _argv.splice(0, 0, fmt)
        return sprintf.apply(null, _argv)
      }

      /**
       * helpers
       */
      function get_type(variable) {
        if (typeof variable === 'number') {
          return 'number'
        }
        else if (typeof variable === 'string') {
          return 'string'
        }
        else {
          return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
        }
      }

      var preformattedPadding = {
        '0': ['', '0', '00', '000', '0000', '00000', '000000', '0000000'],
        ' ': ['', ' ', '  ', '   ', '    ', '     ', '      ', '       '],
        '_': ['', '_', '__', '___', '____', '_____', '______', '_______'],
      }

      function str_repeat(input, multiplier) {
        if (multiplier >= 0 && multiplier <= 7 && preformattedPadding[input]) {
          return preformattedPadding[input][multiplier]
        }
        return Array(multiplier + 1).join(input)
      }

      /**
       * export to either browser or node.js
       */
      if (typeof exports !== 'undefined') {
        exports.sprintf = sprintf;
        exports.vsprintf = vsprintf;
      }
      else {
        Utils.sprintf = sprintf;
        Utils.vsprintf = vsprintf;
        if (typeof define === 'function' && define.amd) {
          define(function () {
            return {
              sprintf: sprintf,
              vsprintf: vsprintf
            }
          })
        }
      }
    })(Utils);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }).call(this);


  /* Exports */
  Package._define("utility", {
    Utils: Utils,
    IpSubnetCalculator: IpSubnetCalculator,
    TR181_DATA: TR181_DATA,
    IS_TR181_MOCK: IS_TR181_MOCK
  });

})();
