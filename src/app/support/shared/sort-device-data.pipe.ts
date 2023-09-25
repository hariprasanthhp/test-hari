import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDeviceData'
})
export class SortDeviceDataPipe implements PipeTransform {

  transform(value: any, showSerialNumberFirst?: string) {
    /* {
      "_id": "152650-487746-CXNK007D3FC5",
      "serialNumber": "CXNK007D3FC5",
      "macAddress": "48:77:46:cf:6d:6c",
      "registrationId": "reg4220",
      "ipAddress": "192.168.37.219",
      "modelName": "GS4220E",
      "softwareVersion": "20.4.500.108",
      "opMode": "RG",
      "manufacturer": "Calix",
      "deviceId": "CXNK007D3FC5"
  } */
    if (showSerialNumberFirst && showSerialNumberFirst == 'show') {
      let deviceArray = [];
      let deviceInfo = '';

      deviceInfo += `${value.serialNumber ? value.serialNumber : value.registrationId ? value.registrationId : value.macAddress ? value.macAddress : value.deviceId} - `;
      deviceArray.push((value.pppUsername && value.pppUsername.trim()) ? value.pppUsername : '');
      deviceArray.push((value.registrationId && value.registrationId.trim()) ? value.registrationId : '');
      deviceArray.push((value.ipAddress && value.ipAddress.trim()) ? value.ipAddress : '');
      deviceArray.push((value.manufacturer && value.manufacturer.trim()) ? value.manufacturer : '');
      deviceArray.push((value.modelName && value.modelName.trim()) ? value.modelName : value?.ont?.modelName ?value?.ont?.modelName:'');
      if ((value.macAddress && value.deviceId !== value.macAddress) || (value.serialNumber || value.registrationId)) deviceArray.push((value.macAddress && value.macAddress.trim()) ? value.macAddress : '');
      deviceInfo += deviceArray.filter((value) => value).join(" | ");

      return deviceInfo;
    } else {
      let deviceArray = [];
      let deviceInfo = value.deviceId;
      if (value.deviceId === value.serialNumber && value.registrationId && value.registrationId.trim()) {
        deviceInfo += ` - ${value.registrationId} | `;
      } else if (value.deviceId === value.registrationId && value.serialNumber && value.serialNumber.trim()) {
        deviceInfo += ` - ${value.serialNumber} | `;
      } else deviceInfo += ` - `;
      deviceArray.push((value.pppUsername && value.pppUsername.trim()) ? value.pppUsername : '');
      // deviceArray.push((value.registrationId && value.registrationId.trim()) ? value.registrationId : '');
      deviceArray.push((value.ipAddress && value.ipAddress.trim()) ? value.ipAddress : '');
      deviceArray.push((value.manufacturer && value.manufacturer.trim()) ? value.manufacturer : '');
      deviceArray.push((value.modelName && value.modelName.trim()) ? value.modelName : value?.ont?.modelName ?value?.ont?.modelName:'');
      deviceArray.push((value.macAddress && value.macAddress.trim()) ? value.macAddress : '');
      deviceInfo += deviceArray.filter((value) => value).join(" | ");
      return deviceInfo;
    }

  }

}
