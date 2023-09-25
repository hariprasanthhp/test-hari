export class EditProfileNameModel{
    userId?:string;
    profileId?:string
    name?: string;
    constructor(params?:EditProfileNameModel  ){
        this.userId =  params?.userId || null;
        this.profileId = params?.profileId || null;
        this.name = params?.name || null;
    }
  }