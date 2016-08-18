import {Component} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Authentication} from './authentication';
import { FriendlyApiService } from "../services/friendlyapi.service";


@Component({
  selector: 'login',
  directives: [FORM_DIRECTIVES, NgIf],
  templateUrl: 'login.html',
  providers: [FormBuilder],
  moduleId: module.id,
})

export class Login {
  form: ControlGroup;
  error: boolean = false;
  constructor(fb: FormBuilder, public auth: Authentication, public router: Router, private friendlyApiService: FriendlyApiService) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  button() {
    console.log(this.auth.isExpired())
  }
  check() {

  }


  onSubmit(value: any) {
    this.auth.login(value.email, value.password)
      .then(
      res => {
        this.router.navigate(['/'])
        this.friendlyApiService.getDurations().then(durations => localStorage.setItem("durations", JSON.stringify(durations)))
        this.friendlyApiService.getLevels().then(levels => localStorage.setItem("levels", JSON.stringify(levels)))
      }
      );
  }
}
