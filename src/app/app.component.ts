import { Component } from "@angular/core";
import { Router }  from "@angular/router";
import { Authentication } from "./authentication/authentication";
import { isLoggedin } from "./authentication/is-loggedin";

import { Recipe } from "./models/recipe";
import { FriendlyApiService } from "./services/friendlyapi.service";



@Component({
  selector: "friendly-app",
  templateUrl: "app.component.html",
  providers: [FriendlyApiService],
  styleUrls: ['styles.css']
})


export class AppComponent {
  title = "Friendly Spoon";
  recipe: Recipe;
  showNav: boolean;
  username: string;

  constructor(private friendlyApiService: FriendlyApiService, public router: Router) {
    this.username = localStorage.getItem('username');

  }

}
