import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSelectModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatTabsModule
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { TimeoffComponent } from './Users/timeoff/timeoff.component';
import { TimeofflistComponent } from './Admin/TimeOFF/timeofflist/timeofflist.component';
import { CreateComponent } from './Admin/Employees/create/create.component';
import { ListComponent } from './Admin/Employees/list/list.component';
import { ShiftscalenderComponent } from './Calendar/shiftscalender/shiftscalender.component';
import { ShiftassignComponent } from './Calendar/shiftassign/ShiftassignComponent';
import { DetailsComponent } from './Admin/Employees/details/details.component';
import { ShiftsupdateComponent } from './Calendar/shiftsupdate/shiftsupdate.component';
import { EmployeeLoginComponent } from './Admin/employee-login/employee-login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FootbarComponent } from './footbar/footbar.component';
import { EmployeeDetailComponent } from './Admin/employee-detail/employee-detail.component';
import { DashboardComponent } from './Dashboards/dashboard/dashboard.component';
import { UserDashboardComponent } from './Dashboards/user-dashboard/user-dashboard.component';
import { ShiftsUserComponent } from './Users/shifts-user/shifts-user.component';
import { TimeoffhistoryComponent } from './Users/timeoffhistory/timeoffhistory.component';
import { ErrorComponent } from './error/error.component';
import { EmployeePipe } from './employee.pipe';
import { ShiftsPipe } from './shifts.pipe';
import { ShiftsnamePipe } from './shiftsname.pipe';
import { CalendarUserComponent } from './Users/calendar-user/calendar-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    TimeoffComponent,
    TimeofflistComponent,
    CreateComponent,
    ListComponent,
    ShiftscalenderComponent,
    ShiftassignComponent,
    DetailsComponent,
    ShiftsupdateComponent,
    EmployeeLoginComponent,
    SidebarComponent,
    FootbarComponent,
    EmployeeDetailComponent,
    DashboardComponent,
    UserDashboardComponent,
    ShiftsUserComponent,
    TimeoffhistoryComponent,
    ErrorComponent,
    EmployeePipe,
    ShiftsPipe,
    ShiftsnamePipe,
    CalendarUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatSidenavModule,
    MatDividerModule,
    FullCalendarModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ShiftassignComponent, ErrorComponent]
})
export class AppModule { }
