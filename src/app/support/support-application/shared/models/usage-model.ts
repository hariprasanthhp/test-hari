export enum UsageEnum{
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month'
}
export class UsageModel{
    profileId:string;
    name:string;
    webCount:number;
    appCount:number;
    timeLimitStatus:string;
    speedtest:SpeedTest[]
    timeUsage:TimeUsage
    stations:Stations[]
    avatarUrl:string;
    isBlocked:boolean;
  
    constructor(params?:UsageModel){
        this.profileId = params?.profileId || null;
        this.name = params?.name || null;
        this.webCount = params?.webCount || null ; 
        this.appCount = params?.appCount || null;
        this.timeLimitStatus = params?.timeLimitStatus || null;
        this.speedtest = params?.speedtest || [new SpeedTest()];
        this.timeUsage = params?.timeUsage || new TimeUsage();
        this.stations = params?.stations || [new Stations()] ; 
        this.avatarUrl = params?.avatarUrl || null;
        this.isBlocked = params?.isBlocked || null;
    }
  }

class Usage {
    name?: string
    duration?: number
    constructor(params?:Usage){
      this.name = params?.name || null;
      this.duration = params?.duration || null
    }
  }
  class SpeedTest{
    downloadRate?:number;
    uploadRate?:number;
    constructor(params?:SpeedTest){
      this.downloadRate = params?.downloadRate || null;
      this.uploadRate = params?.uploadRate || null
    }
  }
  class TimeUsage{
    type?:string;
    totalUsage?:number;
    usage?: Usage[]
    constructor(params?:TimeUsage){
      this.type = params?.type || null;
      this.totalUsage = params?.totalUsage || null
      this.usage = params?.usage || [new Usage()]
    }
  }
  class Stations{
    deviceId?: string;
    name?: string;
    isOnline?: boolean;
    ifType?: string;
    constructor(params?:Stations){
      this.deviceId = params?.deviceId || null;
      this.name = params?.name || null
      this.isOnline = params?.isOnline || null;
      this.ifType = params?. ifType || null;
    }
  }