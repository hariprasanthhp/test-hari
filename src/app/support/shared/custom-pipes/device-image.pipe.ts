
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name : 'deviceImage'
})

export class DeviceImagePipe implements PipeTransform{
  transform(value: string,isOnline?) : any{
    
    if (value === undefined) {
      return value;
    }
switch (parseInt(value)) {
    case 0: return isOnline ? './assets/images/deviceicons/question_mark_blue_icon.png' : './assets/images/deviceicons/question_mark_grey_icon.png';
    case 1: {
      return  isOnline ? './assets/images/deviceicons/phone_blue_icon.png' :'./assets/images/deviceicons/phone_grey_icon.png';
    }
    case 2: {
      return  isOnline ? './assets/images/deviceicons/computer_blue_icon.png' :'./assets/images/deviceicons/computer_grey_icon.png';
    }
    case 3: {
      return  isOnline ?'./assets/images/deviceicons/console_blue_icon.png': './assets/images/deviceicons/console_grey_icon.png';
    }
    case 4: {
      return isOnline ? './assets/images/deviceicons/media_player_blue_icon.png' : './assets/images/deviceicons/media_player_grey_icon.png';
    }
    case 5: {
      return  isOnline ? './assets/images/deviceicons/printer_blue_icon.png' : './assets/images/deviceicons/printer_grey_icon.png';
    }
    case 6: {
      return  isOnline ? './assets/images/deviceicons/television_blue_icon.png' : './assets/images/deviceicons/television_grey_icon.png';
    }
    case 7: {
      return  isOnline ? './assets/images/deviceicons/network_blue_icon.png' : './assets/images/deviceicons/network_icon_grey.png';
    }
    case 8: {
      return  isOnline ? './assets/images/deviceicons/camera_blue_icon.png' : './assets/images/deviceicons/camera_grey_icon.png';
    }
    case 9: {
      return  isOnline ? './assets/images/deviceicons/tablet_blue_icon.png' : './assets/images/deviceicons/tablet_grey_icon.png';
    }
    case 10: {
      return  isOnline ? './assets/images/deviceicons/voip_blue.png' : './assets/images/deviceicons/voip_grey.png';
    } case 11: {
      return  isOnline ? './assets/images/deviceicons/iot_blue.png' : './assets/images/deviceicons/iot_grey.png';
    }
    case 30: {
      return isOnline ? './assets/images/deviceicons/ic_modem.svg' : './assets/images/deviceicons/ic_modem-24px.svg';
    }
    default:
      {
        return  isOnline ? './assets/images/deviceicons/question_mark_blue_icon.png' : './assets/images/deviceicons/question_mark_grey_icon.png';

      }

  }
 }
}