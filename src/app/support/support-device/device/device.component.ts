import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from 'src/app-services/translate.service';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { DeviceService } from '../service/device.service';
import * as moment from 'moment';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  language: any;
  languageSubject;
  endtime: Date;
  remainingdate: string;

  constructor(private translateService: TranslateService, private ssoAuthService: SsoAuthService,
    private deviceService: DeviceService) { }

  @Input() index: any = {};
  @Input() currentTime;
  @Input() rmode;
  @Input() selectedDevice;
  orgId: any;
  deviceData: any = [];
  deviceDetail;
  station_mac_addr = history?.state?.stationMac
  ngOnInit(): void {

    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {
      this.language = data;
    });
    if (this.index["Lease-time-expiry"] != undefined && this.index["Lease-time-expiry"] != '' && this.index["Lease-time-expiry"] != "Unknown")
      this.deviceReleaseDatecal(this.index["Lease-time-expiry"]);
  }
  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  deviceReleaseDatecal(time) {



    // var d = new Date(time);
    // var x = document.getElementById("demo");
    // var h = (d.getUTCHours());
    // var m = (d.getUTCMinutes());
    // var s = (d.getUTCSeconds());
    //  return h? h + "h " + m + "m " + s +"s": m + "m " + s +"s" ;

    let days, hrs, mnts;
    var secon;

    if (time.toString().length == 13) {
      // const today = (new Date().getTime());
      let today = this.currentTime;
      let end = (new Date(time).getTime());
      secon = (end - today) / 1000;
      let s = (new Date(time).getSeconds());

      if (secon < 0)
        secon = secon * -1;
    }
    else {
      // time = time/1000;
      secon = time / 1000;
    }

    // time = time/1000;
    //let secon = time/1000;
    // let secon = time;
    days = Math.floor(secon / (3600 * 24));
    secon -= days * 3600 * 24;
    hrs = Math.floor(secon / 3600);
    secon -= hrs * 3600;
    mnts = Math.floor(secon / 60);
    secon -= mnts * 60;
    secon = Math.floor(secon);

    this.remainingdate = days != 0 ? days + "d " + hrs + "h " + mnts + "m " + secon + "s " : hrs + "h " + mnts + "m " + secon + "s ";
    this.remainingdate;
  }
  getdetails() {

    this.orgId = this.ssoAuthService.getOrgId();
    this.deviceData = JSON.parse(sessionStorage.getItem(`${this.ssoAuthService.getTabId()}calix.deviceData`));

    this.deviceService.getDeviceDetails(this.orgId, this.deviceData[this.index].serialNumber, this.deviceData[this.index].macAddress)
      .subscribe((data: any) => {

        this.deviceDetail = data;


      });

  }
  ngOnDestroy() {
    this.languageSubject.unsubscribe();
  }

  totalsymbol(serialno, place) {

    let a;
    if (this.rmode) {
      for (var element of this.rmode) {
        if (element.serialNumber == serialno) {
          if (element.warning == place) {
            switch (element.warning) {
              case 'ssR': if (place == 'ssR') return 'ssR';
              case 'dhyRW': if (place == 'dhyRW') return 'dhyRW';
              case 'rmode': if (place == 'rmode') return 'rmode';
              case 'LES': if (place == 'LES') return 'LES';
              default: return "";
            }
          }

        }
      }
    }
    else return false;

  }

}
