import { Component, Input } from "@angular/core";

import { Recipe } from "../../models/recipe";
import { RecipeIngredient } from "../../models/recipe_ingredient";

@Component({
  selector: 'list-ingredients',
  templateUrl: 'list-ingredients.component.html',
  styleUrls: ['list-ingredients.component.css'],
  moduleId: module.id
})
export class ListIngredients {
  @Input()
  recipe: Recipe;
  @Input('amount_shown') amount_shown: number;

  checked: RecipeIngredient[] = [];

  toggleInc(inc) {

    let group_index = this.findRecipeGroupIndex(inc);
    console.log("group index "+group_index)

    if (group_index == -1) {
      let index = this.recipe.recipe_ingredients.indexOf(inc)
      if (index > -1) {
        this.checked.push(inc)
        this.recipe.recipe_ingredients.splice(index, 1);
      }
    } else {
      let index = this.recipe.recipe_ingredient_groups[group_index].recipe_ingredients.indexOf(inc)
      if (index > -1) {
        
        this.checked.push(inc)
        this.recipe.recipe_ingredient_groups[group_index].recipe_ingredients.splice(index, 1);
      }
    }
  }
  unToggleInc(inc) {
    let group_index = this.findRecipeGroupIndex(inc);
    console.log("group index "+group_index)

    if (group_index == -1) {
      let index = this.checked.indexOf(inc)
      if (index > -1) {
        this.recipe.recipe_ingredients.push(inc)
        this.checked.splice(index, 1);
      }
    } else {
      let index = this.checked.indexOf(inc)
      if (index > -1) {
        this.recipe.recipe_ingredient_groups[group_index].recipe_ingredients.push(inc)
        this.checked.splice(index, 1);
      }
    }
  }


  findRecipeGroupIndex(recipe_ingredient) {
    for (let i = 0; i < this.recipe.recipe_ingredient_groups.length; i++) {
      if (this.recipe.recipe_ingredient_groups[i].recipe_ingredients != undefined) {
        if (this.recipe.recipe_ingredient_groups[i].recipe_ingredients.indexOf(recipe_ingredient) > -1) {
          return i;
        }
      }
    }
    return -1;

  }

}
