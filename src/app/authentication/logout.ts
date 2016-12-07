import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Authentication} from './authentication';
import {fadeIn} from "../animations";

@Component({
  selector: 'logout',
  templateUrl: 'logout.html',
  styleUrls: ['signin.scss'],
  animations: [fadeIn]
})

export class Logout implements OnInit {
  error: boolean = false;
  constructor(public auth: Authentication, public router: Router) {
  }

  ngOnInit() {
    this.auth.logout();
  }
}
