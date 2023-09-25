export class ProfileBlockStatusModel{
    userId?:string;
    profileId?:string;
    block?: boolean
    constructor( params?:ProfileBlockStatusModel  ){
        this.profileId = params?.profileId || null;
        this.block = params?.block || null;
        this.userId = params?.userId || null
    }
  }