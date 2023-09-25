import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experianceIQUsage'
})
export class ExperianceIQUsagePipe implements PipeTransform {

  transform(value: string): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    if (value) {
       let Hours =  value.split('.')[0];
       let Minutes = value.split('.')[1];
       if( Minutes && Minutes.length < 1){
        Minutes = Minutes+'0';
        return Hours+'Hours'+Minutes+'Minutes';
       }
      return Hours+' Hours';
    }
    return "";
  }
} 