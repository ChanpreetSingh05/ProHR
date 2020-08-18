import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(employee: any, name: any): any {
    if (name === undefined) {
      return employee;
    }
    // tslint:disable-next-line: only-arrow-functions
    return employee.filter(function(emp) {
      return emp.name.toLowerCase().includes(name.toLowerCase());
    });
  }

}
