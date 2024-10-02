import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hms'
})
export class HmsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value == 'number') {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      const seconds = value % 60;
      let result;

      if (!!minutes) {
        result = `${hours.toString()}:${minutes
          .toString()
          .padStart(2, '0')}`;
      } else {
        result = `00:${seconds.toString().padStart(2, '0')}`;
      }

      return result;
    } else {
      return value;
    }
  }

}
