import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimeoffService } from '../timeoff.service';
import { EmployeeService } from 'src/app/Admin/Employees/employee.service';
import { UserData } from 'src/app/Admin/Employees/user-data.model';
import * as moment from 'moment';

@Component({
  selector: 'app-timeoff',
  templateUrl: './timeoff.component.html',
  styleUrls: ['./timeoff.component.css']
})
export class TimeoffComponent implements OnInit {
  emp: UserData;
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment(new Date()).format('YYYY-MM-DD');
  constructor(private timeoffservice: TimeoffService, private empService: EmployeeService) { }

  ngOnInit() {
    console.log(this.minDate);
    this.empService.getSinglePost().subscribe((newemp: UserData) => {
      this.emp = {
        _id: newemp._id,
        name: newemp.name,
        email: newemp.email,
        phone: newemp.phone,
        address: newemp.address,
        position: newemp.position,
        dob: newemp.dob,
        hiring: newemp.hiring,
        gender: newemp.gender,
        imagePath: newemp.imagePath
      };
    });
  }

  onKey(event) {
    const inputValue = event.target.value;
    console.log(inputValue);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.timeoffservice.req_timeoff(form.value.from, form.value.to, form.value.reason, this.emp.name);
    form.resetForm();
  }

}
