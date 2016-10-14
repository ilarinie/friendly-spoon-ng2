

import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Subject} from "rxjs";
import {FriendlyApiService} from "./friendlyapi.service";
import {ShoppingCartItem} from "../models/shopping_cart_item";


@Injectable()
export class SessionService{
  user: User = new User();
  shoppingCartItems:number;

  cartChange: Subject<number> = new Subject<number>();
  userChange: Subject<User> = new Subject<User>();

  constructor(private friendlyApiService: FriendlyApiService) {
      /*router.events.subscribe((event) => {
          this.getUser();
     });*/
      this.user.shopping_cart_items = [];
      this.getUser();
    /*
    console.log("jeeeppijee")
    this.user = <User>JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
    if (this.user == null){
      this.getUser();
    } else {
      console.log("jup")
      this.userChange.next(this.user);
    }*/

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
      localStorage.setItem('user', JSON.stringify(this.user))

    });
  }
}
