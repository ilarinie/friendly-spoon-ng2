import {Component, OnInit} from "@angular/core";
import { Ingredient } from "../models/ingredient";
import {FriendlyApiService} from "../services/friendlyapi.service";

@Component({
  selector: 'ingredient-list',
  templateUrl: 'ingredient-list.component.html'
})
export class IngredientList implements OnInit {
  ingredients: Ingredient[] = [];
  newinc: Ingredient = new Ingredient();
  updatingInc: number;

  constructor(private friendlyApiService: FriendlyApiService) { }

  ngOnInit() {
    this.friendlyApiService.getIngredients().then(ingredients => this.ingredients = ingredients)
  }

  saveIngredient(inc: Ingredient) {
    let id = undefined;
    if (inc.id) {
      id = inc.id;
    }
    if (id != undefined) {
      this.updatingInc = id;
    }
    this.friendlyApiService.saveIngredient(inc).then(res => {
      this.friendlyApiService.getIngredients().then(ingredients => this.ingredients = ingredients);
      if (inc == this.newinc) {
        this.newinc = new Ingredient();
      }
      this.updatingInc = undefined;
    })
  }
  deleteIngredient(inc: Ingredient) {
    this.friendlyApiService.deleteIngredient(inc).then(res => {
      this.friendlyApiService.getIngredients().then(ingredients => this.ingredients = ingredients)
    })
  }
}
