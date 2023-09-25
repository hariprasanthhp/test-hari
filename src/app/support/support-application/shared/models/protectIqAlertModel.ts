export class ProtectIqAlertModel{
  total: number;
  from : number;
  size : number;
  unreadCount : number;
  notifList : NotifListModel;
}

export class NotifListModel {
      userId? : string;
      notifId? : string;
      type?: string;
      sourceIP?: string;
      action?: string;
      targetStaName?: string;
      profileName?: string;
      message?: string;
      file?: string;
      url?: string;
      isRead?: boolean;
      time?: any;
      signatureId?: string
}
