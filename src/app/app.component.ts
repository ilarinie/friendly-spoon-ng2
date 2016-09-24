import { Component } from "@angular/core";
import { Router }  from "@angular/router";

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
  username: string;

  constructor(private friendlyApiService: FriendlyApiService, public router: Router) {
    this.username = localStorage.getItem('username');


  }

}
