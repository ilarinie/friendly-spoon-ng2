import {Component} from "@angular/core/src/metadata/directives";
import {User} from "../models/user";
import {FriendlyApiService} from "../services/friendlyapi.service";
import {ActivatedRoute, Router} from "@angular/router";
import {fadeIn} from "../animations";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {SessionService} from "../services/session.service";
import {OnInit} from "@angular/core";
/**
 * Created by ile on 10/6/16.
 */


@Component({
  selector: 'user-component',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  animations: [fadeIn]
})
export class MypageComponent implements OnInit {

  form: FormGroup;

  user: User = new User();
  sub: any;
  changePas: boolean = false;
  private message;
  private passwordAlert;
  private confirmationAlert;
  private editInfoToggle: boolean = false;

  constructor(private router: Router, private friendlyApiService: FriendlyApiService,
    private route: ActivatedRoute, private fb: FormBuilder, private sessionService: SessionService) {

    this.form = fb.group({
      'name': ['', Validators.required]
    })




  }

  ngOnInit() {
    this.user = this.sessionService.user;
    this.sub = this.sessionService.userChange.subscribe((user) => {
      this.user = user;
      this.form = this.fb.group({
        'name': [this.user.name, Validators.required]
      })
    })
  }

  hasChanges() {
    return this.form.dirty;
  }

  submitForm(value: any) {
    console.log(value);
  }

  closePopup() {
    this.message = null;
  }

  editPass() {
    if (this.editInfoToggle) {
      this.editInfo();
    }
    this.changePas = !this.changePas;
  }

  editInfo() {
    if (this.changePas) {
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
        if (body.errors.password_confirmation) {
          this.confirmationAlert = 'Password confirmation ' + body.errors.password_confirmation;
        }
        if (body.errors.password) {
          this.passwordAlert = 'Password ' + body.errors.password;
        }
      })
  }


  saveUser(value: any) {
    this.user.name = value.name;
    this.friendlyApiService.saveUser(this.user).then(user => {
      this.user = user;
      this.editInfoToggle = false;
      this.message = "Information edited succesfully";
      this.form.markAsPristine();
      this.sessionService.changeUser(user);
    }).catch(res => {
      let body = JSON.parse(res._body);
      console.log(body);
    });
  }

}
