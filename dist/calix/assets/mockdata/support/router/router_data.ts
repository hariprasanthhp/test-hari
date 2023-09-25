export const deviceStatus = { "status": "Online", "mapOnline": "Online", "tr69Online": "Online", "connectivityStatus": { "PeriodicInformEnable": "true", "PeriodicInformInterval": "86400", "Uptime": "1688635" }, "serialNumber": "CXNK00778D46" };

export const deviceInfo = { "_id": "470053-487746-CXNK00778D46", "opMode": "RG", "opRole": "Controller", "ipAddress": "192.168.1.66", "modelName": "GS4227E", "createTime": "2021-06-03T08:39:51.619Z", "macAddress": "48:77:46:9a:06:9f", "subnetMask": "255.255.255.0", "pppUsername": "", "stunEnabled": true, "lastBootTime": "2022-09-30T21:00:15.659Z", "manufacturer": "Calix", "productClass": "GigaSpire", "serialNumber": "CXNK00778D46", "changeCounter": 1, "dataModelName": "tr098", "wanAccessType": "CopperEthernet", "defaultGateway": "192.168.1.254", "ipV6SitePrefix": "", "lastInformTime": "2022-10-24T09:14:30.906Z", "registrationId": "", "timezoneOffset": "-05:00", "hardwareVersion": "3000286703", "manufacturerOUI": "487746", "secondIpAddress": "2600:1700:2d7a:800:4a77:46ff:fe9a:69f/64", "softwareVersion": "22.3.500.451", "provRecordStatus": "Succeeded", "STUNServerAddress": "stun-stg.calix.com", "secondWanInterface": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1", "lastInformEventCodes": "6 CONNECTION REQUEST", "periodicInformInterval": 86400, "wanSecDCSConnectionPath": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1", "udpConnectionRequestAddr": "45.27.26.230:60018", "lastUpdateToDbTime": 1666602870907, "hardwareSerialNumber": "421912003072", "wanConnType": "IPoE" };

export const temperature = [{ "type": "router", "TempMax": 60 }];

export const dhcp = { "DHCPServerEnable": "true", "HostName": "router", "DomainName": "home", "DeviceIPAddress": "192.168.2.1", "BeginningIPAddress": "192.168.2.100", "EndingIPAddress": "192.168.2.249", "SubnetMask": "255.255.255.0", "DHCPLeaseTime": "43200", "DNSServers": "" };

export const dhcp6 = { "RAService": "server", "DHCPv6Service": "server", "DHCPv6Mode": "M-and-A", "IPv6DNSServers": "" };

export const pingWanInfo = [{ "path": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.4", "bIsData": true, "bIsVoice": false, "bIsVideo": false, "bIsMgmtWan": true, "Name": "wan", "Enable": "true", "Uptime": "6781", "bIsV4": true, "bIsV6": false, "ConnectionStatus": "Connected", "MACAddress": "60:db:98:6f:25:b7", "VlanId": "600", "VlanPriority": "0", "BytesReceived": "543582648", "BytesSent": "490649611", "PacketsReceived": "1275935", "PacketsSent": "1358956", "AddressingType": "DHCP", "ConnectionType": "IP_Routed", "DefaultGateway": "10.245.53.1", "SubnetMask": "255.255.255.0", "DNSServers": "192.168.33.10,192.168.97.10", "ExternalIPAddress": "10.245.53.192", "DownstreamRate": "2500", "UpstreamRate": "1200" }, { "path": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.5", "bIsData": false, "bIsVoice": false, "bIsVideo": true, "bIsMgmtWan": false, "Name": "video", "Enable": "true", "Uptime": "6781", "bIsV4": true, "bIsV6": false, "ConnectionStatus": "Connected", "MACAddress": "60:db:98:6f:25:b7", "VlanId": "30", "VlanPriority": "0", "BytesReceived": "2202397353", "BytesSent": "35433", "PacketsReceived": "1638756", "PacketsSent": "429", "AddressingType": "DHCP", "ConnectionType": "IP_Routed", "DefaultGateway": "192.168.30.1", "SubnetMask": "255.255.255.0", "DNSServers": "192.168.20.2", "ExternalIPAddress": "192.168.30.20", "DownstreamRate": "2500", "UpstreamRate": "1200" }];

export const pingResp = { "DiagnosticsState": "Complete", "CompleteTime": 1666876147579, "Host": "www.12306.cn", "SuccessCount": "5", "FailureCount": "0", "AverageResponseTime": "20", "MinimumResponseTime": "20", "MaximumResponseTime": "21" };

export const traceResp = { "DiagnosticsState": "Complete", "CompleteTime": 1666879316593, "Host": "www.12306.cn", "Hops": [{ "HopHost": "192.168.38.1", "HopHostAddress": "192.168.38.1", "HopRTTimes": "1" }, { "HopHost": "218.94.82.225", "HopHostAddress": "218.94.82.225", "HopRTTimes": "7" }, { "HopHost": "61.155.253.217", "HopHostAddress": "61.155.253.217", "HopRTTimes": "2" }, { "HopHost": "61.155.228.137", "HopHostAddress": "61.155.228.137", "HopRTTimes": "6" }, { "HopHost": "202.97.18.38", "HopHostAddress": "202.97.18.38", "HopRTTimes": "18" }, { "HopHost": "220.177.101.154", "HopHostAddress": "220.177.101.154", "HopRTTimes": "19" }, { "HopHost": "220.177.95.182", "HopHostAddress": "220.177.95.182", "HopRTTimes": "16" }, { "HopHost": "220.177.102.86", "HopHostAddress": "220.177.102.86", "HopRTTimes": "21" }, { "HopHost": "121.32.65.218.broad.nc.jx.dynamic.163data.com.cn", "HopHostAddress": "61.180.32.121", "HopRTTimes": "24" }] };

export const sysLogData = { "fileTransferStartTime": "2022-10-28T23:19:15.939+09:00", "fileTransferCompleteTime": "2022-10-28T23:20:06.778+09:00", "username": "de5eed9", "password": "5302d51", "downloadUrl": "http://gcs-stg.calix.com:8080/files/log-470053-D0768F-CXNK008D1813-1666966754887" };

export const connectToDeviceData = { "IPAddress": "192.168.35.229", "Port": "8080", "Protocol": "HTTP", "Nonce": "ce56f76ab78f5edc68aa7b99a948fb00", "Username": "support", "Password": "57535b2d!5upporT" };

export const dataModelData = { "_id": "2edc674c-6a8c-4781-ae25-6202336578f5", "orgId": "470053", "dataModel": [{ "writable": false, "objectPath": "InternetGatewayDevice.", "parameters": [{ "name": "DeviceSummary", "type": "string", "value": "InternetGatewayDevice:1.5[](Baseline:1, EthernetLAN:1, Time:1, IPPing:1, DeviceAssociation:1, WiFiLAN:1, UDPConnReq:1, TraceRoute:1)", "writable": false }, { "name": "LANDeviceNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "WANDeviceNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "UserNumberOfEntries", "type": "unsignedInt", "value": 2, "writable": false }, { "name": "X_000631_HostMappingNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "X_000631_WhiteListNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_Ipv6WhiteListNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.BulkData.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "", "writable": false }, { "name": "MinReportingInterval", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Protocols", "type": "string", "value": "", "writable": false }, { "name": "EncodingTypes", "type": "string", "value": "", "writable": false }, { "name": "MaxNumberOfProfiles", "type": "int", "value": 0, "writable": false }, { "name": "MaxNumberOfParameterReferences", "type": "int", "value": 0, "writable": false }, { "name": "ProfileNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Capabilities.PerformanceDiagnostic.", "parameters": [{ "name": "DownloadTransports", "type": "string", "value": "HTTP", "writable": false }, { "name": "UploadTransports", "type": "string", "value": "HTTP", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.DNS.SD.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "ServiceNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.DeviceInfo.", "parameters": [{ "name": "DeviceCategory", "type": "string", "value": "GigaSpire", "writable": false }, { "name": "Manufacturer", "type": "string", "value": "Calix", "writable": false }, { "name": "ManufacturerOUI", "type": "string", "value": "d0768f", "writable": false }, { "name": "ModelName", "type": "string", "value": "GS4220E", "writable": false }, { "name": "ModelNumber", "type": "string", "value": "GS4220E", "writable": false }, { "name": "Description", "type": "string", "value": "OpenWrt 19.07-SNAPSHOT r12.0_00005.0", "writable": false }, { "name": "ProductClass", "type": "string", "value": "GigaSpire", "writable": false }, { "name": "SerialNumber", "type": "string", "value": "CXNK008D1813", "writable": false }, { "name": "HardwareVersion", "type": "string", "value": "3000290301", "writable": false }, { "name": "SoftwareVersion", "type": "string", "value": "22.4.500.320", "writable": false }, { "name": "ModemFirmwareVersion", "type": "string", "value": "QC1.0.0.1", "writable": false }, { "name": "EnabledOptions", "type": "string", "value": "", "writable": false }, { "name": "AdditionalHardwareVersion", "type": "string", "value": "UnitSerialNumber=422009057435", "writable": false }, { "name": "AdditionalSoftwareVersion", "type": "string", "value": "19.07-SNAPSHOT", "writable": false }, { "name": "SpecVersion", "type": "string", "value": "1.0", "writable": false }, { "name": "ProvisioningCode", "type": "string", "value": "", "writable": true }, { "name": "UpTime", "type": "unsignedInt", "value": 181628, "writable": false }, { "name": "DeviceLog", "type": "string", "value": "", "writable": false }, { "name": "X_000631_IGDChangeCounter", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "X_000631_RegistrationId", "type": "string", "value": "", "writable": false }, { "name": "X_000631_SPId", "type": "string", "value": "verizon123", "writable": true }, { "name": "X_000631_SPIdOverrideAllowed", "type": "boolean", "value": true, "writable": true }, { "name": "VendorConfigFileNumberOfEntries", "type": "unsignedInt", "value": 2, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.DeviceInfo.MemoryStatus.", "parameters": [{ "name": "Total", "type": "unsignedInt", "value": 897064, "writable": false }, { "name": "Free", "type": "unsignedInt", "value": 423052, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.DeviceInfo.ProcessStatus.", "parameters": [{ "name": "CPUUsage", "type": "unsignedInt", "value": 10, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.DeviceInfo.VendorConfigFile.1.", "parameters": [{ "name": "Alias", "type": "string", "value": "cpe-_1", "writable": true }, { "name": "Name", "type": "string", "value": "calix.igd.conf", "writable": false }, { "name": "Version", "type": "string", "value": "0.0.0.0", "writable": false }, { "name": "Date", "type": "dateTime", "value": "2022-10-28T18:34:50+09:00", "writable": false }, { "name": "Description", "type": "string", "value": "No provision config file.", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.DeviceInfo.VendorConfigFile.2.", "parameters": [{ "name": "Alias", "type": "string", "value": "cpe-_2", "writable": true }, { "name": "Name", "type": "string", "value": "calix.sip.conf", "writable": false }, { "name": "Version", "type": "string", "value": "0.0.0.0", "writable": false }, { "name": "Date", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "Description", "type": "string", "value": "No provision config file.", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.DeviceInfo.X_000631_ImageManagement.", "parameters": [{ "name": "ActiveImage", "type": "string", "value": "Image_a", "writable": false }, { "name": "ActiveVersion", "type": "string", "value": "22.4.500.320", "writable": false }, { "name": "ActiveStatus", "type": "string", "value": "COMPLETE", "writable": false }, { "name": "ActiveSource", "type": "string", "value": "EWI", "writable": false }, { "name": "BackupVersion", "type": "string", "value": "20.4.902.0.6", "writable": false }, { "name": "BackupStatus", "type": "string", "value": "COMPLETE", "writable": false }, { "name": "BackupSource", "type": "string", "value": "EWI", "writable": false }, { "name": "RevertImage", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.DownloadDiagnostics.", "parameters": [{ "name": "DiagnosticsState", "type": "string", "value": "", "writable": true }, { "name": "Interface", "type": "string", "value": "", "writable": true }, { "name": "DownloadURL", "type": "string", "value": "", "writable": true }, { "name": "DSCP", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "EthernetPriority", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "ROMTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "BOMTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "EOMTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "TestBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TCPOpenRequestTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "TCPOpenResponseTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.FaultMgmt.", "parameters": [{ "name": "SupportedAlarmNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MaxCurrentAlarmEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "CurrentAlarmNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "HistoryEventNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ExpeditedEventNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "QueuedEventNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Firewall.", "parameters": [{ "name": "X_000631_StealthMode", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_InValue", "type": "string", "value": "1000111111100001111111111111111111111111111111111111", "writable": true }, { "name": "X_000631_OutValue", "type": "string", "value": "0000000000000000000000000000000000000000000000000000", "writable": true }, { "name": "Config", "type": "string", "value": "High", "writable": true }, { "name": "Version", "type": "string", "value": "1.0", "writable": true }, { "name": "LastChange", "type": "dateTime", "value": "2022-10-28T18:34:54+09:00", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.IPPingDiagnostics.", "parameters": [{ "name": "DiagnosticsState", "type": "string", "value": "", "writable": true }, { "name": "Interface", "type": "string", "value": "", "writable": true }, { "name": "Host", "type": "string", "value": "", "writable": true }, { "name": "NumberOfRepetitions", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "Timeout", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "DataBlockSize", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "DSCP", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "SuccessCount", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "FailureCount", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "AverageResponseTime", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MinimumResponseTime", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MaximumResponseTime", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.", "parameters": [{ "name": "LANEthernetInterfaceNumberOfEntries", "type": "unsignedInt", "value": 4, "writable": false }, { "name": "LANWLANConfigurationNumberOfEntries", "type": "unsignedInt", "value": 24, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.Hosts.", "parameters": [{ "name": "HostNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.Hosts.Host.1.", "parameters": [{ "name": "IPAddress", "type": "string", "value": "192.168.1.109", "writable": false }, { "name": "AddressSource", "type": "string", "value": "DHCP", "writable": false }, { "name": "LeaseTimeRemaining", "type": "int", "value": 41123, "writable": false }, { "name": "MACAddress", "type": "string", "value": "08:92:04:8c:b7:c2", "writable": false }, { "name": "Layer2Interface", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.2.", "writable": false }, { "name": "VendorClassID", "type": "string", "value": "MSFT 5.0", "writable": false }, { "name": "ClientID", "type": "string", "value": "08:92:04:8c:b7:c2", "writable": false }, { "name": "UserClassID", "type": "string", "value": "", "writable": false }, { "name": "HostName", "type": "string", "value": "AUTOW-ROZHANG", "writable": false }, { "name": "InterfaceType", "type": "string", "value": "Ethernet", "writable": false }, { "name": "Active", "type": "boolean", "value": true, "writable": false }, { "name": "X_000631_Icon", "type": "unsignedInt", "value": 2, "writable": false }, { "name": "X_000631_HostName_Alias", "type": "string", "value": "AUTOW-ROZHANG", "writable": false }, { "name": "X_000631_AccessPoint", "type": "string", "value": "d0:76:8f:46:41:7f", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "NoLink", "writable": false }, { "name": "Name", "type": "string", "value": "eth0", "writable": false }, { "name": "MACAddress", "type": "string", "value": "d0:76:8f:46:41:7f", "writable": false }, { "name": "MaxBitRate", "type": "string", "value": "-1", "writable": true }, { "name": "DuplexMode", "type": "string", "value": "Full", "writable": true }, { "name": "X_000631_OnBatteryEnable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.Stats.", "parameters": [{ "name": "BytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ErrorsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ErrorsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnicastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnicastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DiscardPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DiscardPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MulticastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MulticastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BroadcastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BroadcastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnknownProtoPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.2.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "Up", "writable": false }, { "name": "Name", "type": "string", "value": "eth1", "writable": false }, { "name": "MACAddress", "type": "string", "value": "d0:76:8f:46:41:80", "writable": false }, { "name": "MaxBitRate", "type": "string", "value": "1000", "writable": true }, { "name": "DuplexMode", "type": "string", "value": "Full", "writable": true }, { "name": "X_000631_OnBatteryEnable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.2.Stats.", "parameters": [{ "name": "BytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ErrorsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ErrorsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnicastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnicastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DiscardPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DiscardPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MulticastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MulticastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BroadcastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BroadcastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnknownProtoPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.3.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "NoLink", "writable": false }, { "name": "Name", "type": "string", "value": "eth2", "writable": false }, { "name": "MACAddress", "type": "string", "value": "d0:76:8f:46:41:81", "writable": false }, { "name": "MaxBitRate", "type": "string", "value": "-1", "writable": true }, { "name": "DuplexMode", "type": "string", "value": "Full", "writable": true }, { "name": "X_000631_OnBatteryEnable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.3.Stats.", "parameters": [{ "name": "BytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ErrorsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ErrorsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnicastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnicastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DiscardPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DiscardPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MulticastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MulticastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BroadcastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BroadcastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnknownProtoPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.4.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "NoLink", "writable": false }, { "name": "Name", "type": "string", "value": "eth3", "writable": false }, { "name": "MACAddress", "type": "string", "value": "d0:76:8f:46:41:82", "writable": false }, { "name": "MaxBitRate", "type": "string", "value": "-1", "writable": true }, { "name": "DuplexMode", "type": "string", "value": "Full", "writable": true }, { "name": "X_000631_OnBatteryEnable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.4.Stats.", "parameters": [{ "name": "BytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ErrorsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ErrorsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnicastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnicastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DiscardPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DiscardPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MulticastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MulticastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BroadcastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BroadcastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "UnknownProtoPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.", "parameters": [{ "name": "DHCPServerConfigurable", "type": "boolean", "value": true, "writable": true }, { "name": "DHCPServerEnable", "type": "boolean", "value": true, "writable": true }, { "name": "MinAddress", "type": "string", "value": "192.168.1.100", "writable": true }, { "name": "MaxAddress", "type": "string", "value": "192.168.1.249", "writable": true }, { "name": "SubnetMask", "type": "string", "value": "255.255.255.0", "writable": true }, { "name": "DNSServers", "type": "string", "value": "", "writable": true }, { "name": "DomainName", "type": "string", "value": "home", "writable": true }, { "name": "X_000631_HostName", "type": "string", "value": "router", "writable": true }, { "name": "DHCPLeaseTime", "type": "int", "value": 43200, "writable": true }, { "name": "UseAllocatedWAN", "type": "string", "value": "Normal", "writable": true }, { "name": "X_000631_DHCPv6", "type": "string", "value": "server", "writable": true }, { "name": "X_000631_RA", "type": "string", "value": "server", "writable": true }, { "name": "X_000631_RAManagement", "type": "string", "value": "M-and-A", "writable": true }, { "name": "X_000631_IPv6DNSServers", "type": "string", "value": "", "writable": true }, { "name": "IPInterfaceNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "DHCPStaticAddressNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DHCPOptionNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DHCPConditionalPoolNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.IPInterface.1.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_IfName", "type": "string", "value": "br-lan", "writable": false }, { "name": "IPInterfaceIPAddress", "type": "string", "value": "192.168.1.1", "writable": true }, { "name": "IPInterfaceSubnetMask", "type": "string", "value": "255.255.255.0", "writable": true }, { "name": "IPInterfaceAddressingType", "type": "string", "value": "Static", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "Up", "writable": false }, { "name": "BSSID", "type": "string", "value": "d0:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 112, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "80MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "CXNK008D1813", "writable": true }, { "name": "BeaconType", "type": "string", "value": "WPAand11i", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "AESEncryption", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "PSKAuthentication", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "AESEncryption", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "PSKAuthentication", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "36,52,100,132,149", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_AllPossibleChannels", "type": "string", "value": "20M:36,40,44,48,149,153,157,161;20M_dfs:36,40,44,48,52,56,60,64,100,104,108,112,132,136,149,153,157,161;40M:36,44,149,157;40M_dfs:36,44,52,60,100,108,132,149,157;80M:36,149;80M_dfs:36,52,100,132,149;160M_dfs:36,100;80_80M:auto;80_80M_dfs:auto", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "d6:76:8f:46:41:83", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 11, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "20MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "1,2,3,4,5,6,7,8,9,10,11", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "da:76:8f:46:41:83", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 11, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "20MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "1,2,3,4,5,6,7,8,9,10,11", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "de:76:8f:46:41:83", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 11, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "20MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "1,2,3,4,5,6,7,8,9,10,11", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "e2:76:8f:46:41:83", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 11, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "20MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "1,2,3,4,5,6,7,8,9,10,11", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "e6:76:8f:46:41:83", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 11, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "20MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "1,2,3,4,5,6,7,8,9,10,11", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "ea:76:8f:46:41:83", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 11, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "20MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "1,2,3,4,5,6,7,8,9,10,11", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "ee:76:8f:46:41:83", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 11, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "20MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "1,2,3,4,5,6,7,8,9,10,11", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.17.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "12:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "160MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "RESERVED-6G-8D1813", "writable": true }, { "name": "BeaconType", "type": "string", "value": "WPA3", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "AESEncryption", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "SAEAuthentication", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "37,69,101,133,165,197", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_AllPossibleChannels", "type": "string", "value": "80M:37,53,69,85,101,117,133,149,165,181,197,213;160M:37,69,101,133,165,197", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": true, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.17.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.17.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.18.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "16:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "160MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "37,69,101,133,165,197", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": true, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.18.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.18.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.19.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "1a:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "160MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "37,69,101,133,165,197", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": true, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.19.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.19.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "d6:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 112, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "80MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "36,52,100,132,149", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.20.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "1e:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "160MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "37,69,101,133,165,197", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": true, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.20.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.20.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.21.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "22:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "160MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "37,69,101,133,165,197", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": true, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.21.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.21.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.22.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "26:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "160MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "6", "writable": true }, { "name": "BeaconType", "type": "string", "value": "WPA3", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "AESEncryption", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "SAEAuthentication", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "37,69,101,133,165,197", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": false, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": true, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.22.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.22.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.23.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "2a:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "160MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "37,69,101,133,165,197", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": true, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.23.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.23.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.24.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "2e:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "160MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "37,69,101,133,165,197", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": true, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.24.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.24.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "da:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 112, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "80MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "36,52,100,132,149", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "de:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 112, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "80MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "36,52,100,132,149", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "e2:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 112, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "80MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "36,52,100,132,149", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "Up", "writable": false }, { "name": "BSSID", "type": "string", "value": "e6:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 112, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "80MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "5GHz_IPTV_SSID8D1813", "writable": true }, { "name": "BeaconType", "type": "string", "value": "11i", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "AESEncryption", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "PSKAuthentication", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "36,52,100,132,149", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": false, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "ea:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 112, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "80MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "36,52,100,132,149", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "BSSID", "type": "string", "value": "ee:76:8f:46:41:84", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 112, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "80MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "", "writable": true }, { "name": "BeaconType", "type": "string", "value": "Basic", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "None", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "None", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "36,52,100,132,149", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "Up", "writable": false }, { "name": "BSSID", "type": "string", "value": "d0:76:8f:46:41:83", "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 11, "writable": true }, { "name": "AutoChannelEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_OperatingChannelBandwidth", "type": "string", "value": "20MHz", "writable": true }, { "name": "SSID", "type": "string", "value": "CXNK008D1813", "writable": true }, { "name": "BeaconType", "type": "string", "value": "WPAand11i", "writable": true }, { "name": "Standard", "type": "string", "value": "ax", "writable": true }, { "name": "BasicEncryptionModes", "type": "string", "value": "", "writable": true }, { "name": "BasicAuthenticationMode", "type": "string", "value": "", "writable": true }, { "name": "WPAEncryptionModes", "type": "string", "value": "AESEncryption", "writable": true }, { "name": "WPAAuthenticationMode", "type": "string", "value": "PSKAuthentication", "writable": true }, { "name": "IEEE11iEncryptionModes", "type": "string", "value": "AESEncryption", "writable": true }, { "name": "IEEE11iAuthenticationMode", "type": "string", "value": "PSKAuthentication", "writable": true }, { "name": "PossibleChannels", "type": "string", "value": "1,2,3,4,5,6,7,8,9,10,11", "writable": false }, { "name": "SSIDAdvertisementEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "RadioEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "TransmitPowerSupported", "type": "string", "value": "17,20,22,23,24,25,26,27,28,29", "writable": false }, { "name": "TransmitPower", "type": "unsignedInt", "value": 100, "writable": true }, { "name": "RegulatoryDomain", "type": "string", "value": "US", "writable": true }, { "name": "TotalAssociations", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": false }, { "name": "X_000631_AllPossibleChannels", "type": "string", "value": "20M:1,2,3,4,5,6,7,8,9,10,11;40M:1,2,3,4,5,6,7", "writable": false }, { "name": "X_000631_EnableDfsChannels", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableMUMIMO", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_EnableDCS", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_PSCOnly", "type": "boolean", "value": false, "writable": true }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.PreSharedKey.1.", "parameters": [{ "name": "KeyPassphrase", "type": "string", "value": "******", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.WPS.", "parameters": [{ "name": "X_000631_WpsStatus", "type": "string", "value": "Inactive", "writable": false }, { "name": "X_000631_PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANDevice.1.X_000631_ALG.1.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Protocol", "type": "string", "value": "SIP", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.LANInterfaces.", "parameters": [{ "name": "LANEthernetInterfaceNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "LANUSBInterfaceNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "LANWLANConfigurationNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.", "parameters": [{ "name": "MaxBridgeEntries", "type": "unsignedInt", "value": 10, "writable": false }, { "name": "MaxFilterEntries", "type": "unsignedInt", "value": 32, "writable": false }, { "name": "MaxAvailableInterfaceEntries", "type": "unsignedInt", "value": 32, "writable": false }, { "name": "BridgeNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "FilterNumberOfEntries", "type": "unsignedInt", "value": 30, "writable": false }, { "name": "AvailableInterfaceNumberOfEntries", "type": "unsignedInt", "value": 30, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.1.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.10.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 10, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.10", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.11.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 11, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.11", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.12.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 12, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.12", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.13.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 13, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.13", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.14.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 14, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.14", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.15.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 15, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.15", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.16.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 16, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.16", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.17.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 17, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.17", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.18.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 18, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.18", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.19.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 19, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.19", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.2.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 2, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.20.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 20, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.20", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.21.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 21, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.21", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.22.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 22, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.22", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.23.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 23, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.23", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.24.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 24, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.24", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.25.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 25, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.26.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 26, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.2", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.27.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 27, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.3", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.28.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 28, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.4", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.29.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 29, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "WANRouterConnection", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.3.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 3, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.3", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.30.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 30, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "WANRouterConnection", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.4.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 4, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.4", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.5.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 5, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.6.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 6, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.6", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.7.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 7, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.7", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.8.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 8, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.8", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }, { "name": "X_000631_SubscriberID", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.AvailableInterface.9.", "parameters": [{ "name": "AvailableInterfaceKey", "type": "unsignedInt", "value": 9, "writable": false }, { "name": "InterfaceType", "type": "string", "value": "LANInterface", "writable": false }, { "name": "InterfaceReference", "type": "string", "value": "InternetGatewayDevice.LANDevice.1.WLANConfiguration.9", "writable": false }, { "name": "X_000631_DhcpLeaseLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MvrProfile", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MaxStreams", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DropIPv6", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMap", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Bridge.1.", "parameters": [{ "name": "BridgeKey", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "BridgeEnable", "type": "boolean", "value": true, "writable": true }, { "name": "BridgeStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "BridgeName", "type": "string", "value": "lan", "writable": true }, { "name": "VLANID", "type": "int", "value": -1, "writable": true }, { "name": "X_000631_OUI_Enable", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_OUI_FilterList", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.1.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": 1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 1, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.10.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 10, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 10, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.11.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 11, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 11, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.12.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 12, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 12, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.13.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 13, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 13, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.14.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 14, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 14, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.15.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 15, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 15, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.16.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 16, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 16, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.17.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 17, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": 1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 17, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.18.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 18, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 18, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.19.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 19, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 19, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.2.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 2, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 2, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.20.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 20, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 20, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.21.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 21, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 21, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.22.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 22, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 22, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.23.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 23, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 23, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.24.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 24, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 24, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.25.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 25, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": 1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 25, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.26.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 26, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": 1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 26, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.27.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 27, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": 1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 27, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.28.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 28, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": 1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 28, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.29.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 29, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 29, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.3.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 3, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 3, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.30.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 30, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 30, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.4.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 4, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 4, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.5.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 5, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 5, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.6.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 6, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": 1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 6, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.7.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 7, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 7, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.8.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 8, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": false, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": -1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 8, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.Filter.9.", "parameters": [{ "name": "FilterKey", "type": "unsignedInt", "value": 9, "writable": false }, { "name": "FilterEnable", "type": "boolean", "value": true, "writable": true }, { "name": "FilterStatus", "type": "string", "value": "Disabled", "writable": false }, { "name": "FilterBridgeReference", "type": "int", "value": 1, "writable": true }, { "name": "FilterInterface", "type": "int", "value": 9, "writable": true }, { "name": "VLANIDFilter", "type": "int", "value": -1, "writable": true }, { "name": "EthertypeFilterList", "type": "string", "value": "", "writable": true }, { "name": "SourceMACAddressFilterList", "type": "string", "value": "", "writable": true }, { "name": "X_000631_PbitFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_TagAction", "type": "string", "value": "Null_Tag_Action", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer2Bridging.X_000631_IgmpGlobal.", "parameters": [{ "name": "QueryInterval", "type": "unsignedInt", "value": 125, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Layer3Forwarding.", "parameters": [{ "name": "DefaultConnectionService", "type": "string", "value": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1", "writable": true }, { "name": "ForwardNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_IPv6DefaultConnectionService", "type": "string", "value": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.ManagementServer.", "parameters": [{ "name": "EnableCWMP", "type": "boolean", "value": true, "writable": true }, { "name": "URL", "type": "string", "value": "https://gcs-stg.calix.com:8443/470053/xGRnyUyyOF", "writable": true }, { "name": "Username", "type": "string", "value": "tr069", "writable": true }, { "name": "Password", "type": "string", "value": "", "writable": true }, { "name": "PeriodicInformEnable", "type": "boolean", "value": true, "writable": true }, { "name": "PeriodicInformInterval", "type": "unsignedInt", "value": 86400, "writable": true }, { "name": "PeriodicInformTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": true }, { "name": "ParameterKey", "type": "string", "value": "635ba2518f08a236d66c19f6", "writable": false }, { "name": "ConnectionRequestURL", "type": "string", "value": "http://192.168.38.151:60002/Mmb8AuZz", "writable": false }, { "name": "ConnectionRequestUsername", "type": "string", "value": "admin", "writable": true }, { "name": "ConnectionRequestPassword", "type": "string", "value": "", "writable": true }, { "name": "UpgradesManaged", "type": "boolean", "value": false, "writable": true }, { "name": "DefaultActiveNotificationThrottle", "type": "unsignedInt", "value": 300, "writable": true }, { "name": "UDPConnectionRequestAddress", "type": "string", "value": "208.44.123.146:3033", "writable": false }, { "name": "UDPConnectionRequestAddressNotificationLimit", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "STUNEnable", "type": "boolean", "value": true, "writable": true }, { "name": "STUNServerAddress", "type": "string", "value": "stun-stg.calix.com", "writable": true }, { "name": "STUNServerPort", "type": "unsignedInt", "value": 3478, "writable": true }, { "name": "STUNUsername", "type": "string", "value": "", "writable": true }, { "name": "STUNPassword", "type": "string", "value": "", "writable": true }, { "name": "STUNMaximumKeepAlivePeriod", "type": "int", "value": 120, "writable": true }, { "name": "STUNMinimumKeepAlivePeriod", "type": "unsignedInt", "value": 40, "writable": true }, { "name": "NATDetected", "type": "boolean", "value": true, "writable": false }, { "name": "BootStrapped", "type": "boolean", "value": true, "writable": false }, { "name": "X_000631_LastSuccessfulPeriodicInformTime", "type": "dateTime", "value": "2022-10-28T18:36:42+09:00", "writable": false }, { "name": "X_000631_MgmtConnection", "type": "string", "value": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.", "writable": true }, { "name": "X_000631_IPVersion", "type": "string", "value": "unspecified", "writable": true }, { "name": "SupportedConnReqMethods", "type": "string", "value": "HTTP,STUN", "writable": false }, { "name": "AliasBasedAddressing", "type": "boolean", "value": true, "writable": false }, { "name": "InstanceMode", "type": "string", "value": "InstanceNumber", "writable": true }, { "name": "AutoCreateInstances", "type": "boolean", "value": false, "writable": true }, { "name": "CWMPRetryMinimumWaitInterval", "type": "unsignedInt", "value": 5, "writable": true }, { "name": "CWMPRetryIntervalMultiplier", "type": "unsignedInt", "value": 2000, "writable": true }, { "name": "ManageableDeviceNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.PeriodicStatistics.", "parameters": [{ "name": "MinSampleInterval", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "MaxReportSamples", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "SampleSetNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Security.", "parameters": [{ "name": "CertificateNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.", "parameters": [{ "name": "VoiceProfileNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "X_000631_ManagementProtocol", "type": "string", "value": "TR69", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.Capabilities.", "parameters": [{ "name": "MaxSessionCount", "type": "unsignedInt", "value": 3, "writable": true }, { "name": "SignalingProtocols", "type": "string", "value": "SIP,H.248,MGCP,X_000631_TDMGW", "writable": true }, { "name": "Regions", "type": "string", "value": "US,AU,NZ,XE,GB,CH,AE,ES,DE,IE", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.Capabilities.Codecs.1.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "Codec", "type": "string", "value": "G.711MuLaw", "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10,20,30", "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": true, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.Capabilities.Codecs.2.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 2, "writable": true }, { "name": "Codec", "type": "string", "value": "G.711ALaw", "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10,20,30", "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": true, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.Capabilities.Codecs.3.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 3, "writable": true }, { "name": "Codec", "type": "string", "value": "G.729", "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10,20,30", "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": true, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.PhyInterface.1.", "parameters": [{ "name": "PhyPort", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "X_000631_Enable", "type": "string", "value": "Enabled", "writable": true }, { "name": "X_000631_PotsHoldoverTime", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_LossOfSoftswitch", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.PhyInterface.2.", "parameters": [{ "name": "PhyPort", "type": "unsignedInt", "value": 2, "writable": true }, { "name": "X_000631_Enable", "type": "string", "value": "Enabled", "writable": true }, { "name": "X_000631_PotsHoldoverTime", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_LossOfSoftswitch", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.", "parameters": [{ "name": "Enable", "type": "string", "value": "Enabled", "writable": true }, { "name": "NumberOfLines", "type": "unsignedInt", "value": 2, "writable": false }, { "name": "Name", "type": "string", "value": "", "writable": true }, { "name": "X_000631_WANIPConnectionInstance", "type": "string", "value": "", "writable": true }, { "name": "SignalingProtocol", "type": "string", "value": "None", "writable": true }, { "name": "DTMFMethod", "type": "string", "value": "InBand", "writable": true }, { "name": "X_000631_HookFlashMethod", "type": "string", "value": "None", "writable": true }, { "name": "Region", "type": "string", "value": "US", "writable": true }, { "name": "DigitMap", "type": "string", "value": "911n|411|[2-9][0-9]{6}|1[2-9][0-9]{9}|011[0-9]*T|S[0-9]{2}", "writable": true }, { "name": "X_000631_DigitShortTimer", "type": "unsignedInt", "value": 4, "writable": true }, { "name": "X_000631_DigitLongTimer", "type": "unsignedInt", "value": 16, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.FaxT38.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.", "parameters": [{ "name": "Enable", "type": "string", "value": "Disabled", "writable": true }, { "name": "X_000631_RestartService", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "X_000631_HookStatus", "type": "string", "value": "Onhook", "writable": false }, { "name": "CallState", "type": "string", "value": "Idle", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.CallingFeatures.", "parameters": [{ "name": "CallerIDEnable", "type": "boolean", "value": true, "writable": true }, { "name": "CallWaitingEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_ThreewayCallingEnable", "type": "boolean", "value": true, "writable": true }, { "name": "CallTransferEnable", "type": "boolean", "value": true, "writable": true }, { "name": "MWIEnable", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_DirectConnectEnable", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_DirectConnectTimer", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DirectConnectNumber", "type": "string", "value": "", "writable": true }, { "name": "X_000631_CallWaitingTonePrefix", "type": "string", "value": "CallWaitingTone", "writable": true }, { "name": "X_000631_DistinctiveRingPrefix", "type": "string", "value": "Bellcore-dr", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.Codec.List.1.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10", "writable": true }, { "name": "Priority", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.Codec.List.2.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 2, "writable": true }, { "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10", "writable": true }, { "name": "Priority", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.Codec.List.3.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 3, "writable": true }, { "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10", "writable": true }, { "name": "Priority", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.MGCP.", "parameters": [{ "name": "X_000631_GR303", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.SIP.", "parameters": [{ "name": "AuthUserName", "type": "string", "value": "", "writable": true }, { "name": "AuthPassword", "type": "string", "value": "", "writable": true }, { "name": "URI", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.Session.1.", "parameters": [{ "name": "FarEndIPAddress", "type": "string", "value": "", "writable": false }, { "name": "FarEndUDPPort", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "LocalUDPPort", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.Session.2.", "parameters": [{ "name": "FarEndIPAddress", "type": "string", "value": "", "writable": false }, { "name": "FarEndUDPPort", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "LocalUDPPort", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.Stats.", "parameters": [{ "name": "ResetStatistics", "type": "boolean", "value": false, "writable": true }, { "name": "PacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_ComfortNoise", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsLost", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Underruns", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "IncomingCallsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "IncomingCallsConnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "IncomingCallsFailed", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_IncomingPeerDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_IncomingDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "OutgoingCallsAttempted", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "OutgoingCallsConnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "OutgoingCallsFailed", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_OutgoingPeerDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_OutgoingDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911CallsAttempted", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911CallsConnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911CallsFailed", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911PeerDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911Onhook", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_SIPRegisterRequested", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_SIPRegisterChallenged", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_SIPRegisterRejected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_SIPRegisterGranted", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_NtfyMessageWaiting", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_NtfyNoMessageWaiting", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_DHCPDiscovers", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_DHCPAcks", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_DHCPNacks", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_RTPPacketsDropouts", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_RTPPacketsSequenceErrors", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.VoiceProcessing.", "parameters": [{ "name": "TransmitGain", "type": "int", "value": -30, "writable": true }, { "name": "ReceiveGain", "type": "int", "value": -90, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.X_000631_H248.", "parameters": [{ "name": "TerminationId", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.1.X_000631_TdmGw.", "parameters": [{ "name": "Crv", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.", "parameters": [{ "name": "Enable", "type": "string", "value": "Disabled", "writable": true }, { "name": "X_000631_RestartService", "type": "boolean", "value": false, "writable": true }, { "name": "Status", "type": "string", "value": "Disabled", "writable": false }, { "name": "X_000631_HookStatus", "type": "string", "value": "Onhook", "writable": false }, { "name": "CallState", "type": "string", "value": "Idle", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.CallingFeatures.", "parameters": [{ "name": "CallerIDEnable", "type": "boolean", "value": true, "writable": true }, { "name": "CallWaitingEnable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_ThreewayCallingEnable", "type": "boolean", "value": true, "writable": true }, { "name": "CallTransferEnable", "type": "boolean", "value": true, "writable": true }, { "name": "MWIEnable", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_DirectConnectEnable", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_DirectConnectTimer", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_DirectConnectNumber", "type": "string", "value": "", "writable": true }, { "name": "X_000631_CallWaitingTonePrefix", "type": "string", "value": "CallWaitingTone", "writable": true }, { "name": "X_000631_DistinctiveRingPrefix", "type": "string", "value": "Bellcore-dr", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.Codec.List.1.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10", "writable": true }, { "name": "Priority", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.Codec.List.2.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 2, "writable": true }, { "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10", "writable": true }, { "name": "Priority", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.Codec.List.3.", "parameters": [{ "name": "EntryID", "type": "unsignedInt", "value": 3, "writable": true }, { "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "PacketizationPeriod", "type": "string", "value": "10", "writable": true }, { "name": "Priority", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "SilenceSuppression", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.MGCP.", "parameters": [{ "name": "X_000631_GR303", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.SIP.", "parameters": [{ "name": "AuthUserName", "type": "string", "value": "", "writable": true }, { "name": "AuthPassword", "type": "string", "value": "", "writable": true }, { "name": "URI", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.Session.1.", "parameters": [{ "name": "FarEndIPAddress", "type": "string", "value": "", "writable": false }, { "name": "FarEndUDPPort", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "LocalUDPPort", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.Session.2.", "parameters": [{ "name": "FarEndIPAddress", "type": "string", "value": "", "writable": false }, { "name": "FarEndUDPPort", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "LocalUDPPort", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.Stats.", "parameters": [{ "name": "ResetStatistics", "type": "boolean", "value": false, "writable": true }, { "name": "PacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_ComfortNoise", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsLost", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Underruns", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "IncomingCallsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "IncomingCallsConnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "IncomingCallsFailed", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_IncomingPeerDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_IncomingDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "OutgoingCallsAttempted", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "OutgoingCallsConnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "OutgoingCallsFailed", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_OutgoingPeerDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_OutgoingDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911CallsAttempted", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911CallsConnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911CallsFailed", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911PeerDisconnected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_911Onhook", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_SIPRegisterRequested", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_SIPRegisterChallenged", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_SIPRegisterRejected", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_SIPRegisterGranted", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_NtfyMessageWaiting", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_NtfyNoMessageWaiting", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_DHCPDiscovers", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_DHCPAcks", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_DHCPNacks", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_RTPPacketsDropouts", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_RTPPacketsSequenceErrors", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.VoiceProcessing.", "parameters": [{ "name": "TransmitGain", "type": "int", "value": -30, "writable": true }, { "name": "ReceiveGain", "type": "int", "value": -90, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.X_000631_H248.", "parameters": [{ "name": "TerminationId", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.Line.2.X_000631_TdmGw.", "parameters": [{ "name": "Crv", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.MGCP.", "parameters": [{ "name": "CallAgent1", "type": "string", "value": "", "writable": true }, { "name": "CallAgent2", "type": "string", "value": "", "writable": true }, { "name": "X_000631_TermPrefix", "type": "string", "value": "aaln", "writable": true }, { "name": "X_000631_FlashHookPersist", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_OnHookPersist", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_OffHookPersist", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_SwitchType", "type": "string", "value": "GENERIC", "writable": true }, { "name": "RetranIntervalTimer", "type": "unsignedInt", "value": 1, "writable": true }, { "name": "X_000631_RetryTimeout", "type": "unsignedInt", "value": 30, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.RTP.", "parameters": [{ "name": "LocalPortMin", "type": "unsignedInt", "value": 49152, "writable": true }, { "name": "LocalPortMax", "type": "unsignedInt", "value": 49152, "writable": true }, { "name": "DSCPMark", "type": "unsignedInt", "value": 46, "writable": true }, { "name": "X_000631_DOTP", "type": "unsignedInt", "value": 6, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.SIP.", "parameters": [{ "name": "ProxyServer", "type": "string", "value": "", "writable": true }, { "name": "ProxyServerPort", "type": "unsignedInt", "value": 5060, "writable": true }, { "name": "X_000631_ProxyServerSecondary", "type": "string", "value": "", "writable": true }, { "name": "X_000631_ProxyServerPortSecondary", "type": "unsignedInt", "value": 5060, "writable": true }, { "name": "X_000631_DnsPrimary", "type": "string", "value": "", "writable": true }, { "name": "X_000631_DnsSecondary", "type": "string", "value": "", "writable": true }, { "name": "UserAgentDomain", "type": "string", "value": "", "writable": true }, { "name": "RegistrationPeriod", "type": "unsignedInt", "value": 3600, "writable": true }, { "name": "TimerT1", "type": "unsignedInt", "value": 500, "writable": true }, { "name": "TimerT2", "type": "unsignedInt", "value": 4000, "writable": true }, { "name": "X_000631_ReleaseTimer", "type": "unsignedInt", "value": 10, "writable": true }, { "name": "X_000631_SoftSwitch", "type": "string", "value": "None", "writable": true }, { "name": "DSCPMark", "type": "unsignedInt", "value": 46, "writable": true }, { "name": "X_000631_RevertiveSwitching", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_OptionsInterval", "type": "unsignedInt", "value": 60, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_DhcpOptions.", "parameters": [{ "name": "Opt120PrimarySipServerIpAddr", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Opt120SecondarySipServerIpAddr", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Opt120PrimarySipServerFQDN", "type": "string", "value": "", "writable": false }, { "name": "Opt120SecondarySipServerFQDN", "type": "string", "value": "", "writable": false }, { "name": "Opt43CsipServerIpAddr", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Opt43VoiceVlanId", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Opt43PacketizationRate", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Opt43RegRetryTimer", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Opt43LocalPortMin", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_H248.", "parameters": [{ "name": "PrimaryGwController", "type": "string", "value": "", "writable": true }, { "name": "PrimaryGwSwitchType", "type": "string", "value": "GENERIC", "writable": true }, { "name": "SecondaryGwController", "type": "string", "value": "", "writable": true }, { "name": "SecondaryGwSwitchType", "type": "string", "value": "GENERIC", "writable": true }, { "name": "TermPrefix", "type": "string", "value": "TP", "writable": true }, { "name": "EphemeralTermId", "type": "string", "value": "RTP", "writable": true }, { "name": "ESAMode", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Services.VoiceService.1.VoiceProfile.1.X_000631_TdmGw.", "parameters": [{ "name": "ServerIp", "type": "string", "value": "", "writable": true }, { "name": "DhcpFilter", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.SoftwareModules.", "parameters": [{ "name": "ExecEnvNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "DeploymentUnitNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ExecutionUnitNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.Time.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "Synchronized", "writable": false }, { "name": "NTPServer1", "type": "string", "value": "0.openwrt.pool.ntp.org", "writable": true }, { "name": "NTPServer2", "type": "string", "value": "1.openwrt.pool.ntp.org", "writable": true }, { "name": "NTPServer3", "type": "string", "value": "2.openwrt.pool.ntp.org", "writable": true }, { "name": "NTPServer4", "type": "string", "value": "3.openwrt.pool.ntp.org", "writable": true }, { "name": "CurrentLocalTime", "type": "dateTime", "value": "2022-10-29T03:36:44+09:00", "writable": false }, { "name": "LocalTimeZoneName", "type": "string", "value": "JST-9", "writable": true }, { "name": "X_000631_ZoneName", "type": "string", "value": "Asia/Tokyo", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.TraceRouteDiagnostics.", "parameters": [{ "name": "DiagnosticsState", "type": "string", "value": "", "writable": true }, { "name": "Interface", "type": "string", "value": "", "writable": true }, { "name": "Host", "type": "string", "value": "", "writable": true }, { "name": "NumberOfTries", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "Timeout", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "DataBlockSize", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "DSCP", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "MaxHopCount", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "ResponseTime", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "RouteHopsNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.UDPEchoConfig.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": true }, { "name": "Interface", "type": "string", "value": "", "writable": true }, { "name": "SourceIPAddress", "type": "string", "value": "", "writable": true }, { "name": "UDPPort", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "EchoPlusEnabled", "type": "boolean", "value": false, "writable": true }, { "name": "EchoPlusSupported", "type": "boolean", "value": false, "writable": false }, { "name": "PacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsResponded", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "BytesResponded", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TimeFirstPacketReceived", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "TimeLastPacketReceived", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.UploadDiagnostics.", "parameters": [{ "name": "DiagnosticsState", "type": "string", "value": "", "writable": true }, { "name": "Interface", "type": "string", "value": "", "writable": true }, { "name": "UploadURL", "type": "string", "value": "", "writable": true }, { "name": "DSCP", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "EthernetPriority", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "TestFileLength", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "ROMTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "BOMTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "EOMTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TCPOpenRequestTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }, { "name": "TCPOpenResponseTime", "type": "dateTime", "value": "0001-01-01T00:00:00.000000Z", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.User.1.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "RemoteAccessCapable", "type": "boolean", "value": false, "writable": true }, { "name": "Username", "type": "string", "value": "admin", "writable": true }, { "name": "Password", "type": "string", "value": "ac3f52a8", "writable": true }, { "name": "X_000631_UserType", "type": "string", "value": "admin", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.User.2.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "RemoteAccessCapable", "type": "boolean", "value": true, "writable": true }, { "name": "Username", "type": "string", "value": "support", "writable": true }, { "name": "Password", "type": "string", "value": "ec3f52a8!5upporT", "writable": true }, { "name": "X_000631_UserType", "type": "string", "value": "support", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.UserInterface.", "parameters": [{ "name": "PasswordRequired", "type": "boolean", "value": true, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.UserInterface.RemoteAccess.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Port", "type": "unsignedInt", "value": 8080, "writable": true }, { "name": "Protocol", "type": "string", "value": "HTTP", "writable": true }, { "name": "SupportedProtocols", "type": "string", "value": "HTTP,HTTPS", "writable": false }, { "name": "X_000631_WhiteList", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_AuthNonce", "type": "string", "value": "980ac52d3711372285c81df52fd88725", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.", "parameters": [{ "name": "Alias", "type": "string", "value": "cpe-WANDevice_1", "writable": true }, { "name": "WANConnectionNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANCommonInterfaceConfig.", "parameters": [{ "name": "WANAccessType", "type": "string", "value": "Ethernet", "writable": false }, { "name": "PhysicalLinkStatus", "type": "string", "value": "Up", "writable": false }, { "name": "Layer1UpstreamMaxBitRate", "type": "unsignedInt", "value": 1000000000, "writable": false }, { "name": "Layer1DownstreamMaxBitRate", "type": "unsignedInt", "value": 1000000000, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.", "parameters": [{ "name": "Alias", "type": "string", "value": "cpe-WANConnectionDevice_1", "writable": true }, { "name": "WANIPConnectionNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }, { "name": "WANPPPConnectionNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_WANIPv6ConnectionNumberOfEntries", "type": "unsignedInt", "value": 1, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_ConnectionName", "type": "string", "value": "wan", "writable": false }, { "name": "Alias", "type": "string", "value": "cpe-WANIPConnection_1", "writable": true }, { "name": "ConnectionStatus", "type": "string", "value": "Connected", "writable": false }, { "name": "PossibleConnectionTypes", "type": "string", "value": "Unconfigured,IP_Routed,IP_Bridged", "writable": false }, { "name": "ConnectionType", "type": "string", "value": "IP_Routed", "writable": true }, { "name": "Name", "type": "string", "value": "wan", "writable": true }, { "name": "Uptime", "type": "unsignedInt", "value": 178284, "writable": false }, { "name": "LastConnectionError", "type": "string", "value": "ERROR_NONE", "writable": false }, { "name": "NATEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "AddressingType", "type": "string", "value": "DHCP", "writable": true }, { "name": "ExternalIPAddress", "type": "string", "value": "192.168.38.151", "writable": true }, { "name": "SubnetMask", "type": "string", "value": "255.255.255.0", "writable": true }, { "name": "DefaultGateway", "type": "string", "value": "192.168.38.1", "writable": true }, { "name": "DNSEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "DNSOverrideAllowed", "type": "boolean", "value": true, "writable": true }, { "name": "DNSServers", "type": "string", "value": "192.168.33.10,192.168.97.10", "writable": true }, { "name": "MaxMTUSize", "type": "unsignedInt", "value": 1500, "writable": false }, { "name": "MACAddress", "type": "string", "value": "d0:76:8f:46:41:7c", "writable": false }, { "name": "MACAddressOverride", "type": "boolean", "value": false, "writable": true }, { "name": "ShapingRate", "type": "int", "value": -1, "writable": false }, { "name": "X_000631_DsShapingRate", "type": "int", "value": -1, "writable": false }, { "name": "PortMappingNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_VlanMuxID", "type": "int", "value": -1, "writable": true }, { "name": "X_000631_VlanMux8021p", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_IGMPProxy", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Dscp2PbitMapEnabled", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_McastFilter", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_RPF", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_MACVLAN_Enable", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Remote_Access_Enable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.DHCPClient.", "parameters": [{ "name": "SentDHCPOptionNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.Stats.", "parameters": [{ "name": "EthernetBytesSent", "type": "unsignedInt", "value": 13547604, "writable": false }, { "name": "EthernetBytesReceived", "type": "unsignedInt", "value": 566572822, "writable": false }, { "name": "EthernetPacketsSent", "type": "unsignedInt", "value": 75404, "writable": false }, { "name": "EthernetPacketsReceived", "type": "unsignedInt", "value": 2094268, "writable": false }, { "name": "EthernetErrorsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetErrorsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetUnicastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetUnicastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetDiscardPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetDiscardPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetMulticastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetMulticastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetBroadcastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetBroadcastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetUnknownProtoPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Alias", "type": "string", "value": "cpe-X_000631_WANIPv6Connection_1", "writable": true }, { "name": "ConnectionStatus", "type": "string", "value": "Disconnected", "writable": false }, { "name": "LastConnectionError", "type": "string", "value": "ERROR_NONE", "writable": false }, { "name": "ConnectionType", "type": "string", "value": "IP_Routed", "writable": true }, { "name": "Name", "type": "string", "value": "wan6", "writable": true }, { "name": "Uptime", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_VlanMuxID", "type": "int", "value": -1, "writable": true }, { "name": "X_000631_VlanMux8021p", "type": "unsignedInt", "value": 0, "writable": true }, { "name": "X_000631_IPv6AddressingType", "type": "string", "value": "DHCP", "writable": true }, { "name": "X_000631_Dhcp6cForAddress", "type": "string", "value": "try", "writable": true }, { "name": "X_000631_Dhcp6cForPrefixDelegation", "type": "string", "value": "auto", "writable": true }, { "name": "X_000631_ExternalIPv6Address", "type": "string", "value": "", "writable": true }, { "name": "X_000631_DefaultIPv6Gateway", "type": "string", "value": "", "writable": true }, { "name": "X_000631_IPv6DNSEnabled", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_IPv6DNSOverrideAllowed", "type": "boolean", "value": true, "writable": true }, { "name": "X_000631_IPv6DNSServers", "type": "string", "value": "", "writable": true }, { "name": "X_000631_IPv6SitePrefix", "type": "string", "value": "", "writable": true }, { "name": "MaxMTUSize", "type": "unsignedInt", "value": 1500, "writable": false }, { "name": "MACAddress", "type": "string", "value": "d0:76:8f:46:41:7c", "writable": false }, { "name": "MACAddressOverride", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_Remote_Access_Enable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.X_000631_WANIPv6Connection.1.Stats.", "parameters": [{ "name": "EthernetBytesSent", "type": "unsignedInt", "value": 13547604, "writable": false }, { "name": "EthernetBytesReceived", "type": "unsignedInt", "value": 566572822, "writable": false }, { "name": "EthernetPacketsSent", "type": "unsignedInt", "value": 75404, "writable": false }, { "name": "EthernetPacketsReceived", "type": "unsignedInt", "value": 2094268, "writable": false }, { "name": "EthernetErrorsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetErrorsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetUnicastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetUnicastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetDiscardPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetDiscardPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetMulticastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetMulticastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetBroadcastPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetBroadcastPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "EthernetUnknownProtoPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANEthernetInterfaceConfig.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "Status", "type": "string", "value": "Up", "writable": false }, { "name": "MACAddress", "type": "string", "value": "d0:76:8f:46:41:7c", "writable": false }, { "name": "MaxBitRate", "type": "string", "value": "1000", "writable": false }, { "name": "X_000631_UpStreamMaxBitRate", "type": "string", "value": "1000", "writable": false }, { "name": "X_000631_DownStreamMaxBitRate", "type": "string", "value": "1000", "writable": false }, { "name": "DuplexMode", "type": "string", "value": "Full", "writable": false }, { "name": "ShapingRate", "type": "int", "value": 0, "writable": true }, { "name": "ShapingBurstSize", "type": "unsignedInt", "value": 0, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.WANDevice.1.WANEthernetInterfaceConfig.Stats.", "parameters": [{ "name": "BytesSent", "type": "unsignedInt", "value": 13547604, "writable": false }, { "name": "BytesReceived", "type": "unsignedInt", "value": 566572752, "writable": false }, { "name": "PacketsSent", "type": "unsignedInt", "value": 75404, "writable": false }, { "name": "PacketsReceived", "type": "unsignedInt", "value": 2094267, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.XMPP.", "parameters": [{ "name": "ConnectionNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Acl.", "parameters": [{ "name": "SipAcl", "type": "boolean", "value": false, "writable": true }, { "name": "RemoteAcl", "type": "boolean", "value": false, "writable": true }, { "name": "X_000631_AclNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_Acl6NumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_DNSHostMapping.1.", "parameters": [{ "name": "HostName", "type": "string", "value": "localhost", "writable": true }, { "name": "IPAddress", "type": "string", "value": "127.0.0.1", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.", "parameters": [{ "name": "OperationalMode", "type": "string", "value": "RG", "writable": false }, { "name": "Dscp2PbitMap", "type": "string", "value": "0000000010101010202020203030303040404040500000506000000070000000", "writable": true }, { "name": "RgOnBatteryEnable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.ExosMesh.", "parameters": [{ "name": "OperationalRole", "type": "string", "value": "Controller", "writable": false }, { "name": "WapBackhaul", "type": "string", "value": "N/A", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.ExosMesh.Stats.", "parameters": [{ "name": "TotalBytesSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalBytesReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsSent", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "TotalPacketsReceived", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PhyRateTx", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PhyRateRx", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "SignalStrength", "type": "int", "value": 0, "writable": false }, { "name": "MaxBitRate", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Channel", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.ExosMesh.WPS.", "parameters": [{ "name": "PushButton", "type": "boolean", "value": false, "writable": true }, { "name": "ConfigurationState", "type": "string", "value": "Not configured", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.ExosMesh.WapHostInfo.", "parameters": [{ "name": "Enable", "type": "boolean", "value": false, "writable": false }, { "name": "ConnectionStatus", "type": "string", "value": "Connected", "writable": false }, { "name": "Uptime", "type": "unsignedInt", "value": 181461, "writable": false }, { "name": "AddressingType", "type": "string", "value": "Static", "writable": false }, { "name": "ExternalIPAddress", "type": "string", "value": "192.168.1.1", "writable": false }, { "name": "SubnetMask", "type": "string", "value": "255.255.255.0", "writable": false }, { "name": "DefaultGateway", "type": "string", "value": "", "writable": false }, { "name": "DNSServers", "type": "string", "value": "", "writable": false }, { "name": "MACAddress", "type": "string", "value": "d0:76:8f:46:41:7f", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.GatewayInfo.", "parameters": [{ "name": "ManufacturerOUI", "type": "string", "value": "", "writable": false }, { "name": "SerialNumber", "type": "string", "value": "", "writable": false }, { "name": "ProductClass", "type": "string", "value": "", "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.SNMP.", "parameters": [{ "name": "MgmtConnection", "type": "string", "value": "", "writable": true }, { "name": "ROCommunity", "type": "string", "value": "public", "writable": true }, { "name": "RWCommunity", "type": "string", "value": "", "writable": true }, { "name": "SysName", "type": "string", "value": "", "writable": true }, { "name": "SysLocation", "type": "string", "value": "", "writable": true }, { "name": "SysContact", "type": "string", "value": "", "writable": true }, { "name": "TrapSink1", "type": "string", "value": "", "writable": true }, { "name": "TrapSink2", "type": "string", "value": "", "writable": true }, { "name": "TrapSink3", "type": "string", "value": "", "writable": true }, { "name": "TrapSink4", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.SysLog.", "parameters": [{ "name": "PrimaryServer", "type": "string", "value": "0.0.0.0", "writable": true }, { "name": "SecondaryServer", "type": "string", "value": "0.0.0.0", "writable": true }, { "name": "Facility", "type": "int", "value": 0, "writable": true }, { "name": "MgmtConnection", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.UpnpCfg.", "parameters": [{ "name": "Enable", "type": "boolean", "value": true, "writable": true }, { "name": "NATEnable", "type": "boolean", "value": true, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.WiFi.NeighboringWiFiDiagnostic.", "parameters": [{ "name": "DiagnosticsState", "type": "string", "value": "", "writable": true }, { "name": "ResultNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ChannelBusynessNumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.", "parameters": [{ "name": "ChannelUtilization", "type": "unsignedInt", "value": 50, "writable": false }, { "name": "ChannelInterferenceTime", "type": "unsignedInt", "value": 360, "writable": false }, { "name": "NoiseLevel", "type": "int", "value": -93, "writable": false }, { "name": "PacketsTransmittedUpstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsTransmittedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReTransmittedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsDroppedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.ChannelChangeLog.", "parameters": [{ "name": "NumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Sequence", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PollPeriod", "type": "unsignedInt", "value": 600, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.", "parameters": [{ "name": "ChannelUtilization", "type": "unsignedInt", "value": 30, "writable": false }, { "name": "ChannelInterferenceTime", "type": "unsignedInt", "value": 960, "writable": false }, { "name": "NoiseLevel", "type": "int", "value": -98, "writable": false }, { "name": "PacketsTransmittedUpstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsTransmittedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReTransmittedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsDroppedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.ChannelChangeLog.", "parameters": [{ "name": "NumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Sequence", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PollPeriod", "type": "unsignedInt", "value": 600, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.WiFi.Radio.3.", "parameters": [{ "name": "ChannelUtilization", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "ChannelInterferenceTime", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "NoiseLevel", "type": "int", "value": 0, "writable": false }, { "name": "PacketsTransmittedUpstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsTransmittedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsReTransmittedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PacketsDroppedDownstream", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "X_000631_AssociatedDeviceState", "type": "string", "value": "", "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_Device.WiFi.Radio.3.ChannelChangeLog.", "parameters": [{ "name": "NumberOfEntries", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "Sequence", "type": "unsignedInt", "value": 0, "writable": false }, { "name": "PollPeriod", "type": "unsignedInt", "value": 600, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_SecDmzHostCfg.", "parameters": [{ "name": "IPAddress", "type": "string", "value": "", "writable": true }, { "name": "Enable", "type": "boolean", "value": false, "writable": true }] }, { "writable": false, "objectPath": "InternetGatewayDevice.X_000631_System.", "parameters": [{ "name": "Conloglevel", "type": "unsignedInt", "value": 4, "writable": true }, { "name": "Cronloglevel", "type": "unsignedInt", "value": 5, "writable": true }, { "name": "Klogconloglevel", "type": "unsignedInt", "value": 4, "writable": true }, { "name": "Logfile", "type": "string", "value": "/var/log/messages", "writable": true }, { "name": "VendorFeatures", "type": "string", "value": "", "writable": true }] }], "modelName": "GS4220E", "createTime": "2022-10-28T09:36:40.644Z", "serialNumber": "CXNK008D1813", "softwareVersion": "22.4.500.320" };



export const featureProperties = {
    "modelName": "GS4227E",
    "dataModelName": "tr098",
    "opMode": "RG",
    "opRole": "Controller",
    "softwareVersion": "22.3.500.451",
    "properties": [
        {
            "featureName": "RadioAirtime2.4G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "ChannelUtilization",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ChannelInterferenceTime",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "WANInfo",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Name",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "Uptime",
                    "type": "Integer",
                    "writable": false,
                    "note": "Unit is second."
                },
                {
                    "name": "IPv6ConnectionStatus",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "MACAddress",
                    "type": "IPAddress",
                    "writable": false
                },
                {
                    "name": "DownstreamRate",
                    "type": "Integer",
                    "writable": false,
                    "note": "0 means Not Limited. Unit is Kbps."
                },
                {
                    "name": "UpstreamRate",
                    "type": "Integer",
                    "writable": false,
                    "note": "Unit is Kbps."
                },
                {
                    "name": "VlanID",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "VlanPriority",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "IPv6AddressingType",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "ConnectionType",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "DefaultIPv6Gateway",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "IPv6DNSServer",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "ExternalIPv6Address",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "IANA",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "GRP",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "BytesReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "BytesSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "AutoChannel6G",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true
            }
        },
        {
            "featureName": "RadioAirtime5G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "ChannelUtilization",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ChannelInterferenceTime",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "WpsStateBackhaul",
            "resultType": "Object",
            "fields": [
                {
                    "name": "State",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SSID14",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "LanPort",
            "resultType": "IndexArray",
            "fields": [
                {
                    "name": "Name",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "AdminStatus",
                    "type": "Boolean",
                    "writable": false,
                    "note": "Value true for 'Up' and false for 'Down'"
                },
                {
                    "name": "Operational",
                    "type": "String",
                    "writable": false,
                    "note": "Value 'Up' for 'Connected' and 'NoLink' for 'Disconnected'"
                },
                {
                    "name": "MACAddress",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "MaxBitRate",
                    "type": "Integer",
                    "writable": false,
                    "note": "Value 'Auto' or '-1' for 'Auto'",
                    "unit": "Mbps"
                },
                {
                    "name": "DuplexMode",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SSID15",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID12",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID13",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID10",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID11",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SignalingProtocol",
            "resultType": "Object",
            "fields": [
                {
                    "name": "SignalingProtocol",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SplitWan",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "WanAccessTypeOptions",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true,
                "valueList": [
                    "GPON",
                    "XGSPON",
                    "CopperEthernet"
                ]
            }
        },
        {
            "featureName": "HistoricalRadioAirtime",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "RouterTemperature",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "PortMapping",
            "resultType": "IndexArray",
            "dimensions": 1,
            "fields": [
                {
                    "name": "PortMappingEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "PortMappingDescription",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "InternalClient",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "ExternalPort",
                    "type": "Integer",
                    "writable": true
                },
                {
                    "name": "ExternalPortEnd",
                    "type": "Integer",
                    "writable": true
                },
                {
                    "name": "InternalPort",
                    "type": "Integer",
                    "writable": true
                },
                {
                    "name": "PortMappingProtocol",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DeviceLog",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SiteScan",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "WpsState2.4G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "State",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "OpModeOptions",
            "resultType": "RawConfiguration",
            "configuration": {
                "RG": {
                    "writable": false
                },
                "WAP": {
                    "writable": false
                }
            }
        },
        {
            "featureName": "SSID3",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID4",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID5",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID6",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID7",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "WpsStateIptv",
            "resultType": "Object",
            "fields": [
                {
                    "name": "State",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SSID8",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID9",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "LanHosts",
            "resultType": "Array",
            "dimensions": 1,
            "fields": [
                {
                    "name": "HostName",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "HostNameAlias",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "IPAddress",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "MACAddress",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "InterfaceType",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "AddressSource",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "LeaseTimeRemaining",
                    "type": "Integer",
                    "writable": false,
                    "unit": "Timestamp"
                },
                {
                    "name": "Icon",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Active",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "AccessPoint",
                    "type": "String"
                }
            ]
        },
        {
            "featureName": "AutoChannel2.4G",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true
            }
        },
        {
            "featureName": "SSID23",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID24",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID21",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID22",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DHCPv6",
            "resultType": "Object",
            "fields": [
                {
                    "name": "RAService",
                    "type": "String",
                    "valueList": [
                        "server",
                        "disabled"
                    ],
                    "writable": true
                },
                {
                    "name": "DHCPv6Service",
                    "type": "String",
                    "valueList": [
                        "server",
                        "disabled"
                    ],
                    "writable": true
                },
                {
                    "name": "DHCPv6Mode",
                    "type": "String",
                    "valueList": [
                        "A-flag",
                        "M-and-A",
                        "M-flag"
                    ],
                    "writable": true
                },
                {
                    "name": "IPv6DNSServers",
                    "type": "String",
                    "writable": true,
                    "note": "Primary DNS server and secondary DNS server are separated by ','."
                }
            ]
        },
        {
            "featureName": "SSID1",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID2",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID20",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID18",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID19",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SSID16",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "BasicEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "BasicAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "WPAAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DataModel",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SSID17",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "SSID",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SSIDAdvertisementEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "WPA3"
                    ],
                    "writable": true
                },
                {
                    "name": "IEEE11iEncryptionModes",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "IEEE11iAuthenticationMode",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "KeyPassphrase",
                    "type": "String",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "Ping",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "WpsState5G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "State",
                    "type": "String",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SecurityOptions",
            "resultType": "RawConfiguration",
            "configuration": {
                "WPA2-PSK": {
                    "BeaconType": "11i",
                    "IEEE11iEncryptionModes": [
                        "AESEncryption"
                    ],
                    "IEEE11iAuthenticationMode": "PSKAuthentication"
                },
                "WPA3-PSK": {
                    "BeaconType": "WPA3",
                    "IEEE11iEncryptionModes": [
                        "AESEncryption"
                    ],
                    "IEEE11iAuthenticationMode": "SAEAuthentication"
                },
                "SecurityOff": {
                    "BeaconType": "Basic",
                    "BasicEncryptionModes": "None",
                    "BasicAuthenticationMode": "None"
                },
                "WPA/WPA2-PSK": {
                    "BeaconType": "WPAand11i",
                    "WPAEncryptionModes": [
                        "AESEncryption"
                    ],
                    "WPAAuthenticationMode": "PSKAuthentication",
                    "IEEE11iEncryptionModes": [
                        "AESEncryption"
                    ],
                    "IEEE11iAuthenticationMode": "PSKAuthentication"
                },
                "WPA2/WPA3-PSK": {
                    "BeaconType": "11iandWPA3",
                    "IEEE11iEncryptionModes": [
                        "AESEncryption"
                    ],
                    "IEEE11iAuthenticationMode": "SAEandPSKAuthentication"
                }
            }
        },
        {
            "featureName": "PrimarySSID5GState",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                }
            ]
        },
        {
            "featureName": "SteeringEvent",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "RadioStatistics2.4G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "NoiseLevel",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReTransmittedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsDroppedDownstream",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "RadioStatus5G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "NoiseLevel",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReTransmittedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsDroppedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "MUMIMO",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "RadioEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "Mode",
                    "type": "String",
                    "valueList": [
                        {
                            "value": "n",
                            "displayName": "802.11n Only"
                        },
                        {
                            "value": "ac",
                            "displayName": "802.11ac and 802.11n"
                        },
                        {
                            "value": "ax",
                            "displayName": "802.11ax, 802.11ac and 802.11n"
                        }
                    ],
                    "writable": true
                },
                {
                    "name": "Bandwidth",
                    "type": "String",
                    "valueList": {
                        "n": [
                            "20MHz",
                            "40MHz"
                        ],
                        "ac": [
                            "20MHz",
                            "40MHz",
                            "80MHz"
                        ],
                        "ax": [
                            "20MHz",
                            "40MHz",
                            "80MHz"
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "Channel",
                    "type": "String",
                    "valueList": {
                        "dfsEnabled": {
                            "20MHz": [
                                36,
                                40,
                                44,
                                48,
                                52,
                                56,
                                60,
                                64,
                                100,
                                104,
                                108,
                                112,
                                132,
                                136,
                                149,
                                153,
                                157,
                                161
                            ],
                            "40MHz": [
                                36,
                                44,
                                52,
                                60,
                                100,
                                108,
                                132,
                                149,
                                157
                            ],
                            "80MHz": [
                                36,
                                52,
                                100,
                                132,
                                149
                            ]
                        },
                        "dfsDisabled": {
                            "20MHz": [
                                36,
                                40,
                                44,
                                48,
                                149,
                                153,
                                157,
                                161
                            ],
                            "40MHz": [
                                36,
                                44,
                                149,
                                157
                            ],
                            "80MHz": [
                                36,
                                149
                            ]
                        }
                    },
                    "writable": true
                },
                {
                    "name": "AutoChannelEnable",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "PowerLevel",
                    "type": "Integer",
                    "valueList": [
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70,
                        80,
                        90,
                        100
                    ],
                    "writable": true
                },
                {
                    "name": "DFS",
                    "type": "Boolean",
                    "writable": true,
                    "note": "Should be unwritable if RegulatoryDomain is GY"
                }
            ]
        },
        {
            "featureName": "RadioStatistics6G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "MUMIMO",
                    "type": "Boolean",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "UpgradeSoftware",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "SpeedTest",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "TraceRoute",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "UPnP",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "NATEnable",
                    "type": "Boolean",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DownstreamReport",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "RadioStatus6G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "MUMIMO",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "RadioEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "Mode",
                    "type": "String",
                    "valueList": [
                        {
                            "value": "ax",
                            "displayName": "802.11ax, 802.11ac and 802.11n"
                        }
                    ],
                    "writable": true
                },
                {
                    "name": "Bandwidth",
                    "type": "String",
                    "valueList": {
                        "ax": [
                            "80MHz",
                            "160MHz"
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "Channel",
                    "type": "String",
                    "valueList": {
                        "80MHz": [
                            37,
                            53,
                            69,
                            85,
                            101,
                            117,
                            133,
                            149,
                            165,
                            181,
                            197,
                            213
                        ],
                        "160MHz": [
                            37,
                            69,
                            101,
                            133,
                            165,
                            197
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "AutoChannelEnable",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "PowerLevel",
                    "type": "Integer",
                    "valueList": [
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70,
                        80,
                        90,
                        100
                    ],
                    "writable": true
                },
                {
                    "name": "PSCOnly",
                    "type": "Boolean",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "BackupRestore",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "RemoteAccessGui",
            "resultType": "RawConfiguration",
            "configuration": {
                "needTimer": true,
                "formElement": {
                    "auth": "auth",
                    "nonce": "nonce",
                    "username": "Username"
                },
                "urlAppendix": "/login.cgi"
            }
        },
        {
            "featureName": "AutoChannel5G",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true
            }
        },
        {
            "featureName": "RadioStatus2.4G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "RadioEnabled",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "Mode",
                    "type": "String",
                    "valueList": [
                        {
                            "value": "n",
                            "displayName": "802.11n Only"
                        },
                        {
                            "value": "ng",
                            "displayName": "802.11n and 802.11g"
                        },
                        {
                            "value": "ax",
                            "displayName": "802.11ax, 802.11n and 802.11g"
                        }
                    ],
                    "writable": true
                },
                {
                    "name": "Bandwidth",
                    "type": "String",
                    "valueList": {
                        "n": [
                            "20MHz",
                            "40MHz"
                        ],
                        "ax": [
                            "20MHz",
                            "40MHz"
                        ],
                        "ng": [
                            "20MHz",
                            "40MHz"
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "Channel",
                    "type": "String",
                    "valueList": {
                        "20MHz": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11
                        ],
                        "40MHz": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7
                        ]
                    },
                    "writable": true
                },
                {
                    "name": "AutoChannelEnable",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "PowerLevel",
                    "type": "Integer",
                    "valueList": [
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70,
                        80,
                        90,
                        100
                    ],
                    "writable": true
                },
                {
                    "name": "NoiseLevel",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReTransmittedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsDroppedDownstream",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "DHCP",
            "resultType": "Object",
            "fields": [
                {
                    "name": "DHCPServerEnable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "HostName",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "DomainName",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "DeviceIPAddress",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "BeginningIPAddress",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "EndingIPAddress",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "SubnetMask",
                    "type": "IPAddress",
                    "writable": true
                },
                {
                    "name": "DHCPLeaseTime",
                    "type": "Integer",
                    "writable": true,
                    "note": "-1 indicates an infinite lease.",
                    "unit": "s"
                },
                {
                    "name": "DNSServers",
                    "type": "string",
                    "writable": true,
                    "note": "Primary DNS server and secondary DNS server are separated by ','."
                }
            ]
        },
        {
            "featureName": "Reboot",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true,
                "execTimeout": 600
            }
        },
        {
            "featureName": "Firewall",
            "resultType": "Object",
            "fields": [
                {
                    "name": "StealthMode",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "InValue",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "OutValue",
                    "type": "String",
                    "writable": true
                },
                {
                    "name": "SecurityLevel",
                    "type": "String",
                    "valueList": [
                        {
                            "value": "High",
                            "displayName": "High"
                        },
                        {
                            "value": "X_000631_Medium",
                            "displayName": "Medium"
                        },
                        {
                            "value": "Low",
                            "displayName": "Low"
                        },
                        {
                            "value": "Off",
                            "displayName": "Off"
                        }
                    ],
                    "writable": true
                }
            ]
        },
        {
            "featureName": "DMZ",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "IPAddress",
                    "type": "IPAddress",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "ChannelChangeLogs2.4G",
            "resultType": "Array",
            "dimensions": 1,
            "fields": [
                {
                    "name": "TimeStamp",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ReasonCode",
                    "type": "Binary",
                    "writable": false
                },
                {
                    "name": "NewChannel",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "IptvState",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": true
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                }
            ]
        },
        {
            "featureName": "ChannelChangeLogs5G",
            "resultType": "Array",
            "dimensions": 1,
            "fields": [
                {
                    "name": "TimeStamp",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "ReasonCode",
                    "type": "Binary",
                    "writable": false
                },
                {
                    "name": "NewChannel",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "ConnectToDevice",
            "resultType": "Object",
            "fields": [
                {
                    "name": "IPAddress",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Port",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Protocol",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Username",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Password",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Nonce",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "SSIDManager",
            "resultType": "DeviceCapability",
            "supported": true
        },
        {
            "featureName": "DeviceStatus",
            "resultType": "Object",
            "fields": [
                {
                    "name": "PeriodicInformEnable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "PeriodicInformInterval",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Uptime",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "RadioStatistics5G",
            "resultType": "Object",
            "fields": [
                {
                    "name": "NoiseLevel",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsReTransmittedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "PacketsDroppedDownstream",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "MUMIMO",
                    "type": "Boolean",
                    "writable": true
                }
            ]
        },
        {
            "featureName": "PrimarySSID2.4GState",
            "resultType": "Object",
            "fields": [
                {
                    "name": "Enable",
                    "type": "Boolean",
                    "writable": false
                },
                {
                    "name": "BeaconType",
                    "type": "String",
                    "valueList": [
                        "Basic",
                        "11i",
                        "WPAand11i",
                        "WPA3",
                        "11iandWPA3"
                    ],
                    "writable": true
                }
            ]
        },
        {
            "featureName": "VoiceStatus",
            "resultType": "Array",
            "dimensions": 1,
            "fields": [
                {
                    "name": "Status.Config",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Status.Service",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Status.Hook",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Status.Call",
                    "type": "String",
                    "writable": false
                },
                {
                    "name": "Stats.IncomingCalls.Attempts",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.IncomingCalls.Completions",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.IncomingCalls.Busy",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.IncomingCalls.PeerDisconnects",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.IncomingCalls.Disconnects",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.OutgoingCalls.Attempts",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.OutgoingCalls.Completions",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.OutgoingCalls.Busy",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.OutgoingCalls.PeerDisconnects",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.OutgoingCalls.Disconnects",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.EmergencyCalls.Attempts",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.EmergencyCalls.Completions",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.EmergencyCalls.Busy",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.EmergencyCalls.PeerDisconnects",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.EmergencyCalls.Disconnects",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.SIPStats.RegisterRequests",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.SIPStats.RegisterChallenges",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.SIPStats.RegisterRejects",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.SIPStats.RegisterGrants",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.SIPStats.NotifyWaiting",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.SIPStats.NotifyNoMsgs",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.RTPStats.PacketsSent",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.RTPStats.PacketsReceived",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.RTPStats.Errors.Missing",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.RTPStats.Errors.Underruns",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.DHCP.Discovers",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.DHCP.Acks",
                    "type": "Integer",
                    "writable": false
                },
                {
                    "name": "Stats.DHCP.Nacks",
                    "type": "Integer",
                    "writable": false
                }
            ]
        },
        {
            "featureName": "FactoryReset",
            "resultType": "RawConfiguration",
            "configuration": {
                "supported": true,
                "execTimeout": 600
            }
        }
    ]
};

export const Lanportdata: any =
{
    "1": {
        "Name": "eth0",
        "AdminStatus": "true",
        "Operational": "NoLink",
        "MACAddress": "48:77:46:9a:06:a2",
        "MaxBitRate": "10",
        "DuplexMode": "Half"
    },
    "2": {
        "Name": "eth1",
        "AdminStatus": "true",
        "Operational": "NoLink",
        "MACAddress": "48:77:46:9a:06:a3",
        "MaxBitRate": "10",
        "DuplexMode": "Half"
    }

}

export const dmgdata: any = [
    {
        "Enable": "true",
        "IPAddress": "192.168.2.128"
    }
]
export const softwareUpgradecount: any = [
    {
        "count": 1175
    }
]

export const postForwdingdata: any = [
    {
        "1": {
            "PortMappingEnabled": "true",
            "PortMappingDescription": "",
            "InternalClient": "192.168.1.133",
            "ExternalPort": "345",
            "ExternalPortEnd": "456",
            "InternalPort": "177",
            "PortMappingProtocol": "TCP"
        },
        "2": {
            "PortMappingEnabled": "true",
            "PortMappingDescription": "",
            "InternalClient": "192.168.1.133",
            "ExternalPort": "789",
            "ExternalPortEnd": "899",
            "InternalPort": "568",
            "PortMappingProtocol": "TCP"
        }
    }
]
export const softwareUpgradelistdata: any = [
    {
        "_id": "635fd70f8f084b3537106bfc",
        "name": "CALIX_800_12_2_12_8.bin",
        "size": 37106752,
        "type": "SW/FW Image",
        "orgId": "0",
        "models": [
            "844G-1",
            "844G-2",
            "854G-1",
            "854G-2",
            "844E-1",
            "844E-2",
            "844GE-1",
            "844GE-2",
            "812GH-1",
            "812GH-2",
            "813GH-1",
            "813GH-2",
            "818G"
        ],
        "version": "12.2.12.8.4",
        "password": "e3d1547",
        "username": "81a921f",
        "uploadTime": "2022-10-31T14:09:21.757Z",
        "description": "Calix Uploaded Release Image",
        "manufacturer": "Calix",
        "numberOfDownloads": 0,
        "uploadUrl": "http://gcs-stg.calix.com:8080/files/635fd70f8f084b3537106bfc",
        "isOfficialImageEligible": false,
        "isPublicImage": true,
        "isOfficialImage": false
    },
    {
        "_id": "630d6b4a8f082689ee9b6399",
        "name": "FullRel_SIGNED_EXOS_PH_R22.3.0.0.img",
        "size": 78424464,
        "type": "SW/FW Image",
        "orgId": "0",
        "models": [
            "GS4227W"
        ],
        "version": "22.3.0.0.34",
        "password": "dd5a917",
        "username": "ddafd67",
        "uploadTime": "2022-08-30T01:43:43.471Z",
        "description": "Calix Uploaded Release Image",
        "manufacturer": "Calix",
        "numberOfDownloads": 0,
        "uploadUrl": "http://gcs-stg.calix.com:8080/files/630d6b4a8f082689ee9b6399",
        "isOfficialImageEligible": true,
        "isPublicImage": true,
        "isOfficialImage": false
    }
]

export const event_history = [{ "_id": "f3befd6c-780b-44dc-96a2-3be2bf34f584", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-30T08:28:00.733Z" }, { "_id": "0f26eb23-ae9e-4bb9-a8de-904f07cc7a02", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-25T05:17:01.329Z" }, { "_id": "1c7a5b2d-175e-4f7c-9379-6d0f6edbf0cf", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-24T05:55:00.853Z" }, { "_id": "6e3cd2f1-507c-445a-9bf8-da0799b36882", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-23T05:55:00.569Z" }, { "_id": "b5842e7e-9044-42ae-9793-27cae452890c", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-22T05:55:00.565Z" }, { "_id": "76910a3c-a3cc-454a-af98-5e4a03e9111b", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-21T05:55:01.295Z" }, { "_id": "7d047df4-f023-4960-b876-2cdb774f89c5", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-20T05:55:00.877Z" }, { "_id": "da85f0f7-6212-4a2c-ba9d-12bdbd4f5390", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-19T05:55:00.797Z" }, { "_id": "a5eb8059-7967-4db9-bcf8-4645d45eddc6", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-18T05:55:00.602Z" }, { "_id": "efc924b9-a723-4b7c-af3c-5b4f65eeb377", "type": "SW Upgrade Skipped", "orgId": "125550", "source": "System", "details": { "reason": "No official image", "workflow": "Default Upgrade Scheduler" }, "deviceSn": "CXNK00300500", "severity": "Info", "timestamp": "2023-01-16T05:26:01.563Z" }];

export const comm_logs = [{ "_id": "2fe6cf39-a9ec-461d-be70-e3823b131047", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_RA": "server ( and 3 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[4]\"><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_RA</Name><Value xsi:type=\"xsd:string\">server</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_DHCPv6</Name><Value xsi:type=\"xsd:string\">server</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_RAManagement</Name><Value xsi:type=\"xsd:string\">M-and-A</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_IPv6DNSServers</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:20.411Z" }, { "_id": "9ec9e608-ce58-4b3b-a5e2-ec447e403de0", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_RA\" and 3 more" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[4]\"><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_RA</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_DHCPv6</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_RAManagement</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_IPv6DNSServers</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:20.371Z" }, { "_id": "1fa8c78c-ccaf-41db-8440-b0ef4c975cd6", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DHCPServerEnable": "true ( and 8 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[9]\"><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DHCPServerEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_HostName</Name><Value xsi:type=\"xsd:string\">router</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DomainName</Name><Value xsi:type=\"xsd:string\">home</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.IPInterface.1.IPInterfaceIPAddress</Name><Value xsi:type=\"xsd:string\">192.168.1.1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.MinAddress</Name><Value xsi:type=\"xsd:string\">192.168.1.100</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.MaxAddress</Name><Value xsi:type=\"xsd:string\">192.168.1.249</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.SubnetMask</Name><Value xsi:type=\"xsd:string\">255.255.255.0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DHCPLeaseTime</Name><Value xsi:type=\"xsd:int\">43200</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DNSServers</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:20.370Z" }, { "_id": "43b159d5-7802-4c8c-8c87-d4017d7ba485", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DHCPServerEnable\" and 8 more" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[9]\"><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DHCPServerEnable</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.X_000631_HostName</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DomainName</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.IPInterface.1.IPInterfaceIPAddress</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.MinAddress</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.MaxAddress</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.SubnetMask</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DHCPLeaseTime</string><string>InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.DNSServers</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:20.323Z" }, { "_id": "f305cd0a-6503-4c5d-b4eb-3d65b22537f5", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.ManagementServer.PeriodicInformEnable": "true ( and 2 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[3]\"><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.PeriodicInformEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.PeriodicInformInterval</Name><Value xsi:type=\"xsd:unsignedInt\">86400</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.DeviceInfo.UpTime</Name><Value xsi:type=\"xsd:unsignedInt\">3171023</Value></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:19.683Z" }, { "_id": "5c618eb8-3a01-43c5-997a-7b49806702c1", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.ManagementServer.PeriodicInformEnable\" and 2 more" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[3]\"><string>InternetGatewayDevice.ManagementServer.PeriodicInformEnable</string><string>InternetGatewayDevice.ManagementServer.PeriodicInformInterval</string><string>InternetGatewayDevice.DeviceInfo.UpTime</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:19.639Z" }, { "_id": "9b7d4766-612c-4503-9385-5d2717a65837", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.ManagementServer.EnableCWMP": "true ( and 33 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[34]\"><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.EnableCWMP</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.URL</Name><Value xsi:type=\"xsd:string\">http://gcs-devfunc.calix.com:8080/125550/FfjNGdWhoI</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.Username</Name><Value xsi:type=\"xsd:string\">acs-user-xJ1aA</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.Password</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.PeriodicInformEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.PeriodicInformInterval</Name><Value xsi:type=\"xsd:unsignedInt\">86400</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.PeriodicInformTime</Name><Value xsi:type=\"xsd:dateTime\">0001-01-01T00:00:00.000000Z</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.ParameterKey</Name><Value xsi:type=\"xsd:string\">63c836308f08014108b6bd2f</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.ConnectionRequestURL</Name><Value xsi:type=\"xsd:string\">http://10.132.1.164:60002/YQTWA8FU</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.ConnectionRequestUsername</Name><Value xsi:type=\"xsd:string\">admin</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.ConnectionRequestPassword</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.UpgradesManaged</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.DefaultActiveNotificationThrottle</Name><Value xsi:type=\"xsd:unsignedInt\">300</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.UDPConnectionRequestAddress</Name><Value xsi:type=\"xsd:string\">64.136.96.5:60494</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.UDPConnectionRequestAddressNotificationLimit</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.STUNEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.STUNServerAddress</Name><Value xsi:type=\"xsd:string\">stun-devfunc.calixcloud.com</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.STUNServerPort</Name><Value xsi:type=\"xsd:unsignedInt\">3478</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.STUNUsername</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.STUNPassword</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.STUNMaximumKeepAlivePeriod</Name><Value xsi:type=\"xsd:int\">120</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.STUNMinimumKeepAlivePeriod</Name><Value xsi:type=\"xsd:unsignedInt\">40</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.NATDetected</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.BootStrapped</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.X_000631_LastSuccessfulPeriodicInformTime</Name><Value xsi:type=\"xsd:dateTime\">2023-02-03T05:48:13-05:00</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.X_000631_MgmtConnection</Name><Value xsi:type=\"xsd:string\">InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.X_000631_IPVersion</Name><Value xsi:type=\"xsd:string\">unspecified</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.SupportedConnReqMethods</Name><Value xsi:type=\"xsd:string\">HTTP,STUN</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.AliasBasedAddressing</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.InstanceMode</Name><Value xsi:type=\"xsd:string\">InstanceNumber</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.AutoCreateInstances</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.CWMPRetryMinimumWaitInterval</Name><Value xsi:type=\"xsd:unsignedInt\">5</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.CWMPRetryIntervalMultiplier</Name><Value xsi:type=\"xsd:unsignedInt\">2000</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.ManageableDeviceNumberOfEntries</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:19.635Z" }, { "_id": "c7c952ff-c86e-4656-b805-85d8aebd2225", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.ManagementServer.\"" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[1]\"><string>InternetGatewayDevice.ManagementServer.</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:19.594Z" }, { "_id": "c1d69581-cdea-465d-b778-d0a836498b50", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Enable": "true ( and 79 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[80]\"><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Enable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID</Name><Value xsi:type=\"xsd:string\">CXNK00300500</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BeaconType</Name><Value xsi:type=\"xsd:string\">11i</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\">AESEncryption</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\">PSKAuthentication</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.SSID</Name><Value xsi:type=\"xsd:string\">5GHz_IPTV_SSID300500</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.BeaconType</Name><Value xsi:type=\"xsd:string\">11i</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\">AESEncryption</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\">PSKAuthentication</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:16.678Z" }, { "_id": "511540da-1c07-4df2-a12b-d820eb1b8ca3", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Enable\" and 79 more" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[80]\"><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.4.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.6.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.7.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.8.IEEE11iAuthenticationMode</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:16.626Z" }, { "_id": "9bcddea1-58a4-4233-963b-e22815bc43bb", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Enable": "true ( and 79 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[80]\"><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Enable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.SSID</Name><Value xsi:type=\"xsd:string\">CXNK00300500</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.BeaconType</Name><Value xsi:type=\"xsd:string\">11i</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\">AESEncryption</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\">PSKAuthentication</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.Enable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.SSID</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.SSIDAdvertisementEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.BeaconType</Name><Value xsi:type=\"xsd:string\">Basic</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.BasicEncryptionModes</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.BasicAuthenticationMode</Name><Value xsi:type=\"xsd:string\">None</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.WPAEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.WPAAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.IEEE11iEncryptionModes</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.IEEE11iAuthenticationMode</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:16.564Z" }, { "_id": "1b69bbc5-417a-4c28-a2b2-38367468ddd6", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Enable\" and 79 more" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[80]\"><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.10.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.11.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.12.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.13.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.14.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.15.IEEE11iAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.Enable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.SSID</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.SSIDAdvertisementEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.BeaconType</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.BasicEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.BasicAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.WPAEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.WPAAuthenticationMode</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.IEEE11iEncryptionModes</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.16.IEEE11iAuthenticationMode</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:16.515Z" }, { "_id": "afbb3d7f-d1f0-47af-a2e0-58f1e155de92", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.Layer2Bridging.Filter.1.FilterKey": "1 ( and 269 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[270]\"><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.FilterInterface</Name><Value xsi:type=\"xsd:int\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.1.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">2</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.FilterInterface</Name><Value xsi:type=\"xsd:int\">2</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.2.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">3</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.FilterInterface</Name><Value xsi:type=\"xsd:int\">3</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.3.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">4</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.FilterInterface</Name><Value xsi:type=\"xsd:int\">4</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.4.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">5</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.FilterInterface</Name><Value xsi:type=\"xsd:int\">5</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.5.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">6</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.FilterInterface</Name><Value xsi:type=\"xsd:int\">6</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.6.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">7</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.FilterInterface</Name><Value xsi:type=\"xsd:int\">7</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.7.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">8</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.FilterInterface</Name><Value xsi:type=\"xsd:int\">8</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.8.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">9</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.FilterInterface</Name><Value xsi:type=\"xsd:int\">9</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.9.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">10</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.FilterInterface</Name><Value xsi:type=\"xsd:int\">10</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.10.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">11</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.FilterInterface</Name><Value xsi:type=\"xsd:int\">11</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.11.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">12</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.FilterInterface</Name><Value xsi:type=\"xsd:int\">12</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.12.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">13</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.FilterInterface</Name><Value xsi:type=\"xsd:int\">13</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.13.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">14</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.FilterInterface</Name><Value xsi:type=\"xsd:int\">14</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.14.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">15</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.FilterInterface</Name><Value xsi:type=\"xsd:int\">15</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.15.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">16</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.FilterInterface</Name><Value xsi:type=\"xsd:int\">16</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.16.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">17</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.FilterInterface</Name><Value xsi:type=\"xsd:int\">17</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.17.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">18</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.FilterInterface</Name><Value xsi:type=\"xsd:int\">18</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.18.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">19</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.FilterInterface</Name><Value xsi:type=\"xsd:int\">19</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.19.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">20</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.FilterInterface</Name><Value xsi:type=\"xsd:int\">20</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.20.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">21</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.FilterInterface</Name><Value xsi:type=\"xsd:int\">21</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.21.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">22</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.FilterInterface</Name><Value xsi:type=\"xsd:int\">22</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.22.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">23</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.FilterInterface</Name><Value xsi:type=\"xsd:int\">23</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.23.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">24</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.FilterInterface</Name><Value xsi:type=\"xsd:int\">24</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.24.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">25</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.FilterInterface</Name><Value xsi:type=\"xsd:int\">25</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.25.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">26</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.FilterInterface</Name><Value xsi:type=\"xsd:int\">26</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.26.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.FilterKey</Name><Value xsi:type=\"xsd:unsignedInt\">27</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.FilterEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.FilterStatus</Name><Value xsi:type=\"xsd:string\">Disabled</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.FilterBridgeReference</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.FilterInterface</Name><Value xsi:type=\"xsd:int\">27</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.VLANIDFilter</Name><Value xsi:type=\"xsd:int\">-1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.EthertypeFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.SourceMACAddressFilterList</Name><Value xsi:type=\"xsd:string\"/></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.X_000631_PbitFilter</Name><Value xsi:type=\"xsd:unsignedInt\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.Layer2Bridging.Filter.27.X_000631_TagAction</Name><Value xsi:type=\"xsd:string\">Null_Tag_Action</Value></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:16.450Z" }, { "_id": "5105860d-d77d-4566-af19-914f3d996d2d", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.Layer2Bridging.Filter.\"" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[1]\"><string>InternetGatewayDevice.Layer2Bridging.Filter.</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:16.307Z" }, { "_id": "1dfa6fe9-1ff8-497f-bd2e-8883b14a644b", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RadioEnabled": "true ( and 15 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[16]\"><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RadioEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Standard</Name><Value xsi:type=\"xsd:string\">ax</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_OperatingChannelBandwidth</Name><Value xsi:type=\"xsd:string\">80MHz</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Channel</Name><Value xsi:type=\"xsd:unsignedInt\">36</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_AllPossibleChannels</Name><Value xsi:type=\"xsd:string\">20M:36,40,44,48,149,153,157,161;20M_dfs:36,40,44,48,52,56,60,64,100,104,108,112,132,136,149,153,157,161;40M:36,44,149,157;40M_dfs:36,44,52,60,100,108,132,149,157;80M:36,149;80M_dfs:36,52,100,132,149;160M_dfs:36,100;80_80M:auto;80_80M_dfs:auto</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AutoChannelEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.TransmitPower</Name><Value xsi:type=\"xsd:unsignedInt\">100</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_EnableDfsChannels</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RegulatoryDomain</Name><Value xsi:type=\"xsd:string\">US</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.RadioEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Standard</Name><Value xsi:type=\"xsd:string\">ax</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.X_000631_OperatingChannelBandwidth</Name><Value xsi:type=\"xsd:string\">20MHz</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Channel</Name><Value xsi:type=\"xsd:unsignedInt\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.AutoChannelEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.X_000631_AllPossibleChannels</Name><Value xsi:type=\"xsd:string\">20M:1,2,3,4,5,6,7,8,9,10,11;40M:1,2,3,4,5,6,7</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.TransmitPower</Name><Value xsi:type=\"xsd:unsignedInt\">100</Value></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:16.282Z" }, { "_id": "80e65bc9-1403-4de2-86f7-8fca822f601f", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RadioEnabled\" and 15 more" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[16]\"><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RadioEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Standard</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_OperatingChannelBandwidth</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Channel</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_AllPossibleChannels</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AutoChannelEnable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.TransmitPower</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_EnableDfsChannels</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RegulatoryDomain</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.RadioEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Standard</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.X_000631_OperatingChannelBandwidth</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Channel</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.AutoChannelEnable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.X_000631_AllPossibleChannels</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.TransmitPower</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:16.217Z" }, { "_id": "531a6690-b92a-46ba-abec-78845a4e6bf9", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RadioEnabled": "true ( and 26 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[27]\"><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RadioEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Standard</Name><Value xsi:type=\"xsd:string\">ax</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_OperatingChannelBandwidth</Name><Value xsi:type=\"xsd:string\">80MHz</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Channel</Name><Value xsi:type=\"xsd:unsignedInt\">36</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_AllPossibleChannels</Name><Value xsi:type=\"xsd:string\">20M:36,40,44,48,149,153,157,161;20M_dfs:36,40,44,48,52,56,60,64,100,104,108,112,132,136,149,153,157,161;40M:36,44,149,157;40M_dfs:36,44,52,60,100,108,132,149,157;80M:36,149;80M_dfs:36,52,100,132,149;160M_dfs:36,100;80_80M:auto;80_80M_dfs:auto</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AutoChannelEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.TransmitPower</Name><Value xsi:type=\"xsd:unsignedInt\">100</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_EnableDfsChannels</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RegulatoryDomain</Name><Value xsi:type=\"xsd:string\">US</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.NoiseLevel</Name><Value xsi:type=\"xsd:int\">-95</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.PacketsTransmittedDownstream</Name><Value xsi:type=\"xsd:unsignedInt\">317096</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.PacketsTransmittedUpstream</Name><Value xsi:type=\"xsd:unsignedInt\">634192</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.PacketsReTransmittedDownstream</Name><Value xsi:type=\"xsd:unsignedInt\">951288</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.PacketsDroppedDownstream</Name><Value xsi:type=\"xsd:unsignedInt\">1268384</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_EnableMUMIMO</Name><Value xsi:type=\"xsd:boolean\">0</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.RadioEnabled</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Standard</Name><Value xsi:type=\"xsd:string\">ax</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.X_000631_OperatingChannelBandwidth</Name><Value xsi:type=\"xsd:string\">20MHz</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Channel</Name><Value xsi:type=\"xsd:unsignedInt\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.AutoChannelEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.X_000631_AllPossibleChannels</Name><Value xsi:type=\"xsd:string\">20M:1,2,3,4,5,6,7,8,9,10,11;40M:1,2,3,4,5,6,7</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.TransmitPower</Name><Value xsi:type=\"xsd:unsignedInt\">100</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.NoiseLevel</Name><Value xsi:type=\"xsd:int\">-95</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.PacketsTransmittedDownstream</Name><Value xsi:type=\"xsd:unsignedInt\">634192</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.PacketsTransmittedUpstream</Name><Value xsi:type=\"xsd:unsignedInt\">1268384</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.PacketsReTransmittedDownstream</Name><Value xsi:type=\"xsd:unsignedInt\">1902576</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.PacketsDroppedDownstream</Name><Value xsi:type=\"xsd:unsignedInt\">2536768</Value></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:13.965Z" }, { "_id": "2e23d385-0961-4f6f-96f2-fb84da55cd46", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RadioEnabled\" and 26 more" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[27]\"><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RadioEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Standard</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_OperatingChannelBandwidth</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Channel</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_AllPossibleChannels</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AutoChannelEnable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.TransmitPower</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_EnableDfsChannels</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.RegulatoryDomain</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.NoiseLevel</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.PacketsTransmittedDownstream</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.PacketsTransmittedUpstream</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.PacketsReTransmittedDownstream</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.1.PacketsDroppedDownstream</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_000631_EnableMUMIMO</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.RadioEnabled</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Standard</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.X_000631_OperatingChannelBandwidth</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.Channel</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.AutoChannelEnable</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.X_000631_AllPossibleChannels</string><string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.9.TransmitPower</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.NoiseLevel</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.PacketsTransmittedDownstream</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.PacketsTransmittedUpstream</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.PacketsReTransmittedDownstream</string><string>InternetGatewayDevice.X_000631_Device.WiFi.Radio.2.PacketsDroppedDownstream</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:13.863Z" }, { "_id": "91fa1fba-1e75-4b79-97a0-84f4da11913d", "type": "GetParameterValuesResponse", "summary": { "InternetGatewayDevice.ManagementServer.PeriodicInformEnable": "true ( and 2 more parameters)" }, "xmlText": "<xml-fragment xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><ParameterList SOAP-ENC:arrayType=\"cwmp:ParameterValueStruct[3]\"><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.PeriodicInformEnable</Name><Value xsi:type=\"xsd:boolean\">1</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.ManagementServer.PeriodicInformInterval</Name><Value xsi:type=\"xsd:unsignedInt\">86400</Value></ParameterValueStruct><ParameterValueStruct><Name>InternetGatewayDevice.DeviceInfo.UpTime</Name><Value xsi:type=\"xsd:unsignedInt\">3171017</Value></ParameterValueStruct></ParameterList></xml-fragment>", "timestamp": "2023-02-03T10:48:13.718Z" }, { "_id": "5353f73c-6cf4-46ff-82a6-8e194565acd4", "type": "GetParameterValues", "summary": { "Parameter Name(s)": "\"InternetGatewayDevice.ManagementServer.PeriodicInformEnable\" and 2 more" }, "xmlText": "<cwmp:GetParameterValues xmlns:cwmp=\"urn:dslforum-org:cwmp-1-2\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\"><ParameterNames soapenc:arrayType=\"xsd:string[3]\"><string>InternetGatewayDevice.ManagementServer.PeriodicInformEnable</string><string>InternetGatewayDevice.ManagementServer.PeriodicInformInterval</string><string>InternetGatewayDevice.DeviceInfo.UpTime</string></ParameterNames></cwmp:GetParameterValues>", "timestamp": "2023-02-03T10:48:13.674Z" }];

export const octetDetail = { "status": "SUCCESS", "message": "<interfaces-state xmlns=\"urn:ietf:params:xml:ns:yang:ietf-interfaces\"><interface><name>32000005/x1</name><type xmlns:gpon-std=\"http://www.calix.com/ns/exa/gpon-interface-std\">gpon-std:ont-ethernet</type><admin-status>up</admin-status><oper-status>up</oper-status><last-change>2022-12-01T13:42:29-05:00</last-change><if-index>1065249</if-index><phys-address>00:00</phys-address><higher-layer-if>0</higher-layer-if><lower-layer-if>0</lower-layer-if><speed>10000000000</speed><statistics><discontinuity-time>2022-12-01T13:42:29-05:00</discontinuity-time><in-octets>7432</in-octets><in-unicast-pkts>7432</in-unicast-pkts><in-broadcast-pkts>7432</in-broadcast-pkts><in-multicast-pkts>7432</in-multicast-pkts><in-discards>7432</in-discards><in-errors>7432</in-errors><in-unknown-protos>0</in-unknown-protos><out-octets>7432</out-octets><out-unicast-pkts>7432</out-unicast-pkts><out-broadcast-pkts>7432</out-broadcast-pkts><out-multicast-pkts>7432</out-multicast-pkts><out-discards>0</out-discards><out-errors>7432</out-errors></statistics><ont-ethernet xmlns=\"http://www.calix.com/ns/exa/gpon-interface-std\"><status><port>x1</port><if-index>1065249</if-index><admin-state>enable</admin-state><oper-state>up</oper-state><module-state>present</module-state><hardware-type>TenGigabitEthernet</hardware-type><service-role>uni</service-role><last-up-time>2022-12-01 13:42:29.573281</last-up-time><last-down-time>2022-11-30 16:34:32.021629</last-down-time><last-clear-counters-time>never</last-clear-counters-time><duplex>full</duplex><mtu>1524</mtu><cfg-speed>auto</cfg-speed><oper-speed>10Gbs</oper-speed><max-speed>10Gbs</max-speed><loss-of-signal-alarm>clear</loss-of-signal-alarm></status><detail><oper-state>up</oper-state><power-state>ac-up</power-state><rate>10g</rate><duplex>full</duplex><mac-addr>00:00:00:00:00:00</mac-addr><rfc-2544-vlan>0</rfc-2544-vlan><oam-status>down</oam-status><efm-loopback-status>none</efm-loopback-status><mtu>1524</mtu><poe-power-detection-status>PSE disabled</poe-power-detection-status></detail><counters><onteth-counters><upstream-drop-events>7432</upstream-drop-events><upstream-errors>7432</upstream-errors><upstream-octets>7432</upstream-octets><upstream-packets>22296</upstream-packets><upstream-broadcast-packets>7432</upstream-broadcast-packets><upstream-multicast-packets>7432</upstream-multicast-packets><upstream-unicast-packets>7432</upstream-unicast-packets><upstream-oversize-packets>7432</upstream-oversize-packets><upstream-undersize-packets>7432</upstream-undersize-packets><downstream-octets>7432</downstream-octets><downstream-packets>22296</downstream-packets><downstream-broadcast-packets>7432</downstream-broadcast-packets><downstream-multicast-packets>7432</downstream-multicast-packets><downstream-unicast-packets>7432</downstream-unicast-packets><downstream-errors>7432</downstream-errors><downstream-oversize-packets>7432</downstream-oversize-packets><downstream-undersize-packets>7432</downstream-undersize-packets></onteth-counters></counters><module><module-status>present</module-status><module-type>SFP</module-type><identifier>SFP transceiver (3)</identifier><connector>LC (0x7)</connector><encoding>NRZ (3)</encoding><supplier-name>Calix, Inc.</supplier-name><supplier-part-number>100-424242</supplier-part-number><vendor-oui>00:00:00</vendor-oui><vendor-part-number>555-10234-C3    </vendor-part-number><vendor-revision>A   </vendor-revision><vendor-serial-number>141404100200    </vendor-serial-number><vendor-manufacture-date>04/04/2014</vendor-manufacture-date><vendor-name>OpticsRUs       </vendor-name><wave-length>1310 nm</wave-length><enhanced-options>RX_LOS; TX_FAULT; Optional Alarm/warn flags; (0xb0)</enhanced-options><transceiver>Unspecified (0x0)</transceiver><compliance-sonet>Unspecified (0/0)</compliance-sonet><compliance-ge>1000BASE-LX; (2)</compliance-ge><bit-rate>1300 Mbps</bit-rate><fiber-length-9-125-km>10 km</fiber-length-9-125-km><fiber-length-9-125>10000 m</fiber-length-9-125><fiber-length-50-125>0 m</fiber-length-50-125><fiber-length-62-5-125>0 m</fiber-length-62-5-125><copper-length>0 m</copper-length><cable-specification>N/A</cable-specification><signal-options>Loss of Signal; TX_FAULT; TX_DISABLE; (26);Unspecified (0)</signal-options><bit-rate-maximum>0 %</bit-rate-maximum><bit-rate-minimum>0 %</bit-rate-minimum><diagnostics-type>RX Pwr Measure AVG Pwr; Internally Calibrated; Implemented; (0x68)</diagnostics-type><sff8472-compliance>SFF-8472 Rev 10.2 (3)</sff8472-compliance><informational-text>this is a sim ont</informational-text></module><flow-counters><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>1</flow-id><pkts>53388</pkts><bytes>5015968</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>2</flow-id><pkts>96</pkts><bytes>10393</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>3</flow-id><pkts>153751</pkts><bytes>17592306</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>4</flow-id><pkts>1268</pkts><bytes>129336</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>10</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>11</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>15</flow-id><pkts>364688</pkts><bytes>38406337</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>1</flow-id><pkts>86747</pkts><bytes>10834246</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>2</flow-id><pkts>131</pkts><bytes>14063</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>3</flow-id><pkts>153800</pkts><bytes>15123776</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>4</flow-id><pkts>1279</pkts><bytes>130458</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>10</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>11</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>15</flow-id><pkts>476852</pkts><bytes>303597311</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index></flow-counters><l3-intf-counters><interface-counters><interface><if-name>32000005/x1</if-name><vlan>4000</vlan><c-vlan>6</c-vlan><rx-pkts>1311855</rx-pkts><rx-octets>487576213</rx-octets><tx-pkts>519793</tx-pkts><tx-octets>56134819</tx-octets></interface></interface-counters></l3-intf-counters><url-redirect><url-redirect-list><index>1</index><svlan>4000</svlan><cvlan>6</cvlan><status>disabled</status><rx-packets>0</rx-packets><tx-packets>0</tx-packets><dropped-packets>0</dropped-packets><redirected-http-requests>0</redirected-http-requests></url-redirect-list></url-redirect><vlan><vlan-id>4000</vlan-id><c-vlan><vlan-id>6</vlan-id><pppoe-ia><entry><pppoe-ia-stats><vlan>4000</vlan><num-active-sessions>0</num-active-sessions><num-all-sessions>0</num-all-sessions><rx-pkts>0</rx-pkts><rx-padi>0</rx-padi><rx-pado>0</rx-pado><rx-padr>0</rx-padr><rx-pads>0</rx-pads><rx-padt>0</rx-padt><rx-trust-vtagged>0</rx-trust-vtagged><rx-trust-unvtagged>0</rx-trust-unvtagged><rx-untrust-vtagged>0</rx-untrust-vtagged><rx-untrust-unvtagged>0</rx-untrust-unvtagged><rx-unknown-session>0</rx-unknown-session><rx-admin-disabled>0</rx-admin-disabled><rx-error>0</rx-error><rx-length-error>0</rx-length-error><rx-code-error>0</rx-code-error><rx-tag-error>0</rx-tag-error><rx-vtag-error>0</rx-vtag-error><rx-padi-error>0</rx-padi-error><rx-padr-error>0</rx-padr-error><rx-pado-error>0</rx-pado-error><rx-pads-error>0</rx-pads-error><rx-padt-error>0</rx-padt-error><rx-pad-unknown-error>0</rx-pad-unknown-error><tx-pkts>0</tx-pkts><tx-padi>0</tx-padi><tx-pado>0</tx-pado><tx-padr>0</tx-padr><tx-pads>0</tx-pads><tx-padt>0</tx-padt><tx-keep-vtag>0</tx-keep-vtag><tx-remove-vtag>0</tx-remove-vtag><tx-error>0</tx-error><tx-length-error>0</tx-length-error><tx-sid-error>0</tx-sid-error><tx-tag-error>0</tx-tag-error><tx-code-error>0</tx-code-error><tx-padi-error>0</tx-padi-error><tx-padr-error>0</tx-padr-error><tx-pado-error>0</tx-pado-error><tx-pads-error>0</tx-pads-error><tx-padt-error>0</tx-padt-error><tx-pad-unknown-error>0</tx-pad-unknown-error><resource-error>0</resource-error></pppoe-ia-stats></entry></pppoe-ia><flow-counters><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>1</flow-id><pkts>53388</pkts><bytes>5015968</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>2</flow-id><pkts>96</pkts><bytes>10393</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>3</flow-id><pkts>153751</pkts><bytes>17592306</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>4</flow-id><pkts>1268</pkts><bytes>129336</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>10</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>11</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>15</flow-id><pkts>364734</pkts><bytes>38417688</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>1</flow-id><pkts>86747</pkts><bytes>10834246</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>2</flow-id><pkts>131</pkts><bytes>14063</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>3</flow-id><pkts>153800</pkts><bytes>15123776</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>4</flow-id><pkts>1279</pkts><bytes>130458</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>10</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>11</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>15</flow-id><pkts>476897</pkts><bytes>303649065</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index></flow-counters><l3-intf-counters xmlns=\"http://www.calix.com/ns/exa/bng-std\"><interface-counters><rx-pkts>1311900</rx-pkts><rx-octets>487628743</rx-octets><tx-pkts>519834</tx-pkts><tx-octets>56148513</tx-octets></interface-counters></l3-intf-counters><subscriber xmlns=\"http://www.calix.com/ns/exa/bng-std\"><state><s-vlan-id>4000</s-vlan-id><c-vlan-id>6</c-vlan-id><state>ACTIVE-DEFAULT</state><mac-addr>02:06:00:30:05:00</mac-addr><first-sign-of-life>2022-10-20T14:13:00</first-sign-of-life><applied-policy-name>PM-100M-DO-DEF</applied-policy-name><multicast-service>DISABLED</multicast-service><multicast-service-state>INACTIVE</multicast-service-state><gx-function>ENABLED</gx-function><gx-session-state>INACTIVE</gx-session-state><accounting-function>ENABLED</accounting-function><allocated-ip-v4-addresses>10.132.1.164</allocated-ip-v4-addresses><last-deactivation-cause>DHCP lease expiry</last-deactivation-cause></state><ip-v4-session><ip-address><v4-address>10.132.1.164</v4-address><session-id>9570149217075200</session-id><session-state>IP-SESSION-ACTIVE</session-state><mac-addr>02:06:00:30:05:00</mac-addr><client-id>-</client-id><lease-time>1800</lease-time><address-allocation-timestamp>2023-02-06T07:36:10</address-allocation-timestamp><dhcp-lease-expiry-time>2023-02-06T08:06:10</dhcp-lease-expiry-time><default_gateway>10.132.0.1</default_gateway><domain-name>arjun.com</domain-name><accounting-session-state>INACTIVE</accounting-session-state><accounting-user-name>-</accounting-user-name></ip-address></ip-v4-session><statistics><dhcp><rx-dhcp-discover>18</rx-dhcp-discover><tx-dhcp-discover>11</tx-dhcp-discover><rx-dhcp-offer>11</rx-dhcp-offer><tx-dhcp-offer>11</tx-dhcp-offer><rx-dhcp-request>9688</rx-dhcp-request><rx-dhcp-request-discard>0</rx-dhcp-request-discard><tx-dhcp-request>9687</tx-dhcp-request><rx-dhcp-ack>9687</rx-dhcp-ack><tx-dhcp-ack>9687</tx-dhcp-ack><rx-dhcp-nack>0</rx-dhcp-nack><tx-dhcp-nack>1</tx-dhcp-nack><rx-dhcp-release>0</rx-dhcp-release><tx-dhcp-release>0</tx-dhcp-release></dhcp><dhcpv6><rx-dhcpv6-solicit>71166</rx-dhcpv6-solicit><tx-dhcpv6-solicit>0</tx-dhcpv6-solicit><rx-dhcpv6-advertise>0</rx-dhcpv6-advertise><tx-dhcpv6-advertise>0</tx-dhcpv6-advertise><rx-dhcpv6-request>0</rx-dhcpv6-request><tx-dhcpv6-request>0</tx-dhcpv6-request><rx-dhcpv6-reply>0</rx-dhcpv6-reply><tx-dhcpv6-reply>0</tx-dhcpv6-reply><rx-dhcpv6-release>0</rx-dhcpv6-release><tx-dhcpv6-release>0</tx-dhcpv6-release><rx-dhcpv6-renew>0</rx-dhcpv6-renew><tx-dhcpv6-renew>0</tx-dhcpv6-renew><rx-dhcpv6-rebind>0</rx-dhcpv6-rebind><tx-dhcpv6-rebind>0</tx-dhcpv6-rebind></dhcpv6><diameter><tx-policy-intimate-request>3</tx-policy-intimate-request><rx-policy-intimate-ack>0</rx-policy-intimate-ack><rx-policy-intimate-failure>0</rx-policy-intimate-failure><tx-policy-update-request>0</tx-policy-update-request><rx-policy-update-ack>0</rx-policy-update-ack><rx-policy-update-failure>0</rx-policy-update-failure><tx-policy-terminate-request>2</tx-policy-terminate-request><rx-policy-terminate-ack>0</rx-policy-terminate-ack></diameter><radius><tx-accounting-start-request>27963</tx-accounting-start-request><rx-accounting-start-response>0</rx-accounting-start-response><tx-counter-data-request>0</tx-counter-data-request><rx-counter-data-response>0</rx-counter-data-response><tx-accounting-stop-request>2</tx-accounting-stop-request><rx-accounting-stop-response>0</rx-accounting-stop-response><tx-accounting-interim-update-request>9692</tx-accounting-interim-update-request><rx-accounting-interim-update-response>0</rx-accounting-interim-update-response><tx-radius-auth-request>0</tx-radius-auth-request><rx-radius-auth-success>0</rx-radius-auth-success><rx-radius-auth-failure>0</rx-radius-auth-failure></radius><procedure><primary-v4-ip-session-activation-attempts>3</primary-v4-ip-session-activation-attempts><primary-static-v4-ip-session-activation-attempts>0</primary-static-v4-ip-session-activation-attempts><secondary-v4-ip-session-activation-attempts>0</secondary-v4-ip-session-activation-attempts><secondary-static-v4-ip-session-activation-attempts>0</secondary-static-v4-ip-session-activation-attempts><primary-v4-ip-session-activation-success>3</primary-v4-ip-session-activation-success><primary-static-v4-ip-session-activation-success>0</primary-static-v4-ip-session-activation-success><secondary-v4-ip-session-activation-success>0</secondary-v4-ip-session-activation-success><secondary-static-v4-ip-session-activation-success>0</secondary-static-v4-ip-session-activation-success><primary-v4-ip-session-activation-fail>0</primary-v4-ip-session-activation-fail><primary-static-v4-ip-session-activation-fail>0</primary-static-v4-ip-session-activation-fail><secondary-v4-ip-session-activation-fail>0</secondary-v4-ip-session-activation-fail><secondary-static-v4-ip-session-activation-fail>0</secondary-static-v4-ip-session-activation-fail><primary-v6-ip-session-activation-attempts>0</primary-v6-ip-session-activation-attempts><primary-static-v6-ip-session-activation-attempts>0</primary-static-v6-ip-session-activation-attempts><secondary-v6-ip-session-activation-attempts>0</secondary-v6-ip-session-activation-attempts><secondary-static-v6-ip-session-activation-attempts>0</secondary-static-v6-ip-session-activation-attempts><primary-v6-ip-session-activation-success>0</primary-v6-ip-session-activation-success><primary-static-v6-ip-session-activation-success>0</primary-static-v6-ip-session-activation-success><secondary-v6-ip-session-activation-success>0</secondary-v6-ip-session-activation-success><secondary-static-v6-ip-session-activation-success>0</secondary-static-v6-ip-session-activation-success><primary-v6-ip-session-activation-fail>0</primary-v6-ip-session-activation-fail><primary-static-v6-ip-session-activation-fail>0</primary-static-v6-ip-session-activation-fail><secondary-v6-ip-session-activation-fail>0</secondary-v6-ip-session-activation-fail><secondary-static-v6-ip-session-activation-fail>0</secondary-static-v6-ip-session-activation-fail><dualstack-v4-ip-session-activation-success>0</dualstack-v4-ip-session-activation-success><dualstack-v6-ip-session-activation-success>0</dualstack-v6-ip-session-activation-success><dualstack-static-v4-ip-session-activation-success>0</dualstack-static-v4-ip-session-activation-success><dualstack-static-v6-ip-session-activation-success>0</dualstack-static-v6-ip-session-activation-success><dualstack-v4-ip-session-activation-attempts>0</dualstack-v4-ip-session-activation-attempts><dualstack-v6-ip-session-activation-attempts>0</dualstack-v6-ip-session-activation-attempts><dualstack-static-v4-ip-session-activation-attempts>0</dualstack-static-v4-ip-session-activation-attempts><dualstack-static-v6-ip-session-activation-attempts>0</dualstack-static-v6-ip-session-activation-attempts><dualstack-v4-ip-session-activation-fail>0</dualstack-v4-ip-session-activation-fail><dualstack-v6-ip-session-activation-fail>0</dualstack-v6-ip-session-activation-fail><dualstack-static-v4-ip-session-activation-fail>0</dualstack-static-v4-ip-session-activation-fail><dualstack-static-v6-ip-session-activation-fail>0</dualstack-static-v6-ip-session-activation-fail><dhcp-wait-timer-expiry>0</dhcp-wait-timer-expiry><pcrf-wait-timer-expiry>0</pcrf-wait-timer-expiry><policy-intimate-retry>0</policy-intimate-retry><accounting-wait-timer-expiry>138</accounting-wait-timer-expiry><bhr-reboot-v4-ip-session-activation-attempts>8</bhr-reboot-v4-ip-session-activation-attempts><bhr-replace-v4-ip-session-activation-attempts>0</bhr-replace-v4-ip-session-activation-attempts><bhr-reboot-v4-ip-session-activation-fail>0</bhr-reboot-v4-ip-session-activation-fail><bhr-replace-v4-ip-session-activation-fail>0</bhr-replace-v4-ip-session-activation-fail><bhr-reboot-v4-ip-session-activation-success>8</bhr-reboot-v4-ip-session-activation-success><bhr-replace-v4-ip-session-activation-success>0</bhr-replace-v4-ip-session-activation-success><bhr-reboot-v6-ip-session-activation-attempts>0</bhr-reboot-v6-ip-session-activation-attempts><bhr-replace-v6-ip-session-activation-attempts>0</bhr-replace-v6-ip-session-activation-attempts><bhr-reboot-v6-ip-session-activation-fail>0</bhr-reboot-v6-ip-session-activation-fail><bhr-replace-v6-ip-session-activation-fail>0</bhr-replace-v6-ip-session-activation-fail><bhr-reboot-v6-ip-session-activation-success>0</bhr-reboot-v6-ip-session-activation-success><bhr-replace-v6-ip-session-activation-success>0</bhr-replace-v6-ip-session-activation-success></procedure></statistics></subscriber></c-vlan><qos><bandwidth><index>0</index><flow-id>1</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>64</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>1</index><flow-id>1</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>2</index><flow-id>2</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>64</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>3</index><flow-id>2</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>4</index><traffic-class>2</traffic-class><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>shaper</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>0</cbs><ebs>0</ebs><queue-depth>206784</queue-depth><discard-policy>WRED</discard-policy></bandwidth><bandwidth><index>5</index><flow-id>3</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>6</index><flow-id>3</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>7</index><flow-id>4</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>8</index><flow-id>4</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>9</index><traffic-class>7</traffic-class><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>shaper</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>0</cbs><ebs>0</ebs><queue-depth>unlimited</queue-depth><discard-policy>WRED</discard-policy></bandwidth><bandwidth><index>10</index><flow-id>10</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>11</index><flow-id>10</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>12</index><flow-id>11</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>13</index><flow-id>11</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>14</index><flow-id>15</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>15</index><flow-id>15</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><egress><index>0</index><vlan>4000</vlan><c-vlan>6</c-vlan><parent>32000005/x1</parent><direction>egress</direction><type>shaper</type><maximum>110272</maximum><maxburst>0</maxburst><minimum>0</minimum><minburst>0</minburst><scheduling-type>1SP-7WRR-SRATE</scheduling-type><weight>2</weight><queue-depth>0</queue-depth><discard-policy>WRED</discard-policy><min-parent-cos>COS5</min-parent-cos><max-parent-cos>COS2</max-parent-cos></egress><cosq-profile>none</cosq-profile></qos><flow-counters><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>1</flow-id><pkts>53388</pkts><bytes>5015968</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>2</flow-id><pkts>96</pkts><bytes>10393</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>3</flow-id><pkts>153751</pkts><bytes>17592306</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>4</flow-id><pkts>1268</pkts><bytes>129336</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>10</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>11</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>egress</direction><flow-id>15</flow-id><pkts>364750</pkts><bytes>38426629</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>1</flow-id><pkts>86747</pkts><bytes>10834246</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>2</flow-id><pkts>131</pkts><bytes>14063</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>3</flow-id><pkts>153800</pkts><bytes>15123776</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>4</flow-id><pkts>1279</pkts><bytes>130458</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>10</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>11</flow-id><pkts>0</pkts><bytes>0</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index><per-flow-counter-index><if-name>32000005/x1</if-name><svlan>4000</svlan><cvlan>6</cvlan><direction>ingress</direction><flow-id>15</flow-id><pkts>476913</pkts><bytes>303665045</bytes><drop-pkts>0</drop-pkts><drop-bytes>0</drop-bytes></per-flow-counter-index></flow-counters></vlan><qos><bandwidth><index>0</index><flow-id>1</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>64</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>1</index><flow-id>1</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>2</index><flow-id>2</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>64</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>3</index><flow-id>2</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>4</index><traffic-class>2</traffic-class><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>shaper</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>0</cbs><ebs>0</ebs><queue-depth>206784</queue-depth><discard-policy>WRED</discard-policy></bandwidth><bandwidth><index>5</index><flow-id>3</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>6</index><flow-id>3</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>7</index><flow-id>4</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>8</index><flow-id>4</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>9</index><traffic-class>7</traffic-class><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>shaper</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>0</cbs><ebs>0</ebs><queue-depth>unlimited</queue-depth><discard-policy>WRED</discard-policy></bandwidth><bandwidth><index>10</index><flow-id>10</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>11</index><flow-id>10</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>12</index><flow-id>11</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>13</index><flow-id>11</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>14</index><flow-id>15</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><bandwidth><index>15</index><flow-id>15</flow-id><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>egress</direction><type>meter</type><cir-minimum-bandwidth>0</cir-minimum-bandwidth><eir-maximum-bandwidth>0</eir-maximum-bandwidth><cbs>4000</cbs><ebs>4000</ebs><yellow-action>DEI</yellow-action><color-aware>BLIND</color-aware></bandwidth><egress><index>0</index><vlan>4000</vlan><c-vlan>6</c-vlan><parent>32000005/x1</parent><direction>egress</direction><type>shaper</type><maximum>110272</maximum><maxburst>0</maxburst><minimum>0</minimum><minburst>0</minburst><scheduling-type>1SP-7WRR-SRATE</scheduling-type><weight>2</weight><queue-depth>0</queue-depth><discard-policy>WRED</discard-policy><min-parent-cos>COS5</min-parent-cos><max-parent-cos>COS2</max-parent-cos></egress><cosq-profile>none</cosq-profile><pon-qos><bandwidth><index>0</index><vlan>4000</vlan><c-vlan>6</c-vlan><port>32000005/x1</port><direction>ingress</direction><type>meter</type><pon-cos>cos-1</pon-cos><dba-priority>BE-1</dba-priority><cir>0</cir><eir>113472</eir><pon-cos-air>0</pon-cos-air><pon-cos-eir>113536</pon-cos-eir></bandwidth></pon-qos></qos><subscriber xmlns=\"http://www.calix.com/ns/exa/bng-std\"><state><subscriber-context><sub-context-id>34</sub-context-id><if-name>32000005/x1</if-name><s-vlan-id>4000</s-vlan-id><c-vlan-id>6</c-vlan-id><state>ACTIVE-DEFAULT</state><mac-addr>02:06:00:30:05:00</mac-addr><first-sign-of-life>2022-10-20T14:13:00</first-sign-of-life><applied-policy-name>PM-100M-DO-DEF</applied-policy-name><multicast-service>DISABLED</multicast-service><multicast-service-state>INACTIVE</multicast-service-state><gx-function>ENABLED</gx-function><gx-session-state>INACTIVE</gx-session-state><accounting-function>ENABLED</accounting-function><allocated-ip-v4-addresses>10.132.1.164</allocated-ip-v4-addresses><v4-lease-time>1800</v4-lease-time><last-deactivation-cause>DHCP lease expiry</last-deactivation-cause><pcrf-transition-status>FAIL, PCRF server unreachable</pcrf-transition-status></subscriber-context></state><statistics><dhcp><rx-dhcp-discover>18</rx-dhcp-discover><tx-dhcp-discover>11</tx-dhcp-discover><rx-dhcp-offer>11</rx-dhcp-offer><tx-dhcp-offer>11</tx-dhcp-offer><rx-dhcp-request>9688</rx-dhcp-request><rx-dhcp-request-discard>0</rx-dhcp-request-discard><tx-dhcp-request>9687</tx-dhcp-request><rx-dhcp-ack>9687</rx-dhcp-ack><tx-dhcp-ack>9687</tx-dhcp-ack><rx-dhcp-nack>0</rx-dhcp-nack><tx-dhcp-nack>1</tx-dhcp-nack><rx-dhcp-release>0</rx-dhcp-release><tx-dhcp-release>0</tx-dhcp-release></dhcp><diameter><tx-policy-intimate-request>3</tx-policy-intimate-request><rx-policy-intimate-ack>0</rx-policy-intimate-ack><rx-policy-intimate-failure>0</rx-policy-intimate-failure><tx-policy-update-request>0</tx-policy-update-request><rx-policy-update-ack>0</rx-policy-update-ack><rx-policy-update-failure>0</rx-policy-update-failure><tx-policy-terminate-request>2</tx-policy-terminate-request><rx-policy-terminate-ack>0</rx-policy-terminate-ack></diameter><radius><tx-accounting-start-request>27963</tx-accounting-start-request><rx-accounting-start-response>0</rx-accounting-start-response><tx-counter-data-request>0</tx-counter-data-request><rx-counter-data-response>0</rx-counter-data-response><tx-accounting-stop-request>2</tx-accounting-stop-request><rx-accounting-stop-response>0</rx-accounting-stop-response><tx-accounting-interim-update-request>9692</tx-accounting-interim-update-request><rx-accounting-interim-update-response>0</rx-accounting-interim-update-response></radius><procedure><primary-v4-ip-session-activation-attempts>3</primary-v4-ip-session-activation-attempts><primary-static-v4-ip-session-activation-attempts>0</primary-static-v4-ip-session-activation-attempts><secondary-v4-ip-session-activation-attempts>0</secondary-v4-ip-session-activation-attempts><secondary-static-v4-ip-session-activation-attempts>0</secondary-static-v4-ip-session-activation-attempts><primary-v4-ip-session-activation-success>3</primary-v4-ip-session-activation-success><primary-static-v4-ip-session-activation-success>0</primary-static-v4-ip-session-activation-success><secondary-v4-ip-session-activation-success>0</secondary-v4-ip-session-activation-success><secondary-static-v4-ip-session-activation-success>0</secondary-static-v4-ip-session-activation-success><primary-v4-ip-session-activation-fail>0</primary-v4-ip-session-activation-fail><primary-static-v4-ip-session-activation-fail>0</primary-static-v4-ip-session-activation-fail><secondary-v4-ip-session-activation-fail>0</secondary-v4-ip-session-activation-fail><secondary-static-v4-ip-session-activation-fail>0</secondary-static-v4-ip-session-activation-fail><primary-v6-ip-session-activation-attempts>0</primary-v6-ip-session-activation-attempts><primary-static-v6-ip-session-activation-attempts>0</primary-static-v6-ip-session-activation-attempts><secondary-v6-ip-session-activation-attempts>0</secondary-v6-ip-session-activation-attempts><secondary-static-v6-ip-session-activation-attempts>0</secondary-static-v6-ip-session-activation-attempts><primary-v6-ip-session-activation-success>0</primary-v6-ip-session-activation-success><primary-static-v6-ip-session-activation-success>0</primary-static-v6-ip-session-activation-success><secondary-v6-ip-session-activation-success>0</secondary-v6-ip-session-activation-success><secondary-static-v6-ip-session-activation-success>0</secondary-static-v6-ip-session-activation-success><primary-v6-ip-session-activation-fail>0</primary-v6-ip-session-activation-fail><primary-static-v6-ip-session-activation-fail>0</primary-static-v6-ip-session-activation-fail><secondary-v6-ip-session-activation-fail>0</secondary-v6-ip-session-activation-fail><secondary-static-v6-ip-session-activation-fail>0</secondary-static-v6-ip-session-activation-fail><dualstack-v4-ip-session-activation-success>0</dualstack-v4-ip-session-activation-success><dualstack-v6-ip-session-activation-success>0</dualstack-v6-ip-session-activation-success><dualstack-static-v4-ip-session-activation-success>0</dualstack-static-v4-ip-session-activation-success><dualstack-static-v6-ip-session-activation-success>0</dualstack-static-v6-ip-session-activation-success><dualstack-v4-ip-session-activation-attempts>0</dualstack-v4-ip-session-activation-attempts><dualstack-v6-ip-session-activation-attempts>0</dualstack-v6-ip-session-activation-attempts><dualstack-static-v4-ip-session-activation-attempts>0</dualstack-static-v4-ip-session-activation-attempts><dualstack-static-v6-ip-session-activation-attempts>0</dualstack-static-v6-ip-session-activation-attempts><dualstack-v4-ip-session-activation-fail>0</dualstack-v4-ip-session-activation-fail><dualstack-v6-ip-session-activation-fail>0</dualstack-v6-ip-session-activation-fail><dualstack-static-v4-ip-session-activation-fail>0</dualstack-static-v4-ip-session-activation-fail><dualstack-static-v6-ip-session-activation-fail>0</dualstack-static-v6-ip-session-activation-fail><dhcp-wait-timer-expiry>0</dhcp-wait-timer-expiry><pcrf-wait-timer-expiry>0</pcrf-wait-timer-expiry><policy-intimate-retry>0</policy-intimate-retry><accounting-wait-timer-expiry>138</accounting-wait-timer-expiry><bhr-reboot-v4-ip-session-activation-attempts>0</bhr-reboot-v4-ip-session-activation-attempts><bhr-replace-v4-ip-session-activation-attempts>8</bhr-replace-v4-ip-session-activation-attempts><bhr-reboot-v4-ip-session-activation-fail>0</bhr-reboot-v4-ip-session-activation-fail><bhr-replace-v4-ip-session-activation-fail>0</bhr-replace-v4-ip-session-activation-fail><bhr-reboot-v4-ip-session-activation-success>8</bhr-reboot-v4-ip-session-activation-success><bhr-replace-v4-ip-session-activation-success>0</bhr-replace-v4-ip-session-activation-success><bhr-reboot-v6-ip-session-activation-attempts>0</bhr-reboot-v6-ip-session-activation-attempts><bhr-replace-v6-ip-session-activation-attempts>0</bhr-replace-v6-ip-session-activation-attempts><bhr-reboot-v6-ip-session-activation-fail>0</bhr-reboot-v6-ip-session-activation-fail><bhr-replace-v6-ip-session-activation-fail>0</bhr-replace-v6-ip-session-activation-fail><bhr-reboot-v6-ip-session-activation-success>0</bhr-reboot-v6-ip-session-activation-success><bhr-replace-v6-ip-session-activation-success>0</bhr-replace-v6-ip-session-activation-success></procedure></statistics></subscriber></ont-ethernet></interface></interfaces-state>" };