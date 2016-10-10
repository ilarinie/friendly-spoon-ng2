import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from "@angular/http";
import { Router, CanActivate } from "@angular/router";
import {Global} from "../globals";



@Injectable()
export class Authentication implements CanActivate {


  private apiUrl = Global.apiUrl; //"https://api.friendlyspoon.me"; //prod api
  //private apiUrl = 'http://friendly-spoon-api.herokuapp.com'; //dev api
  //private apiUrl = "http://localhost:3000";

  token: string;
  client: string;
  uid: string;
  tokentype: string;
  expiry: string;

  username: string;
  user_id: string;

  constructor(private http: Http, private router: Router) {
    this.token = localStorage.getItem('token');
    this.client = localStorage.getItem('client');
    this.uid = localStorage.getItem('uid');
    this.tokentype = localStorage.getItem('tokentype');
    this.expiry = localStorage.getItem('expiry');
    this.username = localStorage.getItem('username');
    this.user_id = localStorage.getItem('user_id')

  }

  login(email: String, password: String): Promise<string> {
    this.http.post(this.apiUrl + '/auth/sign_in', JSON.stringify({
      email: email,
      password: password
    }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .toPromise()
      .then((res: any) => {
        this.token = res.headers.get('Access-Token');
        this.client = res.headers.get('Client');
        this.uid = res.headers.get('Uid');
        this.tokentype = res.headers.get('Token-Type');
        this.expiry = res.headers.get('Expiry');
        this.username = res.json().data.name;
        this.user_id = res.json().data.id;

        localStorage.setItem('token', this.token);
        localStorage.setItem('client', this.client);
        localStorage.setItem('uid', this.uid);
        localStorage.setItem('tokentype', this.tokentype);
        localStorage.setItem('expiry', this.expiry);
        localStorage.setItem('username', this.username);
        localStorage.setItem('user_id', this.user_id);
        return "success";
      }).catch((error: any) => {
        return "failed to log in";
      })
    return Promise.resolve("bleab");
  }

  logout() {
    return this.http.delete(this.apiUrl + '/auth/sign_out', {
      headers: new Headers({
        'Access-Token': this.token,
        'Client': this.client,
        'Uid': this.uid,
        'token-type': this.tokentype,
        'expiry': this.expiry
      }), body: ''
    }).toPromise()
      .then((res: any) => {
        this.token = undefined;
        localStorage.removeItem('token');
        localStorage.removeItem('client');
        localStorage.removeItem('uid');
        localStorage.removeItem('tokentype');
        localStorage.removeItem('expiry');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id');
      });

  }

  canActivate() {
    return this.http.request(this.apiUrl + '/auth/validate_token', {
      headers: new Headers({
        'Access-Token': this.token,
        'Client': this.client,
        'Uid': this.uid,
        'token-type': this.tokentype,
        'expiry': this.expiry
      })
    }).toPromise()
      .then(res => {
        return res.status != 401;
      }).catch((error: any) => {
        this.router.navigate(['login']);
        return false;
      });
  }
  errorHandler(error: any) {
    console.log("error derror")
  }
}
