import {Injectable} from "@angular/core";
import { Headers, Http, Response } from '@angular/http';

import {Recipe} from "../models/recipe";
import {Duration} from "../models/duration";
import {Level} from "../models/level";
import {Unit} from "../models/unit";
import {Ingredient} from "../models/ingredient";
import {RecipeIngredient} from "../models/recipe_ingredient";
import {RecipeIngredientGroup} from "../models/recipe_ingredient_group";
import {Note} from "../models/note";
import {RecipeTag} from '../models/recipe_tag';
import {Tag} from '../models/tag';


import 'rxjs/add/operator/toPromise';
import {RecipePicture} from "../models/recipe_picture";
import {Global} from "../globals";
import {User} from "../models/user";
import {ShoppingCartItem} from "../models/shopping_cart_item";
import {Event} from "../calendar/event";

@Injectable()
export class FriendlyApiService {

  private baseUrl = Global.apiUrl;

  private recipesUrl = this.baseUrl + '/recipes';


  private unitsUrl = this.baseUrl + '/get';
  private ingredientsUrl = this.baseUrl + '/ingredients';
  private recipeIngredientsUrl = this.baseUrl + '/recipe_ingredients';
  private recipeIngredientGroupUrl = this.baseUrl + '/recipe_ingredient_groups';
  private tagsUrl = this.baseUrl + '/tags';
  private recipeTagsUrl = this.baseUrl + '/recipe_tags';
  private notesUrl = this.baseUrl + '/notes';
  private usersUrl = this.baseUrl + '/users';
  private cartItemsUrl = this.baseUrl + '/shopping_cart_items';
  private eventsUrl = this.baseUrl + '/events';

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
  refreshHeaders() {
    let headers = new Headers();
    headers.append('Access-Token', localStorage.getItem('token'));
    headers.append('Client', localStorage.getItem('client'));
    headers.append('Uid', localStorage.getItem('uid'));
    headers.append('Content-Type', 'application/json');
    return headers;
  }


  //experimental pic upload
  uploadPicture(picture: RecipePicture) {

    return this.http.post(this.baseUrl + '/recipe_pictures', JSON.stringify(picture), {headers: this.refreshHeaders()}).toPromise().then((res) => res.json() as RecipePicture);
  }

  deletePicture(picture: RecipePicture) {
    let url = this.baseUrl + '/recipe_pictures/' + picture.id;

    return this.http.delete(url, {headers: this.refreshHeaders(), body: ''}).toPromise();
  }

  //GET STATIC VARIABLES FROM API
  getDurations() {
    return this.http.get(this.unitsUrl + 'durations.json', {headers: this.refreshHeaders(), body: ''})
      .toPromise()
      .then(response => response.json() as Duration[])
      .catch(this.handleError);
  }

  getLevels() {
    return this.http.get(this.unitsUrl + 'levels.json', {headers: this.refreshHeaders(), body: ''})
      .toPromise()
      .then(response => response.json() as Level[])
      .catch(this.handleError);
  }

  getUnits() {
    return this.http.get(this.unitsUrl + 'units.json', {headers: this.refreshHeaders(), body: ''})
      .toPromise()
      .then(response => response.json() as Unit[])
      .catch(this.handleError);
  }

  //INGREDIENTS
  getIngredients() {
    return this.http.get(this.ingredientsUrl + ".json", {headers: this.refreshHeaders(), body: ''})
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
      .post(this.ingredientsUrl, JSON.stringify(ingredient), {headers: this.refreshHeaders()})
      .toPromise()
      .then(res => res.json()
      )
      .catch(this.handleError);
  }

  private putIngredient(ingredient: Ingredient) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.ingredientsUrl}/${ingredient.id}`;

    return this.http
      .put(url, JSON.stringify(ingredient), {headers: this.refreshHeaders()})
      .toPromise()
      .then(() => ingredient)
      .catch(this.handleError);
  }

  deleteIngredient(ingredient: Ingredient):Promise<Response> {
    let url = `${this.ingredientsUrl}/${ingredient.id}`;
    return this.http
      .delete(url, {headers: this.refreshHeaders(), body: ''}).toPromise();
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
      .post(this.recipeIngredientGroupUrl, JSON.stringify(recipe_ingredient_group), {headers: this.refreshHeaders()})
      .toPromise()
      .then(res => res.json() as RecipeIngredientGroup
      )
      .catch(this.handleError);
  }

  private putRecipeIngredientGroup(recipe_ingredient_group: RecipeIngredientGroup) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.recipeIngredientGroupUrl}/${recipe_ingredient_group.id}`;

    return this.http
      .put(url, JSON.stringify(recipe_ingredient_group), {headers: this.refreshHeaders()})
      .toPromise()
      .then(() => recipe_ingredient_group)
      .catch(this.handleError);
  }

  deleteRecipeIngredientGroup(recipe_ingredient_group: RecipeIngredientGroup) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.recipeIngredientGroupUrl}/${recipe_ingredient_group.id}`;

    return this.http
      .delete(url, {headers: this.refreshHeaders(), body: ''})
      .toPromise()
      .then(() => recipe_ingredient_group)
      .catch(this.handleError);
  }

  //RECIPE INGREDIENTS
  deleteRecipeIngredient(recipe_ingredient: RecipeIngredient) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.recipeIngredientsUrl}/${recipe_ingredient.id}`;

    return this.http
      .delete(url, {headers: this.refreshHeaders(), body: ''})
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
      .post(this.recipeIngredientsUrl, JSON.stringify(recipe_ingredient), {headers: this.refreshHeaders()})
      .toPromise()
      .then(res => res.json() as RecipeIngredient
      )
      .catch(this.handleError);
  }

  private putRecipeIngredient(recipe_ingredient: RecipeIngredient) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.recipeIngredientsUrl}/${recipe_ingredient.id}`;

    return this.http
      .put(url, JSON.stringify(recipe_ingredient), {headers: this.refreshHeaders()})
      .toPromise()
      .then(() => recipe_ingredient)
      .catch(this.handleError);
  }

  //RECIPES
  getRecipe(id: any) {

    return this.http.get(this.recipesUrl + '/' + id + '.json', {headers: this.refreshHeaders(), body: ''})
      .toPromise()
      .then(response => response.json() as Recipe)
      .catch(this.handleError);

  }

  updateRecipeToList(recipe: Recipe) {
    return this.getRecipe(recipe.id).then(recipe => {
      let recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes"));
      for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id == recipe.id) {
          recipes.splice(i, 1);
          break;
        }
      }
      recipes.push(recipe);
      localStorage.setItem("recipes", JSON.stringify(recipes));
      return recipe;
    });


  }

  getRecipes() {
    return this.http.get(this.recipesUrl + ".json", {headers: this.refreshHeaders(), body: ''})
      .toPromise()
      .then(response => response.json() as Recipe[])
      .catch(this.handleError);

  }

  delete(recipe: Recipe) {

    let url = this.recipesUrl + "/" + recipe.id;


    return this.http
      .delete(url, {headers: this.refreshHeaders(), body: ''})
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
      .post(this.recipesUrl, JSON.stringify(recipe), {headers: this.refreshHeaders()})
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
    console.log("debugging " + recipe.id);
    let url = `${this.recipesUrl}/${recipe.id}`;

    return this.http
      .put(url, JSON.stringify(recipe), {headers: this.refreshHeaders()})
      .toPromise()
      .then(res => res.json() as Recipe)
      .catch(this.handleError);
  }


  //TAGS
  saveRecipeTag(recipeTag: RecipeTag): Promise<RecipeTag> {
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.recipeTagsUrl, JSON.stringify(recipeTag), {headers: this.refreshHeaders()})
      .toPromise()
      .then(res => res.json() as RecipeTag)
      .catch(this.handleError)
  }

  deleteRecipeTag(recipeTag: RecipeTag) {
    this.headers.append('Content-Type', 'application/json');
    let url = `${this.recipeTagsUrl}/${recipeTag.id}`;

    return this.http
      .delete(url, {headers: this.refreshHeaders(), body: ''}).toPromise()

  }

  getTags() {
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .get(this.tagsUrl, {headers: this.refreshHeaders(), body: ''})
      .toPromise()
      .then(res => res.json() as Tag[])
      .catch(this.handleError)
  }

  saveTag(tag: Tag): Promise<Tag> {
    if (tag.id) {
      return this.putTag(tag);
    }
    return this.postTag(tag);
  }

  private putTag(tag: Tag) {
    let url = `${this.tagsUrl}/${tag.id}`;
    return this.http
      .put(url, JSON.stringify(tag), {headers: this.refreshHeaders()})
      .toPromise()
      .then(() => tag)
      .catch(this.handleError)
  }

  private postTag(tag: Tag): Promise<Tag> {
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.tagsUrl, JSON.stringify(tag), {headers: this.refreshHeaders()})
      .toPromise()
      .then(res => res.json() as Tag)
      .catch(this.handleError)
  }

  deleteTag(tag: Tag) {
    let url = `${this.tagsUrl}/${tag.id}`;
    return this.http
      .delete(url, {headers: this.refreshHeaders(), body: ''})
      .toPromise()

  }


  //Notes
  saveNote(note: Note): Promise<Note> {
    this.headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.notesUrl, JSON.stringify(note), {headers: this.refreshHeaders()})
      .toPromise()
      .then(res => res.json() as Note)
      .catch(this.handleError)
  }

  deleteNote(note: Note) {
    this.headers.append('Content-Type', 'application/json');

    let url = `${this.notesUrl}/${note.id}`;

    return this.http
      .delete(url, {headers: this.refreshHeaders(), body: ''})
      .toPromise()
  }


  //USER

  getUser(id: number) {
    return this.http
      .get(this.usersUrl + '/' + id, {headers: this.refreshHeaders()})
      .toPromise()
      .then((res) => res.json() as User)
      .catch(this.handleError)
  }

  saveUser(user: User): Promise<User> {
    if (user.id) {
      return this.putUser(user);
    }
    return this.postUser(user);
  }

  private putUser(user: User) {
    let url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.refreshHeaders()})
      .toPromise()
      .then((res) => res.json() as User)
      .catch(this.handleError)
  }

  private postUser(user: User) {
    return this.http
      .post(this.tagsUrl, JSON.stringify(user), {headers: this.refreshHeaders()})
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError)
  }

  deleteUser(user: User) {
    let url = `${this.usersUrl}/${user.id}`;
  }

  changePassword(user: User, password: string, confirmation: string) {
    let url = `${this.baseUrl}/auth/password`;
    let data = {"email": user.email, "password": password, "password_confirmation": confirmation};
    return this.http
      .put(url, JSON.stringify(data), {headers: this.refreshHeaders()})
      .toPromise()
      .then((res) => res.json());
  }


  //SHOPPING CART ITEMS
  saveCartItem(item: ShoppingCartItem) {
    if (item.id) {
      return this.putCartItem(item);
    }
    return this.postCartItem(item);
  }

  putCartItem(item: ShoppingCartItem) {
    let url = this.cartItemsUrl + "/" + item.id;
    return this.http
      .put(url, JSON.stringify(item), {headers: this.refreshHeaders()})
      .toPromise()
      .then((res) => res.json() as ShoppingCartItem)
  }

  postCartItem(item: ShoppingCartItem) {
    return this.http
      .post(this.cartItemsUrl, JSON.stringify(item), {headers: this.refreshHeaders()})
      .toPromise()
      .then((res) => {
        return res.json() as ShoppingCartItem;

      })
  }

  deleteCartItem(item: ShoppingCartItem) {
    let url = this.cartItemsUrl + "/" + item.id;
    return this.http
      .delete(url, {headers: this.refreshHeaders(), body: ''})
      .toPromise()
  }

  getEvents(){
    return this.http
                .get(this.eventsUrl,  {headers: this.refreshHeaders(), body: ''})
        .toPromise()
        .then( res => res.json() as Event[]) ;

  }

  saveEvent(event: Event){
    if (event.id){
      return this.putEvent(event);
    }
    return this.postEvent(event);
  }

  putEvent(event: Event){
    let url = this.eventsUrl + "/" + event.id;
    return this.http
        .put(url, JSON.stringify(event), {headers: this.refreshHeaders()})
        .toPromise()
        .then( (res) => {
          return res.json() as Event;
        } )
  }

  postEvent(event: Event){
    return this.http
        .post(this.eventsUrl, JSON.stringify(event), {headers: this.refreshHeaders()})
        .toPromise()
        .then( (res) => {
          return res.json() as Event;
        } )
  }

  deleteEvent(event: Event){
    let url = this.eventsUrl + "/" + event.id

    return this.http
        .delete(url, { headers: this.refreshHeaders(), body: ''})
        .toPromise()
  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
