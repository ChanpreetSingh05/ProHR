import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarshiftsService } from 'src/app/Calendar/calendarshifts.service';
import { NgForm } from '@angular/forms';
import { UserData } from '../Employees/user-data.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  selectedValue: string;
  employeeSub: Subscription;
  employees: any[] = [];
  selected: UserData;
  boolsel = false;
  admin = false;
  constructor(private calendarshift: CalendarshiftsService, private authService: AuthService) { }

  ngOnInit() {
    this.calendarshift.getEmployees();
    this.employeeSub = this.calendarshift.getEmployeeUpdateListener()
      .subscribe((employee) => {
        this.employees = employee;
        // this.isLoading = false;
        console.log(this.employees);
      });
  }

  Submit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // console.log(this.selected.email + ' ' + form.value.admin);
    this.authService.createUser(this.selected.email, form.value.pass, this.selected._id, form.value.admin);
  }

  GetDetail(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.calendarshift.postShift(form.value.employee, this.datevalue);
    console.log(form.value.employee);
    this.selected = form.value.employee;
    this.selected = {
      _id: form.value.employee.id,
      name: form.value.employee.name,
      email: form.value.employee.email,
      phone: form.value.employee.phone,
      address: form.value.employee.address,
      position: form.value.employee.position,
      dob: form.value.employee.dob,
      hiring: form.value.employee.hiring,
      gender: form.value.employee.gender,
      imagePath: form.value.employee.imagePath
    };
    this.boolsel = true;
  }

}
