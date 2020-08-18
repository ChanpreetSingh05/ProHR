import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Calendar } from '../calendarshifts.model';
import { Subscription } from 'rxjs';
import { CalendarshiftsService } from '../calendarshifts.service';
import { ShiftassignComponent } from '../shiftassign/ShiftassignComponent';

import { OptionsInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-shiftscalender',
  templateUrl: './shiftscalender.component.html',
  styleUrls: ['./shiftscalender.component.css']
})
export class ShiftscalenderComponent implements OnInit, OnDestroy {
  calendarPlugins = [dayGridPlugin];
  shifts: any[] = [];
  isLoading = false;
  shiftSub: Subscription;

  calendarOptions: OptionsInput;
  events: any[] = [];

  @ViewChild('fullcalendar', {static: false}) fullcalendar: FullCalendarComponent;

  constructor(private dialog: MatDialog, private calendarservice: CalendarshiftsService) { }

  calendarEvents: any[] = [];

  dayRender(args) {
    args.el.onclick = (ev: MouseEvent) => {
      this.calendarservice.setDate(args.date);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(ShiftassignComponent);
    };
  }

  ngOnInit() {
    this.calendarservice.getShift();
    this.shiftSub = this.calendarservice.getshiftsUpdateListener()
      .subscribe((shift: any[]) => {
        this.calendarEvents = shift;
        console.log(this.calendarEvents);
      });
  }

  ngOnDestroy() {
    this.shiftSub.unsubscribe();
  }

}
