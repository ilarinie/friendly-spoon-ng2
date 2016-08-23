import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { Authentication } from './authentication/authentication';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import {ConfirmOptions, Position} from 'angular2-bootstrap-confirm';
import {Positioning} from 'angular2-bootstrap-confirm/position/position';

import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {Tags} from "./recipe/tags/tags.component";
import {Notes} from "./recipe/notes/notes.component";
import { ListIngredients} from "./recipe/list-ingredients/list-ingredients.component";
import {AddIngredients} from "./recipe/add-ingredients/add-ingredients.component";
import {TinyEditor} from "./directives/tinymce.directive";
import { Login } from "./authentication/login";
import { Logout } from "./authentication/logout";

import {enableProdMode} from "@angular/core";
enableProdMode();


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
    Login,
    Logout
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    ConfirmModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [Authentication, ConfirmOptions,
    { provide: Position, useClass: Positioning }],
})
export class AppModule { }
