import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DeviceStatus'
})
export class DeviceStatusPipe implements PipeTransform {

  transform(value: boolean): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    if (value) {
      return "Online";
    }
    // Replace value with asterisks
    return "Offline"
  }
} 