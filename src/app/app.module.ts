import {FilterArrayPipe, ReverseArrayPipe, OrderBy, Fractioner} from "./pipes/filter-array-pipe";
import {FractionizePipe} from "./pipes/fractioner";
import {FriendlyApiService} from "./services/friendlyapi.service";
import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { Authentication } from './authentication/authentication';
import { MdButtonModule } from '@angular2-material/button';
import {MdGridListModule} from '@angular2-material/grid-list';
import {MdCardModule} from '@angular2-material/card';
import {MdListModule} from '@angular2-material/list';
import {MdInputModule} from '@angular2-material/input';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSliderModule } from '@angular2-material/slider';
import { DragulaModule} from "ng2-dragula/ng2-dragula";
import {MdProgressBarModule} from "@angular2-material/progress-bar";
import { MdTabsModule } from "@angular2-material/tabs";
import { MdUniqueSelectionDispatcher } from "@angular2-material/core";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {RecipeFormComponent} from "./recipe-form/recipe-form.component";
import {Tags} from "./recipe-form/tags/tags.component";
import {Notes} from "./recipe/notes/notes.component";
import { ListIngredients} from "./recipe/list-ingredients/list-ingredients.component";
import {AddIngredients} from "./recipe-form/add-ingredients/add-ingredients.component";
import {TinyEditor} from "./directives/tinymce.directive";
import { Login } from "./authentication/login";
import { Logout } from "./authentication/logout";
import {TagList} from "./tag-list/tag-list.component";
import {IngredientList} from "./ingredient-list/ingredient-list.component";
import {Pictures} from "./recipe-form/pictures/pictures.component";
import {enableProdMode} from "@angular/core";
import { Ng2PaginationModule } from 'ng2-pagination';
import {fadeIn} from './animations';
import {MypageComponent} from './user/mypage.component';
import {UserFormLeaveConfirmation, RecipeFormLeaveConfirmation} from './guard/form.guard';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {SessionService} from './services/session.service';
import { TypeaheadModule} from 'ng2-bootstrap';
import { RatingModule } from 'ng2-bootstrap/components/rating';
import { CapitalizePipe } from './pipes/capitalize';
import { RandomRecipeModalComponent } from './recipe-list/random-recipe-modal.component';

import 'hammerjs';

enableProdMode();

@NgModule({
  declarations: [
    FilterArrayPipe,
    ReverseArrayPipe,
    OrderBy,
    Fractioner,
    FractionizePipe,
    CapitalizePipe,
    AppComponent,
    RecipeListComponent,
    RecipeComponent,
    RecipeFormComponent,
    Tags,
    Notes,
    ListIngredients,
    AddIngredients,
    Pictures,
    TinyEditor,
    ShoppingCartComponent,
    Login,
    Logout,
    TagList,
    IngredientList,
    MypageComponent,
    RandomRecipeModalComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdGridListModule,
    MdCardModule,
    MdListModule,
    DragulaModule,
    MdInputModule,
    MdCheckboxModule,
    MdRadioModule,
    MdProgressBarModule,
    MdSliderModule,
    MdTabsModule,
    Ng2PaginationModule,
    TypeaheadModule,
    RatingModule
  ],
  providers: [
    Authentication,
    FriendlyApiService,
    UserFormLeaveConfirmation,
    RecipeFormLeaveConfirmation,
    SessionService,
    MdUniqueSelectionDispatcher
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
