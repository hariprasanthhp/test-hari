import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanConverter'
})
export class BooleanConverterPipe implements PipeTransform {

  transform(value: boolean, languageData: any): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    if (value) {
      return languageData.on;//"ON";
    }
    // Replace value with asterisks
    return languageData.off;//"OFF"
  }
} 