import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import more from 'highcharts/highcharts-more';
more(Highcharts);

@Injectable({
  providedIn: 'root'
})
export class FaUtilsService {

  constructor() { }

  bitsToSize(bits: any, round?: any) {
    let bytes = bits;


    let sizes = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
    if (bytes == 0) return '0';


    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
    let sizeformate = sizes[i] ?? 'bits';
    if (round) {
      return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizeformate;
    }
    return Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), 2) + ' ' + sizeformate;
  }
}
