import { environment } from './../../../../../environments/environment';

const URL = environment.SUPPORT_URL;
export const getSelfHeal: string = URL + "/netops-selfheal/wifi-optimization/org/config";
export const putSelfHeal: string = URL + "/netops-selfheal/wifi-optimization/org/config";
export const getStaleDevicePurgePolicy: string = URL + "/netops-stale-device-purge/policy";
export const createStaleDevicePurgePolicy: string = URL + "/netops-stale-device-purge/policy";
export const updateStaleDevicePurgePolicy: string = URL + "/netops-stale-device-purge/policy";
export const listLogStaleDevicePurgePolicy: string = URL + "/netops-stale-device-purge/policy-exec-logs";
export const logsCountStaleDevicePurgePolicy: string = URL + "/netops-stale-device-purge/policy-exec-logs/count";
export const suspendResumePolicyById: string = URL + "/netops-stale-device-purge/policy";
export const getSecureOnBoarding: string = URL + "/netops-secure/onboarding";
export const updateSecureOnBoarding: string = URL + "/netops-secure/onboarding/update";
export const getExternalFileServer: string = URL + "/netops-exts/external-server";
export const postExternalFileServer: string = URL + "/netops-exts/external-server";
export const deleteExternalFileServer: string = URL + "/netops-exts/external-server";
export const getBackgroundSiteScan: string = URL + "/device-systools/site-scan/orgConfig";
export const updateBackGroundSiteScan: string = URL + "/device-systools/site-scan/orgConfig";
export const getCallOutcomeFilePath: string = URL + "/orgIdReport/download"
export const getAuditReportFilePath: string = URL + "/useraudit/downloadLogByNFS"