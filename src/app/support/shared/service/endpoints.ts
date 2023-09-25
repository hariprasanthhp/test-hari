import { environment } from './../../../../environments/environment';

const URL = environment.SUPPORT_URL;
const downloadUrl = environment.UI_BASE_URL;
export const getSSIDConfigList: string = "/device/orgId/serialNumber/ssid";
export const updateSSIDConfigList: string = "/device/orgId/serialNumber/ssid";
export const updateSSIDManager: string = "/device/orgId/serialNumber/ssid";

export const getSSIDManagerList: string = "/device/orgId/serialNumber/ssid"
export const getSubscribeList: string = "/subscriber-search";
export const downloadLogUrl = "/files"