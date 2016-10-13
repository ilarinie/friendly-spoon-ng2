import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";


import { Recipe } from "../models/recipe";
import { Level } from "../models/level";
import { Duration } from "../models/duration";
import { FriendlyApiService } from "../services/friendlyapi.service";

//Recipe directives
import { Notes } from "./notes/notes.component";
import {RecipePicture} from "../models/recipe_picture";
import {Global} from "../globals";
import {fadeIn} from "../animations";
import {RecipeIngredient} from "../models/recipe_ingredient";

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
  multiplier = 1;
  sub;
  duration_array;
  checked = [];
  allIncs: RecipeIngredient[];

  baseUrl = Global.apiUrl;


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
    if (this.multiplier === 2) {
      this.multiplier = 1;
      this.doubleButton = "Double";
    } else {
      this.multiplier = 2;
      this.doubleButton = "Reset";
      this.divideButton = "Divide";
    }
    //this.multiplyAmounts();
  }
  divide() {
    if (this.multiplier === 0.5) {
      this.multiplier = 1;
      this.divideButton = "Divide";
    } else {
      this.multiplier = 0.5;
      this.divideButton = "Reset";
      this.doubleButton = "Double";
    }
    //this.multiplyAmounts();
  }

  multiplyAmounts(){

  console.log(this.multiplier);
    for (let i = 0; i< this.recipe.recipe_ingredients.length; i++){
      this.recipe.recipe_ingredients[i].amount = this.recipe.recipe_ingredients[i].amount*this.multiplier;
    }
    for (let i = 0; i < this.recipe.recipe_ingredient_groups.length; i++){
      for (let j= 0; j < this.recipe.recipe_ingredient_groups[i].recipe_ingredients.length; j++){
        this.recipe.recipe_ingredient_groups[i].recipe_ingredients[j].amount = this.recipe.recipe_ingredient_groups[i].recipe_ingredients[j].amount*this.multiplier;
      }
    }
    for (let i = 0; i < this.checked.length ; i++){
      this.checked[i].amount = this.checked[i].amout*this.multiplier;
    }
  }



  recipeshow() {
    alert(this.recipe.name + "," + this.recipe.recipe_ingredients + ", " + this.recipe.level.level);
  }
}
