import {RecipeIngredient} from "../models/recipe_ingredient";
import {OnInit} from "@angular/core";
import {User} from "../models/user";
import {ShoppingCartItem} from "../models/shopping_cart_item";
import {Component} from "@angular/core/src/metadata/directives";
import {SessionService} from "../services/session.service";
import {ActivatedRoute} from "@angular/router";
import {FriendlyApiService} from "../services/friendlyapi.service";
import {fadeIn} from "../animations";
/**
 * Created by Ilari on 11.10.2016.
 */

@Component({
  selector: 'shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['shopping-cart.component.scss'],
  animations: [fadeIn]
})
export class ShoppingCartComponent implements OnInit {

  items: ShoppingCartItem[] = [];
  shownItems: ShoppingCartItem[] = [];
  user: User;
  sub: any;
  newItem: ShoppingCartItem = new ShoppingCartItem();

  constructor(private sessionService: SessionService, private friendlyApiService: FriendlyApiService) {
  }

  removeFromCart(item: ShoppingCartItem) {
    this.friendlyApiService.deleteCartItem(item).then(res => {
      let index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1)
      }
      this.sessionService.getUser();
    })
  }

  saveItem() {
    this.newItem.user_id = this.user.id;
    this.friendlyApiService.saveCartItem(this.newItem).then((res) => {
      this.sessionService.addToCart(res);
      this.newItem = new ShoppingCartItem();
    });
  }

  ngOnInit() {
    this.user = this.sessionService.user;
    this.items = this.sessionService.user.summarizedCart;
    this.sub = this.sessionService.userChange.subscribe((user) => {
      this.user = user;
      this.items = user.summarizedCart;

    })
  }

  summarizeItems() {
    if (this.items == []) {
      return;
    }
    let tempItems = this.items;
    let tempItems2 = this.items;
    let checkedItems: ShoppingCartItem[] = [];
    console.log(tempItems.length + " asd")
    for (let item of tempItems) {
      tempItems.slice(tempItems.indexOf(item), 1);
      console.log("jepjee");
      if (item.recipe_ingredient) {
        for (let item2 of tempItems) {
          if (item2.recipe_ingredient) {
            if (item2.recipe_ingredient.ingredient.id == item.recipe_ingredient.ingredient.id) {
              if (item2.recipe_ingredient.unit_id == item.recipe_ingredient.unit_id) {
                console.log("tänneki")
                item.recipe_ingredient.amount += item2.recipe_ingredient.amount;
                console.log("index " + tempItems.indexOf(item2))
                tempItems.slice(tempItems.indexOf(item2), 1);
              }
            }
          }
        }
      }
    }
    this.shownItems = tempItems;


  }


}
