import {Component} from '@angular/core';
import { FormBuilder, Validators, ControlGroup, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Authentication} from './authentication';
import { FriendlyApiService } from "../services/friendlyapi.service";
import {MdInput} from "@angular2-material/input";


@Component({
  selector: 'login',
  directives: [NgIf, MdInput],
  templateUrl: 'login.html',
  providers: [FormBuilder],
  moduleId: module.id,

})

export class Login {
  error: boolean = false;

  loggingIn: boolean = false;

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

        this.router.navigate(['/'])
        //load static assets if not in browser cache
        if (localStorage.getItem("durations") == null || localStorage.getItem("levels")) {
          this.friendlyApiService.getDurations().then(durations => localStorage.setItem("durations", JSON.stringify(durations)))
          this.friendlyApiService.getLevels().then(levels => localStorage.setItem("levels", JSON.stringify(levels)))
        }

      }
      );
  }
}
