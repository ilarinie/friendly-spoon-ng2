import { Component, OnInit } from "@angular/core";
import { FORM_DIRECTIVES } from "@angular/common";
import { Router, ActivatedRoute }            from "@angular/router";
import { TinyEditor } from "../directives/tinymce.directive";


import { Recipe } from "../models/recipe";
import { Level } from "../models/level";
import { Duration } from "../models/duration";
import { FriendlyApiService } from "../services/friendlyapi.service";

//Recipe directives
import { AddIngredients } from "../add-ingredients/add-ingredients.component";
import { ListIngredients } from "../list-ingredients/list-ingredients.component";
import { Tags } from "./tags/tags.component";
import { Notes } from "./notes/notes.component";

@Component({
  selector: "recipeshow",
  templateUrl: "recipe.component.html",
  styleUrls: ["recipe.component.css"],
  directives: [AddIngredients, ListIngredients, Tags, TinyEditor, FORM_DIRECTIVES, Notes],
  moduleId: module.id
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
    } else {
      this.sub = this.route.params.subscribe(params => {
        let id = +params['id'];
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
        } else {
          this.friendlyApiService.getRecipe(id)
            .then(recipe => this.recipe = recipe);
        }

      })
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

    console.log(this.recipe.instruction);

    this.friendlyApiService
      .save(this.recipe)
      .then(recipe => {
        this.getRecipe();
        if (this.router.url.includes('addrecipe')) {
          this.router.navigate(['recipes/' + recipe.id])
        }
        //load updated recipe list to cache
        this.friendlyApiService.getRecipes().then(recipes => {
          localStorage.setItem("recipes", JSON.stringify(recipes));
        })
      })
      .catch(error => this.error = error);

    this.editheading = !this.editheading;



  }
  textfieldChange(event) {
    this.recipe.instruction = event.value;
  }
  delete() {
    this.friendlyApiService.delete(this.recipe);
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
