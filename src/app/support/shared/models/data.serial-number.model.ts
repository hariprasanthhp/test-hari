export class DataSerialNumberModel {
    _id?:string;
    serialNumber?:string;
    macAddress?:string;
    registrationId?:string;
    ipAddress?:string;
    modelName?:string;
    softwareVersion?:string;
    opMode?:string;
    manufacturer?:string;
    deviceId?:string;
    secondIpAddress?:string;

    constructor(params?:DataSerialNumberModel){
        this._id = params?._id;
        this.serialNumber = params?.serialNumber;
        this.macAddress = params?.macAddress;
        this.registrationId = params?.registrationId;
        this.ipAddress = params?.ipAddress;
        this.modelName = params?.modelName;
        this.softwareVersion = params?.softwareVersion;
        this.opMode = params?.opMode;
        this.manufacturer = params?.manufacturer;
        this.deviceId = params?.deviceId;
        this.secondIpAddress = params?.secondIpAddress;
    }
}