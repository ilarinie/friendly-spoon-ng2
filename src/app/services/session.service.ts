import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Subject} from "rxjs";
import {FriendlyApiService} from "./friendlyapi.service";
import {ShoppingCartItem} from "../models/shopping_cart_item";


@Injectable()
export class SessionService {
  user: User = new User();
  shoppingCartItems: number;

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


  addToCart(item: ShoppingCartItem) {
    this.user.shopping_cart_items.push(item);
    this.user.summarizedCart = this.summarizeItems();
    this.userChange.next(this.user);
  }

  removeFromCart(item) {
    this.shoppingCartItems--;
    this.cartChange.next(this.shoppingCartItems);
  }

  changeCount(count: number) {
    this.shoppingCartItems = count;
    this.cartChange.next(this.shoppingCartItems);
  }

  changeUser(user: User) {
    this.user = user;
    this.userChange.next(this.user);
  }

  summarizeItems() {
    if (this.user.shopping_cart_items == []) {
      return;
    }
    let tempItems = this.user.shopping_cart_items;
    let tempItems2 = this.user.shopping_cart_items;
    let checkedItems: ShoppingCartItem[] = [];

    for (let item of tempItems) {

      if (item.recipe_ingredient) {
        for (let item2 of tempItems) {
          if (item != item2) {
            if (item2.recipe_ingredient) {
              if (item2.recipe_ingredient.ingredient.id == item.recipe_ingredient.ingredient.id) {
                if (item.recipe_ingredient.unit && item2.recipe_ingredient.unit){
                if (item2.recipe_ingredient.unit.id == item.recipe_ingredient.unit.id) {
                  
                  if (item.recipe_ingredient.amount != null || item2.recipe_ingredient.amount != null){
                    let truu = true;
                    let result = 0;
                    if (item.recipe_ingredient.amount != null){
                      result = item.recipe_ingredient.amount;
                      truu = false;
                    }
                    else if (item2.recipe_ingredient.amount != null){
                      result = item2.recipe_ingredient.amount;
                      truu = false;
                    } else {
                       result = parseFloat(item.recipe_ingredient.amount) + parseFloat(item2.recipe_ingredient.amount);
                    }
                 
                  item.recipe_ingredient.amount = result;
                  }
                  if (item.recipe_name != item2.recipe_name) {

                    item.recipe_name = item.recipe_name + ", " + item2.recipe_name;
                  }

                  tempItems.splice(tempItems.indexOf(item2), 1);
                }
                }
              }
            }
          }
        }
      }
    }

    return tempItems;

  }


  getUser() {
    this.friendlyApiService.getUser(parseInt(localStorage.getItem("user_id"))).then(user => {
      this.user = user;
      this.user.summarizedCart = this.summarizeItems();
      this.userChange.next(this.user);
      this.changeCount(user.shopping_cart_items.length);
      this.shoppingCartItems = user.shopping_cart_items.length;
      localStorage.setItem('user', JSON.stringify(this.user))

    });
  }
}
