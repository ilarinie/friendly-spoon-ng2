import { Component, ViewChild  } from "@angular/core";
import { Router }  from "@angular/router";

import { Recipe } from "./models/recipe";
import { FriendlyApiService } from "./services/friendlyapi.service";



@Component({
  selector: "friendly-app",
  templateUrl: "app.component.html",
  providers: [FriendlyApiService],
  styleUrls: ['styles.css', 'app.component.css']
})


export class AppComponent {
  @ViewChild('navbarToggle') input;

  title = "Friendly Spoon";
  recipe: Recipe;
  username: string;

  constructor(private friendlyApiService: FriendlyApiService, public router: Router) {
    router.events.subscribe((event) => this.username = localStorage.getItem('username'));
  }

  closeNav() {
    //  this.input.click()
  }

}
