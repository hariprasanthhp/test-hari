export class ExcLogListStaleDeviceModel{
    _id: string;
    devices: string[];
    endTime:any;
    startTime:any;
    successPurgeCount?:number;
    failurgePurgeCount?:number;
    details?:number;
    timeZone?:string;
    failures?:string [];

    constructor( _id: string,devices: string[],endTime:any, startTime:any, successPurgeCount?:number,
                 details?:number, timeZone?:string,failures?:string [],failurgePurgeCount?:number) {   
        this._id = _id;
        this.devices = devices;
        this.endTime = endTime;
        this.startTime = startTime;
        this.successPurgeCount = successPurgeCount || 0;
        this.details = details;
        this.timeZone = timeZone;
        this.failures = failures;
        this.failurgePurgeCount = failurgePurgeCount || 0;
    }
}