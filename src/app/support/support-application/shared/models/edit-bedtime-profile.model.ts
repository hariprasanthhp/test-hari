export class EditBedTimeModel{
    userId?:string;
    profileId?: string;
    bedTime?: BedTime;
    constructor( params?:EditBedTimeModel ){
        this.userId = params?.userId || null;
        this.profileId = params?.profileId || null;
        this.bedTime = params?.bedTime || new BedTime();
    }
  }

  class BedTime{
    day?: number;
    idx?: number;
    enable?: boolean;
    startTime?: string;
    endTime?: String;
    constructor( params?:BedTime ){
        this.idx = params?.idx || null;
        this.day = params?.day || null;
        this.enable = params?.enable || null;
        this.startTime = params?.startTime || null;
        this.endTime = params?.endTime || null;
    }
  }