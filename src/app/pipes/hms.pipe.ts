import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hms'
})
export class HmsPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0 || isNaN(value)) return value.toString();

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);

    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2, '0')}`;
  }

}
