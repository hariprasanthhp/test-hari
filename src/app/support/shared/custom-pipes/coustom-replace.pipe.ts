import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customReplace'
})
export class CustomReplacePipe implements PipeTransform {

  transform(value: string,target,replaceVal): any {
    if (!value) {
      return value;
    }
    // Replace with the specified character
    var regExp = new RegExp(target); 
    var re = /PSK/gi;
    value = value.replace(re,'Personal');
    return value.replace(regExp, replaceVal);
   }
} 