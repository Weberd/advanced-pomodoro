import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'seconds'
})
@Injectable({ providedIn: 'root' })
export class SecondsPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0 || isNaN(value)) return value.toString();

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = Math.floor(value % 60);

    if (hours == 0 && minutes == 0)
      return `${seconds.toString().padStart(2,'0')}`
    else
      return ''
  }

}
