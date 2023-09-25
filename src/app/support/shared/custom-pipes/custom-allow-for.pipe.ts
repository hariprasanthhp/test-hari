import { Pipe, PipeTransform } from '@angular/core';
import { Apps } from '../../support-application/shared/models/search-app.model';

@Pipe({
  name: 'allowFor'
})
export class CustomAllowForPipe implements PipeTransform {

  transform(currentvalue:any,blocked: any, timeUsage: any): any {
    if (timeUsage === undefined) {
      return false;
    }
    // Replace with the specified character
    if (!blocked && timeUsage != '00:00') {
      return true
    }
    // Replace value with asterisks
    return false
  }
} 