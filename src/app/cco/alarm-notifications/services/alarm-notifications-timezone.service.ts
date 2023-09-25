import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlarmNotificationsTimezoneService {
  constructor() {}

  timeZone = [
    { name: 'America/Chicago', id : "GMT-0600 (Central Standard Time)" },
    { name: 'America/Denver', id : "GMT-0700 (Mountain Standard Time)" },
    { name: 'America/Phoenix', id : "GMT-0700 (Mountain Standard Time)" },
    { name: 'America/Los_Angeles', id : "GMT-0800 (Pacific Standard Time)" },
    { name: 'Pacific/Honolulu', id : "GMT-0900 (Alaska Standard Time)" },
    { name: 'America/Anchorage', id : "GMT-1000 (Hawaii-Aleutian Standard Time)" }
  ];

  getTimeZones(): any {
    // let arr = [];

    // this.timeZone.forEach((e) => {
    //   e['id'] = e.name;

    //   arr.push(e);
    // });

    return this.timeZone;
  }
}
