import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: UserData[] = [];
  private employeesUpdated = new Subject<UserData[]>();

  constructor(private http: HttpClient, private router: Router) { }

  createemployee(name: string, email: string, phone: number, address: string, dob: Date, hiring: Date, gender: string, position: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const authData: any = {
      name,
      email,
      phone,
      address,
      dob, hiring, gender, position
    };
    this.http
      .post('http://localhost:3000/api/employee', authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['employeelist']);
      });
  }

  getEmployees() {
    // return [...this.posts];
    this.http.get<{ message: string, employee: any }>(
      'http://localhost:3000/api/employee'
    )
      .pipe(map((employeeData) => {
        return employeeData.employee.map((employee) => {
          return {
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            address: employee.address,
            phone: employee.phone,
            dob: employee.dob,
            hiring: employee.hiring,
            gender: employee.gender,
            position: employee.position
          };
        });
      }))
      .subscribe(TransformedData => {
        this.employees = TransformedData;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  geteditabletPost(id: string) {
    return this.http.get<{ _id: string;
      imagePath: string;
      name: string;
      email: string;
      phone: number;
      address: string;
      dob: Date;
      hiring: Date;
      gender: string;
      position: string; }>('http://localhost:3000/api/employee/' + id);
    // { ...this.posts.find(p => p.id === id) };
  }

  getSinglePost() {
    return this.http.get<{ _id: string;
      imagePath: string;
      name: string;
      email: string;
      phone: number;
      address: string;
      dob: Date;
      hiring: Date;
      gender: string;
      position: string; }>('http://localhost:3000/api/employee/detail/');
    // { ...this.posts.find(p => p.id === id) };
  }

  // tslint:disable-next-line: max-line-length
  updatePost(id: string, name: string, email: string, phone: number, address: string, dob: Date, hiring: Date, gender: string, position: string) {
    const authData: any = {
      name,
      email,
      phone,
      address,
      dob, hiring, gender, position
    };
    this.http.put('http://localhost:3000/api/employee/' + id, authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['employeelist']);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/employee/' + postId)
      .subscribe(() => {
        const updatedPosts = this.employees.filter(post => post._id !== postId);
        this.employees = updatedPosts;
        this.employeesUpdated.next([...this.employees]);
        // this.router.navigate(['employeelist']);
      });
  }

}
