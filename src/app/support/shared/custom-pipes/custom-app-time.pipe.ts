import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customAppTime'
})
export class CustomAppTimePipe implements PipeTransform {

  transform(time: string): any {
    if (time === null || time === undefined || time === "") {
      return "";
    }
    const date = new Date();
    date.setHours(+time.slice(0, 2))
    date.setMinutes(+time.slice(2))
    return  date.toLocaleTimeString("bestfit", {
      hour12: !0,
      hour: "2-digit",
      minute: "2-digit"
  });
  }
} 