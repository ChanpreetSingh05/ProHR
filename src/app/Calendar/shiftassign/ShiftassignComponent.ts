import { Component, OnInit } from '@angular/core';
import { CalendarshiftsService } from '../calendarshifts.service';
import { DatePipe, formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shiftassign',
    templateUrl: './shiftassign.component.html',
    styleUrls: ['./shiftassign.component.css']
    // providers: [DatePipe]
})
export class ShiftassignComponent implements OnInit {
    selectedValue: string;
    datevalue: string;
    value: Date;
    employeeSub: Subscription;
    employees: any[] = [];
    //   { value: 'steak-0', viewValue: 'Steak' },
    //   { value: 'pizza-1', viewValue: 'Pizza' },
    //   { value: 'tacos-2', viewValue: 'Tacos' }
    // ];
    constructor(private calendarshift: CalendarshiftsService,
                // public datePipe: DatePipe,
                private router: Router,
                private dialogRef: MatDialogRef<ShiftassignComponent>) { }
    ngOnInit() {
        const datePipe = new DatePipe('en-US');
        this.value = this.calendarshift.getDate();
        this.datevalue = datePipe.transform(this.value, 'MM-dd-y');
        // this.datevalue = formatDate(this.value, 'MM-dd-y', this.locale);
        this.calendarshift.getEmployees();
        this.employeeSub = this.calendarshift.getEmployeeUpdateListener()
            .subscribe((employee) => {
                this.employees = employee;
                // this.isLoading = false;
            });
    }
    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        // this.calendarshift.postShift(form.value.employee, this.datevalue);
        this.calendarshift.postShift(form.value.employee.name, form.value.employee.id, form.value.employee.position, this.datevalue);
        console.log(form.value.employee.name + ' aur ' + form.value.employee.id + form.value.employee.position);
        // this.dialogRef.close();
        // this.router.navigate(['calendar']);
        this.dialogRef.close();
    }
}
