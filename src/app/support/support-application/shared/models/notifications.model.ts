export enum ExperianceIQType {
  AVC = 'AVC',
  KF = "KF",
  WCF = "WCF"
}

export const ExperianceIQDropDownValues = [
  { name: "All", value: "" },
  { name: "Application", value: "AVC" },
  { name: "User-defined", value: "KF" },
  { name: "Content", value: "WCF" },
]

export class NotificationModel {
  total?: number;
  unreadCount?: number;
  datas?: Datas[];
  constructor(params?: NotificationModel) {
    this.total = params?.total || null;
    this.unreadCount = params?.unreadCount || null;
    this.datas = params?.datas || [new Datas()];
  }
}

export class Datas {
  notifId?: string;
  type?: string;
  text?: string;
  securityAlarm?: SecurityAlarm;
  parentalAlarm?: parentalAlarm;
  isRead?: boolean;
  timestamp?: number;
  constructor(params?: Datas) {
    this.isRead = params?.isRead || null;
    this.notifId = params?.notifId || null;
    this.parentalAlarm = params?.parentalAlarm || new parentalAlarm();
    this.securityAlarm = params?.securityAlarm || new SecurityAlarm();
    this.text = params?.text || null;
    this.timestamp = params?.timestamp || null;
    this.type = params?.type || null;
  }
}

export class SecurityAlarm {
  type?: string;
  targetStaName?: string;
  action?: string;
  profileName?: string;
  message?: string;
  file?: string;
  url?: string;
  constructor(params?: SecurityAlarm) {
    this.type = params?.type || null;
    this.url = params?.url || null;
    this.action = params?.action || null;
    this.file = params?.file || null;
    this.message = params?.message || null;
    this.profileName = params?.profileName || null;
    this.targetStaName = params?.targetStaName || null;
  }
}

export class parentalAlarm {
  type?: string;
  appName?: string;
  webDomain?: string;
  targetStaName?: string;
  constructor(params?: parentalAlarm) {
    this.type = params?.type || null;
    this.appName = params?.appName || null;
    this.targetStaName = params?.targetStaName || null;
    this.webDomain = params?.webDomain || null;
  }
}