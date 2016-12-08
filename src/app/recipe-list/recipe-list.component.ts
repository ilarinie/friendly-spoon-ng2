import {
  Component, OnInit, trigger,
  state,
  style,
  transition,
  animate
} from "@angular/core";
import {Recipe} from "../models/recipe";
import {Tag} from "../models/tag";
import {FriendlyApiService} from "../services/friendlyapi.service";
import {Global} from "../globals";
import {fadeIn, recipeFade} from "../animations";


@Component({
  selector: "recipe-list",
  templateUrl: "recipe-list.component.html",
  styleUrls: ["recipe-list.component.scss"],
  animations: [
    fadeIn, recipeFade
  ]
})

export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  shownRecipes: Recipe[];
  listfilter: string;
  order: string;
  tags: Tag[];
  searchTag: string;
  zeroRating = 0;


  baseUrl: string = Global.apiUrl;

  loading: boolean;
  private randomRecipe: Recipe;
  private rolling: boolean = false;

  constructor(private friendlyApiService: FriendlyApiService) {
  }

  onScroll() {

  }

  ngOnInit() {
    this.order = "name";
    this.searchTag = "";

    console.log(localStorage.getItem('listLoaded') == "null")
    if (localStorage.getItem("recipes") == null || localStorage.getItem("listLoaded") == "null" || (parseInt(localStorage.getItem("listLoaded")) + 600000) < Date.now()) {
      console.log("lataan")
      this.loading = true;
      this.friendlyApiService.getRecipes().then(recipes => {
        this.recipes = recipes;
        this.shownRecipes = recipes;
        localStorage.setItem("recipes", JSON.stringify(recipes));
        localStorage.setItem("listLoaded", Date.now().toString());
        this.loading = false;
      });
    } else {
      this.recipes = JSON.parse(localStorage.getItem("recipes"))
      this.shownRecipes = JSON.parse(localStorage.getItem("recipes"));
    }
    if (localStorage.getItem("tags") == null) {
      this.friendlyApiService.getTags().then(tags => { this.tags = tags; localStorage.setItem("tags", JSON.stringify(tags)) });
      console.log("joo")
    } else {
      this.tags = JSON.parse(localStorage.getItem("tags"))
    }



    /*this.friendlyApiService.getTags().then(tags => this.tags = tags);
    this.refreshRecipes();*/
  }

  random() {
    //this.listfilter = this.shownRecipes[Math.floor((Math.random() * this.shownRecipes.length))].name
    this.randomRecipe = this.shownRecipes[Math.floor((Math.random() * this.shownRecipes.length))]
  }

  reRoll() {
    this.rolling = true;
    console.log(1);
    this.randomRecipe = this.shownRecipes[Math.floor((Math.random() * this.shownRecipes.length))];
    setTimeout(() => {
      this.rolling = false;
    }, 2000);
  }




  setRolling() {
    console.log(2)
    this.rolling = !this.rolling;
  }

  clearSearch() {
    this.listfilter = "";
  }

  refreshRecipes() {
    this.loading = true;
    this.friendlyApiService.getRecipes().then(recipes => {
      this.recipes = recipes;
      localStorage.setItem("recipes", JSON.stringify(recipes));
      localStorage.setItem("listLoaded", Date.now().toString())
      this.shownRecipes = recipes;
      this.loading = false;
    })
  }

  tagChange(value) {
    this.shownRecipes = [];
    if (value == "") {
      this.shownRecipes = this.recipes;
    }

    for (let i = 0; i < this.recipes.length; i++) {
      for (let j = 0; j < this.recipes[i].recipe_tags.length; j++) {
        if (this.recipes[i].recipe_tags[j].tag.title == value) {
          this.shownRecipes.push(this.recipes[i]);
          j = j + 9999;
        }
      }
    }
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

  sortByDate(){
    if (this.order == "date") {
      this.order = "datereverse";
    } else {
      this.order = "date";
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
