import {FilterArrayPipe, ReverseArrayPipe, OrderBy} from "./pipes/filter-array-pipe";
import {FriendlyApiService} from "./services/friendlyapi.service";
import { Rating } from "ng2-rating";
import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { Authentication } from './authentication/authentication';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import { MdButtonModule } from '@angular2-material/button';
import {MdGridListModule} from '@angular2-material/grid-list';
import {MdCardModule} from '@angular2-material/card';
import {MdListModule} from '@angular2-material/list';
import {MdInputModule} from '@angular2-material/input';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdRadioModule } from '@angular2-material/radio';
import { DragulaModule} from "ng2-dragula/ng2-dragula";
import {MdProgressBarModule} from "@angular2-material/progress-bar";

import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {Tags} from "./recipe/tags/tags.component";
import {Notes} from "./recipe/notes/notes.component";
import { ListIngredients} from "./recipe/list-ingredients/list-ingredients.component";
import {AddIngredients} from "./recipe/add-ingredients/add-ingredients.component";
import {TinyEditor} from "./directives/tinymce.directive";
import { Login } from "./authentication/login";
import { Logout } from "./authentication/logout";
import {TagList} from "./tag-list/tag-list.component";
import {IngredientList} from "./ingredient-list/ingredient-list.component";
import {Pictures} from "./recipe/pictures/pictures.component";

import {enableProdMode} from "@angular/core";
import {Ng2PaginationModule} from "ng2-pagination";

enableProdMode();

@NgModule({
  declarations: [
    FilterArrayPipe,
    ReverseArrayPipe,
    OrderBy,
    Rating,
    AppComponent,
    RecipeListComponent,
    RecipeComponent,
    Tags,
    Notes,
    ListIngredients,
    AddIngredients,
    Pictures,
    TinyEditor,
    Login,
    Logout,
    TagList,
    IngredientList
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    ConfirmModule,
    FormsModule,
    MdButtonModule,
    MdGridListModule,
    MdCardModule,
    MdListModule,
    DragulaModule,
    MdInputModule,
    MdCheckboxModule,
    MdRadioModule,
    MdProgressBarModule,
    Ng2PaginationModule
  ],
  providers: [Authentication, FriendlyApiService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],

})
export class AppModule { }
