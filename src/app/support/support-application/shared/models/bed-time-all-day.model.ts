export class BedTimeAllDay{
    userId?:string;
    profileId?:string;
    day?:number;
    enable?: boolean;
    constructor( params?:BedTimeAllDay ){
        this.userId = params?.userId|| null;
        this.profileId = params?.profileId|| null;
        this.enable = params?.enable || null;
        this.day= params?.day || null;
    }
  }