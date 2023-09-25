import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experianceIQStatus'
})
export class ExperianceIQStatusPipe implements PipeTransform {

  transform(value: boolean): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    if (value) {
      return "Disconnected";
    }
    // Replace value with asterisks
    return "Connected"
  }
} 