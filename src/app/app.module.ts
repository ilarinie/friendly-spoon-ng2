import {FilterArrayPipe, ReverseArrayPipe, OrderBy, Fractioner} from "./pipes/filter-array-pipe";
import {FriendlyApiService} from "./services/friendlyapi.service";
import { Rating } from "ng2-rating";
import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {MdTabsModule} from "@angular2-material/tabs";
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
import {Ng2PaginationModule} from "ng2-pagination";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {fadeIn} from "./animations";
import { SelectModule } from 'ng2-select/ng2-select';
import {MypageComponent} from "./user/mypage.component";
import {UserFormLeaveConfirmation, RecipeFormLeaveConfirmation} from "./guard/form.guard";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {SessionService} from "./services/session.service";
import { ResponsiveModule } from 'ng2-responsive';

enableProdMode();

@NgModule({
  declarations: [
    FilterArrayPipe,
    ReverseArrayPipe,
    OrderBy,
    Fractioner,
    Rating,
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
    MypageComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    ConfirmModule,
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
    MdTabsModule,
    Ng2PaginationModule,
    InfiniteScrollModule,
    SelectModule,
    ResponsiveModule
  ],
  providers: [
    Authentication,
    FriendlyApiService,
    UserFormLeaveConfirmation,
    RecipeFormLeaveConfirmation,
    CookieService,
    SessionService

  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],

})
export class AppModule { }
