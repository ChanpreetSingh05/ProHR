import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserData } from '../Employees/user-data.model';
import { CalendarshiftsService } from 'src/app/Calendar/calendarshifts.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  selectedValue: string;
  employeeSub: Subscription;
  employees: any[] = [];
  selected: UserData;
  boolsel = false;
  admin = false;

  constructor(private calendarshift: CalendarshiftsService, private router: Router) { }

  ngOnInit() {
    this.calendarshift.getEmployees();
    this.employeeSub = this.calendarshift.getEmployeeUpdateListener()
      .subscribe((employee) => {
        this.employees = employee;
        // this.isLoading = false;
        console.log(this.employees);
      });
  }

  GetDetail(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.calendarshift.postShift(form.value.employee, this.datevalue);
    // _id: form.value.employee.id,
    this.router.navigate(['/admin/employeedetails', form.value.employee.id || 'all']);
  }

}
