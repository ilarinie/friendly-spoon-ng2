import { Component, Input } from "@angular/core";

import { Recipe } from "../models/recipe";
import { RecipeIngredient } from "../models/recipe_ingredient";

@Component({
  selector: 'list-ingredients',
  templateUrl: 'app/list-ingredients/list-ingredients.component.html',
  styleUrls: ['app/list-ingredients/list-ingredients.component.css']
})
export class ListIngredients {
  @Input()
  recipe: Recipe;
  @Input('amount_shown') amount_shown: number;

  checked: RecipeIngredient[] = [];

  toggleInc(inc, group_index?) {
    let index = this.recipe.recipe_ingredients.indexOf(inc)
    if (index > -1) {
      this.checked.push(inc)
      this.recipe.recipe_ingredients.splice(index, 1);
    }
  }
  unToggleInc(inc) {
    let index = this.checked.indexOf(inc)
    if (index > -1) {
      this.recipe.recipe_ingredients.push(inc)
      this.checked.splice(index, 1);
    }
  }

}
