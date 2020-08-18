import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shiftsname'
})
export class ShiftsnamePipe implements PipeTransform {

  transform(shifts: any, title: any): any {
    if (title === undefined) {
      return shifts;
    }
    // tslint:disable-next-line: only-arrow-functions
    return shifts.filter(function(shift) {
      return shift.title.toLowerCase().includes(title.toLowerCase());
    });
  }

}
