import {RecipeIngredientGroup} from '../../models/recipe_ingredient_group';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeIngredient } from '../../models/recipe_ingredient';
import { Unit } from '../../models/unit';
import { FriendlyApiService} from '../../services/friendlyapi.service';
import { Ingredient } from '../../models/ingredient';



import { ReverseArrayPipe } from '../../pipes/filter-array-pipe';

@Component({
  selector: 'add-ingredients',
  templateUrl: 'add-ingredients.component.html',
  styleUrls: ['add-ingredients.component.css'],
  pipes: [ReverseArrayPipe],
  moduleId: module.id
})
export class AddIngredients implements OnInit {
  @Input()
  recipe: Recipe;

  units: Unit[];
  ingredients: Ingredient[];
  ingredient: Ingredient = new Ingredient();
  recipe_ingredient: RecipeIngredient = new RecipeIngredient();
  recipe_ingredient_group: RecipeIngredientGroup = new RecipeIngredientGroup();

  //loading indicators
  addingGroup: boolean;
  addingRecInc: boolean;
  addingInc: boolean;


  AMOUNT_MIXED_REGEX = /^\d{0,2}\d(\s[1-9]\/[1-9])$/i
  AMOUNT_DECIMAL_REGEX = /^[0-9]{1,4}[,.]{0,1}[0-9]{0,3}$/
  AMOUNT_FRACTION_REGEX = /^[1-9]\/[1-9]$/

  constructor(private friendlyApiService: FriendlyApiService) { }

  ngOnInit() {
    this.friendlyApiService.getUnits().then(units => this.units = units);
    this.friendlyApiService.getIngredients().then(ingredients => this.ingredients = ingredients);
  }

  saveIngredient() {
    this.addingInc = true;
    this.friendlyApiService.saveIngredient(this.ingredient).then(ingredient => { this.ingredients.push(ingredient); this.addingInc = false });
  }
  //TODO: remove recipe ingredient from group array / add recipe ingredient to group array
  saveRecipeIngredient(ingredient_id: number, group_id?: number) {
    this.recipe_ingredient.ingredient_id = ingredient_id;
    this.addingRecInc = true;
    if (this.recipe_ingredient.amount == undefined) {
    } else {
      this.recipe_ingredient.amount = this.parseAmount(this.recipe_ingredient.amount);
      if (this.recipe_ingredient.amount == undefined) {
        return;
      }
    }

    if (this.recipe_ingredient.recipe_ingredient_group_id) {

      this.friendlyApiService.saveRecipeIngredient(this.recipe_ingredient).then(recipe_ingredient => {
        this.addingRecInc = false;
        let index = this.findGroupIndex(recipe_ingredient.recipe_ingredient_group_id)
        if (index > -1) {
          this.recipe.recipe_ingredient_groups[index].recipe_ingredients.push(recipe_ingredient);
        }
      });

    } else {
      this.recipe_ingredient.recipe_id = this.recipe.id;
      this.friendlyApiService.saveRecipeIngredient(this.recipe_ingredient).then(recipe_ingredient => {
        this.addingRecInc = false;
        this.recipe.recipe_ingredients.push(recipe_ingredient);
      });
    }


    this.friendlyApiService.updateRecipeToList(this.recipe);
    this.ingredient.name = "";
    this.recipe_ingredient = new RecipeIngredient;
  }
  removeRecipeIngredient(recipe_ingredient: RecipeIngredient) {
    this.friendlyApiService.deleteRecipeIngredient(recipe_ingredient);

    if (!recipe_ingredient.recipe_ingredient_group_id) {
      let index = this.recipe.recipe_ingredients.indexOf(recipe_ingredient);
      if (index > -1) {
        this.recipe.recipe_ingredients.splice(index, 1);
      }
    } else {
      let grpindex = this.findGroupIndex(recipe_ingredient.recipe_ingredient_group_id)
      if (grpindex > -1) {
        let index = this.recipe.recipe_ingredient_groups[grpindex].recipe_ingredients.indexOf(recipe_ingredient);
        if (index > -1) {
          this.recipe.recipe_ingredient_groups[grpindex].recipe_ingredients.splice(index, 1);
        }
      }
    }
    this.friendlyApiService.updateRecipeToList(this.recipe);
  }
  saveGroup() {
    this.addingGroup = true;
    this.recipe_ingredient_group.recipe_id = this.recipe.id;
    this.friendlyApiService.saveRecipeIngredientGroup(this.recipe_ingredient_group).then(res => {
      this.addingGroup = false;
      this.friendlyApiService.updateRecipeToList(this.recipe);
      this.recipe.recipe_ingredient_groups.push(this.recipe_ingredient_group);
      this.recipe_ingredient_group = new RecipeIngredientGroup;
    })

  }
  deleteGroup(recipe_ingredient_group: RecipeIngredientGroup) {
    this.friendlyApiService.deleteRecipeIngredientGroup(recipe_ingredient_group).then(res => {
      let index = this.recipe.recipe_ingredient_groups.indexOf(recipe_ingredient_group);
      if (index > -1) {
        this.recipe.recipe_ingredient_groups.splice(index, 1);
      }
      this.friendlyApiService.updateRecipeToList(this.recipe);
    })
  }

  parseAmount(amount: any) {

    if (this.AMOUNT_DECIMAL_REGEX.test(amount)) {
      return parseFloat(amount.replace(',', '.'))
    } else if (this.AMOUNT_FRACTION_REGEX.test(amount)) {
      let values = amount.split('/')
      return values[0] / values[1]
    } else if (this.AMOUNT_MIXED_REGEX.test(amount)) {
      let values = amount.split(' ')
      let integer = parseInt(values[0])
      let values2 = values[1].split('/')
      let fraction1 = parseFloat(values2[0])
      let fraction2 = parseFloat(values2[1]);
      let fraction = fraction1 / fraction2;
      return integer + fraction
    }
  }

  findGroupIndex(group_id: number) {
    for (let i = 0; i < this.recipe.recipe_ingredient_groups.length; i++) {
      if (this.recipe.recipe_ingredient_groups[i].id == group_id) {
        return i;
      }
    }
    return -1;
  }


}
