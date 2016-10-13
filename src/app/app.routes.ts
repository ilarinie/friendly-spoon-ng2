import { Routes, RouterModule } from '@angular/router';

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { Login } from "./authentication/login";
import { Logout } from "./authentication/logout"
import {TagList} from "./tag-list/tag-list.component";
import {IngredientList} from "./ingredient-list/ingredient-list.component";

import {Authentication } from "./authentication/authentication";
import { MypageComponent} from "./user/mypage.component";
import {UserFormLeaveConfirmation, RecipeFormLeaveConfirmation} from "./guard/form.guard";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";

const appRoutes: Routes = [
  {
    path: "",
    component: RecipeListComponent,
    canActivate: [Authentication]
  },
  {
    path: "addrecipe",
    component: RecipeFormComponent,
    canActivate: [Authentication],
    canDeactivate: [RecipeFormLeaveConfirmation]
  },
  {
    path: "login",
    component: Login
  },
  {
    path: "logout",
    component: Logout
  },
  {
    path: "recipes/:id",
    component: RecipeComponent,
    canActivate: [Authentication]
  },
  {
    path: "recipes/:id/edit",
    component: RecipeFormComponent,
    canActivate: [Authentication],
    canDeactivate: [RecipeFormLeaveConfirmation]
  },
  {
    path: "tags",
    component: TagList,
    canActivate: [Authentication]
  },
  {
    path: "ingredients",
    component: IngredientList,
    canActivate: [Authentication]
  },
  {
    path: 'mypage',
    component: MypageComponent,
    canActivate: [Authentication],
    canDeactivate: [UserFormLeaveConfirmation]
  },
  {
    path: 'shoppingcart',
    component: ShoppingCartComponent,
    canActivate: [Authentication]
  }
];


export const routing = RouterModule.forRoot(appRoutes);
