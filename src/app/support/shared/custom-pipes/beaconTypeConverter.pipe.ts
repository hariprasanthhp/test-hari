import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'beaconTypeConverter'
})
export class BeaconTypeConverterPipe implements PipeTransform {
  constructor() { }

  transform(value: string, securityOptions: any[], languageData: any): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    let previousValue = value;
    securityOptions.forEach(res => {
      if (res.id == value) {
        value = res.name
      }
    })
    if (previousValue == value && value != 'WPA2-Personal') {
      if (value != 'WPA-Personal' && value != "WPA - WPA2-Personal" && value != "WPA-WPA2-Personal" && value != "WPA2-WPA3-Personal"
        && value != "WPA2 - WPA3-Personal" && value != "WPA3-Personal" && value != "none" && value != "SecurityOff") {
        value = 'Not Supported';
      }
    }
    var re = /PSK/gi;
    value = value.replace(re, 'Personal');
    var val = value.replace(/\//g, "-");
    val = languageData[val];
    //return value.replace(/\//g, "-");
    return val;
  }
}