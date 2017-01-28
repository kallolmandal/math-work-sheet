import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    function z(n) { return (n < 10 ? '0' : '') + n; }
    let seconds = value % 60;
    let minutes = Math.floor(value % 3600 / 60);
    let hours = Math.floor(value / 3600);
    return (z(hours) + ':' + z(minutes) + ':' + z(seconds));
  }

}
