import { Routes, RouterModule } from '@angular/router';

import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeAddComponent } from "./recipe-add/recipe-add.component";
import { Login } from "./authentication/login";
import { Logout } from "./authentication/logout"

import {Authentication } from "./authentication/authentication";

const appRoutes: Routes = [
    {
        path: "",
        component: RecipeListComponent,
        canActivate: [Authentication]
    },
    {
        path: "addrecipe",
        component: RecipeComponent,
        canActivate: [Authentication]
    },
    {
        path: "recipes/:id/edit",
        component: RecipeAddComponent,
        canActivate: [Authentication]
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
    }
];


export const routing = RouterModule.forRoot(appRoutes);
