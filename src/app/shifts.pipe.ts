import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shifts'
})
export class ShiftsPipe implements PipeTransform {

  transform(shifts: any, position: any): any {
    if (position === undefined) {
      return shifts;
    }
    // tslint:disable-next-line: only-arrow-functions
    return shifts.filter(function(shift) {
      return shift.position.toLowerCase().includes(position.toLowerCase());
    });
  }

}
