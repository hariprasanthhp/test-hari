import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortnumber'
})
export class ShortnumberPipe implements PipeTransform {

  transform(number: number, round: Boolean = true, tofix? ) {
    if(tofix){
    }else{
      tofix = 2;
    }
    if (round) {
      //note : 1e3 == 10pow(3) = 10 * 10 *10 = 1000
      if (number == 0 || number == undefined) {
        return 0;
      }
      else {
        if (number >= 0) {
          if (number < 1e3) return number;
          if (number >= 1e3 && number < 1e6) return (number / 1e3).toFixed(tofix) + " K";
          if (number >= 1e6 && number < 1e9) return (number / 1e6).toFixed(tofix) + " M";
          if (number >= 1e9 && number < 1e12) return (number / 1e9).toFixed(tofix) + " G";
          if (number >= 1e12 && number < 1e15) return (number / 1e12).toFixed(tofix) + " T";
          if (number >= 1e15 && number < 1e18) return (number / 1e15).toFixed(tofix) + " P";
          if (number >= 1e18 && number < 1e21) return (number / 1e18).toFixed(tofix) + " E";
          if (number >= 1e21 && number < 1e24) return (number / 1e21).toFixed(tofix) + " Z";
          if (number >= 1e24) return (number / 1e24).toFixed(tofix) + " Y"
        }
        else {
          if (number > -(1e3)) return number;
          if (number <= -(1e3) && number > -(1e6)) return (number / 1e3).toFixed(tofix) + " K";
          if (number <= -(1e6) && number > -(1e9)) return (number / 1e6).toFixed(tofix) + " M";
          if (number <= -(1e9) && number > -(1e12)) return (number / 1e9).toFixed(tofix) + " G";
          if (number <= -(1e12) && number > -(1e15)) return (number / 1e12).toFixed(tofix) + " T";
          if (number <= -(1e15) && number > -(1e18)) return (number / 1e15).toFixed(tofix) + " P";
          if (number <= -(1e18) && number > -(1e21)) return (number / 1e18).toFixed(tofix) + " E";
          if (number <= -(1e21) && number > -(1e24)) return (number / 1e21).toFixed(tofix) + " Z";
          if (number <= -(1e24)) return (number / 1e24).toFixed(tofix) + " Y";
        }

      }
    }
    else {
      if (number == 0 || number == undefined) {
        return 0;
      }
      if (number >= 0) {
        if (number < 1e3) return number;
        if (number >= 1e3 && number < 1e6) return (number / 1e3) + " K";
        if (number >= 1e6 && number < 1e9) return (number / 1e6) + " M";
        if (number >= 1e9 && number < 1e12) return (number / 1e9) + " G";
        if (number >= 1e12 && number < 1e15) return (number / 1e12) + " T";
        if (number >= 1e15 && number < 1e18) return (number / 1e15) + " P";
        if (number >= 1e18 && number < 1e21) return (number / 1e18) + " E";
        if (number >= 1e21 && number < 1e24) return (number / 1e21) + " Z";
        if (number >= 1e24) return (number / 1e24) + " Y";
      }
      else {

        if (number > -(1e3)) return number;
        if (number <= -(1e3) && number > -(1e6)) return (number / 1e3) + " K";
        if (number <= -(1e6) && number > -(1e9)) return (number / 1e6) + " M";
        if (number <= -(1e9) && number > -(1e12)) return (number / 1e9) + " G";
        if (number <= -(1e12) && number > -(1e15)) return (number / 1e12) + " T";
        if (number <= -(1e15) && number > -(1e18)) return (number / 1e15) + " P";
        if (number <= -(1e18) && number > -(1e21)) return (number / 1e18) + " E";
        if (number <= -(1e21) && number > -(1e24)) return (number / 1e21) + " Z";
        if (number <= -(1e24)) return (number / 1e24) + " Y";
      }
    }
  }
}


