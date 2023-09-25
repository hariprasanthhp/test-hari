import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor() { }

  timeZone = [{ "name": "Etc/GMT+12" },
  { "name": "Pacific/Pago_Pago" }, { "name": "Pacific/Apia" },
  { "name": "America/Adak" }, { "name": "Pacific/Honolulu" },
  { "name": "Pacific/Marquesas" }, { "name": "Pacific/Gambier" },
  { "name": "America/Anchorage" }, { "name": "America/Los_Angeles" },
  { "name": "Pacific/Pitcairn" }, { "name": "America/Phoenix" },
  { "name": "America/Denver" }, { "name": "America/Guatemala" },
  { "name": "America/Chicago" }, { "name": "Pacific/Easter" },
  { "name": "America/Bogota" }, { "name": "America/New_York" },
  { "name": "America/Caracas" }, { "name": "America/Halifax" },
  { "name": "America/Santo_Domingo" }, { "name": "America/Santiago" },
  { "name": "America/St_Johns" }, { "name": "America/Godthab" },
  { "name": "America/Argentina/Buenos_Aires" }, { "name": "America/Montevideo" },
  { "name": "America/Noronha" },
  { "name": "Atlantic/Azores" }, { "name": "Atlantic/Cape_Verde" },
  { "name": "UTC" }, { "name": "Europe/London" },
  { "name": "Europe/Berlin" }, { "name": "Africa/Lagos" },
  { "name": "Africa/Windhoek" }, { "name": "Asia/Beirut" },
  { "name": "Africa/Johannesburg" }, { "name": "Asia/Baghdad" },
  { "name": "Europe/Moscow" }, { "name": "Asia/Tehran" },
  { "name": "Asia/Dubai" }, { "name": "Asia/Baku" },
  { "name": "Asia/Kabul" }, { "name": "Asia/Yekaterinburg" },
  { "name": "Asia/Karachi" }, { "name": "Asia/Calcutta" },
  { "name": "Asia/Kathmandu" }, { "name": "Asia/Dhaka" },
  { "name": "Asia/Omsk" }, { "name": "Asia/Rangoon" },
  { "name": "Asia/Krasnoyarsk" }, { "name": "Asia/Jakarta" },
  { "name": "Asia/Shanghai" },
  { "name": "Asia/Irkutsk" },
  { "name": "Australia/Eucla" }, { "name": "Asia/Yakutsk" },
  { "name": "Asia/Tokyo" }, { "name": "Australia/Darwin" },
  { "name": "Australia/Adelaide" }, { "name": "Australia/Brisbane" },
  { "name": "Asia/Vladivostok" }, { "name": "Australia/Sydney" },
  { "name": "Australia/Lord_Howe" }, { "name": "Asia/Kamchatka" },
  { "name": "Pacific/Noumea" }, { "name": "Pacific/Norfolk" },
  { "name": "Pacific/Auckland" }, { "name": "Pacific/Majuro" },
  { "name": "Pacific/Chatham" }, { "name": "Pacific/Tongatapu" },
  { "name": "Pacific/Apia" }, { "name": "Pacific/Kiritimati" }]

  getTimeZones(): any {
    let arr = [];

    this.timeZone.forEach((e) => {
      e['id'] = e.name;

      arr.push(e);
    });

    return arr;
  }
}
