import {Component} from "@angular/core/src/metadata/directives";
import {User} from "../models/user";
import {FriendlyApiService} from "../services/friendlyapi.service";
import {ActivatedRoute, Router} from "@angular/router";
import {fadeIn} from "../animations";
/**
 * Created by ile on 10/6/16.
 */


@Component({
  selector: 'user-component',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css'],
  animations: [fadeIn]
})
export class UserComponent {
  user: User;
  sub: any;
  changePas: boolean = false;
  private message;
  private passwordAlert;
  private confirmationAlert;
  private editInfoToggle: boolean = false;

  constructor(private router: Router, private friendlyApiService: FriendlyApiService,
              private route: ActivatedRoute) {
    if (this.router.url.includes('mypage')) {
      console.log("dipadaa");
        friendlyApiService.getUser( parseInt(localStorage.getItem("user_id")) ).then(user => this.user = user);
    } else {

      this.sub = this.route.params.subscribe(params => {
        let id = +params['id'];
        friendlyApiService.getUser(id).then(user => this.user = user);
      });
    }
  }

  closePopup(){
    this.message = null;
  }
  editPass() {
    if (this.editInfoToggle){
      this.editInfo();
    }
    this.changePas = !this.changePas;
  }
  editInfo(){
    if (this.changePas){
      this.editPass();
    }
    this.editInfoToggle = !this.editInfoToggle;
  }
  changePassword() {
    this.passwordAlert = null;
    this.confirmationAlert = null;
    this.friendlyApiService.changePassword(this.user, this.user.password, this.user.password_confirmation)
      .then(res => {
        this.user.password = "";
        this.user.password_confirmation = "";
        this.changePas = false;
        this.message = "You have succesfully changed your password"


      }).catch(res => {
      console.log(res._body);
      let body;
      body = JSON.parse(res._body)
      if (body.errors.password_confirmation){
        this.confirmationAlert = 'Password confirmation ' + body.errors.password_confirmation;
      }
      if (body.errors.password){
        this.passwordAlert = 'Password ' + body.errors.password;
      }
    })
  }

  saveUser(){
    this.friendlyApiService.saveUser(this.user).then(user => {
      this.user = user;
      this.editInfoToggle = false;
      this.message = "Information edited succesfully"
      localStorage.setItem("username", this.user.name);
      this.router.navigate(['mypage']);
    }).catch(res => {
      let body = JSON.parse(res._body);
      console.log(body);
    });
  }

}
