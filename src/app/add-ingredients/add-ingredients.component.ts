import {AddRecipeIngredient} from './../add-recipe-ingredient/add-recipe-ingredient.component';
import {RecipeIngredientGroup} from './../models/recipe_ingredient_group';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeIngredient } from '../models/recipe_ingredient';
import { Unit } from '../models/unit';
import { FriendlyApiService} from '../services/friendlyapi.service';
import { Ingredient } from '../models/ingredient';


import { ReverseArrayPipe } from '../pipes/filter-array-pipe';

@Component({
  selector: 'add-ingredients',
  templateUrl: 'add-ingredients.component.html',
  styleUrls: ['add-ingredients.component.css'],
  pipes: [ReverseArrayPipe],
  directives: [AddRecipeIngredient],
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


  AMOUNT_MIXED_REGEX = /^\d{0,2}\d(\s[1-9]\/[1-9])$/i
  AMOUNT_DECIMAL_REGEX = /^[0-9]{1,4}[,.]{0,1}[0-9]{0,3}$/
  AMOUNT_FRACTION_REGEX = /^[1-9]\/[1-9]$/

  constructor(private friendlyApiService: FriendlyApiService) { }

  ngOnInit() {
    this.friendlyApiService.getUnits().then(units => this.units = units);
    this.friendlyApiService.getIngredients().then(ingredients => this.ingredients = ingredients);
  }

  saveIngredient() {
    this.friendlyApiService.saveIngredient(this.ingredient).then(ingredient => this.ingredients.push(ingredient));
  }
  //TODO: remove recipe ingredient from group array / add recipe ingredient to group array
  saveRecipeIngredient(ingredient_id: number, group_id?: number) {
    this.recipe_ingredient.ingredient_id = ingredient_id;

    if (this.recipe_ingredient.amount == undefined) {
    } else {
      this.recipe_ingredient.amount = this.parseAmount(this.recipe_ingredient.amount);
      if (this.recipe_ingredient.amount == undefined) {
        return;
      }
    }

    if (group_id) {
      this.recipe_ingredient.recipe_ingredient_group_id = group_id;
    } else {
      this.recipe_ingredient.recipe_id = this.recipe.id;
    }
    let rinc: RecipeIngredient;
    this.friendlyApiService.saveRecipeIngredient(this.recipe_ingredient).then(recipe_ingredient => {
      this.recipe.recipe_ingredients.push(recipe_ingredient);
      this.friendlyApiService.getRecipes().then(recipes => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
      })
    });

    let id: number = this.recipe.id

    this.recipe_ingredient = new RecipeIngredient;
  }
  removeRecipeIngredient(recipe_ingredient: RecipeIngredient) {
    console.log(recipe_ingredient.recipe_ingredient_group_id + "= ryhma")
    this.friendlyApiService.deleteRecipeIngredient(recipe_ingredient);

    if (!recipe_ingredient.recipe_ingredient_group_id) {
      let index = this.recipe.recipe_ingredients.indexOf(recipe_ingredient);
      if (index > -1) {
        this.recipe.recipe_ingredients.splice(index, 1);
      }
    } else {
      console.log(recipe_ingredient.recipe_ingredient_group_id)
    }
  }
  saveGroup() {
    this.recipe_ingredient_group.recipe_id = this.recipe.id;
    this.friendlyApiService.saveRecipeIngredientGroup(this.recipe_ingredient_group).then(res => {
      this.friendlyApiService.getRecipes().then(recipes => localStorage.setItem("recipes", JSON.stringify(recipes)));
    })
    this.recipe.recipe_ingredient_groups.push(this.recipe_ingredient_group);
    this.recipe_ingredient_group = new RecipeIngredientGroup;
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



}
