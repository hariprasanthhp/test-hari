import { Pipe, PipeTransform } from "@angular/core";
import * as Highcharts from 'highcharts/highstock';

@Pipe({
  name: 'unit_convert'
})
export class UnitConversionPipe implements PipeTransform {

  transform(value, ...args: string[]) {
    let down = false;
    if(value< 0){
      value = -value;
      down = true;
    }
    let bytes = parseFloat(value);
    let sizes = (args[0].toLowerCase() === 'rate') ? ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'] : ['pps', 'Kpps', 'Mpps', 'Gpps', 'Tpps'];
    if (bytes == 0 && args[0].toLowerCase() === 'rate') return '0 bps';
    if (bytes == 0 && args[0].toLowerCase() === 'packet') return '0 pps';
    var i = (Math.floor(Math.log(bytes) / Math.log(1000)));
    var val = Highcharts.numberFormat(Math.abs(bytes / Math.pow(1000, i)), 2) + ' ' + sizes[i]
    return down ? '-' + val : val;
  }

}
