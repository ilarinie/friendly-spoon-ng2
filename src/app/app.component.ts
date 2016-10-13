import { Component, ViewChild  } from "@angular/core";
import { Router }  from "@angular/router";

import { Recipe } from "./models/recipe";
import { FriendlyApiService } from "./services/friendlyapi.service";
import {SessionService} from "./services/session.service";



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
  count:number = 0;
  sub: any;
  constructor(private friendlyApiService: FriendlyApiService, public router: Router, private sessionService: SessionService) {
    /*router.events.subscribe((event) => {
      this.username = localStorage.getItem('username');
    });*/
    this.count = sessionService.shoppingCartItems;
    this.username = "";
    this.sub = sessionService.userChange.subscribe((user) => {
      this.count = user.shopping_cart_items.length;
      this.username = user.name;
    })

  }

  closeNav() {
    //  this.input.click()
  }

}
