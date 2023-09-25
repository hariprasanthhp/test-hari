import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alertType'
})
export class AlertTypePipe implements PipeTransform {

  transform(value: boolean): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    let type;
    switch (String(value)){
      case 'IPS' : type = 'Intrusion'
      break;
      case 'AV' : type = 'Virus'
      break;
      case 'WG' : type = 'Web Threat'
      break;
    }
    return type;
  }
}
