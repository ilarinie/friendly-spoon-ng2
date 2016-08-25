import {Component, OnInit} from "@angular/core";
import { Ingredient } from "../models/ingredient";
import {FriendlyApiService} from "../services/friendlyapi.service";

@Component({
  selector: 'ingredient-list',
  templateUrl: 'ingredient-list.component.html',
  moduleId: module.id
})
export class IngredientList implements OnInit {
  ingredients: Ingredient[];

  constructor(private friendlyApiService: FriendlyApiService) { }

  ngOnInit() {
    this.friendlyApiService.getIngredients().then(ingredients => this.ingredients = ingredients)
  }

  saveIngredient(inc: Ingredient) {
    this.friendlyApiService.saveIngredient(inc).then(res => {
      this.friendlyApiService.getIngredients().then(ingredients => this.ingredients = ingredients)
    })
  }
  deleteIngredient(inc: Ingredient) {
    this.friendlyApiService.deleteIngredient(inc).then(res => {
      this.friendlyApiService.getIngredients().then(ingredients => this.ingredients = ingredients)
    })
  }
}
