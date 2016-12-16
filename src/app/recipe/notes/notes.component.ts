import { Component, Input } from "@angular/core";
import { FriendlyApiService } from "../../services/friendlyapi.service";
import { Rating } from "ng2-rating";




import { Recipe } from "../../models/recipe";
import { Note } from "../../models/note";
import {fadeIn} from "../../animations";
import {Global} from "../../globals";

@Component({
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  selector: 'notes',
  animations: [
    fadeIn
  ]
})
export class Notes {
  @Input()
  recipe: Recipe;


  error: boolean = false;
  ratingInput: boolean = false;

  constructor(
    private friendlyApiService: FriendlyApiService
  ) { }

  ratingStates = Global.ratingStates;

  note: Note = new Note();
  savingNote: boolean = false;

  user_id = parseInt(localStorage.getItem('user_id'));

  

  toggleRatingInput(){
    console.log("note.rating " + this.note.rating);
    console.log(!this.note.rating);
    if (this.ratingInput){
      this.note.rating = null;
      this.ratingInput = false;
    } else {
      this.ratingInput = true;
    }
  }

  get diagnostic() { return JSON.stringify(this.note); }
  saveNote() {
    this.savingNote = true;
    this.note.recipe_id = this.recipe.id;
    if (this.note.rating < 1 || this.note.rating > 5){
      this.error = true;
      this.savingNote = false;
      return;
    }
    this.error = false;
    this.friendlyApiService.saveNote(this.note).then(note => {
      this.recipe.notes.push(note);
      this.friendlyApiService.updateRecipeToList(this.recipe).then(recipe => this.recipe = recipe);
      this.savingNote = false;
      this.ratingInput = false;
      this.note = new Note();
    });
  }
  deleteNote(note: Note) {
    let index = this.recipe.notes.indexOf(note);
    if (index > -1) {
      this.recipe.notes.splice(index, 1);
    }
    this.friendlyApiService.updateRecipeToList(this.recipe);
    this.friendlyApiService.deleteNote(note).then(res => {

    })
  }

}
