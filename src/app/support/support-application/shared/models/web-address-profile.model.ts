export class WebAddressProfile{
    userId?:string;
    profileId?:string;
    webUrl?:string;
    id:string;
    blocked: boolean;
    block:boolean;
      
    constructor( params?:WebAddressProfile){
        this.userId = params?.userId || null;
        this.profileId = params?.profileId || null;
        this.webUrl = params?.webUrl || null;
        this.id = params?.id || null;
        this.blocked = params?.blocked || null;
        this.block = params?.block || null;
    }
  }