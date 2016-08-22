import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Authentication} from './authentication';

@Component({
  selector: 'logout',
  directives: [FORM_DIRECTIVES, NgIf],
  templateUrl: 'logout.html',
  moduleId: module.id
})

export class Logout implements OnInit {
  form: ControlGroup;
  error: boolean = false;
  constructor(public auth: Authentication, public router: Router) {
  }

  ngOnInit() {
    this.auth.logout();
    console.log("plaa");
  }
}
