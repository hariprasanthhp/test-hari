import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name : 'catogry'
})

export class DeviceCatogryPipe implements PipeTransform{
  transform(value: boolean) : any{
    if (value === undefined) {
      return value;
    }

    let catagoryType;

    switch (String(value)){
      case '0' : catagoryType = 'Other'
      break;
      case '1' : catagoryType = 'Phone'
      break;
      case '2' : catagoryType = 'Computer'
      break;
      case '3' : catagoryType = 'Console'
      break;
      case '4' : catagoryType = 'Media player'
      break;
      case '5' : catagoryType = 'Printer'
      break;
      case '6' : catagoryType = 'Television'
      break;
      case '7' : catagoryType = 'Network'
      break;
      case '8' : catagoryType = 'Camera'
      break;
      case '9' : catagoryType = 'Tablet'
      break;
      case '10' : catagoryType = 'VoIP'
      break;
      case '11' : catagoryType = 'IoT'
      break;

    }
    return catagoryType;
  }
}
