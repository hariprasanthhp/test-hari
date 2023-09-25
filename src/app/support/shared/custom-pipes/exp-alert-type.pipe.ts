import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'alertTypeConverter'
})
export class AlertTypeConverterPipe implements PipeTransform {
  constructor() { }
  transform(value: string): any {
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
    switch (value) {
      case "AVC":
        value = "Application";
        break;

      case "AVC-TL":
        value = "Application";
        break;

      case "KF":
        value = "User-defined";
        break;

      case "WCF":
        value = "Content"
        break;

      case "DoH":
        value = "Websites"
        break;

      default:
        value = "N/A"
    }
    return value;
  }
}