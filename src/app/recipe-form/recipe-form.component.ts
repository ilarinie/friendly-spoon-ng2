import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute }            from "@angular/router";
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


import { Recipe } from "../models/recipe";
import { Level } from "../models/level";
import { Duration } from "../models/duration";
import { FriendlyApiService } from "../services/friendlyapi.service";

//Recipe directives
import { AddIngredients } from "./add-ingredients/add-ingredients.component";
import { Tags } from "./tags/tags.component";
import {RecipePicture} from "../models/recipe_picture";
import {Global} from "../globals";
import {fadeIn} from "../animations";

@Component({
  selector: "recipeform",
  templateUrl: "recipe-form.component.html",
  styleUrls: ["recipe-form.component.scss"],
  viewProviders: [
    DragulaService
  ], animations: [
    fadeIn
  ]
})

export class RecipeFormComponent implements OnInit {
  error: any;
  recipe: Recipe;
  form: FormGroup;
  sub: any;

  baseUrl: string = Global.apiUrl;

  deleting: boolean = false;
  addrecipe: boolean = false;

  user_id: number = parseInt(localStorage.getItem('user_id'));
  recipe_user_id: number;

  levels: Level[];
  durations: Duration[];

  pictureSet = [];

  shownPic: RecipePicture;
  private initialRecipe: Recipe;

  constructor(
    private router: Router,
    private friendlyApiService: FriendlyApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      'name': ['', Validators.required],
      'level_id': ['', Validators.required],
      'duration_id': ['', Validators.required],
      'public': [],
      'keyword': [],
      'introduction': ['', Validators.required],
      'instruction': ['']
    })

  }

  hasChanges() {
    if (this.incsMoved()){
      return true;
    }
    return this.form.dirty;
  }
  incsMoved() {
    return this.recipe.incsMoved;
  }

  //pictureModal
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

  shownImages(){
     for ( let i = 0; i < 3; i ++) {
       if (this.recipe.recipe_pictures.length > i){
         this.pictureSet[i] = this.recipe.recipe_pictures[i];
       } else if (this.recipe.recipe_pictures.length > 0){
         this.pictureSet[i] = this.recipe.recipe_pictures[0];
       }else {
         this.pictureSet[i] = "nopic"
       }
      }
  }


  getRecipe() {
    if (this.router.url.includes('addrecipe')) {
      this.recipe = new Recipe();
      this.recipe.level = new Level();
      this.recipe.duration = new Duration();
      this.recipe.recipe_pictures = [];
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
        if (!isNaN(id)) {
          this.friendlyApiService.getRecipe(id)
            .then(recipe => {
              this.recipe = recipe;
              this.recipe.incsMoved = false;
              this.shownImages();
              this.recipe_user_id = recipe.user_id;
              this.form = this.fb.group({
                'name': [this.recipe.name, Validators.required],
                'level_id': [this.recipe.level.id, Validators.required],
                'duration_id': [this.recipe.duration.id, Validators.required],
                'public': [this.recipe.public],
                'keyword': [this.recipe.keyword],
                'introduction': [this.recipe.introduction, Validators.required],
                'instruction': [this.recipe.instruction]
              })
            });
          //  }
        }

      });
    }
  }
  ngOnInit() {
    this.getRecipe();
    this.levels = JSON.parse(localStorage.getItem("levels"));
    this.durations = JSON.parse(localStorage.getItem("durations"));
  }
  get diagnostic() { return JSON.stringify(this.recipe); }

  save(value: any) {
    this.recipe.name = value.name;
    this.recipe.public = value.public;
    this.recipe.keyword = value.keyword;
    this.recipe.level_id = value.level_id;
    this.recipe.duration_id = value.duration_id;
    this.recipe.introduction = value.introduction;

    this.saveOrders();
    this.friendlyApiService
      .save(this.recipe)
      .then(recipe => {
        this.recipe = recipe;
        this.initialRecipe = recipe;

        //to force recipe list refresh
        localStorage.setItem('listLoaded', null);

        //load updated recipe list to cache
        this.friendlyApiService.updateRecipeToList(this.recipe);
        if (this.router.url.includes('addrecipe')) {
          this.router.navigate(['recipes/' + recipe.id + '/edit'])
        }
        this.form.markAsPristine();
        if (!this.addrecipe) {
          this.router.navigate(['/recipes/' + this.recipe.id]);
        } else {
          this.router.navigate(['/recipes/' + this.recipe.id + '/edit']);
        }
      })
      .catch(error => this.error = error);
  }
  saveTags() {
    for (let i = 0; i < this.recipe.recipe_tags.length; i++) {
      if (!this.recipe.recipe_tags[i].id) {
        this.friendlyApiService.saveRecipeTag(this.recipe.recipe_tags[i]);
      }
    }
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
    this.recipe.incsMoved = false;
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

}
