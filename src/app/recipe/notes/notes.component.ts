import { Component, Input } from "@angular/core";
import { FriendlyApiService } from "../../services/friendlyapi.service";
import { Rating } from "ng2-rating";




import { Recipe } from "../../models/recipe";
import { Note } from "../../models/note";
import {fadeIn} from "../../animations";

@Component({
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  selector: 'notes',
  animations: [
    fadeIn
  ]
})
export class Notes {
  @Input()
  recipe: Recipe;


  error: boolean = false;

  constructor(
    private friendlyApiService: FriendlyApiService
  ) { }


  note: Note = new Note();
  savingNote: boolean = false;

  user_id = localStorage.getItem('user_id');


  get diagnostic() { return JSON.stringify(this.note); }
  saveNote() {
    this.savingNote = true;
    this.note.recipe_id = this.recipe.id;
    this.friendlyApiService.saveNote(this.note).then(note => {
      this.recipe.notes.push(note);
      this.friendlyApiService.updateRecipeToList(this.recipe).then(recipe => this.recipe = recipe);
      this.savingNote = false;
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
