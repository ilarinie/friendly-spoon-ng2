import {RecipeIngredient} from "../models/recipe_ingredient";
import {OnInit} from "@angular/core";
import {FriendlyApiService} from "../services/friendlyapi.service";
import {User} from "../models/user";
import {ShoppingCartItem} from "../models/shopping_cart_item";
/**
 * Created by Ilari on 11.10.2016.
 */


export class ShoppingCartComponent implements OnInit{

  items: ShoppingCartItem[];
  user: User;
    constructor(private friendlyApiService: FriendlyApiService){}



  ngOnInit(){
    this.friendlyApiService.getUser(parseInt(localStorage.getItem("user_id")))
      .then(user => {
        this.user = user
         this.items = user.shopping_cart_items;
      });
  }




}
