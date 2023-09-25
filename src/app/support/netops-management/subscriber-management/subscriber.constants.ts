export enum SubscriberManagement {
    DEVICE_LABEL = 'Device',
    SERVICE_LABEL = 'Services',
    SETTINGS_LABEL = 'Additional Settings'
}

export const DEVICE_MODELS_COLLECTIONS = ["6729-W1-xx", "844E-1", "844E-2", 'EX5510-B0', "844GE-1", "844GE-2", "854G-2", "AR-5319",
    "DG2470A", "GS4220E", "GS4227E", "R6300v2", "SR360n", "VMG4825-B10A", "844G-1", "844G-2", "854G-1", "844F", "844F-1", "844F-2",
    "844FB", "844FB-1", "844FB-2", "804Mesh", "812G-1", "812G-2", "813G-1", "813G-2", "818G", "812Gv2", "813Gv2-1", "813Gv2-2", "819G",
    "822G", "823G-1", "823G-2", "814G-2", "814G-1", "GS2026E", "GS2020E", "GC4026E", "GS4227E-2", "GS4220E-2", "GS2028E", "GS2028E-2",
    "GM1020", "GM1028", "GM1028-2", "836GE", "711GE", "711GE-I", "716GE", "716GE-I", "717GE", "717GE-I", "721GE", "721GE-I", "725GE",
    "726GE", "726GE-I", "727GE", "727GE-I", "801FB", "PRE801F", "801F", "GS4227"];

export const DEVICE_WEP_MODEL_COLLECTIONS = ['804Mesh', '844E-1', '844E-2', 'GM1020', 'GM10208-2', 'GM1028-2', 'GM1028',
    'GigaSpire BLASTu4', 'GigaSpire BLASTu4m', 'GM10208', 'GS2026E', 'GS2020E', 'GS4227E', 'GS4220E', 'GS4227E-2', 'GS4220E-2',
    'GS2028E', 'GS2028E-2', 'MGS4220E', 'MGS4227E', 'GS4227'];

export const DEVICE_MANAGE_MODEL_COLLECTIONS = ['844GE-1', '844GE-2'];

export const DEVICE_MODAM_MODEL_COLLECTIONS = ['801FB', 'PRE801F', '801F'];

export const DEVICE_RG_MODEL_COLLECTIONS = ['EX5510-B0', '6729-W1-xx', '844E-1', '844E-2', 'GS2026E', 'GS2020E', 'GS4227E', 'GS4220E', 'GS4227E-2', 'GS4220E-2',
    'GS2028E', 'GS2028E-2', 'MGS4220E', 'DG2470A', 'MGS4227E', '6768-W1-xx', 'AR-5319', '711GE', '716GE', '812G-1', '812G-2', '812Gv2', '813G-1', '813G-2',
    '813Gv2-1', '813Gv2-2', '844G-1', '844G-2', '854G-1', '854G-2', 'R6300v2', '844F', 'SR360n', '844F-1', '844F-2', '844FB', '844FB-1', '844FB-2', '818G',
    '819G', '822G', '823G-1', '823G-2', '814G-2', '814G-1', 'GC4026E', '836GE', '711GE-I', '716GE-I', '717GE', '717GE-I', '721GE', '721GE-I',
    '725GE', '726GE', '726GE-I', '727GE', '727GE-I', 'GigaSpire BLASTu4', 'HGW', 'VMG4825-B10A', 'VMG4927-B50A', '844GE-1', '844GE-2', 'GS4227'];

export const DEVICE_STATIC_GROUP_DATA = [{ "_id": "d2198b39-03b7-485f-955b-10942f0d14e6", "name": "test", "type": "static", "orgId": "152650", "description": "test", "allowInheritance": true }, { "_id": "6aa17b83-f9df-425a-8df7-d7fb755baa8f", "name": "dd", "type": "static", "orgId": "152650", "description": "", "allowInheritance": true }, { "_id": "c0878c33-9243-465e-a2d9-7d10efd4220d", "name": "autotest_static", "type": "static", "orgId": "152650", "description": "autotest", "allowInheritance": true }, { "_id": "71590d4c-7507-49c9-a357-940a9cbb7fe0", "name": "TEst123", "type": "static", "orgId": "152650", "description": "", "allowInheritance": true }, { "_id": "9920b271-8114-49a9-8f57-fc866bd5e8df", "name": "Test Dec Latest", "type": "static", "orgId": "152650", "description": "Test Dec Latest", "allowInheritance": true, "cpeFilter": {} }, { "_id": "ded35806-f537-46d5-8535-42c7241fe23a", "name": "zzz", "type": "static", "orgId": "152650", "description": "", "allowInheritance": true }, { "_id": "d7b4358f-87eb-4971-ad19-d18e02f3784f", "name": "dgdfg", "type": "static", "orgId": "152650", "description": "", "allowInheritance": true }, { "_id": "b0792f44-5e06-4fee-bfb5-fce87bfefd72", "name": "zdc_static", "type": "static", "orgId": "152650", "description": "test", "allowInheritance": true }, { "_id": "2537818a-b300-4d79-9a18-b4fa362d4804", "name": "dddd", "type": "static", "orgId": "152650", "description": "sss", "allowInheritance": true, "cpeFilter": {} }, { "_id": "dba2ab43-e4c9-4b2f-b154-9963b57c7bf8", "name": "david_static", "type": "static", "orgId": "152650", "description": "", "allowInheritance": true }, { "_id": "737a9df8-4992-4906-8a93-910327709512", "name": "fff", "type": "static", "orgId": "152650", "description": "eee", "cpeFilter": {}, "allowInheritance": true }, { "_id": "8989b04d-a56b-40c7-b0d8-413287004e9a", "name": "Latest Dec", "type": "static", "orgId": "152650", "description": "Latest Dec new", "allowInheritance": false, "cpeFilter": {} }, { "_id": "eb8057fe-e96a-4d86-8235-1ac83e4e522b", "name": "test ", "type": "static", "orgId": "152650", "allowInheritance": true, "cpeFilter": {} }, { "_id": "98aae52c-e5fa-4e41-918c-b3f2cd8dd368", "name": "Test Old Latest", "type": "static", "orgId": "152650", "description": "Descriptonal", "allowInheritance": true }, { "_id": "f38c6296-87d2-4930-b2b1-567ba0cc12f8", "name": "newdvicereturn", "type": "static", "orgId": "152650", "description": "newdvicereturn", "allowInheritance": true, "cpeFilter": {} }, { "_id": "9b252395-55b6-4d71-9ddf-ab4630ad2241", "name": "tes", "type": "static", "orgId": "152650", "description": "asas", "allowInheritance": true }, { "_id": "9b526c83-41c1-4d18-bf72-6021a1664595", "name": "Test 123", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "4d4123a3-734a-4f44-aa1b-a25e63d7bec9", "name": "Test wsswdw", "type": "static", "orgId": "152650", "description": "ASD", "allowInheritance": true }, { "_id": "cd1f96e0-3b18-4a53-a911-c62bc6e99974", "name": "Test wdwd", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "4d599047-a397-4e0d-96cb-62f12eeffe0d", "name": "Test 123xsxsx", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "11bfca8e-71f9-45cb-9b0f-5ff8ec85008b", "name": "FFD", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "dd670db6-066a-4859-ab52-aadc79d57ddf", "name": "ABC", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "a51b0f2c-38eb-44fa-9bf7-9f7adb396a1d", "name": "XYZ", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "6e63eec7-804b-407b-9a6d-bbf7bbf66af6", "name": "QA", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "a884b7d3-cce8-471c-b28d-dc9b08d28844", "name": "VV", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "5a3a21d7-26eb-49cd-aaa8-95586f9216d6", "name": "wed", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "b572c2ed-8789-4775-8fbd-cce969b706bb", "name": "static", "type": "static", "orgId": "152650", "description": "", "allowInheritance": true }, { "_id": "9d763421-b882-4825-889d-3c60a453e764", "name": "Test 123Test qwe", "type": "static", "orgId": "152650", "description": "sqsq", "allowInheritance": true, "cpeFilter": {} }, { "_id": "95d016bb-3a9e-4840-8507-607d9de17997", "name": "test in 1st", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": false, "cpeFilter": {} }, { "_id": "f666f25a-1ba0-45e3-8478-0f584fae485e", "name": "ASDX", "type": "static", "orgId": "152650", "description": "Test Description ", "allowInheritance": true, "cpeFilter": {} }, { "_id": "e41193c4-fcab-40ae-9c45-9b74ce2311d1", "name": "All-Calix-RGs_zdc11new7", "type": "static", "orgId": "152650", "description": "All Calix RGs", "cpeFilter": { "manufacturer": "Calix" }, "allowInheritance": true }, { "_id": "9388fdb2-dfe2-4785-b17f-985a9557a935", "name": "All-Calix-RGs_zdc11new34", "type": "static", "orgId": "152650", "description": "All Calix RGsup", "cpeFilter": { "manufacturer": "Calix" }, "allowInheritance": true }, { "_id": "22dfcfaf-e75b-4de2-a34e-33989ec01eed", "name": "static sun", "type": "static", "orgId": "152650", "allowInheritance": false, "cpeFilter": {} }, { "_id": "eff748f6-83b9-46a2-912d-bbfb35e535e5", "name": "test sun", "type": "static", "orgId": "152650", "allowInheritance": true, "cpeFilter": {} }, { "_id": "ca1a1cd6-346a-410a-ac11-3e6db1b2ea94", "name": "21770", "type": "static", "orgId": "152650", "allowInheritance": true, "cpeFilter": {} }, { "_id": "578446dd-7091-4505-89a0-3b3671f1a1d5", "name": "All-Calix-RGs_zdc11new5", "type": "static", "orgId": "152650", "description": "All Calix RGs", "cpeFilter": { "manufacturer": "Calix" }, "allowInheritance": true }, { "_id": "663f370e-019c-4574-b2a7-7ed48e4db99f", "name": "AK", "type": "static", "orgId": "152650", "description": "testing", "allowInheritance": true, "cpeFilter": {} }, { "_id": "8eb976ac-f0f9-4a0b-ac1f-4d316560c0d4", "name": "test static", "type": "static", "orgId": "152650", "allowInheritance": true, "cpeFilter": {} }, { "_id": "bf517cdc-38dc-495c-85d3-0c0ec42ae057", "name": "Test", "type": "static", "orgId": "152650", "description": "Test Desc", "allowInheritance": false, "cpeFilter": {} }, { "_id": "ba195e25-a316-4e33-aedc-ee382e171387", "name": "rrr static 1", "type": "static", "orgId": "152650", "allowInheritance": true, "cpeFilter": {} }];


export const SERVICE_BANDWIDTH_PROFILE_LIST = [{ "_id": "76ade1ac-90d1-4108-aaa6-09e5a410755a", "name": "jizhu_bandwidth", "orgId": "152650", "description": "", "configurations": [{ "category": "Bandwidth", "parameterValues": { "UpstreamCIR": "512m", "DownstreamCIR": "128m" } }], "innerProfileCategory": "Bandwidth" }, { "_id": "8c94d732-d9e6-4ee6-881b-1244ca65053a", "name": "autotest_Bandwidth", "orgId": "152650", "configurations": [{ "category": "Bandwidth", "parameterValues": { "UpstreamCIR": "3m", "DownstreamCIR": "2m" } }], "innerProfileCategory": "Bandwidth" }, { "_id": "c72a6206-4d9e-466f-98f1-f075ca481d0f", "name": "nb", "orgId": "152650", "configurations": [{ "category": "Bandwidth", "parameterValues": { "UpstreamCIR": "17k", "DownstreamCIR": "12k" } }], "innerProfileCategory": "Bandwidth" }, { "_id": "f5740643-6d63-4f6d-b4e6-3a3a76b69635", "name": "regre9", "orgId": "152650", "configurations": [{ "category": "Bandwidth", "parameterValues": { "UpstreamCIR": "13k", "DownstreamCIR": "12k" } }], "innerProfileCategory": "Bandwidth" }];

export const SERVICE_PROFILE_LIST = ["wan-0110-5", "wan-0110-6", "1111111111111111111111111111111111111111111", "hdata01_b1",
    "exos16_data_service_48626", "laistillfather", "HB_201", "Data_320", "rmb-date-1000", "aileen_test_bw", "data exos pppoe tagged not default",
    "Jing_pppoe_wan", "data exos tagged 200", "wan-test-0110-3", "data exos tagged ipoe ipv4only", "Yuan-tag999", "floria_data_L3_1000",
    "data exos untagged default", "19.3_data", "wale_data", "wli-add-wan-1", "CXNK0030B06B", "test_security_profile", "Jason_PPP",
    "Fiona_data_v6", "dualstack", "Fiona_default_wan", "0102", "Jason_Dual_Stack", "Yuan-data-1070", "wan-0110-4", "WAN-Test-0110-9",
    "fwu_data_default+_tagged_dhcpv4", "fwu_data_non-default_untag_dhcpv4", "data_service_anne", "JH_DUAL_600", "htest001data",
    "hazel-data-service", "aileen_data_ipv6", "SISIdeleteData", "pppoe-------ssssssss", "SISIV4", "180", "add180wan", "floria_data1070_smallBW",
    "jguo_dual_stack_1070", "Yuan-4227-pppoe", "hdata2_bw2", "htest_upgrade_workflow_data1", "wli-add-awan", "wli-add-wan", "Yang-untag",
    "Yang-pppoe", "Jing_untagged_dhcpv4_GF", "dual stack-untag-demi", "pppoe-untag HSI-demi", "pppoe-tagged-1080-HSI-demi",
    "fwu_data_default_tagged_dual", "Jing_dual_stack_untagged", "ray-dual_stack-tagged-nodefault", "gl123", "JH_Data",
    "ray-nodefault-untag-dual", "data", "pppoe_data_untagged_exos_lijia", "Jing_tagged_DHCPV6_GF", "dual stack-tagged-1070-demi",
    "wli-add-wan-opt-1", "dft", "Jing_data_844E", "Full_Install_lijia_1_dhcp_tag_600_default", "jguo_pppoe_601_ondefault",
    "floria_85_BW100_50", "jguo_dual_stack_600_nondefault", "data_25m_3m", "691_half_bridge", "ipoe_v6_clear", "844E-Data-service",
    "JH_PPPOE0619", "jguo_pppoe_601", "untag_ipv6", "fwu_data_dual_600_gc", "844E-Data-120/40", "jguo_untag_dual_stack_default",
    "844E-Data-bw-20/10", "844GE-AE-Data1", "844E-Data-bw-512/128", "jkong-disabble-ipv6-1111", "data_691", "wwu_data_service_35879",
    "flo_300_BW_200/50", "hazel-dhcpv4-wan", "844GE-AE-Data-512/128", "844GE-AE-120/40", "JH_Data2", "aileen_test_enable_untag_ipv6",
    "aileen_3420_data", "300_500_1000", "dqtestDDDDDDDDDDDD", "GC: data , IPoE, dual-stack, default,  vlan 600", "flo_300_BW_100",
    "dual_untag", "fwu_data_dual_default_untag_100m-20m", "HB1502_lan1", "data600_BW10M", "ip_dual_stack", "aileen_untag_dual_stack",
    "floria_300_200M", "Data3", "fwu_data_dual_default_untag_1G_500m", "floria_300_100/25", "aileen_untag_data", "300_20_200",
    "aileen_untag_ipv4_only", "floria_300_bw-1G", "Floria_300_RG", "untagged ipv4 for tr069", "data_tagged_600_dual_default",
    "data untagged non-default ipv4", "jyx_test", "floria_300_bw_110/60", "data_20_200_1", "aileen_tag_for_test", "data_20_200_1",
    "data_300_10m", "flo_200_10m", "untagged_default_dual_exos_lijia", "lisa_untag ppp", "aileen_ipv4_non_default",
    "tagged_600_default_dual_lijia", "aileen_1070_dual_stack", "gqdeng", "Lai_HSI_600", "lab_u4_data", "844G-enable-ipv6",
    "pppoe_cq", "anne_data", "pppoe_vlan_undefault", "pppoe_vlan_cq", "ray-default-untag-dual-wan", "ray-datawan-tag999",
    "data_300_nondefault", "844E-Data-2", "ray-dual_stack-tagged600-nodefault", "lisa_ppp_untag", "Yang-ipv6", "ungtaggedchpv4default_exos_lijia",
    "ungtaggedchpv4and6default_exos_lijia", "Fang_Test_Set_Band", "604_halfbridge", "half_bridge_44_novideo", "demi-HSI- V4 only",
    "aliu-4220-pppoe", "demi-tagged 600-dual stack", "demi-data-900-NON-DCS", "AAA-Yuan-Prov", "echo-ppp", "844E-Data-120/40-untag",
    "aliu-4220-dhcp", "RG_default_85", "JH_Data1016", "anne_pppoe", "aileen_pppoe_dual_stack"];

export const SERVICE_DIAL_PLAN = [{ "_id": "bc4a3786-968f-443a-91fb-93b5659f6c67", "name": "system-default1", "orgId": "152650", "rules": ["^911n", "^411", "^[2-9][0-9]{6}", "^1[2-9][0-9]{9}", "^011[0-9]*T", "^S[0-9]{2}"], "longTimer": 16, "shortTimer": 4, "description": "System Default Dial Plan" }, { "_id": "8b4b30f6-ef3e-4729-9809-456261609627", "name": "vvvvvvv", "orgId": "152650", "rules": ["^611n", "^411", "^[2-6][0-9]{6}"], "longTimer": 9, "shortTimer": 8, "description": "" }, { "_id": "1919b446-dcbf-46b3-97ca-93971f48d5d9", "name": "sdfds", "orgId": "152650", "rules": ["^611n", "^411", "^[2-6][0-9]{6}"], "longTimer": 9, "shortTimer": 8, "description": "" }, { "_id": "d097ff32-1771-4daa-aaa7-73a75b7a9a12", "name": "xxxxx", "orgId": "152650", "rules": ["^611n", "^411", "^[2-6][0-9]{6}"], "longTimer": 9, "shortTimer": 8, "description": "" }, { "_id": "a9620183-1367-4f31-a51f-2c2df06af7cb", "name": "floriatest", "orgId": "152650", "rules": ["^611n", "^411", "^[2-6][0-9]{6}"], "longTimer": 14, "shortTimer": 5, "description": "floria huangasdf" }, { "_id": "0a1ee83e-0ff7-4919-a3a0-6720e696f86c", "name": "zzz", "orgId": "152650", "rules": ["^611n", "^411", "^[2-6][0-9]{6}"], "longTimer": 9, "shortTimer": 8, "description": "" }, { "_id": "675340db-e933-4be9-aeb3-17c6cf16249f", "name": "dev server", "orgId": "152650", "rules": ["^611n", "^411", "^[2-6][0-9]{6}"], "longTimer": 10, "shortTimer": 8, "description": "descri" }, { "_id": "246737a8-9e66-42d8-9ce4-52d28dc63b98", "name": "system-default", "orgId": "152650", "rules": ["^911n", "^411", "^[2-9][0-9]{6}", "^1[2-9][0-9]{9}", "^011[0-9]*T", "^S[0-9]{2}"], "longTimer": 16, "shortTimer": 4, "description": "System Default Dial Plan" }, { "_id": "6dc15f05-76a1-4003-80a1-8db889bfe9bc", "name": "system-default2", "orgId": "152650", "rules": ["^911n", "^411", "^[2-9][0-9]{6}", "^1[2-9][0-9]{9}", "^011[0-9]*T", "^S[0-9]{2}"], "longTimer": 16, "shortTimer": 4, "description": "System Default Dial Plan" }, { "_id": "35c0cc18-826a-44ea-b010-b1ada65b7f75", "name": "xcvcx", "orgId": "152650", "rules": ["^zvdszdsf"], "longTimer": 8, "shortTimer": 5, "description": "" }, { "_id": "41114b48-aac6-41d3-afd5-b7c9d4ec392f", "name": "zsxsf", "orgId": "152650", "rules": ["^saf"], "longTimer": 6, "shortTimer": 5, "description": "dsfds" }, { "_id": "system-default", "name": "system-default", "description": "System Default Dial Plan", "shortTimer": 4, "longTimer": 16, "rules": ["^911n", "^411", "^[2-9][0-9]{6}", "^1[2-9][0-9]{9}", "^011[0-9]*T", "^S[0-9]{2}"] }];

export const SERVICE_ONT_BW_PROGILE = [{ "_id": "0b63f012-184b-48a3-897a-d9f776931a38", "name": "jizhu_profile_test02_1598838731.8119607", "orgId": "152650", "description": "Data Service", "configurations": [{ "category": "Voice Service", "parameterValues": { "Type": "SIP", "Model": "GigaCenter", "RTPPort": 49152, "TimerT1": 100, "TimerT2": 1000, "DNSPrimary": "0.0.0.3", "DTMFMethod": "InBand", "SwitchType": null, "CountryCode": "US", "ProxyServer": "0.0.0.1", "RTPCodec1st": "G.711MuLaw", "RTPCodec2nd": "G.711ALaw", "RTPCodec3rd": "G.729", "DNSSecondary": "0.0.0.4", "RTPDscpValue": 0, "ReleaseTimer": 1, "PacketRate1st": "10", "PacketRate2nd": "20", "PacketRate3rd": "30", "VlanTagAction": true, "LocalHookFlash": true, "HookFlashMethod": null, "ProxyServerPort": 5060, "UserAgentDomain": "", "ControlDscpValue": 46, "RTPDscpInputType": true, "RegistrationPeriod": 60, "ServiceFramingType": "PPPoE", "X_000631_IGMPProxy": false, "X_000631_VlanMuxID": 1, "ProxyServerSecondary": "0.0.0.2", "CallWaitingTonePrefix": "CallWaitingTone", "DistinctiveRingPrefix": "Bellcore-dr", "ServiceConnectionType": "DHCP", "SilenceSuppression1st": true, "SilenceSuppression2nd": true, "SilenceSuppression3rd": true, "X_000631_VlanMux8021p": 0, "ProxyServerPortSecondary": 5060 } }] }, { "_id": "622279f0-80d2-4496-9072-9c07b642703b", "name": "jizhu_profile_test02_1598420186.0983386", "orgId": "152650", "description": "Data Service", "configurations": [{ "category": "Voice Service", "parameterValues": { "Type": "H.248", "Model": "GigaCenter", "ESAMode": true, "RTPBasePort": 49152, "VlanTagAction": true, "TermPrefixH248": "TP", "EphemeralTermID": "RTP", "RTPCodec1st_H248": "G.711MuLaw", "PrimarySwitchType": "GENERIC", "PacketRate1st_H248": 10, "ServiceFramingType": "PPPoE", "X_000631_IGMPProxy": false, "X_000631_VlanMuxID": 1, "PrimaryGWController": "0.0.0.1", "SecondarySwitchType": "TSS", "SecondaryGWController": "0.0.0.2", "ServiceConnectionType": "DHCP", "X_000631_VlanMux8021p": 0 } }] }, { "_id": "677bfc72-58c1-48b9-8c9a-fc4448a8a089", "name": "voiceserv1", "orgId": "152650", "configurations": [{ "category": "Voice Service", "parameterValues": { "Type": "SIP", "Model": "GigaCenter", "ipType": "IPv4", "RTPPort": 49152, "TimerT1": 500, "TimerT2": 4000, "DTMFMethod": "InBand", "SwitchType": "None", "CountryCode": "US", "ProxyServer": "10.245.252.2", "RTPCodec1st": "G.711MuLaw", "RTPDscpValue": 46, "ReleaseTimer": 10, "PacketRate1st": "10", "PacketRate2nd": "10", "PacketRate3rd": "10", "VlanTagAction": true, "LocalHookFlash": true, "ProxyServerPort": 5060, "RTPDscpInputType": true, "RegistrationPeriod": 3600, "ServiceFramingType": "IPoE", "X_000631_VlanMuxID": 2, "CallWaitingTonePrefix": "CallWaitingTone", "DistinctiveRingPrefix": "Bellcore-dr", "X_000631_VlanMux8021p": 6 } }] }, { "_id": "2106b58f-b45b-4f62-84c9-a6998ec99e40", "name": "voice ds", "orgId": "152650", "description": "", "configurations": [{ "category": "Voice Service", "parameterValues": { "Type": "SIP", "Model": "GigaCenter", "ipType": "IPv4", "RTPPort": 49152, "TimerT1": 500, "TimerT2": 4000, "DNSPrimary": "", "DTMFMethod": "InBand", "SwitchType": "None", "CountryCode": "US", "ProxyServer": "192.144.1.1", "RTPCodec1st": "G.711MuLaw", "DNSSecondary": "", "RTPDscpValue": 46, "ReleaseTimer": 10, "PacketRate1st": "10", "PacketRate2nd": "10", "PacketRate3rd": "10", "VlanTagAction": true, "LocalHookFlash": true, "HookFlashMethod": "None", "ProxyServerPort": 5060, "UserAgentDomain": "", "ControlDscpValue": 46, "RTPDscpInputType": true, "RegistrationPeriod": 3600, "ServiceFramingType": "IPoE", "X_000631_IGMPProxy": false, "X_000631_VlanMuxID": 2, "ProxyServerSecondary": "", "CallWaitingTonePrefix": "CallWaitingTone", "DistinctiveRingPrefix": "Bellcore-dr", "ServiceConnectionType": "DHCP", "SilenceSuppression1st": false, "SilenceSuppression2nd": false, "SilenceSuppression3rd": false, "X_000631_VlanMux8021p": 6, "ProxyServerPortSecondary": 5060 } }] }];

export const MODE_FOR_2_4_GZ_SSID = ["6729-W1-xx", "AR-5319", "SR360n", "813G-1", "813G-2", "813Gv2-1", "813Gv2-2", "823G-1", "823G-2", "836GE"]

export const MODE_FOR_ALL_SSID = ["844E-1", "844E-1", "844E-2", "844E-2", "844GE-1", "844GE-1", "844GE-2", "844GE-2", "854G-2", "DG2470A", "GS2026E",
    "GS4220E", "GS4227E", "R6300v2", "VMG4825-B10A", "844G-1", "844G-2", "854G-1", "844F", "844F-1", "844F-2", "844FB", "844FB-1", "844FB-2", "814G-2",
    "814G-1", "GS2020E", "GC4026E", "GS4227E-2", "GS4220E-2", "GS2028E", "GS2028E-2", "GS4227"]