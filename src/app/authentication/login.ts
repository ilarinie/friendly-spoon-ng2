import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Authentication} from './authentication';
import { FriendlyApiService } from "../services/friendlyapi.service";
import {fadeIn} from "../animations";



@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['signin.scss'],
  animations: [fadeIn]

})

export class Login {
  error: boolean = false;

  loggingIn: boolean = false;
  loginFailed: boolean = false;

  email: string;
  password: string;
  form: FormGroup;

  constructor(
    public auth: Authentication,
    public router: Router,
    private friendlyApiService: FriendlyApiService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      'email': [],
      'password': []
    })


  }


  button() {
    this.auth.canActivate().then(res => console.log(res))
  }
  check() {

  }


  submit(value: any, valid: boolean) {
    this.loggingIn = true;
    this.auth.login(value.email, value.password)
      .then(
      res => {
        this.router.navigate(['/']);
        //load static assets if not in browser cache
        if (localStorage.getItem("durations") == null || localStorage.getItem("levels")) {
          this.friendlyApiService.getDurations().then(durations => localStorage.setItem("durations", JSON.stringify(durations)));
          this.friendlyApiService.getLevels().then(levels => localStorage.setItem("levels", JSON.stringify(levels)))
        }
      }
      ).catch(error => {
        this.loggingIn = false
        this.loginFailed = true;
      }
      );
  }
}
