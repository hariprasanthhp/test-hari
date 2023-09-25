export class SearchAppModel{
    apps?:Apps[]
    constructor( apps?:Apps[]){
        this.apps = apps || [new Apps()];
    }
  }

export class Apps {
    id?: number;
    name?: string;
    iconUrl?: string;
    blocked?: boolean;
    timeUsage?:string;
    constructor(params?:Apps){
        this.id = params?.id;
        this.name = params?.name;
        this.iconUrl = params?.iconUrl;
        this.blocked = params?.blocked;
        this.timeUsage = params?.timeUsage;
    }
  }