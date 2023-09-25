

export class CPESpeedSupportTest {
  ooklaBackground: boolean;
  defaultPingTarget: String;
  ooklaEndpoint: String;
  ooklaApply: boolean;
  tr143Servers: any[];
  calixTr143Servers:any[];
  calixnetspeed:String;
  calixBackground:boolean;
  ooklaEnabled: boolean;
  calixFallback: boolean;
  calixEnabled : boolean;
  tr143Background: boolean;

  constructor(ooklaBackground?: boolean, defaultPingTarget?: String, tr143Servers?: [],calixTr143Servers?: [], ooklaEndpoint?: String, ooklaApply?: boolean, calixnetspeed?:String,calixBackground?:boolean,ooklaEnabled?:boolean,calixFallback?:boolean,calixEnabled?:boolean,tr143Background?:boolean) {
    this.ooklaBackground = ooklaBackground,
      this.defaultPingTarget = defaultPingTarget,
      this.tr143Servers = tr143Servers
      this.calixTr143Servers = calixTr143Servers
    this.ooklaEndpoint = ooklaEndpoint
    this.ooklaApply = ooklaApply
    this.calixnetspeed=calixnetspeed
    this.calixBackground = calixBackground
    this.ooklaEnabled = ooklaEnabled
    this.calixFallback = calixFallback
    this.calixEnabled = calixEnabled
    this.tr143Background = tr143Background
  }
}
