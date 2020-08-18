import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public empService: EmployeeService, public authService: AuthService, public router: Router, public route: ActivatedRoute) { }
  public userId: string;
  emp: UserData;
  userisAdmin: boolean;
  private adminListenerSubs: Subscription;

  ngOnInit() {
    this.userisAdmin = this.authService.getAdmin();
    this.adminListenerSubs = this.authService.getAdminListener().subscribe(isAdmin => {
      this.userisAdmin = isAdmin;
    });

    this.route.params.pipe(
      switchMap((params: Params) => {
        // tslint:disable-next-line: no-string-literal
        return this.empService.geteditabletPost(params['ID']);
      })
    ).subscribe((newemp: UserData) => {
      this.emp = {
        _id: newemp._id,
        name: newemp.name,
        email: newemp.email,
        phone: newemp.phone,
        address: newemp.address,
        position: newemp.position,
        dob: newemp.dob,
        hiring: newemp.hiring,
        gender: newemp.gender,
        imagePath: newemp.imagePath
      };
    });
  }

  onDelete(id: string) {
    console.log(id);
    this.empService.deletePost(id);
  }

}
