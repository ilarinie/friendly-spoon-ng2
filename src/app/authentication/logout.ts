import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Authentication} from './authentication';

@Component({
  selector: 'logout',
  templateUrl: 'logout.html'
})

export class Logout implements OnInit {
  error: boolean = false;
  constructor(public auth: Authentication, public router: Router) {
  }

  ngOnInit() {
    this.auth.logout();
  }
}
