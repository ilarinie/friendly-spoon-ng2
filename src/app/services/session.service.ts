

import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Subject} from "rxjs";
import {FriendlyApiService} from "./friendlyapi.service";
import {Router} from "@angular/router";
import {ShoppingCartItem} from "../models/shopping_cart_item";
@Injectable()
export class SessionService {
  user: User;
  shoppingCartItems:number;

  cartChange: Subject<number> = new Subject<number>();
  userChange: Subject<User> = new Subject<User>();

  constructor(private friendlyApiService: FriendlyApiService, private router: Router) {
      router.events.subscribe((event) => {
          this.getUser();
     });


  }

  addToCart(item: ShoppingCartItem){
    this.user.shopping_cart_items.push(item);
    this.userChange.next(this.user);
  }
  removeFromCart(item){
    this.shoppingCartItems--;
    this.cartChange.next(this.shoppingCartItems);
  }
  changeCount(count: number){
    this.shoppingCartItems = count;
    this.cartChange.next(this.shoppingCartItems);
  }
  changeUser(user: User){
    this.user = user;
    this.userChange.next(this.user);
  }


  getUser(){
    this.friendlyApiService.getUser(parseInt(localStorage.getItem("user_id"))).then(user => {
      this.user = user;
      this.userChange.next(this.user);
      this.changeCount(user.shopping_cart_items.length);
      this.shoppingCartItems = user.shopping_cart_items.length;

    });
  }
}
