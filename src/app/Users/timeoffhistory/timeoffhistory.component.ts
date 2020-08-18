import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeOff, gettimeoff } from '../time-off.model';
import { TimeoffService } from '../timeoff.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-timeoffhistory',
  templateUrl: './timeoffhistory.component.html',
  styleUrls: ['./timeoffhistory.component.css']
})
export class TimeoffhistoryComponent implements OnInit, OnDestroy {
  timeoffs: any[] = [];
  isLoading = false;
  private timeoffSub: Subscription;
  constructor(private timeoffService: TimeoffService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    const userid = this.authService.getUserId();
    this.timeoffService.getTimeoffs();
    this.timeoffSub = this.timeoffService.gettimeoffsUpdateListener()
      .subscribe((timeoff: any[]) => {
        this.timeoffs = timeoff.filter(res => {
          return res.userid.match(userid);
        });
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.timeoffSub.unsubscribe();
  }

}
