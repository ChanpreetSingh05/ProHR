import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { UserData } from '../user-data.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isLoading = false;
  private mode = 'create';
  private empId: string;
  emp: UserData;

  constructor(public employeeservice: EmployeeService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('ID')) {
        this.mode = 'edit';
        this.empId = paramMap.get('ID');
        this.isLoading = true;
        this.employeeservice.geteditabletPost(this.empId).subscribe(postData => {
          this.isLoading = false;
          this.emp = {
            _id: postData._id, name: postData.name
            , email: postData.email
            , imagePath: postData.imagePath
            , phone: postData.phone
            , address: postData.address
            , dob: postData.dob
            , hiring: postData.hiring
            , gender: postData.gender
            , position: postData.position
          };
        });
      } else {
        this.mode = 'create';
        this.empId = null;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.employeeservice.createemployee(form.value.name, form.value.email,
        form.value.phone, form.value.address, form.value.dob, form.value.hiring, form.value.gender, form.value.position);
    } else {
      this.employeeservice.updatePost(this.empId, form.value.name, form.value.email,
        form.value.phone, form.value.address, form.value.dob, form.value.hiring, form.value.gender, form.value.position);
    }
    form.resetForm();
  }
}
