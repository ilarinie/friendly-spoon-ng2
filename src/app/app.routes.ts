import { Routes, RouterModule } from '@angular/router';

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { Login } from "./authentication/login";
import { Logout } from "./authentication/logout"
import {TagList} from "./tag-list/tag-list.component";
import {IngredientList} from "./ingredient-list/ingredient-list.component";

import {Authentication } from "./authentication/authentication";
import {UserComponent} from "./user/user.component";
import {UserFormLeaveConfirmation, RecipeFormLeaveConfirmation} from "./guard/form.guard";

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
    component: UserComponent,
    canActivate: [Authentication],
    canDeactivate: [UserFormLeaveConfirmation]
  }
];


export const routing = RouterModule.forRoot(appRoutes);
