import {ReverseArrayPipe} from './../pipes/filter-array-pipe';
import {RecipeIngredientGroup} from './../models/recipe_ingredient_group';
import {Component,Input} from "@angular/core";

@Component({
  selector: 'add-recipe-ingredient',
  templateUrl: 'app/add-recipe-ingredient/add-recipe-ingredient.component.html',
  pipes: [ReverseArrayPipe]
})
export class AddRecipeIngredient {
  @Input('group') group: RecipeIngredientGroup;





}
