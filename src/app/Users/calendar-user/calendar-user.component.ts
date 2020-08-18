import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Subscription } from 'rxjs';

import { OptionsInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarshiftsService } from 'src/app/Calendar/calendarshifts.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Calendar } from 'src/app/Calendar/calendarshifts.model';

@Component({
  selector: 'app-calendar-user',
  templateUrl: './calendar-user.component.html',
  styleUrls: ['./calendar-user.component.css']
})
export class CalendarUserComponent implements OnInit, OnDestroy {
  calendarPlugins = [dayGridPlugin];
  shifts: any[] = [];
  isLoading = false;
  shiftSub: Subscription;

  calendarOptions: OptionsInput;
  events: any[] = [];
  calendarEvents: any[] = [];

  @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;

  constructor(public authService: AuthService, private calendarshift: CalendarshiftsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.calendarshift.getList();
    const userid = this.authService.getUserId();
    this.shiftSub = this.calendarshift.getshiftsUpdateListener()
      .subscribe((shift: Calendar[]) => {
        this.calendarEvents = shift.filter(res => {
          return res.id.match(userid);
        });
        // this.calendarEvents = shift;
        this.isLoading = false;
        // this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.shiftSub.unsubscribe();
  }

}
