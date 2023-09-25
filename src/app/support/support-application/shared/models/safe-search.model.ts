export class SafeSearchModel{
    userId?:string;
    profileId?:string;
    enable?: boolean;
    constructor(params?:SafeSearchModel){
        this.userId = params?.userId || null;
        this.profileId = params?.profileId|| null;
        this.enable = params?.enable|| null;
    }
  }