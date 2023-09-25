export class MetaField{
    featureName:string;
    fields:Field[];
    resultType:string;
    configuration = {};
    constructor(params?:MetaField){
        this.featureName = params.featureName || null;
        this.fields = params.fields || new Field[100];
        this.resultType = params.resultType;
        this.configuration = params.configuration;
    }
  }
  export class Field{
    name:string;
    type:string;
    valueList:string[]
    writable:boolean;
    constructor(params?:Field){
        this.name = params.name || null
        this.type = params.type || null
        this.valueList = params.valueList || [];
        this.writable = params.writable || null;
    }
  }