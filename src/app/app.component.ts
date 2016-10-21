import {Component, ViewChild, OnDestroy, Renderer, ElementRef} from "@angular/core";
import { Router }  from "@angular/router";

import { Recipe } from "./models/recipe";
import { FriendlyApiService } from "./services/friendlyapi.service";
import {SessionService} from "./services/session.service";


@Component({
  selector: "friendly-app",
  templateUrl: "app.component.html",
  providers: [FriendlyApiService],
  styleUrls: ['app.component.scss']
})


export class AppComponent implements OnDestroy {
  @ViewChild('toggleri') input: ElementRef;

  title = "Friendly Spoon - here for you!";
  isCollapsed = true;


  username: string;
  count: number = 0;
  sub: any;
  constructor(
    private friendlyApiService: FriendlyApiService,
    public router: Router,
    private sessionService: SessionService,
    private render: Renderer
  ) {
    this.isCollapsed = true;
    router.events.subscribe((event) => {

    });
    this.count = sessionService.user.shopping_cart_items.length;
    this.username = sessionService.user.name;
    this.sub = sessionService.userChange.subscribe((user) => {
      this.count = user.shopping_cart_items.length;
      this.username = user.name;
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeNav() {
    /*let event = new MouseEvent('click', { bubbles: true });
    this.render.invokeElementMethod(
      this.input.nativeElement, 'dispatchEvent', [event]);*/
  }


}
