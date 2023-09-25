export class TimeLimitModel{
  profileId : String
  bedTime : {
    day? : number,
    idx? : number,
    startTime? : any,
    endTime? : any,
    enable?: boolean,
  }
  constructor( profileId : String, betTime :{day? :number, idx? : number,  startTime? : any, endTime? : any, enable?: boolean}){
    this.profileId = profileId;

    this.bedTime = betTime
  }
}

