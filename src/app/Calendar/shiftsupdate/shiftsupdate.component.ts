import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarshiftsService } from '../calendarshifts.service';
import { Subscription } from 'rxjs';
import { Calendar } from '../calendarshifts.model';

@Component({
  selector: 'app-shiftsupdate',
  templateUrl: './shiftsupdate.component.html',
  styleUrls: ['./shiftsupdate.component.css']
})
export class ShiftsupdateComponent implements OnInit, OnDestroy {
  // selectedValue: string;
  isLoading = false;
  datevalue: string;
  value: Date;
  search: string;
  private shiftSub: Subscription;
  shifts: Calendar[] = [];

  constructor(public calendarshift: CalendarshiftsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.calendarshift.getList();
    this.shiftSub = this.calendarshift.getshiftsUpdateListener()
      .subscribe((shift: Calendar[]) => {
        this.shifts = shift;
        this.isLoading = false;
        // this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.shiftSub.unsubscribe();
  }


  onDelete(id: string) {
    console.log(id);
    this.calendarshift.deletePost(id);
  }

}
