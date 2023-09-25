import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, start: number, length: number, ellipsis = ''): unknown {
    if (value && value.length) {
      return value.length > length ? `${value.substring(start, length)}${ellipsis}` : value;
    }
    return '';
  }

}
