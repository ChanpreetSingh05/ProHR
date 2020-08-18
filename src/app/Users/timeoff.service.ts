import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TimeOff } from './time-off.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeoffService {
  private timeoffs: TimeOff[] = [];
  private timeoffsUpdated = new Subject<TimeOff[]>();

  constructor(private http: HttpClient, private router: Router) { }

  req_timeoff(from: Date, to: Date, reason: string, name: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const Data: any = { from: from, to: to, reason: reason, name: name, userid: '' };
    this.http
      .post<{result: any}>('http://localhost:3000/api/timeoff', Data)
      .subscribe(response => {
        console.log(response.result);
        // const updated = Data;
        this.timeoffs.push(response.result) ;
        this.timeoffsUpdated.next([...this.timeoffs]);
      });
  }

  getTimeoffs() {
    // return [...this.posts];
    this.http.get<{ message: string, timeoffs: any }>(
      'http://localhost:3000/api/timeoff'
    )
      .pipe(map((timeoffData) => {
        return timeoffData.timeoffs.map((timeoff) => {
          return {
            _id: timeoff._id,
            name: timeoff.username,
            from: timeoff.from,
            to: timeoff.to,
            reason: timeoff.reason,
            userid: timeoff.userid,
            status: timeoff.status
          };

        });
      }))
      .subscribe(TransformedData => {
        this.timeoffs = TransformedData;
        this.timeoffsUpdated.next([...this.timeoffs]);
      });
  }

  gettimeoffsUpdateListener() {
    return this.timeoffsUpdated.asObservable();
  }

  updateTimeoff(id: string, userid: string, status: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const update = {id: id, userid: userid, status: status };
    this.http
      .put('http://localhost:3000/api/timeoff', update)
      .subscribe(response => {
        console.log(response);
        this.timeoffs.find(item => item._id === update.id).status = update.status;
        this.timeoffsUpdated.next([...this.timeoffs]);
      });
  }

}
