import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute }            from "@angular/router";
import { DragulaService } from 'ng2-dragula/ng2-dragula';


import { Recipe } from "../models/recipe";
import { Level } from "../models/level";
import { Duration } from "../models/duration";
import { FriendlyApiService } from "../services/friendlyapi.service";

//Recipe directives
import { AddIngredients } from "./add-ingredients/add-ingredients.component";
import { ListIngredients } from "./list-ingredients/list-ingredients.component";
import { Tags } from "./tags/tags.component";
import { Notes } from "./notes/notes.component";
import {RecipePicture} from "../models/recipe_picture";

@Component({
  selector: "recipeshow",
  templateUrl: "recipe.component.html",
  styleUrls: ["recipe.component.css"],
  viewProviders: [
    DragulaService
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
  image: any;
  //baseUrl: string = "http://localhost:3000/";
  baseUrl: string = "https://api.friendlyspoon.me/";

  deleting: boolean = false;
  addrecipe: boolean = false;

  user_id: number = parseInt(localStorage.getItem('user_id'));
  recipe_user_id: number;


  editheading: boolean = false;
  levels: Level[];
  durations: Duration[];

  constructor(
    private router: Router,
    private friendlyApiService: FriendlyApiService,
    private route: ActivatedRoute
  ) {
    this.duration_array = Array(5).fill(4);

  }




  getRecipe() {
    if (this.router.url.includes('addrecipe')) {
      this.recipe = new Recipe();
      this.recipe.level = new Level();
      this.recipe.duration = new Duration();
      this.editheading = true;
      this.addrecipe = true;
    } else {
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
        this.friendlyApiService.getRecipe(id)
          .then(recipe => {
            this.recipe = recipe;
            this.recipe_user_id = recipe.user_id;
            console.log(this.recipe_user_id + " recipe user");
          });
        //  }

      });
      if (this.router.url.includes('edit')) {
        this.editheading = true;
      }
    }
  }
  ngOnInit() {
    this.getRecipe();
    this.levels = JSON.parse(localStorage.getItem("levels"));
    this.durations = JSON.parse(localStorage.getItem("durations"));
  }
  get diagnostic() { return JSON.stringify(this.recipe); }
  save() {
    this.recipe.level_id = this.recipe.level.id;
    this.recipe.duration_id = this.recipe.duration.id;
    this.saveOrders();
    let upload: RecipePicture = new RecipePicture();
    upload.recipe_id = this.recipe.id;
    upload.picture = this.image;
    this.friendlyApiService.uploadPicture(upload);

    this.friendlyApiService
      .save(this.recipe)
      .then(recipe => {
        this.recipe = recipe;

        //load updated recipe list to cache
        this.friendlyApiService.updateRecipeToList(this.recipe);
        if (this.router.url.includes('addrecipe')) {
          this.router.navigate(['recipes/' + recipe.id + '/edit'])
        }
        this.editheading = !this.editheading;

      })
      .catch(error => this.error = error);





  }
  saveOrders() {
    if (this.recipe.recipe_ingredients != null && this.recipe.recipe_ingredients.length != 0) {
      for (let i = 0; i < this.recipe.recipe_ingredients.length; i++) {
        this.recipe.recipe_ingredients[i].index = i;
        this.recipe.recipe_ingredients[i].recipe_id = this.recipe.id;
        this.recipe.recipe_ingredients[i].recipe_ingredient_group_id = null;
        this.friendlyApiService.saveRecipeIngredient(this.recipe.recipe_ingredients[i]).then();
      }
    }
    if (this.recipe.recipe_ingredient_groups != null && this.recipe.recipe_ingredient_groups.length != 0) {
      for (let i = 0; i < this.recipe.recipe_ingredient_groups.length; i++) {
        for (let j = 0; j < this.recipe.recipe_ingredient_groups[i].recipe_ingredients.length; j++) {
          this.recipe.recipe_ingredient_groups[i].recipe_ingredients[j].index = j;
          this.recipe.recipe_ingredient_groups[i].recipe_ingredients[j].recipe_ingredient_group_id = this.recipe.recipe_ingredient_groups[i].id;
          this.recipe.recipe_ingredient_groups[i].recipe_ingredients[j].recipe_id = this.recipe.id;
          this.friendlyApiService.saveRecipeIngredient(this.recipe.recipe_ingredient_groups[i].recipe_ingredients[j]).then();
        }
        this.recipe.recipe_ingredient_groups[i].index = i;
        this.friendlyApiService.saveRecipeIngredientGroup(this.recipe.recipe_ingredient_groups[i]).then();
      }
    }


  }

  textfieldChange(event) {
    this.recipe.instruction = event.value;
  }
  delete() {
    this.deleting = true;
    this.friendlyApiService.delete(this.recipe).then(res => {
      this.friendlyApiService.getRecipes().then(recipes => {
        localStorage.setItem("recipes", JSON.stringify(recipes)); this.deleting = false;
        this.router.navigate(['/'])
      })

    });
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
  editheadings() {
    this.editheading = !this.editheading;
    this.noteSwitchButton = "Notes";
  }
  recipeshow() {
    alert(this.recipe.name + "," + this.recipe.recipe_ingredients + ", " + this.recipe.level.level);
  }
}
