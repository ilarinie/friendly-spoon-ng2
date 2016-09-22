import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Authentication} from './authentication';
import { FriendlyApiService } from "../services/friendlyapi.service";


@Component({
  selector: 'login',
  templateUrl: 'login.html',

})

export class Login {
  error: boolean = false;

  loggingIn: boolean = false;
  loginFailed: boolean = false;

  email: string;
  password: string;

  constructor(public auth: Authentication, public router: Router, private friendlyApiService: FriendlyApiService) {



  }


  button() {
    this.auth.canActivate().then(res => console.log(res))
  }
  check() {

  }


  submit() {
    this.loggingIn = true;
    this.auth.login(this.email, this.password)
      .then(
      res => {
        if (res == "failed to log in") {
          this.loggingIn = false;
          this.loginFailed = true;
        } else {
          this.router.navigate(['/'])
          //load static assets if not in browser cache
          if (localStorage.getItem("durations") == null || localStorage.getItem("levels")) {
            this.friendlyApiService.getDurations().then(durations => localStorage.setItem("durations", JSON.stringify(durations)))
            this.friendlyApiService.getLevels().then(levels => localStorage.setItem("levels", JSON.stringify(levels)))
          }
        }

      }
      );
  }
}
