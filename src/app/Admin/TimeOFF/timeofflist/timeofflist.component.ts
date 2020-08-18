import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeoffService } from '../../../Users/timeoff.service';
import { TimeOff } from '../../../Users/time-off.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-timeofflist',
  templateUrl: './timeofflist.component.html',
  styleUrls: ['./timeofflist.component.css']
})
export class TimeofflistComponent implements OnInit, OnDestroy {
  timeoffs: TimeOff[] = [];
  accept: TimeOff[] = [];
  refused: TimeOff[] = [];
  isLoading = false;
  private timeoffSub: Subscription;
  userIsAuthenticated = false;
  userisAdmin: boolean;
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;

  constructor(private timeoffService: TimeoffService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.timeoffService.getTimeoffs();
    this.timeoffSub = this.timeoffService.gettimeoffsUpdateListener()
      .subscribe((timeoff: TimeOff[]) => {
        console.log(timeoff);
        this.timeoffs = timeoff.filter(res => {
          return res.status.match('Pending');
        });
        this.isLoading = false;
        this.accept = timeoff.filter(res => {
          return res.status.match('Accept');
        });
        this.refused = timeoff.filter(res => {
          return res.status.match('Reject');
        });

      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userisAdmin = this.authService.getAdmin();
    console.log('ed' + this.userisAdmin);
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.adminListenerSubs = this.authService.getAdminListener().subscribe(isAdmin => {
      this.userisAdmin = isAdmin;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
    this.timeoffSub.unsubscribe();
  }

  onAccept(id: string, userid: string) {
    this.timeoffService.updateTimeoff(id, userid, 'Accept');
  }

  onDelete(id: string, userid: string) {
    this.timeoffService.updateTimeoff(id, userid, 'Reject');
  }
}
