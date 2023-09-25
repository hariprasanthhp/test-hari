import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name : 'catogryImg'
})

export class SkipDeviceIconPipe implements PipeTransform{
  transform(value: boolean) : any{
    if (value === undefined) {
      return value;
    }

    let catagoryTypeUrl;

    switch (String(value)){
      case '0' : catagoryTypeUrl = "../../../../assets/img/question_mark_blue_icon.png"
      break;
      case '1' : catagoryTypeUrl = '../../../../assets/img/phone_blue_icon.png'
      break;
      case '2' : catagoryTypeUrl = '../../../../assets/img/computer_blue_icon.png'
      break;
      case '3' : catagoryTypeUrl = '../../../../assets/img/console_blue_icon.png'
      break;
      case '4' : catagoryTypeUrl = '../../../../assets/img/media_player_blue_icon.png'
      break;
      case '5' : catagoryTypeUrl = '../../../../assets/img/printer_blue_icon.png'
      break;
      case '6' : catagoryTypeUrl = '../../../../assets/img/television_blue_icon.png'
      break;
      case '7' : catagoryTypeUrl = '../../../../assets/img/network_blue_icon.png'
      break;
      case '8' : catagoryTypeUrl = '../../../../assets/img/camera_blue_icon.png'
      break;
      case '9' : catagoryTypeUrl = '../../../../assets/img/tablet_blue_icon.png'
      break;
      case '10' : catagoryTypeUrl = '../../../../assets/img/voip_blue.png'
      break;
      case '11' : catagoryTypeUrl = '../../../../assets/img/iot_blue.png'
      break;

    }
    return catagoryTypeUrl;
  }
}
