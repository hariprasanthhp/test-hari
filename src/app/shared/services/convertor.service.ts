import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertorService {

  constructor() { }

  bytes(bytes, label, isFirst?: any) {
    var s = ['b', 'KB', 'MB', 'GB', 'TB', 'PB'],
      tempLabel = [],
      count;

    var e, value;
    if (bytes == 0)
      return 0;

    if (isFirst)
      count = 0;

    e = Math.floor(Math.log(bytes) / Math.log(1024));
    value = (bytes / Math.pow(1024, Math.floor(e))).toFixed(2);

    tempLabel[count] = value;
    if (count > 0 && Math.abs(tempLabel[count - 1] - tempLabel[count]) < 0.0001)
      value = (bytes / Math.pow(1024, Math.floor(--e))).toFixed(2);

    e = (e < 0) ? (-e) : e;
    if (label) value += ' ' + s[e];

    count++;
    return value;
  }

  bits(bytes, label, isFirst) {
    var s = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps'],
      tempLabel = [],
      count;

    var e, value;
    if (bytes == 0)
      return 0;

    if (isFirst)
      count = 0;

    e = Math.floor(Math.log(bytes) / Math.log(1024));
    value = (bytes / Math.pow(1024, Math.floor(e))).toFixed(2);

    tempLabel[count] = value;
    if (count > 0 && Math.abs(tempLabel[count - 1] - tempLabel[count]) < 0.0001)
      value = (bytes / Math.pow(1024, Math.floor(--e))).toFixed(2);

    e = (e < 0) ? (-e) : e;
    if (label) value += ' ' + s[e];

    count++;
    return value;
  }


  getStackedUnit(m) {
    let unit: any;
    if (m > 1099511627776) {
      unit = [1099511627776, 'TB'];
    } else if (m > 1073741824) {
      unit = [1073741824, 'GB'];
    } else if (m > 1048576) {
      unit = [1048576, 'MB'];
    } else if (m > 1024) {
      unit = [1024, 'KB'];
    } else {
      unit = [1, 'KB'];
    }
    return unit;
  }

  getStackedUnitUpdate(m) {
    let unit: any;
    if (m > 1099511627776) {
      unit = [1099511627776, 'T'];
    } else if (m > 1073741824) {
      unit = [1073741824, 'G'];
    } else if (m > 1048576) {
      unit = [1048576, 'M'];
    } else if (m > 1024) {
      unit = [1024, 'K'];
    } else {
      unit = [1, ''];
    }
    return unit;
  }

  kbpsTO(m, valueOnly?, UnitOnly?) {
    let unit: any;
    let units: any = [];
    m = parseInt(m);
    if (m > 1000000000) {
      unit = (m / 1000000000).toFixed(2) + 'T';
      units = [(m / 1000000000).toFixed(2), 'T'];
    } else if (m > 1000000) {
      unit = (m / 1000000).toFixed(2) + 'G';
      units = [(m / 1000000).toFixed(2), 'G'];
    } else if (m > 1000) {
      unit = (m / 1000).toFixed(2) + 'M';
      units = [(m / 1000).toFixed(2), 'M'];
    } else {
      unit = m + 'K';
      units = [m, 'K'];
    }
    if (valueOnly) {
      return units[0];
    } else if (UnitOnly) {
      return units[1];
    }
    return unit;
  }

  getByteInfo(pointValue, bps?) {
    let unit;
    if (bps) {
      unit = this.getStackedUnitUpdate(pointValue);
    } else {
      unit = this.getStackedUnit(pointValue);
    }
    let displayValue = (pointValue / unit[0]).toFixed(2);
    return (displayValue == '0.00' ? '0' : displayValue) + ' ' + unit[1];
  }

}
