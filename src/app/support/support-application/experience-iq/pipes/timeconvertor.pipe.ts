import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeconvertor'
})
export class TimeconvertorPipe implements PipeTransform {
  time:any;
  timeHr:string;
  transform(timestring: string): string { 
    this.time = timestring.match(/.{1,2}/g)
    this.time[5] = + this.time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    this.time[0] = + this.time[0] % 12 || 12; // Adjust hours
    this.timeHr =   this.time[0]+':'+ this.time[1]+" "+ this.time[5]
    return this.timeHr
 } 

}
