import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import { Authentication } from './authentication/authentication';


import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {Tags} from "./recipe/tags/tags.component";
import {Notes} from "./recipe/notes/notes.component";
import { ListIngredients} from "./list-ingredients/list-ingredients.component";
import {AddIngredients} from "./add-ingredients/add-ingredients.component";
import {TinyEditor} from "./directives/tinymce.directive";
import {AddRecipeIngredient} from "./add-recipe-ingredient/add-recipe-ingredient.component";


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeComponent,
    Tags,
    Notes,
    ListIngredients,
    AddIngredients,
    TinyEditor,
    AddRecipeIngredient,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule
  ],
  bootstrap: [AppComponent],
  providers: [Authentication],
})
export class AppModule { }
