import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { UserData } from '../user-data.model';
import { EmployeePipe } from '../../../employee.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
  employees: UserData[] = [];
  isLoading = false;
  employee: string;
  private employeeSub: Subscription;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.isLoading = true;
    this.employeeService.getEmployees();
    this.employeeSub = this.employeeService.getEmployeeUpdateListener()
      .subscribe((employee: UserData[]) => {
        this.employees = employee;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.employeeSub.unsubscribe();
  }

  onDelete(id: string) {
    console.log(id);
    this.employeeService.deletePost(id);
  }

}
