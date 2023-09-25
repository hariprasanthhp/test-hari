export class ContentFilterModel{
    userId?:string;
    profileId?:string;
    group?: string;
    constructor(params?:ContentFilterModel){
        this.userId =params?.userId;
        this.profileId = params?.profileId;
        this.group = params?.group;
    }
  }