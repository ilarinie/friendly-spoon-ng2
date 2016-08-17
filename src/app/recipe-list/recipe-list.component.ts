import { Component, OnInit } from "@angular/core";
import { Router }            from "@angular/router";
import { FilterArrayPipe, OrderBy, TagFilter } from "../pipes/filter-array-pipe";
import { Authentication } from "../authentication/authentication";


import { Recipe } from "../models/recipe";
import { Tag } from "../models/tag";
import { FriendlyApiService } from "../services/friendlyapi.service";


@Component({
    selector: "recipe-list",
    templateUrl: "/app/recipe-list/recipe-list.component.html",
    styleUrls: ["/app/recipe-list/recipe-list.component.css"],
    pipes: [FilterArrayPipe, OrderBy, TagFilter],
})

export class RecipeListComponent implements OnInit {
    recipes: Recipe[];
    listfilter: string;
    order: string;
    tags: Tag[];
    searchTag: string;

    constructor(
        private router: Router,
        private friendlyApiService: FriendlyApiService,
        private authentication: Authentication
    ) { }
    ngOnInit() {
        this.order = "name";
        this.searchTag = "";
        this.friendlyApiService.getRecipes().then(recipes => this.recipes = recipes);
        this.friendlyApiService.getTags().then(tags => this.tags = tags);
    }
    random() {
        this.listfilter = this.recipes[Math.floor((Math.random() * this.recipes.length))].name
    }
    button() {
        console.log(this.searchTag)
    }
    tagChange(value) {
        console.log("diip" + typeof (value))
        this.searchTag = "aapeli";
    }

    sortByName() {
        if (this.order == "name") {
            this.order = "namereverse";
        } else {
            this.order = "name";
        }
    }
    sortByRating() {
        if (this.order == "rating") {
            this.order = "ratingreverse";
        } else {
            this.order = "rating";
        }
    }
    sortByTime() {
        if (this.order == "time") {
            this.order = "timereverse";
        } else {
            this.order = "time";
        }
    }
}
