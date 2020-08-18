import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Calendar } from './calendarshifts.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CalendarshiftsService {
  private date: Date;
  private shifts: any[] = [];

  employees: any[] = [];
  private employeesUpdated = new Subject<any[]>();
  private shiftsUpdated = new Subject<Calendar[]>();

  constructor(private http: HttpClient, private router: Router) { }

  setDate(date) {
    this.date = date;
  }

  getDate() {
    return this.date;
  }

  postShift(name, id, position, date) {
    // tslint:disable-next-line: object-literal-shorthand
    const Data = { name: name, id: id, position: position, date: date };
    this.http
      .post<{ result: any }>('http://localhost:3000/api/shifts', Data)
      .subscribe(response => {
        const b: Date = new Date(response.result.Date);
        const titl = response.result.name;

        this.shifts.push({start: b, title: titl});
        this.shiftsUpdated.next([...this.shifts]);
      });
  }

  // Calendar ppicks only start and title variables
  getShift() {
    // return [...this.posts];
    this.http.get<{ message: string, shifts: any }>(
      'http://localhost:3000/api/shifts'
    )
      .pipe(map((shiftData) => {
        return shiftData.shifts.map((shift) => {
          return {
            start: new Date(shift.Date),
            title: shift.name
            // id: shift._id,
            // position: shift.position,
            // date: shift.Date
          };
        });
      }))
      .subscribe(TransformedData => {
        this.shifts = TransformedData;
        this.shiftsUpdated.next([...this.shifts]);
      });
  }

  getList() {
    // return [...this.posts];
    this.http.get<{ message: string, shifts: any }>(
      'http://localhost:3000/api/shifts'
    )
      .pipe(map((shiftData) => {
        return shiftData.shifts.map((shift) => {
          return {
            _id: shift._id,
            start: new Date(shift.Date),
            title: shift.name,
            id: shift.employee_id,
            position: shift.position,
            date: shift.Date
          };
        });
      }))
      .subscribe(TransformedData => {
        this.shifts = TransformedData;
        this.shiftsUpdated.next([...this.shifts]);
      });
  }

  getshiftsUpdateListener(): Observable<any> {
    return this.shiftsUpdated.asObservable();
  }

  getEmployees() {
    // return [...this.posts];
    this.http.get<{ message: string, employee: any }>(
      'http://localhost:3000/api/employee'
    )
      .pipe(map((employeeData) => {
        return employeeData.employee.map((employee) => {
          return {
            name: employee.name,
            id: employee._id,
            position: employee.position,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            dob: employee.dob,
            hiring: employee.hiring,
            gender: employee.gender
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

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/shifts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.shifts.filter(post => post._id !== postId);
        this.shifts = updatedPosts;
        this.shiftsUpdated.next([...this.shifts]);
      });
  }
}
