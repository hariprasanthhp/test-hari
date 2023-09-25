import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public containersAllowedObj: any = {
    "CIEP": "ExperienceIQ",
    "CIES": "ProtectIQ",
    "iothub": "Smart Home Agent",
    "wifiapi": "WiFi Demo",
    "vz_iothub": "Usb IoT",
    "sthub": "Samsung Smartthings"
  }

  public gigaRouters = ['844G', '844E', '854G', '844GE'];

  getContainersAllowedObj(): any {
    return this.containersAllowedObj;
  }

  getGigaRouters(): any {
    return this.gigaRouters;
  }


}
