import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Calendar } from 'src/app/Calendar/calendarshifts.model';
import { CalendarshiftsService } from 'src/app/Calendar/calendarshifts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-shifts-user',
  templateUrl: './shifts-user.component.html',
  styleUrls: ['./shifts-user.component.css']
})
export class ShiftsUserComponent implements OnInit, OnDestroy {
  // selectedValue: string;
  isLoading = false;
  datevalue: string;
  value: Date;
  private shiftSub: Subscription;
  shifts: Calendar[] = [];

  constructor(public calendarshift: CalendarshiftsService, public authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.calendarshift.getList();
    const userid = this.authService.getUserId();
    this.shiftSub = this.calendarshift.getshiftsUpdateListener()
      .subscribe((shift: Calendar[]) => {
        this.shifts = shift.filter(res => {
          return res.id.match(userid);
        });
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
