import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortSystemsData'
})
export class SortSystemsDataPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    let deviceArray = [];
    let deviceInfo = value.deviceId;
    if (value.deviceId === value.serialNumber && value.registrationId && value.registrationId.trim()) {
      deviceInfo += ` - ${value.registrationId} | `;
    } else if (value.deviceId === value.registrationId && value.serialNumber && value.serialNumber.trim()) {
      deviceInfo += ` - ${value.serialNumber} | `;
    } else deviceInfo += ` - `;
    // deviceArray.push((value.pppUsername && value.pppUsername.trim()) ? value.pppUsername : '');
    // deviceArray.push((value.ipAddress && value.ipAddress.trim()) ? value.ipAddress : '');
    // deviceArray.push((value.manufacturer && value.manufacturer.trim()) ? value.manufacturer : '');
    // deviceArray.push((value.modelName && value.modelName.trim()) ? value.modelName : '');
    // deviceArray.push((value.macAddress && value.macAddress.trim()) ? value.macAddress : '');
    // deviceInfo += deviceArray.filter((value) => value).join(" | ");
    return deviceInfo;
  }

}
