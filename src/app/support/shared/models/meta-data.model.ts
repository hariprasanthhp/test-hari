import { MetaField } from "./ssid-meta-fields.model"

export class MetaData{
    modelName:String;
    dataModelName:String;
    opMode:String;
    opRole:String;
    softwareVersion:String;
    properties:MetaField[];

    constructor(params?:MetaData){
        this.modelName = params.modelName,
        this.dataModelName= params.dataModelName,
        this.opMode= params.opMode,
        this.opRole= params.opRole,
        this.softwareVersion= params.softwareVersion,
        this.properties= params.properties || new MetaField[1]();
    }
}