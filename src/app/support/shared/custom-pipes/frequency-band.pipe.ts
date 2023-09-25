import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frequencyBand'
})
export class FrequencyBandPipe implements PipeTransform {

  transform(value: string): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    if (+value.match(/\d+/) >= 0 && +value.match(/\d+/) <= 8) {
      return "2.4GHz";
    }
    // Replace value with asterisks
    return "5GHz"
  }
} 