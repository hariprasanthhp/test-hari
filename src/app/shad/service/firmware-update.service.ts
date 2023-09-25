import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Subject } from 'rxjs';
const $: any = require('jquery');

@Injectable({
  providedIn: 'root'
})
export class FirmwareUpdateService {

  constructor(private http: HttpClient) { }

  public result$ = new Subject();


  getfmList(data?: any): any {
    return this.http.get(environment.SP_API_BASE_URL + '/swupgrade/firmware/list?limit=10000');
  }

  getRouterFWVersions() {
    return this.http.get(environment.SP_API_BASE_URL + '/swupgrade/router/firmwareversion?limit=10000');

  }

  getRouterMac() {
    return this.http.get(environment.SP_API_BASE_URL + '/swupgrade/router/list');

  }

  getTimeZones(): any {
    return this.http.get(environment.SP_API_BASE_URL + '/schedule/timezone');
  }

  getModelNumber(firmwareVersion: any): any {
    return this.http.get(environment.SP_API_BASE_URL + '/swupgrade/router/modelnumber/by/firmwareversion?firmwareVersion=' + firmwareVersion + '&limit=10000');
  }

  appendMAC(firmwareVersion, modelNumber, macAddr) {
    var mparams = {};
    var fields = $('#mac-address-form').serializeArray();
    $.each(fields, function (i, field) {
      if (typeof mparams[field.name] != 'undefined') {
        if ($.type(mparams[field.name]) != 'array') {
          var old = mparams[field.name];
          mparams[field.name] = [old];
        }
        mparams[field.name].push(field.value);
      } else {
        mparams[field.name] = field.value;
      }
    });

    if (mparams['mac_address[]'] && $.type(mparams['mac_address[]']) != 'array') {
      var old = mparams['mac_address[]'];
      mparams['mac_address[]'] = [old];
    }

    this.http.get(environment.SP_API_BASE_URL + '/swupgrade/router/list?firmwareVersion=' + firmwareVersion + 'modelNumber=' + modelNumber + 'limit=100').subscribe();

  }


}

