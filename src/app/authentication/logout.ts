import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, ControlGroup, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Authentication} from './authentication';

@Component({
  selector: 'logout',
  directives: [NgIf],
  templateUrl: 'logout.html'
})

export class Logout implements OnInit {
  form: ControlGroup;
  error: boolean = false;
  constructor(public auth: Authentication, public router: Router) {
  }

  ngOnInit() {
    this.auth.logout();
  }
}
