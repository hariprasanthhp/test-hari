export class MultipleDaysModel{
  allEnable : boolean;
  days : DaysModel [];
}

export class DaysModel{

      allEnabled? : boolean;
      bedTime? : BedTime [] ;
      day : number;

}

export class BedTime{
          enable? : boolean;
          endTime? : string;
          idx? : number;
          startTime? : string;
}
