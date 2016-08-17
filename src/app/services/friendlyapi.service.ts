import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";

import { Recipe } from "../models/recipe";
import { Duration } from "../models/duration";
import { Level } from "../models/level";
import { Unit } from "../models/unit";
import { Ingredient} from "../models/ingredient";
import { RecipeIngredient } from "../models/recipe_ingredient";
import {RecipeIngredientGroup} from "../models/recipe_ingredient_group";
import { Note } from "../models/note";
import {RecipeTag} from '../models/recipe_tag';
import {Tag} from '../models/tag';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class FriendlyApiService {
  private baseUrl = 'http://friendly-spoon-api.herokuapp.com';

  private recipesUrl = this.baseUrl + '/recipes';
  private unitsUrl = this.baseUrl + '/get'
  private ingredientsUrl = this.baseUrl + '/ingredients';
  private recipeIngredientsUrl = this.baseUrl + '/recipe_ingredients'
  private recipeIngredientGroupUrl = this.baseUrl + '/recipe_ingredient_groups'
  private tagsUrl = this.baseUrl + '/tags'
  private recipeTagsUrl = this.baseUrl + '/recipe_tags'
  private notesUrl = this.baseUrl + '/notes';

  token: string;
  client: string;
  uid: string;
  tokentype: string;
  expiry: string;

  headers: Headers;


  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
    this.client = localStorage.getItem('client');
    this.uid = localStorage.getItem('uid');
    this.tokentype = localStorage.getItem('tokentype');
    this.expiry = localStorage.getItem('expiry');

    this.headers = new Headers();
    this.headers.append('Access-Token', this.token);
    this.headers.append('Client', this.client);
    this.headers.append('Uid', this.uid);
  }

  //TODO: REFACTOR TO SEPARATE SERVICES

  //GET STATIC VARIABLES FROM API
  getDurations() {
    return this.http.get(this.unitsUrl + 'durations.json', { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json() as Duration[])
      .catch(this.handleError);
  }
  getLevels() {
    return this.http.get(this.unitsUrl + 'levels.json', { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json() as Level[])
      .catch(this.handleError);
  }
  getUnits() {
    return this.http.get(this.unitsUrl + 'units.json', { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json() as Unit[])
      .catch(this.handleError);
  }
  //INGREDIENTS
  getIngredients() {
    return this.http.get(this.ingredientsUrl + ".json", { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json() as Ingredient[])
      .catch(this.handleError);
  }

  saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
    if (ingredient.id) {
      return this.putIngredient(ingredient);
    }
    return this.postIngredient(ingredient);
  }
  // Add ingredient
  private postIngredient(ingredient: Ingredient): Promise<Ingredient> {
    this.headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.ingredientsUrl, JSON.stringify(ingredient), { headers: this.headers })
      .toPromise()
      .then(res => res.json()
      )
      .catch(this.handleError);
  }
  private putIngredient(ingredient: Ingredient) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.ingredientsUrl}/${ingredient.id}`;

    return this.http
      .put(url, JSON.stringify(ingredient), { headers: this.headers })
      .toPromise()
      .then(() => ingredient)
      .catch(this.handleError);
  }

  //RECIPE INGREDIENT Group
  saveRecipeIngredientGroup(recipe_ingredient_group: RecipeIngredientGroup): Promise<RecipeIngredientGroup> {
    if (recipe_ingredient_group.id) {
      return this.putRecipeIngredientGroup(recipe_ingredient_group);
    }
    return this.postRecipeIngredientGroup(recipe_ingredient_group);
  }
  // Add recipeingredient
  private postRecipeIngredientGroup(recipe_ingredient_group: RecipeIngredientGroup): Promise<RecipeIngredientGroup> {
    this.headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.recipeIngredientGroupUrl, JSON.stringify(recipe_ingredient_group), { headers: this.headers })
      .toPromise()
      .then(res => res.json()

      )
      .catch(this.handleError);
  }
  private putRecipeIngredientGroup(recipe_ingredient_group: RecipeIngredientGroup) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.recipeIngredientGroupUrl}/${recipe_ingredient_group.id}`;

    return this.http
      .put(url, JSON.stringify(recipe_ingredient_group), { headers: this.headers })
      .toPromise()
      .then(() => recipe_ingredient_group)
      .catch(this.handleError);
  }

  //RECIPE INGREDIENTS
  deleteRecipeIngredient(recipe_ingredient: RecipeIngredient) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.recipeIngredientsUrl}/${recipe_ingredient.id}`;

    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  saveRecipeIngredient(recipe_ingredient: RecipeIngredient): Promise<RecipeIngredient> {
    if (recipe_ingredient.id) {
      return this.putRecipeIngredient(recipe_ingredient);
    }
    return this.postRecipeIngredient(recipe_ingredient);
  }
  // Add recipeingredient
  private postRecipeIngredient(recipe_ingredient: RecipeIngredient): Promise<RecipeIngredient> {
    this.headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.recipeIngredientsUrl, JSON.stringify(recipe_ingredient), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as RecipeIngredient

      )
      .catch(this.handleError);
  }
  private incerror(error: any) {
    console.error('An asd occurred', error);
    return Promise.reject(error.message || error);
  }
  private putRecipeIngredient(recipe_ingredient: RecipeIngredient) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.recipeIngredientsUrl}/${recipe_ingredient.id}`;

    return this.http
      .put(url, JSON.stringify(recipe_ingredient), { headers: this.headers })
      .toPromise()
      .then(() => recipe_ingredient)
      .catch(this.handleError);
  }
  //RECIPES
  getRecipe(id: any) {
    return this.http.get(this.recipesUrl + '/' + id + '.json', { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json() as Recipe)
      .catch(this.handleError);
  }
  getRecipes() {
    return this.http.get(this.recipesUrl + ".json", { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json() as Recipe[])
      .catch(this.handleError);

  }
  delete(recipe: Recipe) {
    let newheaders = this.headers
    newheaders.append('Content-Type', 'application/json');
    console.log("debugging " + recipe.id)

    let url = this.recipesUrl + "/" + recipe.id;

    console.log("debugging " + url)
    return this.http
      .delete(url, { headers: newheaders, body: '' })
      .toPromise()
      .catch(this.handleError);
  }
  save(recipe: Recipe): Promise<Recipe> {
    if (recipe.id) {
      return this.put(recipe);
    }
    return this.post(recipe);
  }
  // Add recipe
  private post(recipe: Recipe): Promise<Recipe> {
    this.headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.recipesUrl, JSON.stringify(recipe), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Recipe

      )
      .catch(this.saveError);
  }
  saveError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  private put(recipe: Recipe) {
    this.headers.append('Content-Type', 'application/json');
    console.log("debugging " + recipe.id)
    let url = `${this.recipesUrl}/${recipe.id}`;

    return this.http
      .put(url, JSON.stringify(recipe), { headers: this.headers })
      .toPromise()
      .then(() => recipe)
      .catch(this.handleError);
  }


  //TAGS
  saveRecipeTag(recipeTag: RecipeTag): Promise<RecipeTag> {
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.recipeTagsUrl, JSON.stringify(recipeTag), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as RecipeTag)
      .catch(this.handleError)
  }
  deleteRecipeTag(recipeTag: RecipeTag) {
    this.headers.append('Content-Type', 'application/json');
    let url = `${this.recipeTagsUrl}/${recipeTag.id}`;

    return this.http
      .delete(url, { headers: this.headers, body: '' }).toPromise()

  }
  getTags() {
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .get(this.tagsUrl, { headers: this.headers, body: '' })
      .toPromise()
      .then(res => res.json() as Tag[])
      .catch(this.handleError)
  }
  saveTag(tag: Tag): Promise<Tag> {
    return this.postTag(tag);
  }
  private putTag(tag: Tag) {

  }
  private postTag(tag: Tag): Promise<Tag> {
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.tagsUrl, JSON.stringify(tag), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Tag)
      .catch(this.handleError)
  }
  //Notes
  saveNote(note: Note): Promise<Note> {
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.notesUrl, JSON.stringify(note), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Note)
      .catch(this.handleError)
  }
  deleteNote(note: Note) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.notesUrl}/${note.id}`;

    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
  }




  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}