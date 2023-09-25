export class ProfileNewDeviceModel{
    userId?: string;
    profileId?:string;
    name?: string;
    stations?: Stations[];
    constructor(params?:ProfileNewDeviceModel){
        this.userId = params?.userId || null;
        this.profileId = params?.profileId || null;
        this.name = params?.name || null; 
        this.stations = params?.stations || [new Stations()]; 
    }
  }
class Stations{
    deviceId?: string;
    macAddr?: string;
    constructor(params?:Stations){
        this.deviceId = params?.deviceId || null;
        this.macAddr = params?.macAddr || null; 
    }
}