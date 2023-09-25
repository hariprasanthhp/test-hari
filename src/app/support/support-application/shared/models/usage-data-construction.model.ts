export class UsageConstructionModel{
    name?:string;
    day?: Day[];
    week?:Week[];
    month?:Month[];
    constructor(params?:UsageConstructionModel){
       this.name = params?.name || null;
       this.day = params?.day || [new Day()];
       this.week = params?.week || [new Week()];
       this.month = params?.month || [new Month()];
    }
  }
class Day{
    duration:number;
    constructor(duration?:number){
        this.duration = duration || null;
    }
}

class Week{
    duration:number;
    constructor(duration?:number){
        this.duration = duration|| null;
    }
}
class Month{
    duration:number;
    constructor(duration?:number){
        this.duration = duration|| null;
    }
}