import { Component, OnInit } from "@angular/core";
import { Router }            from "@angular/router";
import { FilterArrayPipe, OrderBy, TagFilter } from "../pipes/filter-array-pipe";
import { Authentication } from "../authentication/authentication";
import {MdInput} from "@angular2-material/input";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';



import { Recipe } from "../models/recipe";
import { Tag } from "../models/tag";
import { FriendlyApiService } from "../services/friendlyapi.service";


@Component({
  selector: "recipe-list",
  templateUrl: "recipe-list.component.html",
  styleUrls: ["recipe-list.component.css"],
  pipes: [FilterArrayPipe, OrderBy, TagFilter],
  directives: [MdInput],
  moduleId: module.id
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  listfilter: string;
  order: string;
  tags: Tag[];
  searchTag: string;

  loading: boolean;

  constructor(
    private router: Router,
    private friendlyApiService: FriendlyApiService,
    private authentication: Authentication
  ) { }
  ngOnInit() {
    this.order = "name";
    this.searchTag = "";
    if (localStorage.getItem("recipes") == null) {
      this.loading = true;
      this.friendlyApiService.getRecipes().then(recipes => {
        this.recipes = recipes;
        localStorage.setItem("recipes", JSON.stringify(recipes));
        this.loading = false;
      });
    } else {
      this.recipes = JSON.parse(localStorage.getItem("recipes"))
    }
    if (localStorage.getItem("tags") == null) {
      this.friendlyApiService.getTags().then(tags => { this.tags = tags; localStorage.setItem("tags", JSON.stringify(tags)) });
      console.log("joo")
    } else {
      this.tags = JSON.parse(localStorage.getItem("tags"))
    }

    this.friendlyApiService.getTags().then(tags => this.tags = tags);
  }
  random() {
    this.listfilter = this.recipes[Math.floor((Math.random() * this.recipes.length))].name
  }
  button() {
    console.log(this.searchTag)
  }
  refreshRecipes() {
    this.loading = true;
    this.friendlyApiService.getRecipes().then(recipes => {
      this.recipes = recipes;
      this.recipes = recipes; localStorage.setItem("recipes", JSON.stringify(recipes));
      this.loading = false;
    })
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
