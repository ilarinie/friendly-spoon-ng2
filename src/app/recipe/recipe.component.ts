import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";


import { Recipe } from "../models/recipe";
import { Level } from "../models/level";
import { Duration } from "../models/duration";
import { FriendlyApiService } from "../services/friendlyapi.service";

//Recipe directives
import { ListIngredients } from "./list-ingredients/list-ingredients.component";
import { Notes } from "./notes/notes.component";
import {RecipePicture} from "../models/recipe_picture";
import {Global} from "../globals";
import {fadeIn} from "../animations";

@Component({
  selector: "recipeshow",
  templateUrl: "recipe.component.html",
  styleUrls: ["recipe.component.css"],
  animations: [
    fadeIn
  ]
})

export class RecipeComponent implements OnInit {
  error: any;
  recipe: Recipe;
  divideButton = "Divide";
  doubleButton = "Double";
  noteSwitchButton = "Notes";
  amount_shown = 1;
  sub;
  duration_array;
  checked = [];


  user_id: number = parseInt(localStorage.getItem('user_id'));
  recipe_user_id: number;
  shownPic: RecipePicture;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private friendlyApiService: FriendlyApiService
  ) {
    this.duration_array = Array(5).fill(4);
  }


  showPic(pic: RecipePicture) {
    this.shownPic = pic;
  }
  nextPic() {
    let index = this.shownIndex();
    if (index > -1) {
      if (this.recipe.recipe_pictures.length - 1 > index) {
        this.shownPic = this.recipe.recipe_pictures[index + 1];
      } else {
        this.shownPic = this.recipe.recipe_pictures[0];
      }
    }
  }
  shownIndex(): number {
    return this.recipe.recipe_pictures.indexOf(this.shownPic);
  }


  getRecipe() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];

      /*  NOTE: this can be used to load recipe from the preloaded list rather than from the api
       let recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes"))

       if (recipes != null) {
       let notfound = true;
       for (let i = 0; i < recipes.length; i++) {
       if (recipes[i].id == id) {
       this.recipe = recipes[i];
       notfound = false;
       break;
       }
       }
       if (notfound) {
       this.friendlyApiService.getRecipe(id)
       .then(recipe => this.recipe = recipe);
       }
       } else { */
      if (!isNaN(id)) {
        this.friendlyApiService.getRecipe(id)
          .then(recipe => {
            this.recipe = recipe;
            this.recipe_user_id = recipe.user_id;
          });
        //  }
      }

    });

  }
  ngOnInit() {
    this.getRecipe();
  }

  noteSwitch() {
    if (this.noteSwitchButton === "Notes") {
      this.noteSwitchButton = "Recipe";
    } else {
      this.noteSwitchButton = "Notes";
    }
  }
  double() {
    if (this.amount_shown === 2) {
      this.amount_shown = 1;
      this.doubleButton = "Double";
    } else {
      this.amount_shown = 2;
      this.doubleButton = "Reset";
      this.divideButton = "Divide";
    }
  }
  divide() {
    if (this.amount_shown === -1) {
      this.amount_shown = 1;
      this.divideButton = "Divide";
    } else {
      this.amount_shown = -1;
      this.divideButton = "Reset";
      this.doubleButton = "Double";
    }
  }

  recipeshow() {
    alert(this.recipe.name + "," + this.recipe.recipe_ingredients + ", " + this.recipe.level.level);
  }
}
