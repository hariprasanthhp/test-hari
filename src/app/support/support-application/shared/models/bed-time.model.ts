export class BedtimeModel{
    allEnable?: boolean;
    days?: Days[];
    allEnabled?: boolean
    type?:string;
    constructor( params?:BedtimeModel){
        this.allEnable = params?.allEnable || null;
        this.days = params?.days || [new Days()];
        this.allEnabled = params?.allEnabled || null;
        this.type = params?.type || null;
    }
  }

 export class Days{
    allEnabled?:boolean
    day?:number;
    bedTime?: BedTime[];      
    constructor( params?:Days){
      this.allEnabled = params?.allEnabled || null;
        this.day = params?.day || null;
        this.bedTime = params?.bedTime || [new BedTime()];
    }
  }

export class BedTime{
    idx?:number;
    enable?: boolean;
    startTime?: string;
    endTime?: string;
    constructor( params?:BedTime){
        this.idx = params?.idx || null;
        this.enable = params?.enable || null;
        this.startTime =params?.startTime || null;
        this.endTime = params?.endTime || null;
    }
  }
