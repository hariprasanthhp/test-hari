export class profileDeviceModel{
    userId?:string;
    profileId?: string;
    stations?: Station[];
    name?: string;
    constructor( params?: profileDeviceModel ){
        this.userId = params?.userId || null;
        this.profileId = params?.profileId || null;
        this.stations = params?.stations || [new Station()];
    }
  }

  class Station{
    deviceId?:string;
    macAddr?: string;
    name?:string;
    ifType?: string;
    constructor(params?:Station){
        this.deviceId=params?.deviceId || null;
        this.macAddr=params?.macAddr || null;
        this.name = params?.name || null;
        this.ifType = params?.ifType || null; 
    }
  }