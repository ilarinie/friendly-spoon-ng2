import {Component, Input, OnDestroy} from "@angular/core";

import {Recipe} from "../../models/recipe";
import {RecipeIngredient} from "../../models/recipe_ingredient";
import {fadeIn} from "../../animations";
import {ShoppingCartItem} from "../../models/shopping_cart_item";
import {FriendlyApiService} from "../../services/friendlyapi.service";
import {SessionService} from "../../services/session.service";
import {User} from "../../models/user";


@Component({
  selector: 'list-ingredients',
  templateUrl: 'list-ingredients.component.html',
  styleUrls: ['list-ingredients.component.scss'],
  animations: [fadeIn]
})
export class ListIngredients implements OnDestroy {
  @Input()
  recipe: Recipe;
  @Input('multiplier') multiplier: number;

  checked: RecipeIngredient[] = [];

  allIngredients: RecipeIngredient[];

  user: User;
  sub: any;

  constructor(private friendlyApiService: FriendlyApiService, private sessionService: SessionService) {
    this.user = sessionService.user;
    this.sub = sessionService.userChange.subscribe((user) => this.user = user);
  }

  toggleInc(inc) {
    let group_index = this.findRecipeGroupIndex(inc);
    console.log(this.multiplier)

    if (group_index == -1) {
      let index = this.recipe.recipe_ingredients.indexOf(inc);
      if (index > -1) {
        this.checked.push(inc);
        this.recipe.recipe_ingredients.splice(index, 1);
      }
    } else {
      let index = this.recipe.recipe_ingredient_groups[group_index].recipe_ingredients.indexOf(inc);
      if (index > -1) {
        this.checked.push(inc);
        this.recipe.recipe_ingredient_groups[group_index].recipe_ingredients.splice(index, 1);
      }
    }


  }

  unToggleInc(inc) {
    let group_index = this.findRecipeGroupIndex(inc);
    if (group_index == -1) {
      let index = this.checked.indexOf(inc);
      if (index > -1) {
        this.recipe.recipe_ingredients.push(inc);
        this.checked.splice(index, 1);
      }
    } else {
      let index = this.checked.indexOf(inc);
      if (index > -1) {
        this.recipe.recipe_ingredient_groups[group_index].recipe_ingredients.push(inc);
        this.checked.splice(index, 1);
      }
    }
  }

  findRecipeGroupIndex(recipe_ingredient) {
    if (!recipe_ingredient.recipe_ingredient_group_id) {
      return -1;
    }
    for (let i = 0; i < this.recipe.recipe_ingredient_groups.length; i++) {
      if (this.recipe.recipe_ingredient_groups[i].recipe_ingredients != undefined) {

        if (this.recipe.recipe_ingredient_groups[i].id == recipe_ingredient.recipe_ingredient_group_id) {
          return i;
        }
      }
    }
    return -1;
  }

  shoppingCart() {
    this.allIngredients = [];
    this.allIngredients = this.allIngredients.concat(this.recipe.recipe_ingredients);
    for (let i = 0; i < this.recipe.recipe_ingredient_groups.length; i++) {
      this.allIngredients = this.allIngredients.concat(this.recipe.recipe_ingredient_groups[i].recipe_ingredients)
    }

    for (let i = 0; i < this.user.shopping_cart_items.length; i++) {
      for (let j = 0; j < this.allIngredients.length; j++) {
        if (this.allIngredients[j].id == this.user.shopping_cart_items[i].recipe_ingredient_id) {
          let index = this.allIngredients.indexOf(this.allIngredients[j]);
          if (index > -1) {
            this.allIngredients.splice(index, 1);
          }

        }
      }
    }
  }

  addToCart(inc: RecipeIngredient) {

    let user_id = localStorage.getItem("user_id");
    let item: ShoppingCartItem = new ShoppingCartItem();
    item.recipe_ingredient_id = inc.id;
    item.user_id = parseInt(user_id);
    item.recipe_name = this.recipe.name;
    this.friendlyApiService.saveCartItem(item).then((res) => {
      let index = this.allIngredients.indexOf(inc);
      if (index > -1) {
        this.allIngredients.splice(index, 1);
      }
      this.sessionService.addToCart(res);
      let count: number = parseInt(localStorage.getItem('shopping-cart-size'));
      if (isNaN(count)) {
        count = -1;
      }
      count++;
      localStorage.setItem('shopping-cart-size', count.toString());
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  manualMultiplier(){
   let number =  parseFloat(prompt("Change multiplier", this.multiplier.toString()));
   if (!isNaN(number)){
     this.multiplier = number;
   }
  }

}
