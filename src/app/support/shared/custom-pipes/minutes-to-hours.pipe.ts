import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'minToHr'
  })
  export class MinToHoursPipe implements PipeTransform {
    transform(value: number): string {
       if(value){
        let hours = Math.floor(value / 60);
        let minutes = Math.floor(value % 60);
        return hours + ' hrs ' + minutes + ' mins';
       }else{
         return ""
       }
    }
  }