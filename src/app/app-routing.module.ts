import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateComponent } from './Admin/Employees/create/create.component';
import { ListComponent } from './Admin/Employees/list/list.component';
import { TimeoffComponent } from './Users/timeoff/timeoff.component';
import { TimeofflistComponent } from './Admin/TimeOFF/timeofflist/timeofflist.component';
import { ShiftscalenderComponent } from './Calendar/shiftscalender/shiftscalender.component';
import { DetailsComponent } from './Admin/Employees/details/details.component';
import { ShiftsupdateComponent } from './Calendar/shiftsupdate/shiftsupdate.component';
import { EmployeeLoginComponent } from './Admin/employee-login/employee-login.component';
import { EmployeeDetailComponent } from './Admin/employee-detail/employee-detail.component';
import { DashboardComponent } from './Dashboards/dashboard/dashboard.component';
import { ShiftsUserComponent } from './Users/shifts-user/shifts-user.component';
import { TimeoffhistoryComponent } from './Users/timeoffhistory/timeoffhistory.component';
import { AuthAdminGuard } from './auth/authadmin.guard';
import { CalendarUserComponent } from './Users/calendar-user/calendar-user.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: CalendarUserComponent },
      { path: 'shift-user', component: ShiftsUserComponent },
      { path: 'details/:ID', component: DetailsComponent },
      {
        path: 'reqtimeoff', component: TimeoffComponent,
        children: [
          { path: '', component: TimeoffhistoryComponent }
        ]
      }
    ]
  },
  {
    path: 'admin', component: DashboardComponent, canActivate: [AuthAdminGuard],
    children: [
      { path: '', component: ListComponent },
      { path: 'employeelogin', component: EmployeeLoginComponent },
      { path: 'employeedetails/:ID', component: DetailsComponent },
      { path: 'employeedetails', component: EmployeeDetailComponent },
      { path: 'restimeoff', component: TimeofflistComponent },
      { path: 'calendar', component: ShiftscalenderComponent },
      { path: 'shifts', component: ShiftsupdateComponent },
      { path: 'create', component: CreateComponent },
      { path: 'create/:ID', component: CreateComponent }
    ]
  }
  // { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthAdminGuard]
})
export class AppRoutingModule { }
