import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alwaysAllow'
})
export class CustomAlwaysAllowPipe implements PipeTransform {

  transform(blocked: any, timeUsage: any): any {
    if (blocked === undefined) {
      return true;
    }
    // Replace with the specified character
    if (!blocked && timeUsage == '00:00') {
      return false
    }
    // Replace value with asterisks
    return true
  }
} 